import "./SearchBar.css";

const searchIdeas = [
  "selfie poses",
  "profile picture",
  "cute wallpapers",
  "rangoli designs",
  "girly photography"
];
export const SearchBar = () => {
  return `
    <form action="#" method="get" class="search">
      <div class="div-search">
        <i class="fa-solid fa-magnifying-glass" id="search-icon"></i>
        <input type="search" name="search" id="search" placeholder="Search for ${searchIdeas[0]}" autocomplete="off"/>
      </div>
      <div class="dropdown">
      <ul class="suggestions" id="suggestions"></ul>
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
