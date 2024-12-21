import "./NavBar.css";
import { SearchBar, initSearch } from "../SearchBar/SearchBar";
import { Button } from "../Button/Button";
import { SuggestionBtn } from "../SuggestionBtn/SuggestionBtn";
import { suggestionsB } from "../../data/suggestions";
import { getPhotos } from "../../utils/getPhotos";
import { Home } from "../../pages/Home/Home";
import { changePage } from "../../utils/changePage";

export const NavBar = () => {
  const header = document.querySelector("header");
  header.innerHTML = `<nav class="nav-bar">
                               <div class="nav-div">                            
                                <img src="/icons/pinterest.png" class="main-logo">
                                <ul>
                                  <li>
                                    <a href="#" id="home">Home</a>
                                  </li>
                                  <li>
                                    <a href="#" id="create">Create</a>
                                  </li>
                                </ul>
                                </div>
                                ${SearchBar()}  
                                <ul class="btn-ul">
                                  <li id="notifications">${Button(
                                    "/icons/bell.png",
                                    "notifications"
                                  )}</li>
                                  <li id="chats">${Button(
                                    "/icons/message.png",
                                    "chats"
                                  )}</li>
                                  <li id="profile">${Button(
                                    "/icons/user.png",
                                    "user"
                                  )}</li>
                                </ul>
                                <button class="btn-burger">
                                  <span></span>
                                  <span></span>
                                  <span></span>
                                </button>
                                <ul class="burger-ul">
                                  <li id="notificationsB">${Button(
                                    "/icons/bell.png",
                                    "notifications"
                                  )}</li>
                                  <li id="chatsB">${Button(
                                    "/icons/message.png",
                                    "chats"
                                  )}</li>
                                  <li id="profileB">${Button(
                                    "/icons/user.png",
                                    "user"
                                  )}</li>
                                </ul>
                                <aside class="updates">
                                  <h3>Updates</h3>
                                  <h4>New</h4>
                                  <p>Nothing to see here...</p>
                                  <h4>Seen</h4>
                                  ${SuggestionBtn(suggestionsB)}
                                </aside>
                                <aside class="chats">
                                  <div>
                                    <img src="/icons/cross.png" class="main-logo" id="cross-close">
                                    <h3>Inbox</h3>
                                  </div>
                                  <ul>
                                    <li>
                                      <img src="/icons/createmsg.png" class="logo">
                                      <p>New message</p>
                                    </li>
                                    <li>
                                      <img src="/icons/adduser.png" class="logo">
                                      <div>
                                        <p>Invite your freinds</p>
                                        <p>Connect to start chatting</p>
                                      </div>
                                    </li>
                                  </ul>
                                </aside>
                            </nav>`;
  initSearch();
};

export const burgerBtn = () => {
  const burgerButton = document.querySelector(".btn-burger");
  burgerButton.addEventListener("click", () => {
    let firstSpan = document.querySelector(".btn-burger span:first-child");
    let midSpan = document.querySelector(".btn-burger span:nth-child(2)");
    let lastSpan = document.querySelector(".btn-burger span:last-child");
    let burgerUl = document.querySelector(".burger-ul");
    const messages = document.querySelector(".chats");
    const updates = document.querySelector(".updates");
    firstSpan.classList.toggle("anim-first");
    midSpan.classList.toggle("anim-mid");
    lastSpan.classList.toggle("anim-last");
    burgerUl.classList.toggle("set");
    updates.classList.remove("display");
    messages.classList.remove("display");
  });
};

export const dropMenus = () => {
  const notifications = document.getElementById("notifications");
  const notificationsB = document.getElementById("notificationsB");
  const chats = document.getElementById("chats");
  const chatsB = document.getElementById("chatsB");
  const messages = document.querySelector(".chats");
  const updates = document.querySelector(".updates");

  if (
    !notifications ||
    !notificationsB ||
    !chats ||
    !chatsB ||
    !messages ||
    !updates
  ) {
    console.error("Algunos elementos no existen en el DOM.");
    return;
  }

  const toggleMenu = (menuToToggle, menuToClose) => {
    menuToToggle.classList.toggle("display");
    menuToClose.classList.remove("display");
  };

  [notifications, notificationsB].forEach((element) => {
    element.addEventListener("click", (ev) => {
      ev.stopPropagation();
      toggleMenu(updates, messages);
    });
  });

  [chats, chatsB].forEach((element) => {
    element.addEventListener("click", (ev) => {
      ev.stopPropagation();
      toggleMenu(messages, updates);
    });
  });

  document.addEventListener("click", (ev) => {
    const target = ev.target;

    if (target.id === "cross-close") {
      messages.classList.remove("display");
    }

    if (
      !messages.contains(target) &&
      !updates.contains(target) &&
      target !== notifications &&
      target !== notificationsB &&
      target !== chats &&
      target !== chatsB
    ) {
      messages.classList.remove("display");
      updates.classList.remove("display");
    }
  });

  document.querySelectorAll(".updates .sugg-card").forEach((card) => {
    card.addEventListener("click", async () => {
      const defaultParams = {
        orientation: "landscape",
        perPage: "20",
        orderBy: "relevant",
        color: ""
      };
      const searchTerm = card.dataset.text;

      const home = document.querySelector(".home");

      if (!home) {
        await changePage(Home);
      }
      getPhotos(searchTerm, defaultParams);
    });
  });
};
