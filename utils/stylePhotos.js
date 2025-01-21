import { SuggestionBtn } from "../components/SuggestionBtn/SuggestionBtn";
import { suggestions } from "../data/suggestions";
import { getPhotos } from "./getPhotos";
export const stylePhotos = (
  results,
  resetPage,
  paramsDefaults,
  currentInput,
  perPage
) => {
  const mainDiv = document.querySelector('.main-div');
  let loadingGif = document.querySelector('.loading-gif'); // Contenedor para el GIF de carga

  if (!loadingGif) {
    // Crear el contenedor para el GIF si no existe
    loadingGif = document.createElement('div');
    loadingGif.classList.add('loading-gif');
    loadingGif.innerHTML = '<img src="animation.gif" alt="Loading...">';
    document.body.appendChild(loadingGif);
  }

  if (resetPage) {
    mainDiv.innerHTML = '';
    loadingGif.style.display = 'block'; // Muestra el GIF al iniciar
  }

  let loadMoreBtn = document.querySelector('#load-more-btn');
  if (!loadMoreBtn) {
    loadMoreBtn = document.createElement('button');
    loadMoreBtn.id = 'load-more-btn';
    loadMoreBtn.textContent = 'Load More';
    loadMoreBtn.addEventListener('click', () =>
      getPhotos(currentInput, paramsDefaults, false)
    );
    const Home = document.querySelector('.home');
    Home.appendChild(loadMoreBtn);
  }

  if (results.length === 0 && resetPage) {
    loadMoreBtn.style.display = 'none';
    const nonRes = `
        <section class="not-found">
          <h3>No matches found</h3>
          <p>Let's try with a different search term.</p>
          <div>
          ${SuggestionBtn(suggestions)}
          </div>
        </section>
      `;
    mainDiv.style.display = 'flex';
    mainDiv.innerHTML = nonRes;
    loadingGif.style.display = 'none'; // Oculta el GIF si no hay resultados
    document.querySelectorAll('.sugg-card').forEach((card) => {
      card.addEventListener('click', () => {
        const defaultParams = {
          orientation: 'landscape',
          perPage: '20',
          orderBy: 'relevant',
          color: ''
        };
        const searchTerm = card.dataset.text;
        getPhotos(searchTerm, defaultParams);
      });
    });
    return;
  }

  mainDiv.style.display = 'grid';

  for (let elem of results) {
    const innerDiv = document.createElement('div');
    innerDiv.classList.add('inner-div');
    const firstBtn = document.createElement('btn');
    firstBtn.classList.add('save-btn', 'hover-btn');
    firstBtn.textContent = 'Save';
    innerDiv.appendChild(firstBtn);

    let firstIconImg, secondIconImg;

    for (let i = 0; i < 2; i++) {
      let innerBtn = document.createElement('button');
      let innerImg = document.createElement('img');

      innerBtn.classList.add('inner-btn', 'hover-btn');
      innerBtn.style.position = 'absolute';
      innerBtn.appendChild(innerImg);
      if (i === 0) {
        firstIconImg = innerImg;
      } else {
        secondIconImg = innerImg;
      }

      innerDiv.appendChild(innerBtn);
    }

    firstIconImg.src = '/icons/share.png';
    secondIconImg.src = '/icons/dots.png';

    const img = document.createElement('img');
    img.classList.add('main-img');
    img.src = elem.urls.regular;
    img.alt = elem.alt_description || 'Sorry no alt found';
    innerDiv.appendChild(img);
    mainDiv.appendChild(innerDiv);
  }

  const innerDivs = document.querySelectorAll('.inner-div');
  const overlay = document.querySelector('.overlay');

  innerDivs.forEach((div) => {
    div.addEventListener('mouseover', () => {
      const hoverBtns = div.querySelectorAll('.hover-btn');
      hoverBtns.forEach((btn) => btn.classList.add('visible'));
    });

    div.addEventListener('click', () => {
      const img = div.querySelector('.main-img');
      if (img) img.classList.add('closeup');
      overlay.style.display = 'block';

      overlay.addEventListener('click', () => {
        img.classList.remove('closeup');
        overlay.style.display = 'none';
      });
    });

    div.addEventListener('mouseout', () => {
      const hoverBtns = div.querySelectorAll('.hover-btn');
      hoverBtns.forEach((btn) => btn.classList.remove('visible'));
    });
  });

  // Oculta el GIF de carga después de renderizar las imágenes
  loadingGif.style.display = 'none';

  if (results.length < perPage) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'block';
  }
};
