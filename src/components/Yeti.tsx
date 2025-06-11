import React, { useEffect, useRef } from "react";
import "./Yeti.css"; // We'll create this CSS file next

const InteractiveEyes = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const viewportX = e.clientX / window.innerWidth;
      const viewportY = e.clientY / window.innerHeight;

      wrapper.style.setProperty("--mouse-progress-x", viewportX.toString());
      wrapper.style.setProperty("--mouse-progress-y", viewportY.toString());
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="interactive-eyes-wrapper" ref={wrapperRef}>
      <img src="/images/cat.svg" alt="Cat" className="cat-svg" />
      <div className="eyes-container">
        <div className="eye">
          {/* Pupils and highlights are created via CSS pseudo-elements */}
        </div>
        <div className="eye">
          {/* Pupils and highlights are created via CSS pseudo-elements */}
        </div>
      </div>
    </div>
  );
};

export default InteractiveEyes;
