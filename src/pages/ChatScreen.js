import React, { useState, useEffect, useRef } from "react";

// Components
import ChatHeader from "../components/ChatHeader";
import Message from "../components/Message";

import { Send } from "@material-ui/icons";
import firebaseApp from "../firebase/credenciales";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  collection,
} from "firebase/firestore";
const firestore = getFirestore(firebaseApp);

function ChatScreen({ activChannel, user }) {
  const [inputMessage, setInputMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);

  const anchor = useRef();

  function contentFilter(originalText) {
    const insults = [
      "crap",
      "damn",
      "asshole",
      "bitch",
      "bullshit",
      "shit",
      "son of a bitch",
      "bastard",
      "cock",
      "dick",
      "dickhead",
      "pussy",
      "fuck",
      "dumb",
    ];

    const array = originalText.split(" ");
    array.forEach((word, index) => {
      if (insults.includes(word)) {
        array[index] = "****";
      }
    });

    return array.join(" ");
  }

  function sendMessage(e) {
    e.preventDefault();
    const docuRef = doc(
      firestore,
      `channels/${activChannel}/messages/${new Date().getTime()}`
    );

    const filteredMessage = contentFilter(inputMessage);

    if (filteredMessage !== "") {
      setDoc(docuRef, {
        photo: user.photoURL,
        user: user.displayName,
        message: filteredMessage,
        id: new Date().getTime(),
      });
    }

    setInputMessage("");

    getMessagesList();
  }

  async function getMessagesList() {
    const messagesArr = [];

    const collectionRef = collection(
      firestore,
      `channels/${activChannel}/messages`
    );
    const encryptedMessages = await getDocs(collectionRef);
    encryptedMessages.forEach((message) => {
      messagesArr.push(message.data());
    });

    setMessagesList([...messagesArr]);
  }
  useEffect(() => {
    anchor.current.scrollIntoView(false);
  }, [messagesList]);
  useEffect(() => {
    getMessagesList();
  }, [activChannel]);

  return (
    <div className="chat">
      <ChatHeader channelName={activChannel} />

      <div className="chat__messages">
        {messagesList
          ? messagesList.map((message) => {
              return (
                <Message
                  firebaseMessage={message}
                  key={message.id}
                  user={user}
                />
              );
            })
          : null}
        <div ref={anchor}></div>
      </div>

      <div className="chat__input">
        <form onSubmit={sendMessage}>
          <input
            type="text"
            disabled={activChannel ? false : true}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={`Send message to # ${activChannel || ""}`}
          />
          <button
            disabled={activChannel ? false : true}
            className="chat__inputButton"
            type="submit"
          >
            Send message
          </button>
        </form>

        <div className="chat__inputIcons">
          <Send onClick={sendMessage} />
        </div>
      </div>
    </div>
  );
}

export default ChatScreen;
