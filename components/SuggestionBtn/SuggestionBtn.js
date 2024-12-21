import "./SuggestionBtn.css";

export const SuggestionBtn = (arr) => {
  return arr
    .map(
      (elem) => `
        <figure class="sugg-card" data-text="${elem.text}">
        <img src="${elem.url}" alt="${elem.text} image">
        <figcaption>${elem.text}</figcaption>
      </figure>
    `
    )
    .join("");
};
