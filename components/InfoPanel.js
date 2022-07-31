class InfoPanel {
  $bgContainer;
  $container;
  $title;

  $formAddUser;
  $input;

  $userList;

  activeConversation;

  constructor() {
    this.$bgContainer = document.createElement("div");
    this.$bgContainer.classList.add("info-panel-container");
    this.$bgContainer.addEventListener("click", () => {
      this.setBgContainerVisible(false);
    });

    this.$container = document.createElement("div");
    this.$container.classList.add("info-panel");

    this.$title = document.createElement("div");
    this.$title.innerHTML = "Members";
    this.$title.classList.add("info-panel-title");

    this.$formAddUser = document.createElement("form");
    this.$formAddUser.addEventListener("submit", this.handleSubmit);
    this.$formAddUser.style.display = "flex";

    this.$input = document.createElement("input");
    this.$input.type = "text";
    this.$input.placeholder = "Add user email...";
    this.$input.classList.add("input-members");

    this.$userList = document.createElement("div");
    this.$userList.classList.add("user-list");
  }

  setBgContainerVisible = (visible) => {
    visible
      ? this.$bgContainer.classList.add("visible")
      : this.$bgContainer.classList.remove("visible");
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.activeConversation) {
      alert("You must choose  conversation first!");
      return;
    }
    const newUsers = [...this.activeConversation.users, this.$input.value];
    db.collection("conversations").doc(this.activeConversation.id).update({
      user: newUsers,
    });
    this.$input.value = "";
  };

  setActiveConversation = (conversation) => {
    this.activeConversation = conversation;
    this.updateActiveConversation(conversation.name, conversation.users);
  };

  handleDeleteUser = (email) => {
    const newUsers = this.activeConversation.users.filter((item) => {
      return item !== email;
    });
    db.collection("conversations").doc(this.activeConversation.id).update({
      user: newUsers,
    });
  };

  updateActiveConversation = (name, users) => {
    this.activeConversation.name = name;
    this.activeConversation.users = users;

    this.$userList.innerHTML = "";
    this.activeConversation.users.forEach((email) => {
      const $item = document.createElement("div");
      $item.classList.add("user-item");
      $item.addEventListener("click", () => {
        this.handleDeleteUser(email);
      });
      $item.innerHTML = email;

      this.$userList.appendChild($item);
    });
  };

  render() {
    this.$formAddUser.appendChild(this.$input);

    this.$container.appendChild(this.$title);
    this.$container.appendChild(this.$formAddUser);
    this.$container.appendChild(this.$userList);

    this.$bgContainer.appendChild(this.$container);

    return this.$bgContainer;
  }
}

export { InfoPanel };
