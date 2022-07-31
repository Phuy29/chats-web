class ConversationItem {
  $container;
  $name;
  $numberOfUser;

  id;
  name;
  users;
  onSelectConversation;

  constructor(id, name, users, onSelectConversation) {
    this.id = id;
    this.name = name;
    this.users = users;
    this.onSelectConversation = onSelectConversation;

    this.$container = document.createElement("div");
    this.$container.classList.add("conversation-item");
    this.$container.addEventListener("click", this.handleClick);

    this.$name = document.createElement("span");
    this.$name.innerHTML = this.name;

    this.$numberOfUser = document.createElement("span");
    this.$numberOfUser.innerHTML = "(" + this.users.length + ")";
  }

  handleClick = () => {
    this.onSelectConversation({
      id: this.id,
      name: this.name,
      users: this.users,
    });
  };

  setActive(active) {
    if (active) {
      this.$container.classList.add("active");
    } else {
      this.$container.classList.remove("active");
    }
  }

  updateData(name, users) {
    this.name = name;
    this.users = users;

    this.$name.innerHTML = name;
    this.$numberOfUser.innerHTML = "(" + users.length + ")";
  }

  render() {
    this.$container.appendChild(this.$name);
    this.$container.appendChild(this.$numberOfUser);
    return this.$container;
  }
}

export { ConversationItem };
