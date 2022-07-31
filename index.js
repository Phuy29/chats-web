import { Login } from "./components/Login.js";
import { Chat } from "./components/Chat.js";
import { setScreen } from "./app.js";

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const chat = new Chat();
    setScreen(chat);
  } else {
    const login = new Login();
    setScreen(login);
  }
});
