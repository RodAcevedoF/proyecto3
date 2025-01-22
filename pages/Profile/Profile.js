import './Profile.css';

export const Profile = () => {
  const main = document.querySelector('main');
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
            <img src="${localStorage.getItem('profileImage') || '/icons/user.png'}" alt="User Profile">
            <div>
              <p>Username</p>
              <p>0 following</p>
            </div>
          </button>
          <button class="profile-btn">
            Load Profile Image
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
    </section>
    <input type="file" id="file-input" style="display: none;">
  `;

  const fileInput = document.getElementById('file-input');
  const profileBtn = document.querySelector('.profile-btn');
  const userBtnImg = document.querySelector('.user-btn img');

  // Elementos del navbar
  const navbarProfile = document.getElementById('profile');
  const navbarProfileB = document.getElementById('profileB');

  // Actualizar imágenes desde localStorage
  const updateNavbarImages = () => {
    const storedImage = localStorage.getItem('profileImage') || '/icons/user.png';
    userBtnImg.src = storedImage;

    if (navbarProfile) {
      const navbarImg = navbarProfile.querySelector('img');
      if (navbarImg) navbarImg.src = storedImage;
    }

    if (navbarProfileB) {
      const navbarImgB = navbarProfileB.querySelector('img');
      if (navbarImgB) navbarImgB.src = storedImage;
    }
  };

  updateNavbarImages();

  // Event listener para abrir el selector de archivos
  profileBtn.addEventListener('click', () => {
    fileInput.click();
  });

  // Event listener para manejar la carga de la imagen
  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result; // Imagen convertida a Base64
        localStorage.setItem('profileImage', base64Image); // Guardar en localStorage
        updateNavbarImages(); // Actualizar todas las imágenes
      };
      reader.readAsDataURL(file);
    }
  });

  const pins = document.querySelector('.profile aside ul:first-of-type li');
  const boards = document.querySelector(
    '.profile aside ul:first-of-type li:last-of-type'
  );

  pins.addEventListener('click', () => {
    if (!pins.classList.contains('border')) {
      boards.classList.toggle('border');
      boards.classList.toggle('hovering');
      pins.classList.toggle('border');
      pins.classList.toggle('hovering');
    }
  });

  boards.addEventListener('click', () => {
    if (!boards.classList.contains('border')) {
      pins.classList.toggle('border');
      pins.classList.toggle('hovering');
      boards.classList.toggle('border');
      boards.classList.toggle('hovering');
    }
  });
};
