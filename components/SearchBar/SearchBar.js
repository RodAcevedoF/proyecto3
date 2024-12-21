import "./SearchBar.css";
import { getPhotos } from "../../utils/getPhotos";
import { Home } from "../../pages/Home/Home";
import { changePage } from "../../utils/changePage";
const searchIdeas = [
  "selfie poses",
  "profile picture",
  "cute wallpapers",
  "rangoli designs",
  "girly photography"
];

let currentIdeaIndex = 0;

export const SearchBar = () => {
  return `
    <form action="#" method="get" class="search">
    <div class="div-search">
      <i class="fa-solid fa-magnifying-glass" id="search-icon"></i>
      <input type="search" name="search" id="search" placeholder="Search for ${searchIdeas[0]}" autocomplete="off"/>
    </div>
    <div class="dropdown">
    <button type="submit" name="search" id="submit" value="Search">Search</button>
    <select name="search" class="orientation">
      <option value="landscape" selected>Horizontal</option>
      <option value="portrait">Vertical</option>
      <option value="squarish">Squarish</option>
    </select>
    <select class="per-page">
      <option value=10>10 per page</option>
      <option value=20 selected>20 per page</option>
      <option value=30>30 per page</option>
    </select>
    <select class="order-by">
      <option value="relevant" selected>Relevant</option>
      <option value="latest">Latest</option>
    </select>
    <select class="color">
      <option value="" selected>All 🎨</option>
      <option value="black">Black ⬛</option>
      <option value="white">White ⬜</option>
      <option value="yellow">Yellow 🟨</option>
      <option value="orange">Orange 🟧</option>
      <option value="red">Red 🟥</option>
      <option value="purple">Purple 🟪</option>
      <option value="magenta">Magenta 🩷</option>
      <option value="green">Green 🟩</option>
      <option value="teal">Teal 🟢</option>
      <option value="blue">Blue 🟦</option>
    </select>
    </div>
    </form>
  `;
};

export const initSearch = () => {
  const inputElem = document.getElementById("search");
  const searchForm = document.querySelector(".search");
  const dropMenu = document.querySelector(".dropdown");
  const updates = document.querySelector(".updates");
  const chats = document.querySelector(".chats");
  const burgerUl = document.querySelector(".burger-ul");
  let firstSpan = document.querySelector(".btn-burger span:first-child");
  let midSpan = document.querySelector(".btn-burger span:nth-child(2)");
  let lastSpan = document.querySelector(".btn-burger span:last-child");

  if (inputElem) {
    setInterval(() => {
      currentIdeaIndex = (currentIdeaIndex + 1) % searchIdeas.length;
      inputElem.placeholder = `Search for ${searchIdeas[currentIdeaIndex]}`;
    }, 2500);
  }

  searchForm.addEventListener("click", () => {
    changePage(Home);
    updates.classList.remove("display");
    chats.classList.remove("display");
    dropMenu.classList.add("show");
    burgerUl.classList.remove("set");
    firstSpan.classList.remove("anim-first");
    midSpan.classList.remove("anim-mid");
    lastSpan.classList.remove("anim-last");
    const link = document.getElementById("home");
    document.querySelectorAll(".select").forEach((el) => {
      el.classList.remove("select");
    });
    link.classList.add("select");
  });

  document.addEventListener("click", function (event) {
    if (!searchForm.contains(event.target)) {
      dropMenu.classList.remove("show");
    }
  });

  searchForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    getPhotos(inputElem.value);
    dropMenu.classList.remove("show");
  });
};
