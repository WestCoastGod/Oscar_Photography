import { useState, useMemo, useEffect } from "react";

// 原始照片列表
const originalPhotos = [
  {
    id: 1,
    src: "/images/photos/beijing_sky.jpg",
    title: "Beijing Sky",
    desc: "That was a peaceful afternoon in Beijing. The sun was going down, and the sky was painted with beautiful colors. That was a peaceful afternoon in Beijing. The sun was going down, and the sky was painted with beautiful colors. That was a peaceful afternoon in Beijing. The sun was going down, and the sky was painted with beautiful colors. That was a peaceful afternoon in Beijing. The sun was going down, and the sky was painted with beautiful colors.",
  },
  { id: 2, src: "/images/photos/Berlin Tower.JPG", title: "Berlin Tower" },
  {
    id: 3,
    src: "/images/photos/Berlin_Zoo_Bird.JPG",
    title: "Berlin Zoo Bird",
  },
  { id: 4, src: "/images/photos/boat.JPG", title: "Boat" },
  { id: 5, src: "/images/photos/changbaishan.jpg", title: "Changbaishan" },
  { id: 6, src: "/images/photos/crack_shadow.jpg", title: "Crack Shadow" },
  { id: 7, src: "/images/photos/cwc_star.jpg", title: "CWC Star" },
  { id: 8, src: "/images/photos/cwc_startrail.jpg", title: "CWC Startrail" },
  { id: 9, src: "/images/photos/drink.JPG", title: "Drink" },
  {
    id: 10,
    src: "/images/photos/Electrical_Scooter.jpg",
    title: "Electrical Scooter",
  },
  { id: 11, src: "/images/photos/Firework.jpg", title: "Firework" },
  {
    id: 12,
    src: "/images/photos/forbidden_city_wall.jpg",
    title: "Forbidden City Wall",
  },
  { id: 13, src: "/images/photos/fountain.jpg", title: "Fountain" },
  { id: 14, src: "/images/photos/geneve_roof.jpg", title: "Geneva Roof" },
  { id: 15, src: "/images/photos/Genève.jpg", title: "Geneva" },
  { id: 16, src: "/images/photos/genève_church.jpg", title: "Geneva Church" },
  {
    id: 17,
    src: "/images/photos/genève_seashore.jpg",
    title: "Geneva Seashore",
  },
  { id: 18, src: "/images/photos/genève_wheel.jpg", title: "Geneva Wheel" },
  { id: 19, src: "/images/photos/Heavy Rain.jpg", title: "Heavy Rain" },
  { id: 20, src: "/images/photos/Island.jpg", title: "Island" },
  {
    id: 21,
    src: "/images/photos/Kasprowy Wierch.jpg",
    title: "Kasprowy Wierch",
  },
  { id: 22, src: "/images/photos/laundry.jpg", title: "Laundry" },
  { id: 23, src: "/images/photos/le tour eiffel.jpg", title: "Le Tour Eiffel" },
  { id: 24, src: "/images/photos/leadtofly_sea.JPG", title: "Lead to Fly Sea" },
  { id: 25, src: "/images/photos/lyon_bird.jpg", title: "Lyon Bird" },
  {
    id: 26,
    src: "/images/photos/lyon_early_evening.jpg",
    title: "Lyon Early Evening",
  },
  { id: 27, src: "/images/photos/lzh窗景.jpg", title: "LZH Window View" },
  { id: 28, src: "/images/photos/monkey.jpg", title: "Monkey" },
  { id: 29, src: "/images/photos/MOON.jpg", title: "Moon" },
  { id: 30, src: "/images/photos/olympique.jpg", title: "Olympique" },
  { id: 31, src: "/images/photos/paddle.jpg", title: "Paddle" },
  { id: 32, src: "/images/photos/plane_sunset.jpg", title: "Plane Sunset" },
  { id: 33, src: "/images/photos/pontoon.jpg", title: "Pontoon" },
  { id: 34, src: "/images/photos/silence.jpg", title: "Silence" },
  { id: 35, src: "/images/photos/Smile_Baloons.jpg", title: "Smile Balloons" },
  { id: 36, src: "/images/photos/sunset.jpg", title: "Sunset" },
  {
    id: 37,
    src: "/images/photos/temple of heaven.jpg",
    title: "Temple of Heaven",
  },
  { id: 38, src: "/images/photos/tmt_stars.jpg", title: "TMT Stars" },
  { id: 39, src: "/images/photos/top.jpg", title: "Top" },
  { id: 40, src: "/images/photos/Usman.jpg", title: "Usman" },
  { id: 41, src: "/images/photos/八達嶺.jpg", title: "Badaling" },
  {
    id: 42,
    src: "/images/photos/吐露港望大埔.jpg",
    title: "Tolo Harbour View",
  },
  { id: 43, src: "/images/photos/外灘.jpg", title: "The Bund" },
  {
    id: 44,
    src: "/images/photos/大圖路燈下_暖色.jpg",
    title: "Streetlight Warm",
  },
  {
    id: 45,
    src: "/images/photos/天壇牆壁.jpg",
    title: "Temple of Heaven Wall",
  },
  { id: 46, src: "/images/photos/天池.jpg", title: "Heaven Lake" },
  {
    id: 47,
    src: "/images/photos/太和殿.jpg",
    title: "Hall of Supreme Harmony",
  },
  {
    id: 48,
    src: "/images/photos/巷子裡的光-狹縫裡的人.jpg",
    title: "Light in Alley - Him",
  },
  { id: 49, src: "/images/photos/我的眼睛.jpg", title: "My Eyes" },
  { id: 50, src: "/images/photos/故宮貓.jpg", title: "Forbidden City Cat" },
  { id: 51, src: "/images/photos/敬文旁.jpg", title: "Beside Jingwen" },
  { id: 52, src: "/images/photos/昆明湖.jpg", title: "Kunming Lake" },
  { id: 53, src: "/images/photos/景山北.jpg", title: "Jingshan North" },
  { id: 54, src: "/images/photos/月亮.jpg", title: "Moon" },
  {
    id: 55,
    src: "/images/photos/未圓湖的鳥.jpg",
    title: "Bird at Weiyuan Lake",
  },
  {
    id: 56,
    src: "/images/photos/東方明珠塔.jpg",
    title: "Oriental Pearl Tower",
  },
  { id: 57, src: "/images/photos/樓上有人家.jpg", title: "Upstairs Residence" },
  {
    id: 58,
    src: "/images/photos/環回北路夜景.jpg",
    title: "Huanhui North Road Night",
  },
  { id: 59, src: "/images/photos/神武門.jpg", title: "Shenwu Gate" },
  { id: 60, src: "/images/photos/紫荆城.jpg", title: "Forbidden City" },
  { id: 61, src: "/images/photos/脊獸.jpg", title: "Roof Beast" },
  { id: 62, src: "/images/photos/萬春亭.jpg", title: "Wanchun Pavilion" },
  { id: 63, src: "/images/photos/角樓.jpg", title: "Corner Tower" },
  { id: 64, src: "/images/photos/譚仔.jpg", title: "Tam Jai" },
  { id: 65, src: "/images/photos/門縫.jpg", title: "Door Gap" },
  { id: 66, src: "/images/photos/静安寺.JPG", title: "Jing'an Temple" },
  {
    id: 67,
    src: "/images/photos/頤和園日落.jpg",
    title: "Summer Palace Sunset",
  },
  { id: 68, src: "/images/photos/鴨子與落日.jpg", title: "Duck and Sunset" },
  { id: 69, src: "/images/photos/鸽子.jpg", title: "Pigeon" },
  { id: 70, src: "/images/photos/鼓樓大街.jpg", title: "Drum Tower Street" },
];

// 洗牌函數
function shuffleArray<T>(array: T[]): T[] {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const Home = () => {
  const photos = useMemo(() => shuffleArray(originalPhotos), []);
  const [selected, setSelected] = useState<null | {
    id: number;
    src: string;
    title: string;
    desc?: string;
  }>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 控制全屏時 body 不可滾動
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // 清理副作用
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  return (
    <div className="container max-w-[90vw] mx-auto py-8">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="group relative overflow-hidden shadow-lg cursor-pointer mb-2"
            onClick={() => setSelected(photo)}
          >
            <img
              src={photo.src}
              alt={photo.title}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-white bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center"></div>
          </div>
        ))}
      </div>

      {/* Modal 放大圖與介紹 */}
      {selected && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 transition-colors duration-300 ${
            isFullscreen ? "bg-white" : "bg-black bg-opacity-60"
          }`}
          style={{}}
        >
          <div
            className="relative flex flex-col items-center justify-center shadow-lg"
            style={{
              width: isFullscreen ? "100vw" : "1100px",
              maxWidth: "95vw",
              height: isFullscreen ? "100vh" : "80vh",
              maxHeight: "95vh",
              background: "white",
              borderRadius: isFullscreen ? 0 : "0.75rem",
              overflow: "hidden",
              transition: "all 0.3s",
              boxShadow: isFullscreen ? "none" : undefined,
              padding: isFullscreen ? "40px 40px" : "32px 32px",
              paddingTop: isFullscreen ? "0px" : undefined,
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 按鈕區塊，跟隨內容流動 */}
            <div className="w-full flex flex-row justify-between items-center mb-2">
              <button
                className="text-gray-500 hover:text-black text-2xl px-2 pt-10"
                onClick={() => setIsFullscreen((f) => !f)}
                aria-label="Fullscreen"
                title={isFullscreen ? "Exit Full Screen" : "Full Screen"}
              >
                {isFullscreen ? (
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 3H5a2 2 0 0 0-2 2v4m0 6v4a2 2 0 0 0 2 2h4m6-18h4a2 2 0 0 1 2 2v4m0 6v4a2 2 0 0 1-2 2h-4" />
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h6M4 4v6M20 4h-6M20 4v6M4 20h6M4 20v-6M20 20h-6M20 20v-6" />
                  </svg>
                )}
              </button>
              <button
                className="text-gray-500 hover:text-black text-3xl px-2 pt-8"
                onClick={() => {
                  setSelected(null);
                  setIsFullscreen(false);
                }}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            {/* 圖片與左右按鈕區塊，flex-1 垂直置中 */}
            <div className="flex-1 flex flex-col justify-center items-center w-full">
              <div
                className={`flex flex-row items-center justify-center w-full ${
                  isFullscreen ? "" : ""
                }`}
                style={isFullscreen ? { height: "100%" } : {}}
              >
                {/* 上一張按鈕 */}
                <button
                  className="p-3 text-3xl flex-shrink-0 text-gray-500 hover:text-black"
                  style={{ minWidth: 48 }}
                  onClick={() => {
                    const idx = photos.findIndex((p) => p.id === selected.id);
                    if (idx > 0) setSelected(photos[idx - 1]);
                  }}
                  disabled={photos.findIndex((p) => p.id === selected.id) === 0}
                  aria-label="Previous"
                >
                  ‹
                </button>
                {/* 圖片 */}
                <img
                  src={selected.src}
                  alt={selected.title}
                  className="max-h-full max-w-full mx-4 rounded object-contain"
                  style={{
                    display: "block",
                    margin: "0 auto",
                    background: "#f8f8f8",
                    width: "auto",
                    height: "auto",
                    maxHeight: isFullscreen
                      ? "calc(100vh - 220px)"
                      : "calc(80vh - 220px)",
                    maxWidth: "100%",
                  }}
                />
                {/* 下一張按鈕 */}
                <button
                  className="p-3 text-3xl flex-shrink-0 text-gray-500 hover:text-black"
                  style={{ minWidth: 48 }}
                  onClick={() => {
                    const idx = photos.findIndex((p) => p.id === selected.id);
                    if (idx < photos.length - 1) setSelected(photos[idx + 1]);
                  }}
                  disabled={
                    photos.findIndex((p) => p.id === selected.id) ===
                    photos.length - 1
                  }
                  aria-label="Next"
                >
                  ›
                </button>
              </div>
              {/* 標題與描述（非全屏時顯示） */}
              {!isFullscreen && (
                <div className="w-full flex flex-col items-center mt-4">
                  <h2 className="text-xl font-bold mb-2 px-6 w-full text-center">
                    {selected.title}
                  </h2>
                  <div
                    className="overflow-y-auto px-6 pb-4 w-full text-left"
                    style={{
                      maxHeight: "100px",
                    }}
                  >
                    <p>{selected.desc}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
