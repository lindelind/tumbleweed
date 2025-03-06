import React, { useState, useEffect } from "react";
import Tumbleweed from "./Tumbleweed";
import "../style/Game.css";
import Cursor from "./Cursor";

interface TumbleweedType {
  id: number;
  y: number;
  duration: number;
}

interface GameProps {
  playerName: string;
  onRestartGame: () => void;
}

const Game: React.FC<GameProps> = ({ playerName, onRestartGame }) => {
  const [tumbleweeds, setTumbleweeds] = useState<TumbleweedType[]>([]);
  const [score, setScore] = useState(0);
  const [missedTumbleweeds, setMissedTumbleweeds] = useState(0);
  const [highScore, setHighScore] = useState<number>(
    Number(localStorage.getItem("highScore")) || 0
  );
  const [newHighScore, setNewHighScore] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const MAX_MISSED = 5;

  const getSpawnRate = () => {
    if (score >= 40) return 350;
    if (score >= 30) return 400;
    if (score >= 20) return 500;
    if (score >= 10) return 600;
    return 800;
  };

  const getTumbleweedSpeed = () => {
    if (score >= 40) return Math.random() * 1.5 + 1.5;
    if (score >= 30) return Math.random() * 2 + 2;
    if (score >= 20) return Math.random() * 2.5 + 2.5;
    if (score >= 10) return Math.random() * 3 + 3;
    return Math.random() * 3.5 + 3.5;
  };

  const addTumbleweed = () => {
    if (gameOver) return;

    const screenHeight = window.innerHeight;
    const tumbleweedHeight = 80;

    const newY =
      Math.random() * (screenHeight / 2 - tumbleweedHeight) +
      (screenHeight / 2 - tumbleweedHeight);

    const newTumbleweed: TumbleweedType = {
      id: Date.now(),
      y: newY,
      duration: getTumbleweedSpeed(),
    };

    setTumbleweeds((prev) => [...prev, newTumbleweed]);


    setTimeout(() => {
      setTumbleweeds((prev) => {
        if (prev.find((t) => t.id === newTumbleweed.id)) {
          setMissedTumbleweeds((prevMissed) => prevMissed + 1);
        }
        return prev.filter((t) => t.id !== newTumbleweed.id);
      });
    }, newTumbleweed.duration * 1000); 
  };

  const removeTumbleweed = (id: number) => {
    if (gameOver) return;

    setTumbleweeds((prev) => prev.filter((t) => t.id !== id));
    setScore((prevScore) => prevScore + 1);
  };

  useEffect(() => {
    if (gameOver && score > highScore) {
      setNewHighScore(true);
      setHighScore(score);
      localStorage.setItem("highScore", String(score));
    }
  }, [gameOver, score, highScore]);

  useEffect(() => {
    const interval = setInterval(() => {
      addTumbleweed();
    }, getSpawnRate());

    return () => clearInterval(interval);
  }, [score, gameOver]);


  useEffect(() => {
    if (missedTumbleweeds >= MAX_MISSED) {
      setGameOver(true);
    }
  }, [missedTumbleweeds]);

  return (
    <div className="game-container">
      <Cursor />

      <div className="game-header">
        <h1>Pick the Tumbleweed</h1>
        <h2>Score: {score}</h2>
        <h2 className="high-score-text">🏆 High Score: {highScore} 🏆</h2>
        <h2>
          ❌ Missed: {missedTumbleweeds} / {MAX_MISSED}
        </h2>
      </div>

      {gameOver && (
        <div className="game-overlay">
          <div className="game-message-container">
            {newHighScore && (
              <h2 className="high-score-message">🔥 NEW HIGHSCORE! 🔥</h2>
            )}
            <h2 className="game-message lose-message">
              💀 Game Over, {playerName}! 💀
            </h2>
            <button onClick={onRestartGame} className="restart-btn">
              Restart
            </button>
          </div>
        </div>
      )}

      {!gameOver && (
        <>
          {tumbleweeds.map((tumbleweed) => (
            <Tumbleweed
              key={tumbleweed.id}
              id={tumbleweed.id}
              y={tumbleweed.y}
              duration={tumbleweed.duration}
              onClick={removeTumbleweed}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Game;
