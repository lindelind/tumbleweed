import React, { useState } from "react";
import StartScreen from "./components/StartScreen";
import Game from "./components/Game"; 
import "./App.css";

const App: React.FC = () => {
  const [playerName, setPlayerName] = useState<string | null>(null);
  const [gameKey, setGameKey] = useState(0);

  
  const restartGame = () => {
    setGameKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="app-container">
      {playerName ? (
        <Game
          key={gameKey}
          playerName={playerName}
          onRestartGame={restartGame}
        />
      ) : (
        <StartScreen onStartGame={setPlayerName} />
      )}
    </div>
  );
};

export default App;
