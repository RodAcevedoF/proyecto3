import "./Profile.css";

export const Profile = () => {
  const main = document.querySelector("main");
  main.innerHTML = `
    <section class="profile">
      <aside>
        <ul>
          <li class="border">Pins</li>
          <li class="hovering">Boards</li>
        </ul>
        <ul>
          <li><img src="/icons/settings.png" class="aside-btn"></li>
          <li>Groups</li>
        </ul>
      </aside>
      <header class="header-profile">  
        <h2>Your saved ideas</h2>
        <div class="div-btns">
          <button class="user-btn">
            <img src="/icons/user.png">
            <div>
              <p>Username</p>
              <p>0 following</p>
            </div>
          </button>
          <button class="profile-btn">
            View Profile
          </button>
        </div>
      </header>
      <div class="central-box">
        <img src="/images/profileblank.svg">
        <p>Keep track of what inspires you</p>
          <p>Boards help you organise the Pins you save into collections</p>
          <button>
            Create board
          </button>
          <button>
            Organize
          </button>
          <button class="help">
            <img src="/icons/question.png" id="help-icon" alt="help icon">
        </button>
        </div>
    </section>`;

  const pins = document.querySelector(".profile aside ul:first-of-type li");
  const boards = document.querySelector(
    ".profile aside ul:first-of-type li:last-of-type"
  );

  pins.addEventListener("click", () => {
    if (!pins.classList.contains("border")) {
      boards.classList.toggle("border");
      boards.classList.toggle("hovering");
      pins.classList.toggle("border");
      pins.classList.toggle("hovering");
    }
  });

  boards.addEventListener("click", () => {
    if (!boards.classList.contains("border")) {
      pins.classList.toggle("border");
      pins.classList.toggle("hovering");
      boards.classList.toggle("border");
      boards.classList.toggle("hovering");
    }
  });
};
