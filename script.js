const apiBaseUrl = "https://api.themoviedb.org/3/";
const apiKey = "d6bd8af122f2b68bc1dee55e05623e10";
const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

const moviesGrid = document.getElementById("movies-grid");

const searchInput = document.getElementById("search-input");  // variable to hold query //
const searchForm = document.getElementById("search-form"); 
const categoryTitle = document.getElementById("category-title");

//create an async function to perform API call //
async function fetchMoviesNowPlaying() {
  const response = await fetch(
    `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`
  ); 
  const jsonResponse = await response.json();
  const movies = await Promise.all (
    jsonResponse.results.map(async (movie) => ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie,
        IMDbId: await getIMDbId(movie.id)
  }))
  )
  displayMovies(movies);
}

 // create function to fetch movie poster using base url and movie poster path //
function displayMovies(movies) {
  moviesGrid.innerHTML = movies
    .map(
      (movie) =>
        ` <div class = "movie-card">
        <a href = "https://www.imdb.com/title/${movie.IMDbId}/"> 
        <img src = "${imageBaseUrl}${movie.poster_path}"/>
        <p>⭐${movie.vote_average}</p>
        <h1>${movie.title}</h1>
        </div>
        
        `
    )
    .join(
      ""
    ); // use join to convert the array of string derived from map into a single long string to use with inner HTML //
}

//function to handle search form on submit //
function handleSearchFormSubmit(event) {
    event.preventDefault();
    categoryTitle.innerHTML = "Search Results"
    const searchQuery = searchInput.value;
    const movies = searchMovies(searchQuery);
    displayMovies(movies);
}



async function searchMovies(query) {
    const response = await fetch(`${apiBaseUrl}/search/movie?api_key=${apiKey}&query="${query}"`);
    const jsonResponse = await response.json();
    const movies = jsonResponse.results;
    displayMovies(movies);
}

async function getIMDbId(movieId){
    const response = await fetch(`${apiBaseUrl}/movie/${movieId}/external_ids?api_key=${apiKey}`);
    const jsonResponse = await response.json();
    return jsonResponse.imdb_id;

}

searchMovies("Batman");

searchForm.addEventListener("submit", handleSearchFormSubmit);
fetchMoviesNowPlaying(); 

// console.log(getIMDbId(550))