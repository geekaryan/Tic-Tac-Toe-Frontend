import { useState } from "react";
import styles from "./Game.module.css";
import Board from "./Board";
const Game = ({ channel }) => {
  const [playersJoined, setPlayerJoined] = useState(
    channel.state.watcher_count === 2
  );

  const [result, setResult] = useState({ winner: "none", state: "none" });

  channel.on("user.watching.start", (e) => {
    setPlayerJoined(e.watcher_count === 2);
  });
  if (!playersJoined) {
    return <button className={styles.btn2}>Waiting for other </button>;
  }
  return (
    <div>
      <div>
        <Board result={result} setResult={setResult} />
        {/* CHAT */}
        {/* leAVE GAME BUTTON */}
      </div>
    </div>
  );
};

export default Game;
