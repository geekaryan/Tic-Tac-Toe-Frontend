import { useState, useEffect } from "react";
import { useChannelStateContext, useChatContext } from "stream-chat-react";
import { Patterns } from "./../WinningPatterns";
import styles from "./Board.module.css";
import Square from "./Square";
const Board = ({ result, setResult }) => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("X");
  const [turn, setTurn] = useState("X");

  const { channel } = useChannelStateContext();
  const { client } = useChatContext();

  useEffect(() => {
    checkWin();
    checkIfTie();
  }, [board]);

  const chooseSquare = async (square) => {
    if (turn === player && board[square] === "") {
      setTurn(player === "X" ? "O" : "X");

      await channel.sendEvent({
        type: "game-move",
        data: { square, player },
      });
      setBoard(
        board.map((val, idx) => {
          if (idx === square && val === "") {
            return player;
          }
          return val;
        })
      );
    }
  };

  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer == "") return;
      let foundWinningPattern = true;
      currPattern.forEach((idx) => {
        if (board[idx] != firstPlayer) {
          foundWinningPattern = false;
        }
      });

      if (foundWinningPattern) {
        setResult({ winner: board[currPattern[0]], state: "won" });
      }
    });
  };

  const checkIfTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square === "") {
        filled = false;
      }
    });

    if (filled) {
      setResult({ winner: "none", state: "tie" });
    }
  };

  channel.on((event) => {
    if (event.type === "game-move" && event.user.id !== client.userID) {
      const currentPlayer = event.data.player === "X" ? "O" : "X";
      setPlayer(currentPlayer);
      setTurn(currentPlayer);

      setBoard(
        board.map((val, idx) => {
          if (idx === event.data.square && val === "") {
            return event.data.player;
          }
          return val;
        })
      );
    }
  });

  //   if (result.state === "none") {
  //     return <p>Hi</p>;
  //   }
  return (
    <div>
      <div className={styles.bgText}>
        <p>Enjoy Gaming</p>
      </div>
      <div className={styles.board}>
        <div className={styles.row}>
          <div className={styles.box1}>
            <Square
              val={board[0]}
              chooseSquare={() => {
                chooseSquare(0);
              }}
            />
          </div>
          <div className={styles.box1}>
            <Square
              val={board[1]}
              chooseSquare={() => {
                chooseSquare(1);
              }}
            />
          </div>
          <div className={styles.box2}>
            <Square
              val={board[2]}
              chooseSquare={() => {
                chooseSquare(2);
              }}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.box1}>
            <Square
              val={board[3]}
              chooseSquare={() => {
                chooseSquare(3);
              }}
            />
          </div>
          <div className={styles.box1}>
            <Square
              val={board[4]}
              chooseSquare={() => {
                chooseSquare(4);
              }}
            />
          </div>
          <div className={styles.box2}>
            <Square
              val={board[5]}
              chooseSquare={() => {
                chooseSquare(5);
              }}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.box1btm}>
            <Square
              val={board[6]}
              chooseSquare={() => {
                chooseSquare(6);
              }}
            />
          </div>
          <div className={styles.box1btm}>
            <Square
              val={board[7]}
              chooseSquare={() => {
                chooseSquare(7);
              }}
            />
          </div>
          <div className={styles.box2btm}>
            <Square
              val={board[8]}
              chooseSquare={() => {
                chooseSquare(8);
              }}
            />
          </div>
        </div>
      </div>
      <div>
        {result.state === "none" ? (
          <p></p>
        ) : (
          <div className={styles.div}>
            <p>
              {" "}
              Game status: {result.state} by {result.winner}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;
