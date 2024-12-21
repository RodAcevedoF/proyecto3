import { Home } from "../pages/Home/Home";

export const changePage = async (PageComponent) => {
  return new Promise((resolve) => {
    const home = document.querySelector(".home");
    if (home && PageComponent === Home) {
      resolve();
      return;
    }
    const main = document.querySelector("main");
    if (!main) {
      resolve();
      return;
    }
    main.style.transition = "opacity 0.3s";
    main.style.opacity = "0";
    setTimeout(() => {
      main.innerHTML = "";
      PageComponent();
      main.style.opacity = "1";
      resolve();
    }, 300);
  });
};
