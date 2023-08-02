// API endpoints and key for The Movie Database API
const apiBaseUrl = "https://api.themoviedb.org/3/";
const apiKey = "d6bd8af122f2b68bc1dee55e05623e10";

// Base URL for movie poster images
const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

// DOM elements
const moviesGrid = document.getElementById("movies-grid"); // Container for displaying movie cards
const searchInput = document.getElementById("search-input"); // Input field for search queries
const searchForm = document.getElementById("search-form"); // Search form element
const categoryTitle = document.getElementById("category-title"); // Heading for movie category titles

// Fetch movies currently playing in theaters
async function fetchMoviesNowPlaying() {
  const response = await fetch(
    `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`
  );
  const jsonResponse = await response.json();
  const movies = await Promise.all(
    jsonResponse.results.map(async (movie) => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      IMDbId: await getIMDbId(movie.id),
    }))
  );
  displayMovies(movies);
}

// Display movies on the webpage
function displayMovies(movies) {
  moviesGrid.innerHTML = movies
    .map(
      (movie) => `
      <div class="movie-card">
        <a href="https://www.imdb.com/title/${movie.IMDbId}/"> 
          <img src="${imageBaseUrl}${movie.poster_path}" />
          <p>⭐ ${movie.vote_average}</p>
          <h1>${movie.title}</h1>
        </a>
      </div>`
    )
    .join(""); // Convert the array of strings derived from the map into a single string to use with innerHTML
}

// Handle search form submission
function handleSearchFormSubmit(event) {
  event.preventDefault();
  categoryTitle.innerHTML = "Search Results";
  const searchQuery = searchInput.value;
  searchMovies(searchQuery);
}

// Search movies based on the given query
async function searchMovies(query) {
  const response = await fetch(
    `${apiBaseUrl}/search/movie?api_key=${apiKey}&query="${query}"`
  );
  const jsonResponse = await response.json();
  const movies = jsonResponse.results;
  displayMovies(movies);
}

// Fetch the IMDb ID of a movie based on its TMDB ID
async function getIMDbId(movieId) {
  const response = await fetch(
    `${apiBaseUrl}/movie/${movieId}/external_ids?api_key=${apiKey}`
  );
  const jsonResponse = await response.json();
  return jsonResponse.imdb_id;
}

// Search movies with the query "Batman" (you can replace this with any other query)
searchMovies("Batman");

// Add event listener to handle form submissions
searchForm.addEventListener("submit", handleSearchFormSubmit);

// Fetch and display movies currently playing in theaters
fetchMoviesNowPlaying();

// Example of getting the IMDb ID for the movie with TMDB ID 550 (commented out since it's not currently in use)
// console.log(getIMDbId(550));
