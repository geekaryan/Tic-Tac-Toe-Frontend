import { useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import Login from "./components/Login";
import SignUp from "./components/SingUp";
import Home from "./components/Home";
import JoinGame from "./components/JoinGame";
import styles from "./App.module.css";

const App = () => {
  const [login, setLogin] = useState(false);
  const [singup, setSingup] = useState(false);
  const [home, setHome] = useState(true);
  const api_key = "d9psjbg67mf5";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);

  const logOutHanlder = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("userName");
    client.disconnectUser();
    setIsAuth(false);
  };

  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("userName"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then((user) => {
        setIsAuth(true);
        console.log(user);
      });
  }

  const showLoginHandler = () => {
    setLogin(!login);
    setHome(!home);
  };
  const signUpHandler = () => {
    setSingup(!singup);
    setHome(!home);
  };
  return (
    <div>
      {isAuth ? (
        <Chat client={client}>
          <JoinGame />
          <button onClick={logOutHanlder} className={styles.btn2}>
            Log out
          </button>
        </Chat>
      ) : (
        <>
          {home && (
            <Home showLogin={showLoginHandler} showSignUp={signUpHandler} />
          )}
          {singup && (
            <SignUp setIsAuth={setIsAuth} backSignUp={signUpHandler} />
          )}
          {login && (
            <Login setIsAuth={setIsAuth} backLogin={showLoginHandler} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
