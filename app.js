const app = document.getElementById("app");
let currentScreen = null;

const setScreen = (screen) => {
  if (currentScreen) {
    app.removeChild(currentScreen);
  }
  currentScreen = app.appendChild(screen.render());
};

export { setScreen };
