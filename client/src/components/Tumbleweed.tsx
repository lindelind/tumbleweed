import React from "react";
import "../style/Tumbleweed.css";

interface TumbleweedProps {
  id: number;
  y: number;
  duration: number;
  onClick: (id: number) => void;
}

const Tumbleweed: React.FC<TumbleweedProps> = ({
  id,
  y,
  duration,
  onClick,
}) => {
  return (
    <div
      className="tumbleweed"
      style={{
        top: `${y}px`,
        animationDuration: `${duration}s`,
      }}
      onClick={() => onClick(id)}
      onTouchStart={() => onClick(id)} 
    />
  );
};

export default Tumbleweed;
