import { useState, useEffect } from "react";
import originalPhotos from "../data/photos_src";

{
  /*// 洗牌函數
function shuffleArray<T>(array: T[]): T[] {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}*/
}

const Home = () => {
  const photos = originalPhotos;
  const [selected, setSelected] = useState<null | {
    id: number;
    src: string;
    title: string;
    desc?: string;
  }>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Track loaded state for each photo
  const [loaded, setLoaded] = useState<boolean[]>(() =>
    Array(photos.length).fill(false)
  );

  // Reset loaded state if photo list changes
  useEffect(() => {
    setLoaded(Array(photos.length).fill(false));
  }, [photos.length]);

  // 控制全屏時 body 不可滾動
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2">
      {photos.map((photo, idx) => (
        <div
          key={photo.id}
          className={`group relative overflow-hidden shadow-lg cursor-pointer mb-2 transition-opacity duration-700 ${
            loaded[idx] ? "opacity-100" : "opacity-0"
          }`}
          style={{ breakInside: "avoid" }}
          onClick={() => setSelected(photo)}
        >
          <img
            src={photo.src}
            alt={photo.title}
            className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onLoad={() => {
              setLoaded((prev) => {
                const arr = [...prev];
                arr[idx] = true;
                return arr;
              });
            }}
            onError={() => {
              setLoaded((prev) => {
                const arr = [...prev];
                arr[idx] = true;
                return arr;
              });
            }}
            style={{ width: "100%", display: "block" }}
          />
          <div className="absolute inset-0 bg-white bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center"></div>
        </div>
      ))}

      {/* Modal 放大圖與介紹 */}
      {selected && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 transition-colors duration-300 ${
            isFullscreen ? "bg-white" : "bg-black bg-opacity-60"
          }`}
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
                className="text-gray-500 hover:text-black text-2xl px-2 pt-9"
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
                  <div className="pb-4 mx-auto px-4 max-w-full sm:max-w-lg inline-block">
                    <p className="text-justify">{selected.desc}</p>
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
