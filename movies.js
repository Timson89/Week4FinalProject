// Timothy Olofson
// January 14th 2025
// Frontend Simplified(FES)
// Week 4 Final - APIs


const movieSearchBox = document.getElementById('search__movie--text-box');
const searchList = document.getElementById('search__movie--list');
const resultGrid = document.getElementById('result__grid');

// load movies from API

async function loadMovies(searchTerm) {

  const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=dfa6e870`;
  const res = await fetch(`${URL}`);
  const  data = await res.json();

  if (data.response == 'True') {

    displayMovieList(data.Search);
  }
}

function findMovies() {

  let searchTerm = (movieSearchBox.value).trim();

  if (searchTerm.length > 0) {

    searchList.classList.remove('search__movie--hide-list') {

    } else {

      searchList.classList.add('search__movie--hide-list')
    }
  }
}

function displayMovieList(movies) {


}