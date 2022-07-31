import { MessageItem } from "./MessageItem.js";

class MessageArea {
  $container;
  $messageList;

  $composer;
  $input;
  $btnSend;

  activeConversation;
  messageSubscribe;

  constructor() {
    this.$container = document.createElement("div");
    this.$container.classList.add("message-area");

    this.$messageList = document.createElement("div");
    this.$messageList.classList.add("message-list");

    this.$composer = document.createElement("form");
    this.$composer.classList.add("composer");
    this.$composer.addEventListener("submit", this.handleSendMessage);

    this.$input = document.createElement("input");
    this.$input.type = "text";
    this.$input.placeholder = "Enter be nice in the chat";
    this.$input.style.flex = "1";

    this.$btnSend = document.createElement("button");
    this.$btnSend.type = "submit";
    this.$btnSend.innerHTML = "👍";
  }

  setConversation(conversation) {
    this.activeConversation = conversation;
    this.$messageList.innerHTML = "";
    if (this.messageSubscribe) {
      this.messageSubscribe();
    }
    this.messageSubscribe = db
      .collection("messages")
      .where("conversationId", "==", this.activeConversation.id)
      .orderBy("sentAt")
      .onSnapshot(this.messageListener);
  }

  messageListener = (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        const data = change.doc.data();
        const $messageItem = new MessageItem(data.sender, data.content);
        this.$messageList.insertBefore(
          $messageItem.render(),
          this.$messageList.childNodes[0]
        );
      }
    });
  };

  handleSendMessage = (e) => {
    e.preventDefault();

    if (this.activeConversation) {
      db.collection("messages").add({
        sender: firebase.auth().currentUser.email,
        content: this.$input.value,
        conversationId: this.activeConversation.id,
        sentAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } else {
      alert("You must select conversation ");
    }

    this.$input.value = "";
  };

  render() {
    this.$composer.appendChild(this.$input);
    this.$composer.appendChild(this.$btnSend);

    const composerContainer = document.createElement("div");
    composerContainer.appendChild(this.$composer);
    composerContainer.classList.add("composer-container");

    this.$container.appendChild(this.$messageList);
    this.$container.appendChild(composerContainer);

    return this.$container;
  }
}

export { MessageArea };
