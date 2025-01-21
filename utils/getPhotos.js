import { stylePhotos } from "./stylePhotos";

const ACCESS_KEY = "qrylhW3FAl4ecO6J5YJmCNHr1jKurFrLIxWTjhYL4XQ";

let currentPage = 1;
let currentInput = "";

export const getPhotos = async (
  input,
  paramsDefaults = null,
  resetPage = true
) => {
  try {
    if (resetPage) {
      currentPage = 1;
      currentInput = input;
    } else {
      currentPage += 1;
    }

    const orientation = paramsDefaults
      ? paramsDefaults.orientation
      : document.querySelector(".orientation").value || "landscape";

    const perPage = paramsDefaults
      ? paramsDefaults.perPage
      : document.querySelector(".per-page").value || "20";

    const orderBy = paramsDefaults
      ? paramsDefaults.orderBy
      : document.querySelector(".order-by").value || "relevant";

    const color = paramsDefaults
      ? paramsDefaults.color
      : document.querySelector(".color").value || "";

    const baseUrl = "https://api.unsplash.com/search/photos";
    const params = new URLSearchParams({
      client_id: ACCESS_KEY,
      query: currentInput,
      orientation: orientation,
      order_by: orderBy,
      per_page: perPage,
      page: currentPage
    });

    if (color) {
      params.append("color", color);
    }

    const url = `${baseUrl}?${params.toString()}`;
    console.log("URL final:", url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const results = data.results;

    stylePhotos(results, resetPage, paramsDefaults, currentInput, perPage);
    
  } catch (error) {
    console.error("Something went wrong!", error);
  }
};
