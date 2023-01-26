import { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import Game from "./Game";
import styles from "./JoinGame.module.css";

const JoinGame = () => {
  const [rivalUsername, setRivalUsername] = useState("");
  const { client } = useChatContext();
  const [channel, setChannel] = useState(null);

  const createChannel = async () => {
    const response = await client.queryUsers({ name: { $eq: rivalUsername } });

    if (response.users.length === 0) {
      alert("User not found");
      return;
    }
    const newChannel = await client.channel("messaging", {
      members: [client.userID, response.users[0].id],
    });

    await newChannel.watch();
    setChannel(newChannel);
  };
  return (
    <>
      {channel ? (
        <Channel channel={channel}>
          <Game channel={channel} />
        </Channel>
      ) : (
        <div className={styles.container}>
          <div className={styles.text}>
            <h4>Start a new game</h4>
          </div>
          <div className={styles.subtext}>
            <span>Whom do you want to play with?</span>
          </div>
          <div>
            <div className={styles.user}>
              <span>UserName</span>
            </div>
            <div>
              <input
                type="text"
                placeholder="uesrname of rival"
                onChange={(e) => setRivalUsername(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>
          <div>
            <button onClick={createChannel} className={styles.btn2}>
              Join Game
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default JoinGame;
