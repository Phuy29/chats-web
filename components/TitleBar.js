class TitleBar {
  $container;
  $title;
  $txtName;
  $btnLogout;
  $btnShowSidebar;
  $btnShowMembers;

  setSidebarVisible;
  setMembersVisible;

  constructor(setSidebarVisible, setMembersVisible) {
    this.setSidebarVisible = setSidebarVisible;
    this.setMembersVisible = setMembersVisible;

    this.$container = document.createElement("div");
    this.$container.classList.add("title-bar");

    this.$title = document.createElement("div");
    this.$title.innerHTML = "Chats";
    this.$title.classList.add("title-bar-title");

    this.$txtName = document.createElement("div");
    this.$txtName.classList.add("title-bar-name");

    this.$btnShowSidebar = document.createElement("div");
    this.$btnShowSidebar.classList.add("btn-show-sidebar");
    this.$btnShowSidebar.addEventListener("click", this.showSidebar);

    const iconMenu = document.createElement("i");
    iconMenu.classList.add("fa-solid", "fa-bars");
    this.$btnShowSidebar.appendChild(iconMenu);

    this.$btnShowMembers = document.createElement("div");
    this.$btnShowMembers.classList.add("btn-show-members");
    this.$btnShowMembers.addEventListener("click", this.showMembers);

    const iconMembers = document.createElement("i");
    iconMembers.classList.add("fa-solid", "fa-user");
    this.$btnShowMembers.appendChild(iconMembers);

    this.$btnLogout = document.createElement("button");
    const iconLogout = document.createElement("i");
    this.$btnLogout.appendChild(iconLogout);
    iconLogout.classList.add("fa-solid", "fa-right-from-bracket");
    this.$btnLogout.addEventListener("click", this.handleLogout);
  }

  handleLogout = () => {
    firebase.auth().signOut();
  };

  setName(name) {
    this.$txtName.innerHTML = name;
  }

  showSidebar = () => {
    this.setSidebarVisible(true);
  };

  showMembers = () => {
    this.setMembersVisible(true);
  };

  render() {
    const title = document.createElement("div");
    title.style.display = "flex";
    title.style.justifyContent = "space-between";
    title.style.gap = "15px";
    title.style.alignItems = "center";
    title.appendChild(this.$btnShowSidebar);
    title.appendChild(this.$txtName);

    this.$container.appendChild(title);
    this.$container.appendChild(this.$title);

    const btnGroup = document.createElement("div");
    btnGroup.classList.add("btn-group");
    btnGroup.appendChild(this.$btnShowMembers);
    btnGroup.appendChild(this.$btnLogout);

    this.$container.appendChild(btnGroup);
    return this.$container;
  }
}

export { TitleBar };
