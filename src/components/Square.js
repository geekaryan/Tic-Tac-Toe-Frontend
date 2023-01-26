import styles from "./Square.module.css";
const Square = ({ chooseSquare, val }) => {
  return (
    <div
      className={styles.square}
      onClick={chooseSquare}
      style={{ color: "black" }}
    >
      {val}
    </div>
  );
};

export default Square;
