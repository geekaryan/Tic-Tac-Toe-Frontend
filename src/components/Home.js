import styles from "./Home.module.css";

const Home = (props) => {
  return (
    <div>
      <div className={styles.text}>
        <p>async</p>
      </div>
      <div className={styles.subtext}>
        <p>tic tac toe</p>
      </div>
      <div className={styles.flex}>
        <button onClick={props.showLogin} className={styles.btn1}>
          Login
        </button>
        <button onClick={props.showSignUp} className={styles.btn2}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Home;
