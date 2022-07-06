import React from "react";

import { Search } from "@material-ui/icons";

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
        <div className="chatHeader__search">
          <input type="text" placeholder="Search" />
          <Search />
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
