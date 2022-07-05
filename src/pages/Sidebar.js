import React, { useState, useEffect } from "react";

// Components
import SidebarChannel from "../components/SidebarChannel";

import { Avatar } from "@material-ui/core";
import { ExpandMore, Add } from "@material-ui/icons";
import LogoutIcon from "@mui/icons-material/Logout";
import { red } from "@mui/material/colors";

import firebaseApp from "../firebase/credenciales";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

function Sidebar({ globalUser, setActivChannel }) {
  const [channelsList, setChannelsList] = useState([]);

  async function getChannels() {
    const channelsArr = [];
    const collectionRef = collection(firestore, "channels");
    const encryptedChannels = await getDocs(collectionRef);
    encryptedChannels.forEach((encryptedChannel) => {
      channelsArr.push(encryptedChannel.data());
    });
    setChannelsList(channelsArr);
  }

  function addChannel() {
    const channelName = prompt("What is the channel´s name?");
    if (channelName) {
      const docuRef = doc(firestore, `channels/${channelName}`);
      setDoc(docuRef, {
        id: new Date().getTime(),
        name: channelName,
      });

      getChannels();
    }
  }

  useEffect(() => {
    getChannels();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>Simon´s Server</h3>
        <ExpandMore />
      </div>

      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMore />
            <h4>Text Channels</h4>
          </div>

          <Add className="sidebar__addChannel" onClick={addChannel} />
        </div>

        <div className="sidebar__channelsList">
          {channelsList
            ? channelsList.map((channel) => {
                return (
                  <div onClick={() => setActivChannel(channel.name)}>
                    <SidebarChannel name={channel.name} key={channel.name} />
                  </div>
                );
              })
            : null}
        </div>
      </div>

      <div className="sidebar__profile">
        <Avatar src={globalUser.photoURL} />
        <div className="sidebar__profileInfo">
          <h3>{globalUser.displayName}</h3>
          <p>{globalUser.uid.substring(0, 4)}</p>
        </div>
        <div className="sidebar__profileIcons">
          <LogoutIcon sx={{ color: red[900] }} onClick={() => signOut(auth)} />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
