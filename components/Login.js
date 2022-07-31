import { setScreen } from "../app.js";
import { InputGroup } from "./InputGroup.js";
import { Register } from "./Register.js";

class Login {
  $container;
  $title;
  $inputGroupEmail;
  $inputGroupPassword;
  $form;
  $btnSubmit;
  $linkToRegister;

  constructor() {
    this.$container = document.createElement("div");
    this.$container.classList.add("form");

    this.$title = document.createElement("h3");
    this.$title.innerHTML = "Login";

    this.$form = document.createElement("form");
    this.$form.addEventListener("submit", this.handleSubmit);
    this.$form.classList.add("form-login");

    this.$inputGroupEmail = new InputGroup("email", "Email", "email");

    this.$inputGroupPassword = new InputGroup(
      "password",
      "Password",
      "password"
    );
    this.$btnSubmit = document.createElement("button");
    this.$btnSubmit.type = "submit";
    this.$btnSubmit.innerHTML = "Login";

    this.$linkToRegister = document.createElement("div");
    this.$linkToRegister.innerHTML = "> Create new account";
    this.$linkToRegister.classList.add("btn-link");
    this.$linkToRegister.addEventListener("click", this.moveToRegister);
  }

  moveToRegister = () => {
    const register = new Register();
    setScreen(register);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const email = this.$inputGroupEmail.getInputValue();
    const password = this.$inputGroupPassword.getInputValue();

    if (!email) {
      this.$inputGroupEmail.setError("Bạn chưa nhập email!");
    } else {
      this.$inputGroupEmail.setSuccess();
    }

    if (!password) {
      this.$inputGroupPassword.setError("Bạn chưa nhập mật khẩu");
    } else if (password.length < 6) {
      this.$inputGroupPassword.setError("Mật khẩu phải trên 6 ký tự ");
    } else {
      this.$inputGroupPassword.setSuccess();
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userInfo) => {
        console.log(userInfo);
        this.$inputGroupEmail.setError("Bạn nhập sai email!");
      })
      .catch((error) => {
        console.log(error);
        this.$inputGroupPassword.setError(error);
      });
  };

  render() {
    this.$form.appendChild(this.$inputGroupEmail.render());
    this.$form.appendChild(this.$inputGroupPassword.render());
    this.$form.appendChild(this.$btnSubmit);

    this.$container.appendChild(this.$title);
    this.$container.appendChild(this.$form);
    this.$container.appendChild(this.$linkToRegister);

    return this.$container;
  }
}

export { Login };
