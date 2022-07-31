import { setScreen } from "../app.js";
import { InputGroup } from "./InputGroup.js";
import { Login } from "./Login.js";

class Register {
  $container;
  $title;
  $formRegister;
  $inputGroupEmail;
  $inputGroupDisplayName;
  $inputGroupPassword;
  $inputGroupConfirmPassword;
  $btnSubmit;
  $feedbackMessage;
  $linkToLogin;

  constructor() {
    this.$container = document.createElement("div");
    this.$container.classList.add("form");

    this.$title = document.createElement("h3");
    this.$title.innerHTML = "Register";

    this.$formRegister = document.createElement("form");
    this.$formRegister.addEventListener("submit", this.handleSubmit);

    this.$feedbackMessage = document.createElement("div");

    this.$inputGroupEmail = new InputGroup("email", "Email", "email");

    this.$inputGroupDisplayName = new InputGroup(
      "text",
      "Display Name",
      "displayName"
    );

    this.$inputGroupPassword = new InputGroup(
      "password",
      "Password",
      "password"
    );

    this.$inputGroupConfirmPassword = new InputGroup(
      "password",
      "Confirm Password",
      "confirmPassword"
    );

    this.$btnSubmit = document.createElement("button");
    this.$btnSubmit.type = "submit";
    this.$btnSubmit.innerHTML = "Register";

    this.$linkToLogin = document.createElement("div");
    this.$linkToLogin.innerHTML = "> Back to Login";
    this.$linkToLogin.classList.add("btn-link");
    this.$linkToLogin.addEventListener("click", this.moveToLogin);
  }

  moveToLogin = () => {
    const login = new Login();
    setScreen(login);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const email = this.$inputGroupEmail.getInputValue();
    const displayName = this.$inputGroupDisplayName.getInputValue();
    const password = this.$inputGroupPassword.getInputValue();
    const passwordConfirm = this.$inputGroupConfirmPassword.getInputValue();

    if (!email) {
      this.$inputGroupEmail.setError("Bạn chưa nhập email!");
    } else {
      this.$inputGroupEmail.setSuccess();
    }

    if (!displayName) {
      this.$inputGroupDisplayName.setError("Bạn chưa nhập tên");
    } else {
      this.$inputGroupDisplayName.setSuccess();
    }

    if (!password) {
      this.$inputGroupPassword.setError("Bạn chưa nhập mật khẩu");
    } else if (password.length < 6) {
      this.$inputGroupPassword.setError("Mật khẩu phải trên 6 ký tự ");
    } else {
      this.$inputGroupPassword.setSuccess();
    }

    if (passwordConfirm !== password) {
      this.$inputGroupConfirmPassword.setError("Mật khẩu nhập lại không trùng");
    } else if (!passwordConfirm) {
      this.$inputGroupConfirmPassword.setError("Bạn chưa nhập lại mật khẩu");
    } else {
      this.$inputGroupConfirmPassword.setSuccess();
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().currentUser.sendEmailVerification();
        this.$feedbackMessage.innerHTML = "Đăng kí tài khoản thành công";
        this.$feedbackMessage.style.color = "green";
      })
      .catch((error) => {
        this.$feedbackMessage.innerHTML = error.toString();
        this.$feedbackMessage.style.color = "red";
        console.log(error);
      });
  };

  render() {
    this.$formRegister.appendChild(this.$inputGroupEmail.render());
    this.$formRegister.appendChild(this.$inputGroupDisplayName.render());
    this.$formRegister.appendChild(this.$inputGroupPassword.render());
    this.$formRegister.appendChild(this.$inputGroupConfirmPassword.render());
    this.$formRegister.appendChild(this.$btnSubmit);

    this.$container.appendChild(this.$title);
    this.$container.appendChild(this.$feedbackMessage);
    this.$container.appendChild(this.$formRegister);
    this.$container.appendChild(this.$linkToLogin);
    return this.$container;
  }
}

export { Register };
