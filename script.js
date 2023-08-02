const apiBaseUrl = "https://api.themoviedb.org/3/";
const apiKey = "d6bd8af122f2b68bc1dee55e05623e10";
const imageBaseUrl = 'https://image.tmdb.org/t/p/w300';

const moviesGrid = document.getElementById('movies-grid');

async function fetchMoviesNowPlaying() {          /*create an async function to perform API call */
    const response = await fetch(`${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`);  /*store the result in response */
    const jsonResponse = await response.json();      /*convert the response to JSON */
		const movies = jsonResponse.results;   /*store the result attribute from JSON  in movies */
        displayMovies(movies); 
}

function displayMovies(movies) {  /*create function to fetch movie poster using base url and movie poster path */
    moviesGrid.innerHTML = movies.map( movie => 
      
        ` <div class = "movie-card">
        <img src = "${imageBaseUrl}${movie.poster_path}"/>
        <p>⭐${movie.vote_average}</p>
        <h1>${movie.title}</h1>
        </div>
        
        ` 
        
        ).join(""); /* use join to convert the array of string derived from map into a single long string to use with inner HTML */
}

fetchMoviesNowPlaying();