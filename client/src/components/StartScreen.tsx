import React, { useState } from "react";
import "../style/StartScreen.css";

interface StartScreenProps {
  onStartGame: (playerName: string) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  const [playerName, setPlayerName] = useState("");

  return (
    <div className="start-screen">
      <h1>Pick the Tumbleweed</h1>
      <input
        type="text"
        placeholder="Enter your name..."
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <button onClick={() => onStartGame(playerName)} disabled={!playerName}>
        Start Game
      </button>
    </div>
  );
};

export default StartScreen;
