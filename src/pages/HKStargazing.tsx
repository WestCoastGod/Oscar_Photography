import {
  MapContainer,
  TileLayer,
  Popup,
  ImageOverlay,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect, useRef } from "react";

// 修復 Leaflet 標記圖標問題
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// 香港邊界默認視圖
const HONG_KONG_CENTER: [number, number] = [22.3193, 114.1694];
const DEFAULT_ZOOM = 11;

// 疊加圖片的經緯度範圍
const IMG_LAT_MIN = 21.95;
const IMG_LAT_MAX = 22.75;
const IMG_LNG_MIN = 113.5;
const IMG_LNG_MAX = 114.69;

// 顏色對應表
const COLOR_TABLE = [
  { rgb: [0, 0, 0], bortle: "1", sky: "22.00~21.99" },
  { rgb: [32, 32, 32], bortle: "1-2", sky: "21.99~21.93" },
  { rgb: [64, 64, 64], bortle: "2", sky: "21.93~21.89" },
  { rgb: [0, 0, 64], bortle: "2-3", sky: "21.89~21.81" },
  { rgb: [0, 0, 128], bortle: "3", sky: "21.81~21.69" },
  { rgb: [0, 64, 0], bortle: "3-4", sky: "21.69~21.51" },
  { rgb: [0, 128, 0], bortle: "4", sky: "21.51~21.25" },
  { rgb: [128, 128, 0], bortle: "4-5", sky: "21.25~20.91" },
  { rgb: [192, 192, 64], bortle: "5", sky: "20.91~20.49" },
  { rgb: [192, 128, 0], bortle: "5-6", sky: "20.49~20.02" },
  { rgb: [192, 96, 0], bortle: "6", sky: "20.02~19.50" },
  { rgb: [128, 0, 0], bortle: "6-7", sky: "19.50~18.95" },
  { rgb: [192, 0, 0], bortle: "7", sky: "18.95~18.38" },
  { rgb: [255, 64, 64], bortle: "7-8", sky: "18.38~17.80" },
  { rgb: [192, 192, 192], bortle: "8-9", sky: "<17.80" },
];

function colorDist(a: [number, number, number], b: [number, number, number]) {
  return Math.sqrt(
    Math.pow(a[0] - b[0], 2) +
      Math.pow(a[1] - b[1], 2) +
      Math.pow(a[2] - b[2], 2)
  );
}

function colorToBortleAndSky(rgb: [number, number, number]) {
  let minDist = Infinity;
  let result = { bortle: "-", sky: "-" };
  for (const entry of COLOR_TABLE) {
    const dist = colorDist(rgb, entry.rgb as [number, number, number]);
    if (dist < minDist) {
      minDist = dist;
      result = { bortle: entry.bortle, sky: entry.sky };
    }
  }
  return result;
}

// 地圖點擊處理
function OverlayColorClickHandler({
  canvasRef,
  onResult,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  onResult: (result: {
    lat: number;
    lng: number;
    bortle: string;
    sky: string;
  }) => void;
}) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const w = canvas.width;
      const h = canvas.height;
      // 經緯度轉像素
      const x = Math.round(
        ((lng - IMG_LNG_MIN) / (IMG_LNG_MAX - IMG_LNG_MIN)) * w
      );
      const y = Math.round(
        ((IMG_LAT_MAX - lat) / (IMG_LAT_MAX - IMG_LAT_MIN)) * h
      );
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const rgb: [number, number, number] = [pixel[0], pixel[1], pixel[2]];
      const { bortle, sky } = colorToBortleAndSky(rgb);
      onResult({ lat, lng, bortle, sky });
    },
  });
  return null;
}

const MapPage = () => {
  const [generalSituation, setGeneralSituation] = useState<string>("");
  const [popupInfo, setPopupInfo] = useState<{
    lat: number;
    lng: number;
    bortle: string;
    sky: string;
  } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 預加載無模糊圖片到 canvas
  useEffect(() => {
    const img = new window.Image();
    img.src = "/hk_lightpollution_noblur.png";
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);
    };
  }, []);

  useEffect(() => {
    fetch(
      "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en"
    )
      .then((res) => res.json())
      .then((data) => {
        setGeneralSituation(data.generalSituation || "");
      })
      .catch(() => setGeneralSituation(""));
  }, []);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#fff",
      }}
    >
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div
        style={{
          width: "100%",
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 1,
        }}
      >
        {/* Stargazing 資訊欄 */}
        <div
          style={{
            width: "100%",
            background: "#23272f",
            color: "#fff",
            padding: 20,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            textAlign: "center",
            margin: "0 auto",
            boxSizing: "border-box",
          }}
        >
          <h2 className="text-2xl font-bold mb-2">Hong Kong Stargazing Map</h2>
          {generalSituation && (
            <div
              style={{
                marginTop: 16,
                background: "#1a1d23",
                borderRadius: 8,
                padding: 12,
                fontSize: 15,
                color: "#ffe082",
                textAlign: "left",
              }}
            >
              <b>Weather Forecast: </b>
              <span>{generalSituation}</span>
            </div>
          )}
        </div>
        {/* 地圖視窗 */}
        <div
          style={{
            width: "100%",
            flex: 1,
            border: "1px solid #ccc",
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            position: "relative",
            background: "#222",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 0,
          }}
        >
          <MapContainer
            center={HONG_KONG_CENTER}
            zoom={DEFAULT_ZOOM}
            style={{ height: "100%", width: "100%" }}
            maxBounds={[
              [21.95, 113.5],
              [22.75, 114.69],
            ]}
            maxBoundsViscosity={1.0}
            minZoom={10}
            maxZoom={18}
            scrollWheelZoom={true}
            attributionControl={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* 疊加光污染半透明圖片 */}
            <ImageOverlay
              url="/hk_lightpollution.png"
              bounds={[
                [21.95, 113.5],
                [22.75, 114.69],
              ]}
              opacity={0.5}
              zIndex={500}
            />

            {/* 點擊地圖獲取顏色判斷 */}
            <OverlayColorClickHandler
              canvasRef={canvasRef}
              onResult={setPopupInfo}
            />

            {/* 點擊彈窗 */}
            {popupInfo && (
              <Popup
                position={[popupInfo.lat, popupInfo.lng]}
                eventHandlers={{
                  remove: () => setPopupInfo(null),
                }}
              >
                <div>
                  <b>Location</b>: {popupInfo.lat.toFixed(4)},{" "}
                  {popupInfo.lng.toFixed(4)}
                  <br />
                  <b>Sky Brightness</b>: {popupInfo.sky} mag/arcsec²
                  <br />
                  <b>Bortle Level</b>: {popupInfo.bortle}
                </div>
              </Popup>
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
