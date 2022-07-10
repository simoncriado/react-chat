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

// Segundo proyecto en firebase para testear
// const firebaseConfig = {
//   apiKey: "AIzaSyC8vZ-YnGaYD4fKQM4pHS-yOy5yy31c_K8",
//   authDomain: "react-chat-test-cbe8c.firebaseapp.com",
//   projectId: "react-chat-test-cbe8c",
//   storageBucket: "react-chat-test-cbe8c.appspot.com",
//   messagingSenderId: "184101235626",
//   appId: "1:184101235626:web:820e5462948f43334319d3",
// };

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;
