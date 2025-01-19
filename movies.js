// Timothy Olofson
// January 14th 2025
// Frontend Simplified(FES)
// Week 4 Final - APIs


// Titles: https://www.omdbapi.com/?s=guardians&page=1&apikey=32abe755 dfa6e870
// Details: https://www.omdbapi.com/?i=tt3896198&apikey=32abe755 dfa6e8701

const movieSearchBox = document.getElementById('search__movie--text-box');
const searchList = document.getElementById('search__movie--list');
const resultGrid = document.getElementById('result__grid');

// Load Movies from API //

async function loadMovies(searchTerm){

  const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=dfa6e870`;
  const res = await fetch(`${URL}`);
  const  data = await res.json();

  // console.log(data.Search)

  if (data.Response == 'True') displayMovieList(data.Search);
}

// Search Box //

function findMovies(){

  let searchTerm = (movieSearchBox.value).trim();

  // console.log(searchTerm);

  if (searchTerm.length > 0){

    searchList.classList.remove('hide__search--list'); 
    loadMovies(searchTerm);

  } else {

      searchList.classList.add('hide__search--list');
  }
}

// Movie List Dropdown //

function displayMovieList(movies){

  searchList.innerHTML = '';

  for ( let idx = 0; idx < movies.length; idx++ ){

    let movieListItem = document.createElement('div');
    movieListItem.dataset.id = movies[idx].imdbID;

    // movie id in data-id //

    movieListItem.classList.add('search__movie--list-item');

    if (movies[idx].Poster != 'N/A')

      moviePoster = movies[idx].Poster;

    else 

      moviePoster = 'No-Image-Placeholder.png';
    
    movieListItem.innerHTML = `
    
      <div class="search__movie--item-thumbnail"><img src="${moviePoster}"></div>

      <div class="search__movie--item-info">

        <h3>${movies[idx].Title}</h3>
        <p>${movies[idx].Year}</p>

      </div>

    `;
    searchList.appendChild(movieListItem);
  }
  loadMovieDetails();
}

function loadMovieDetails(){

  const searchListMovies = searchList.querySelectorAll('.search__movie--list-item');

  searchListMovies.forEach(movie => {

    movie.addEventListener('click', async () => {

      // console.log(movie.dataset.id); //

      searchList.classList.add('hide__search--list');
      movieSearchBox.value = '';
      const result = await fetch(`https://omdbapi.com/?i=${movie.dataset.id}&apikey=dfa6e870`);
      const movieDetails = await result.json();
      
      // console.log(movieDetails);

      displayMovieDetails(movieDetails);
    });
  });
}

function displayMovieDetails(details) {

  resultGrid.innerHTML = `
  
    <div class="movie__poster"><img src="${(details.Poster != 'N/A') ? details.Poster : 'No-Image-Placeholder.png'}" alt="A movie poster"></div>
    
    <div class="movie__info">

      <h3 class="movie__title">${details.Title}</h3>

      <ul class="movie__misc--info">

        <li class="movie__year">Year: ${details.Year}</li>
        <li class="movie__rated">Rating: ${details.Rated}</li>
        <li class="movie__released">Released: ${details.Released}</li>

      </ul>

      <p class="movie__genre"><b>Genre: </b>${details.Genre}</p>
      <p class="movie__writer"><b>Writer: </b>${details.Writer}</p>
      <p class="movie__actors"><b>Actors: </b>${details.Actors}</p>
      <p class="movie__plot"><b>Plot: </b>${details.Plot}</p>
      <p class="movie__language"><b>Language: </b>${details.Language}</p>
      <p class="movie__awards"><b><i class="fas fa-award"></i>Awards: </b>${details.Awards}</p>
    
    </div>
  
  `; 
}

window.addEventListener('click', (event) => {

  if (event.target.className != 'form__control'){

    searchList.classList.add('hide__search--list');
  }
});