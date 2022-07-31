import { createConversation } from "./createConversation.js";
import { ConversationItem } from "./conversationItem.js";

class Sidebar {
  $bgContainer;
  $container;
  $title;
  $createConversation;
  $formCreate;
  $conversationList;

  setActiveConversation;
  activeConversation;
  updateActiveConversation;
  listConversationItem = [];

  constructor(setActiveConversation, updateActiveConversation) {
    this.$bgContainer = document.createElement("div");
    this.$bgContainer.classList.add("sidebar-container");
    this.$bgContainer.addEventListener("click", () => {
      this.setBgContainerVisible(false);
    });

    this.$container = document.createElement("div");
    this.$container.classList.add("sidebar");

    this.$title = document.createElement("div");
    this.$title.innerHTML = "Channels";
    this.$title.classList.add("sidebar-title");

    this.$formCreate = new createConversation();

    this.$createConversation = document.createElement("button");
    this.$createConversation.innerHTML = "+ New";
    this.$createConversation.classList.add("btn");
    this.$createConversation.addEventListener(
      "click",
      this.handleCreateConversation
    );

    this.$conversationList = document.createElement("div");
    this.$conversationList.classList.add("conversation-list");
    this.setActiveConversation = setActiveConversation;
    this.updateActiveConversation = updateActiveConversation;

    db.collection("conversations")
      .where("user", "array-contains", firebase.auth().currentUser.email)
      .onSnapshot(this.conversationListener);
  }

  setBgContainerVisible = (visible) => {
    visible
      ? this.$bgContainer.classList.add("visible")
      : this.$bgContainer.classList.remove("visible");
  };

  handleCreateConversation = () => {
    this.$formCreate.setVisible(true);
  };

  conversationListener = (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const conversation = change.doc.data();
      const id = change.doc.id;

      if (change.type === "added") {
        const $conversationItem = new ConversationItem(
          id,
          conversation.name,
          conversation.user,
          this.setActiveConversation
        );

        this.listConversationItem.push($conversationItem);

        this.$conversationList.appendChild($conversationItem.render());
      } else if (change.type === "modified") {
        const modifyingConversation = this.listConversationItem.find((item) => {
          return item.id === id;
        });
        modifyingConversation.updateData(conversation.name, conversation.user);
        if (id === this.activeConversation.id) {
          this.updateActiveConversation(conversation.name, conversation.user);
        }
      } else if (change.type === "removed") {
        console.log("user not removed");
      }
    });
  };

  setConversation(conversation) {
    this.activeConversation = conversation;
    this.listConversationItem.forEach((item) => {
      if (item.id === conversation.id) {
        item.setActive(true);
      } else {
        item.setActive(false);
      }
    });
  }

  render() {
    this.$bgContainer.appendChild(this.$container);
    this.$container.appendChild(this.$title);
    this.$container.appendChild(this.$createConversation);
    this.$container.appendChild(this.$conversationList);
    this.$container.appendChild(this.$formCreate.render());
    return this.$bgContainer;
  }
}

export { Sidebar };
