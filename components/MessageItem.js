class MessageItem {
  $container;
  $messageContainer;
  $sender;
  $content;

  constructor(sender, content) {
    this.$container = document.createElement("div");
    this.$container.style.display = "flex";

    this.$messageContainer = document.createElement("div");
    this.$messageContainer.classList.add("message-item");

    this.$sender = document.createElement("div");
    this.$sender.classList.add("sender");
    this.$sender.innerHTML = sender;

    this.$content = document.createElement("div");
    this.$content.classList.add("content");
    this.$content.innerHTML = content;

    if (sender === firebase.auth().currentUser.email) {
      this.$container.style.justifyContent = "flex-end";
      this.$messageContainer.classList.add("my-message");
    }
  }

  render() {
    this.$messageContainer.appendChild(this.$sender);
    this.$messageContainer.appendChild(this.$content);

    this.$container.appendChild(this.$messageContainer);
    return this.$container;
  }
}

export { MessageItem };
