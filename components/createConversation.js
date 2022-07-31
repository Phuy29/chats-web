class createConversation {
  $container;
  $form;
  $input;
  $btnCreate;
  $btnCancel;

  constructor() {
    this.$container = document.createElement("div");
    this.$container.style.display = "none";
    this.$container.classList.add("conversation");

    this.$form = document.createElement("form");
    this.$form.addEventListener("submit", this.handleSubmit);
    this.$form.classList.add("conversation-form");

    this.$input = document.createElement("input");
    this.$input.type = "text";
    this.$input.placeholder = "Enter conversation name ... ";

    this.$btnCreate = document.createElement("button");
    this.$btnCreate.type = "submit";
    this.$btnCreate.innerHTML = "Create";

    this.$btnCancel = document.createElement("button");
    this.$btnCancel.type = "button";
    this.$btnCancel.innerHTML = "Cancel";
    this.$btnCancel.addEventListener("click", this.handleCancelVisible);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    db.collection("conversations").add({
      name: this.$input.value,
      createBy: firebase.auth().currentUser.email,
      user: [firebase.auth().currentUser.email],
    });

    this.$input.value = "";
  };

  handleCancelVisible = () => {
    this.setVisible(false);
  };

  setVisible(visible) {
    visible
      ? (this.$container.style.display = "flex")
      : (this.$container.style.display = "none");
  }

  render() {
    this.$form.appendChild(this.$input);
    this.$form.appendChild(this.$btnCreate);
    this.$form.appendChild(this.$btnCancel);

    this.$container.appendChild(this.$form);

    return this.$container;
  }
}

export { createConversation };
