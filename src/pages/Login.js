import React from "react";
import { Button } from "@material-ui/core";

import firebaseApp from "../firebase/credenciales";
import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
const auth = getAuth(firebaseApp);
const gProvider = new GoogleAuthProvider();

function Login() {
  function logInWithGoogle() {
    signInWithRedirect(auth, gProvider);
  }

  return (
    <div className="login">
      <div className="login__logo">
        <img src="https://picsum.photos/420" alt="" />
      </div>
      <Button onClick={logInWithGoogle}>Login with Google</Button>
    </div>
  );
}

export default Login;
