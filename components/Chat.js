import { InfoPanel } from "./InfoPanel.js";
import { MessageArea } from "./MessageArea.js";
import { Sidebar } from "./Sidebar.js";
import { TitleBar } from "./TitleBar.js";

class Chat {
  $container;
  $btnLogout;
  $sideBar;
  $titleBar;
  $messageArea;
  $infoPanel;

  constructor() {
    this.$container = document.createElement("div");
    this.$container.className = "chat";

    this.$sidebar = new Sidebar(
      this.setActiveConversation,
      this.updateActiveConversation
    );

    this.$titleBar = new TitleBar(
      this.setSidebarVisible,
      this.setMembersVisible
    );

    this.$messageArea = new MessageArea();

    this.$infoPanel = new InfoPanel();

    this.activeConversation = null;
  }

  setSidebarVisible = (visible) => {
    this.$sidebar.setBgContainerVisible(visible);
  };

  setMembersVisible = (visible) => {
    this.$infoPanel.setBgContainerVisible(visible);
  };

  setActiveConversation = (conversation) => {
    this.activeConversation = conversation;
    this.$sidebar.setConversation(this.activeConversation);
    this.$titleBar.setName(this.activeConversation.name);
    this.$messageArea.setConversation(this.activeConversation);
    this.$infoPanel.setActiveConversation(this.activeConversation);
  };

  updateActiveConversation = (name, users) => {
    this.$infoPanel.updateActiveConversation(name, users);
  };

  render() {
    this.$container.appendChild(this.$sidebar.render());

    const chatArea = document.createElement("div");
    chatArea.classList.add("chat-area");
    chatArea.appendChild(this.$titleBar.render());

    const $messageAreaContainer = document.createElement("div");
    $messageAreaContainer.style.display = "flex";
    $messageAreaContainer.appendChild(this.$messageArea.render());
    $messageAreaContainer.appendChild(this.$infoPanel.render());

    chatArea.appendChild($messageAreaContainer);

    this.$container.appendChild(chatArea);
    return this.$container;
  }
}

export { Chat };
