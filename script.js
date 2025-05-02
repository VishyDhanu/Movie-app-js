const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const form = document.getElementById("form");
const main = document.getElementById("main");

getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieElement = document.createElement("div");
    movieElement.classList.add("card");

    movieElement.innerHTML = `
                <header class="card__header card--image movie-info">
                    <img src="${IMG_PATH + poster_path}" alt="${title}">
                </header>
                <div class="card__body movie-info">
                    <h1 class="card__heading">${title}</h1>
                    <span class="span ${getClassByRate(
                      vote_average
                    )}">${vote_average.toFixed(1)}</span>
                </div>
                <div class="overview">
                    <h3 class="overview__heading">Overview</h3>
                    <p class="overview__paragraph">${overview}</p>
                </div>        
    `;
    main.appendChild(movieElement);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "span--green";
  } else if (vote >= 5) {
    return "span--orange";
  } else {
    return "span--red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);

    search.value = "";
  } else {
    window.location.reload();
  }
});
