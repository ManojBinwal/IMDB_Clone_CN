// API key, base URL, and image URL for the Movie Database API
const API_KEY = 'api_key=d6bd8af122f2b68bc1dee55e05623e10';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

// Get the movie id from the URL parameter
let movieId = '';
const urlParams = new URLSearchParams(location.search);
for (const [key, value] of urlParams) {
    movieId = value;
}

// Construct the API URL for the movie details
let movieDetailsUrl = `/movie/${movieId}?language=en-US&append_to_response=videos&`;
let fullUrl = BASE_URL + movieDetailsUrl + API_KEY;

// Call the API to get the movie details
apiCall(fullUrl);

// Function to make an API call using XMLHttpRequest
function apiCall(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('get', url);
    xhr.send();
    xhr.onload = function () {
        document.getElementById('movie-display').innerHTML = '';
        const response = xhr.response;
        const jsonData = JSON.parse(response);
        getMovies(jsonData);
    };
    xhr.onerror = function () {
        window.alert('Failed to retrieve data');
    };
}

// Function to display movie details on the movie details page
function getMovies(movieData) {
    // Get the movie YouTube trailer link
    const movieTrailer = movieData.videos.results.filter(filterTrailer);

    // Set the background image for the page
    document.body.style.backgroundImage = `url(${IMAGE_URL + movieData.backdrop_path}), linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0) 250%)`;

    // Create a div for the movie details
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('each-movie-page');

    // Set the YouTube trailer URL
    let youtubeURL;
    if (movieTrailer.length === 0) {
        youtubeURL = movieData.videos.results.length === 0 ? '' : `https://www.youtube.com/embed/${movieData.videos.results[0].key}`;
    } else {
        youtubeURL = `https://www.youtube.com/embed/${movieTrailer[0].key}`;
    }

    // Create the HTML for the movie details page
    movieDiv.innerHTML = `
        <div class="movie-poster">
            <img src=${IMAGE_URL + movieData.poster_path} alt="Poster">
        </div>
        <!-- Other movie details (title, tagline, duration, release date, rating, etc.) -->
        <!-- ... -->
    `;

    // Append the movie details div to the movie-display container
    document.getElementById('movie-display').appendChild(movieDiv);

    // Add event listeners to play and stop the YouTube video
    // ...

}

// Function to filter the video for the movie trailer
function filterTrailer(obj) {
    const videoTitle = obj.name;
    const regex = /Official Trailer/i;
    if (videoTitle.match(regex)) {
        return obj;
    }
}
