import { useState, useEffect, useRef } from "react";
import originalPhotos from "../data/photos_src";

const Home = () => {
  const photos = originalPhotos;
  const [selected, setSelected] = useState<null | (typeof photos)[0]>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Refs for each photo container and img
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  // Track loaded state for each photo
  const [loaded, setLoaded] = useState<boolean[]>(() =>
    Array(photos.length).fill(false)
  );
  // Track which "visual rows" are visible
  const [visibleRows, setVisibleRows] = useState(0);
  // Store the offsetTop for each photo
  const [rowMap, setRowMap] = useState<number[][]>([]);

  // Reset loaded and rowMap on photo count change
  useEffect(() => {
    setLoaded(Array(photos.length).fill(false));
    setVisibleRows(0);
    setRowMap([]);
  }, [photos.length]);

  // After all refs are set and window resized, group photos by offsetTop
  useEffect(() => {
    function updateRowMap() {
      const tops: { [key: number]: number[] } = {};
      photoRefs.current.forEach((ref, idx) => {
        if (ref) {
          const top = ref.offsetTop;
          if (!tops[top]) tops[top] = [];
          tops[top].push(idx);
        }
      });
      // Sort by top position
      const sortedRows = Object.entries(tops)
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .map(([, arr]) => arr);
      setRowMap(sortedRows);
    }
    // Delay to ensure layout is ready
    const timer = setTimeout(updateRowMap, 30);
    window.addEventListener("resize", updateRowMap);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateRowMap);
    };
  }, [photos.length]);

  // On mount, check for cached images and mark as loaded if complete
  useEffect(() => {
    imgRefs.current.forEach((img, idx) => {
      if (img && img.complete && !loaded[idx]) {
        setLoaded((prev) => {
          const arr = [...prev];
          arr[idx] = true;
          return arr;
        });
      }
    });
    // eslint-disable-next-line
  }, [rowMap.length]);

  // When a row's all images are loaded, show that row and prepare for next
  useEffect(() => {
    if (!rowMap.length) return;
    for (let rowIdx = 0; rowIdx < rowMap.length; rowIdx++) {
      const allLoaded = rowMap[rowIdx].every((idx) => loaded[idx]);
      if (allLoaded && visibleRows === rowIdx) {
        setTimeout(() => setVisibleRows(rowIdx + 1), 60); // fade in next row
        break;
      }
    }
  }, [loaded, rowMap, visibleRows]);

  // Prevent scroll when fullscreen
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
    <div
      className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2"
      style={{ minHeight: 800 }} // Helps Safari layout bug
    >
      {photos.map((photo, idx) => {
        // Find which visual row this photo belongs to
        let rowIdx = -1;
        for (let i = 0; i < rowMap.length; i++) {
          if (rowMap[i].includes(idx)) {
            rowIdx = i;
            break;
          }
        }
        return (
          <div
            key={photo.id}
            ref={(el) => {
              photoRefs.current[idx] = el;
            }}
            className={`group relative overflow-hidden shadow-lg cursor-pointer mb-2 transition-opacity duration-700 ${
              rowIdx !== -1 && rowIdx < visibleRows
                ? "opacity-100"
                : "opacity-0"
            }`}
            style={{
              breakInside: "avoid",
              willChange: "opacity, transform",
              contain: "layout",
            }}
            onClick={() => setSelected(photo)}
          >
            <img
              ref={(el) => {
                imgRefs.current[idx] = el;
              }}
              src={photo.low} // Use low quality image for preview
              alt={photo.title}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              onLoad={() => {
                setLoaded((prev) => {
                  if (prev[idx]) return prev;
                  const arr = [...prev];
                  arr[idx] = true;
                  return arr;
                });
              }}
              onError={() => {
                setLoaded((prev) => {
                  if (prev[idx]) return prev;
                  const arr = [...prev];
                  arr[idx] = true;
                  return arr;
                });
              }}
              style={{ width: "100%", display: "block" }}
            />
            <div className="absolute inset-0 bg-white bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center"></div>
          </div>
        );
      })}

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
