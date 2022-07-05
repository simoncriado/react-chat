// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";

// Añade aquí tus credenciales
const firebaseConfig = {
  apiKey: "AIzaSyDYOXLmN_IyH86IIBWsMkwW7mgZTXzeanM",
  authDomain: "react-discord-39247.firebaseapp.com",
  projectId: "react-discord-39247",
  storageBucket: "react-discord-39247.appspot.com",
  messagingSenderId: "314183702834",
  appId: "1:314183702834:web:4ba3e01d095b17a49bdf2b",
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;
