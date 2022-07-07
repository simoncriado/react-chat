import React from "react";

import { Avatar } from "@material-ui/core";

function Message({ firebaseMessage, user }) {
  if (firebaseMessage.user === user.displayName) {
    return (
      <div className="ownMessage">
        <div className="ownMessage__info">
          <p>{firebaseMessage.message}</p>
          <span className="message__timestamp">
            {new Date(firebaseMessage.id).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="otherMessage">
        <Avatar src={firebaseMessage.photo} />
        <div className="otherMessage__info">
          <h4>{firebaseMessage.user}</h4>
          <p>{firebaseMessage.message}</p>
          <span className="message__timestamp">
            {new Date(firebaseMessage.id).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    );
  }
}

export default Message;
