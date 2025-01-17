// Timothy Olofson
// January 14th 2025
// Frontend Simplified(FES)
// Week 4 Final - APIs


const movieSearchBox = document.getElementById('search__movie--text-box');
const searchList = document.getElementById('search__movie--list');
const resultGrid = document.getElementById('result__grid');

// Load Movies from API //

async function loadMovies(searchTerm) {

  const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=32abe755`;
  const res = await fetch(`${URL}`);
  const  data = await res.json();

  if (data.Response == 'True') displayMovieList(data.Search);
}

// Search Box //

function findMovies() {

  let searchTerm = (movieSearchBox.value).trim();

  if (searchTerm.length > 0) {

    searchList.classList.remove('hide__search--list'); 
    loadMovies(searchTerm);

  } else {
      searchList.classList.add('hide__search--list');
  }
}

// Movie List Dropdown //

function displayMovieList(movies) {

  searchList.innerHTML = '';

  for ( let idx = 0; idx < movies.length; idx++ ) {

    let movieListItem = document.createElement('div');

    movieListItem.dataset.id = movies[idx].imdbID;
    movieListItem.classList.add('search__movie--list-item');

    if (movies[idx].Poster != 'N/A')

      moviePoster = movies[idx].Poster;

    else 

      moviePoster = 'image_not_found.png';
    
    movieListItem.innerHTML = `
    
      <div class="search__movie--item-thumbnail">

        <img src="${moviePoster}">

      </div>

      <div class="search__movie--item-info">

        <h3>${movies[idx].Title}</h3>
        <p>${movies[idx].Year}</p>

      </div>

    `;
    searchList.appendChild(movieListItem);
  }
}