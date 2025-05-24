import { useState, useEffect, useRef } from "react";
import originalPhotos from "../data/photos_src";

const Home = () => {
  const photos = originalPhotos;
  const [selected, setSelected] = useState<null | (typeof photos)[0]>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Refs for each photo container and img
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const fullImgRefs = useRef<(HTMLImageElement | null)[]>([]);

  // Fade-in effect states
  const [loaded, setLoaded] = useState<boolean[]>(() =>
    Array(photos.length).fill(false)
  );
  const [visibleRows, setVisibleRows] = useState(0);
  const [rowMap, setRowMap] = useState<number[][]>([]);

  // Preview loading for full image preloading
  const [previewLoaded, setPreviewLoaded] = useState<boolean[]>(() =>
    Array(photos.length).fill(false)
  );
  const [allPreviewsLoaded, setAllPreviewsLoaded] = useState(false);

  // When all previews are loaded, set flag
  useEffect(() => {
    setAllPreviewsLoaded(previewLoaded.every(Boolean));
  }, [previewLoaded]);

  // Reset loaded states on photo count change
  useEffect(() => {
    setLoaded(Array(photos.length).fill(false));
    setPreviewLoaded(Array(photos.length).fill(false));
    setVisibleRows(0);
    setRowMap([]);
    setAllPreviewsLoaded(false);
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
    const timer = setTimeout(updateRowMap, 100); // 增加延時解決 Safari 渲染問題
    window.addEventListener("resize", updateRowMap);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateRowMap);
    };
  }, [photos.length]);

  // On mount, check for cached images
  useEffect(() => {
    imgRefs.current.forEach((img, idx) => {
      if (img && img.complete && !loaded[idx]) {
        setLoaded((prev) => [
          ...prev.slice(0, idx),
          true,
          ...prev.slice(idx + 1),
        ]);
      }
      if (img && img.complete && !previewLoaded[idx]) {
        setPreviewLoaded((prev) => [
          ...prev.slice(0, idx),
          true,
          ...prev.slice(idx + 1),
        ]);
      }
    });
  }, [rowMap.length]);

  // Row loading logic
  useEffect(() => {
    if (!rowMap.length) return;
    for (let rowIdx = 0; rowIdx < rowMap.length; rowIdx++) {
      const allLoaded = rowMap[rowIdx].every((idx) => loaded[idx]);
      if (allLoaded && visibleRows === rowIdx) {
        setTimeout(() => setVisibleRows(rowIdx + 1), 60);
        break;
      }
    }
  }, [loaded, rowMap, visibleRows]);

  // Prevent scroll when fullscreen
  useEffect(() => {
    document.body.style.overflow = isFullscreen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  // Safari repaint fix
  useEffect(() => {
    if (allPreviewsLoaded) {
      document.body.offsetHeight; // Force reflow
      window.dispatchEvent(new Event("resize"));
    }
  }, [allPreviewsLoaded]);

  return (
    <div className="flex min-h-screen">
      <aside className="w-22 flex-shrink-0 bg-white" />

      <main className="flex-1 px-4 py-8">
        <div
          className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2"
          style={{
            minHeight: 800,
            display: "block", // 修正 Safari 列佈局
          }}
        >
          {photos.map((photo, idx) => {
            const rowIdx = rowMap.findIndex((row) => row.includes(idx));

            return (
              <div
                key={photo.id}
                ref={(el) => (photoRefs.current[idx] = el)}
                className={`group relative overflow-hidden shadow-lg cursor-pointer mb-2 transition-opacity duration-700 ${
                  rowIdx !== -1 && rowIdx < visibleRows
                    ? "opacity-100"
                    : "opacity-0"
                }`}
                style={{
                  breakInside: "avoid",
                  WebkitColumnBreakInside: "avoid", // Safari 專用修復
                  minHeight: "80px",
                  height: "auto",
                  contain: "layout",
                }}
                onClick={() => setSelected(photo)}
              >
                <img
                  ref={(el) => (imgRefs.current[idx] = el)}
                  src={photo.low}
                  alt={photo.title}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onLoad={() => {
                    setLoaded((prev) => updateState(prev, idx));
                    setPreviewLoaded((prev) => updateState(prev, idx));
                  }}
                  onError={() => {
                    setLoaded((prev) => updateState(prev, idx));
                    setPreviewLoaded((prev) => updateState(prev, idx));
                  }}
                  style={{
                    width: "100%",
                    display: "block",
                    height: "auto", // 明確高度設定
                  }}
                />

                {allPreviewsLoaded && (
                  <img
                    ref={(el) => (fullImgRefs.current[idx] = el)}
                    src={photo.src}
                    alt=""
                    style={{
                      display: "none",
                      width: `${photo.width}px`, // 明確尺寸
                      height: `${photo.height}px`, // 解決 Safari 佈局錯誤
                    }}
                  />
                )}
              </div>
            );
          })}

          {/* Modal 部分保持不變 */}
          {selected && (
            <div
              className={`fixed inset-0 flex items-center justify-center z-50 ${
                isFullscreen ? "bg-white" : "bg-black/60"
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
                        const idx = photos.findIndex(
                          (p) => p.id === selected.id
                        );
                        if (idx > 0) setSelected(photos[idx - 1]);
                      }}
                      disabled={
                        photos.findIndex((p) => p.id === selected.id) === 0
                      }
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
                        const idx = photos.findIndex(
                          (p) => p.id === selected.id
                        );
                        if (idx < photos.length - 1)
                          setSelected(photos[idx + 1]);
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
      </main>
    </div>
  );
};

// Helper function for state updates
const updateState = (prev: boolean[], idx: number) => {
  if (prev[idx]) return prev;
  return [...prev.slice(0, idx), true, ...prev.slice(idx + 1)];
};

export default Home;

// Note: The modal part is not completed in this snippet. You can add the modal content and logic to handle fullscreen view, close button, etc.
