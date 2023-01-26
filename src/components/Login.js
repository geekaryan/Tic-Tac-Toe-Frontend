import { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import styles from "./Login.module.css";
import back from "./../assets/back.png";

const Login = ({ setIsAuth, backLogin }) => {
  const cookies = new Cookies();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginHandler = () => {
    Axios.post("http://localhost:3001/login", {
      userName,
      password,
    })
      .then((res) => {
        const { firstName, lastName, userName, token, userId } = res.data;
        cookies.set("token", token);
        cookies.set("userId", userId);
        cookies.set("userName", userName);
        cookies.set("firstName", firstName);
        cookies.set("lastName", lastName);
        setIsAuth(true);
      })
      .catch((err) => {
        setError("not working buddyy!!");
      });
  };

  const errorStyle = error ? styles.err : "";

  const top = error ? styles.nottop : styles.top;

  const errorDiv = <div className={errorStyle}>{error}</div>;
  return (
    <div className={styles.container}>
      <div onClick={backLogin} className={styles.img}>
        <img src={back} alt="back" />
      </div>
      <div>
        <div className={styles.login}>
          <label>Login</label>
        </div>
        <div className={styles.text}>
          <label>Please enter your details</label>
        </div>
      </div>

      <div className={styles.flex}>
        <div className={`${styles.fieldText} ${styles.usr}`}>
          <label>UserName</label>
        </div>
        <div>
          <input
            type="email"
            placeholder="Type your username here.."
            value={userName}
            className={styles.input}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.flex}>
        <div className={`${styles.fieldText} ${styles.pass}`}>
          <label>Password</label>
        </div>
        <div>
          <input
            type="password"
            placeholder="Type your password here..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            s
          />
        </div>
      </div>
      <div className={top}>
        <div>{errorDiv}</div>
        <div>
          <button onClick={loginHandler} className={styles.btn1}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
