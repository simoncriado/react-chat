import React, { useState } from "react";

// Pages
import Login from "./pages/Login";
import Sidebar from "./pages/Sidebar";
import ChatScreen from "./pages/ChatScreen";

// We import the app from firebase and the user data
import firebaseApp from "./firebase/credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(firebaseApp);

function App() {
  const [globalUser, setGlobalUser] = useState(null);
  const [activChannel, setActivChannel] = useState(null);

  onAuthStateChanged(auth, (firebaseUser) => {
    // Check if login or logout
    if (firebaseUser) {
      setGlobalUser(firebaseUser);
    } else {
      setGlobalUser(null);
    }
  });

  return (
    <div className="app">
      {globalUser ? (
        <>
          {" "}
          <Sidebar globalUser={globalUser} setActivChannel={setActivChannel} />
          <ChatScreen activChannel={activChannel} user={globalUser} />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
