import "./Home.css";
import { getPhotos } from "../../utils/getPhotos";

export const Home = () => {
  const main = document.querySelector("main");
  main.innerHTML = `
    <section class="home">
    <div class="overlay"><img src="/icons/cross.png" class="close-btn"></div>
    <div class="main-div"></div>
    </section>`;

  const defaultParams = {
    orientation: "landscape",
    perPage: "12",
    orderBy: "relevant",
    color: ""
  };
  getPhotos("random", defaultParams);
};
