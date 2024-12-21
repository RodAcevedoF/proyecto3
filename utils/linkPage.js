export const linkPage = (id, page) => {
  const link = document.querySelector(id);
  link.addEventListener("click", () => page());
  link.addEventListener("click", () => {
    document.querySelectorAll(".select").forEach((el) => {
      el.classList.remove("select");
    });
    link.classList.add("select");
  });
};
