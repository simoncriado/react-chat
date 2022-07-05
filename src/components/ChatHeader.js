import React from "react";

import {
  Notifications,
  Room,
  PeopleAlt,
  Search,
  Send,
  Help,
} from "@material-ui/icons";

function ChatHeader({ channelName }) {
  return (
    <div className="chatHeader">
      <div className="chatHeader__left">
        <h3>
          <span className="chatHeader__hash">#</span>
          {channelName}
        </h3>
      </div>
      <div className="chatHeader__right">
        <Notifications />
        <Room />
        <PeopleAlt />
        <div className="chatHeader__search">
          <input type="text" placeholder="Search" />
          <Search />
        </div>

        <Send />
        <Help />
      </div>
    </div>
  );
}

export default ChatHeader;
