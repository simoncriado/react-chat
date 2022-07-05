import React, { useState, useEffect, useRef } from "react";

// Components
import ChatHeader from "../components/ChatHeader";
import Message from "../components/Message";

import { AddCircle, CreditCard, Gif, EmojiEmotions } from "@material-ui/icons";
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
  anchor.scrollIntoView({ behavior: "smooth" });

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
    anchor.current.scrollIntoView({ behavior: "smooth" });
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
    getMessagesList();
  }, [activChannel]);

  return (
    <div className="chat">
      <ChatHeader channelName={activChannel} />

      <div className="chat__messages">
        {messagesList
          ? messagesList.map((message) => {
              return <Message firebaseMessage={message} />;
            })
          : null}
        <div ref={anchor} style={{ marginBottom: "75px" }}></div>
      </div>

      <div className="chat__input">
        <AddCircle fontSize="large" />
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
          <CreditCard fontSize="large" />
          <Gif fontSize="large" />
          <EmojiEmotions fontSize="large"></EmojiEmotions>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default ChatScreen;
