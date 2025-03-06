import React, { useState, useEffect } from "react";
import "../style/NetCursor.css";

const Cursor: React.FC = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const updateTouchPosition = (e: TouchEvent) => {
      setCursorPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    };

    document.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("touchmove", updateTouchPosition, {
      passive: false,
    });

    return () => {
      document.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("touchmove", updateTouchPosition);
    };
  }, []);

  return (
    <div
      className="pitchfork-cursor"
      style={{
        left: `${cursorPosition.x}px`,
        top: `${cursorPosition.y}px`,
      }}
    />
  );
};

export default Cursor;
