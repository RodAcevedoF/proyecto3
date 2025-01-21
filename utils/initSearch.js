import { Home } from "../pages/Home/Home";
import { getPhotos } from "./getPhotos";
import { changePage } from "./changePage";

export const initSearch = () => {
  const searchIdeas = [
    "selfie poses",
    "profile picture",
    "cute wallpapers",
    "rangoli designs",
    "girly photography"
  ];
  const inputElem = document.getElementById("search");
  const searchForm = document.querySelector(".search");
  const suggestionsElem = document.getElementById("suggestions");
  const dropMenu = document.querySelector(".dropdown");
  const updates = document.querySelector(".updates");
  const chats = document.querySelector(".chats");
  const burgerUl = document.querySelector(".burger-ul");
  let firstSpan = document.querySelector(".btn-burger span:first-child");
  let midSpan = document.querySelector(".btn-burger span:nth-child(2)");
  let lastSpan = document.querySelector(".btn-burger span:last-child");
  let currentIdeaIndex = 0;
  const ACCESS_KEY = "qrylhW3FAl4ecO6J5YJmCNHr1jKurFrLIxWTjhYL4XQ";
  let debounceTimer;

  if (inputElem) {
    setInterval(() => {
      currentIdeaIndex = (currentIdeaIndex + 1) % searchIdeas.length;
      inputElem.placeholder = `Search for ${searchIdeas[currentIdeaIndex]}`;
    }, 2500);

    const fetchSuggestions = async (query) => {
      if (!query) {
        suggestionsElem.innerHTML = "";
        return;
      }
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${query}&client_id=${ACCESS_KEY}&per_page=5`
        );
        const data = await response.json();
        const suggestions = data.results.map(
          (result) => result.description || result.alt_description || "No title"
        );
        renderSuggestions(suggestions);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    const renderSuggestions = (suggestions) => {
      suggestionsElem.innerHTML = suggestions
        .map((suggestion) => `<li class="suggestion-item">${suggestion}</li>`)
        .join("");
    };

    inputElem.addEventListener("input", (e) => {
      const query = e.target.value.trim();
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => fetchSuggestions(query), 750);
    });

    suggestionsElem.addEventListener("click", (e) => {
      if (e.target.classList.contains("suggestion-item")) {
        const suggestion = e.target.textContent;
        inputElem.value = suggestion;
        suggestionsElem.innerHTML = "";
        getPhotos(suggestion);
        changePage(Home);
        dropMenu.classList.remove("show");
      }
    });
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

  document.addEventListener("click", (event) => {
    if (!searchForm.contains(event.target)) {
      dropMenu.classList.remove("show");
    }
  });

  searchForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    getPhotos(inputElem.value);
    dropMenu.classList.remove("show");
    suggestionsElem.innerHTML = "";
  });
};
