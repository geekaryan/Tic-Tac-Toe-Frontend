import { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import back from "./../assets/back.png";
import styles from "./SingUp.module.css";

const SignUp = ({ setIsAuth, backSignUp }) => {
  const cookies = new Cookies();
  const [user, SetUser] = useState(null);
  const [congrats, setCongrats] = useState("");

  const signUpHandler = async () => {
    Axios.post("https://tictactoesudoapts-api.onrender.com/singup", user).then(
      (res) => {
        const { token, userId, firstName, lastName, userName, hashedPassword } =
          res.data;

        cookies.set("token", token);
        cookies.set("userId", userId);
        cookies.set("firstName", firstName);
        cookies.set("lastName", lastName);
        cookies.set("userName", userName);
        cookies.set("hashedPassword", hashedPassword);
        setIsAuth(true);
        setCongrats("yes account is created");
      }
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.img} onClick={backSignUp}>
        <img src={back} alt="back" />
      </div>
      <div className={styles.text}>
        <span>Create account</span>
      </div>
      <div className={styles.subtext}>
        <span>Let's get to know you better!</span>
      </div>
      <div className={styles.fieldtop}>
        <div className={styles.fieldText}>
          <label>First name</label>
        </div>
        <div>
          <input
            type="text"
            placeholder="First name"
            onChange={(e) => {
              SetUser({ ...user, firstName: e.target.value });
            }}
            className={styles.input}
          />
        </div>
      </div>
      <div className={styles.fieldtop}>
        <div className={styles.fieldText}>
          <label>Last Name</label>
        </div>
        <div>
          <input
            type="text"
            placeholder="Last name"
            onChange={(e) => {
              SetUser({ ...user, lastName: e.target.value });
            }}
            className={styles.input}
          />
        </div>
      </div>
      <div className={styles.fieldtop}>
        <div className={styles.fieldText}>
          <label>UserName</label>
        </div>

        <div>
          <input
            type="text"
            placeholder="username"
            onChange={(e) => {
              SetUser({ ...user, userName: e.target.value });
            }}
            className={styles.input}
          />
        </div>
      </div>
      <div className={styles.fieldtop}>
        <div className={styles.fieldText}>
          <label>Password</label>
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              SetUser({ ...user, password: e.target.value });
            }}
            className={styles.input}
          />
        </div>
      </div>
      {congrats}
      <div>
        <button onClick={signUpHandler} className={styles.btn2}>
          Register
        </button>
      </div>
    </div>
  );
};

export default SignUp;
