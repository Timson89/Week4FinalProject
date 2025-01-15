// Timothy Olofson
// January 14th 2025
// Frontend Simplified(FES)
// Week 4 Final - APIs


const form = document.querySelector('form');
const container = document.querySelector('.image__container');
// const movieListEl = document.querySelector('.movie__info')

form.addEventListener('submit',(e) => {

    e.preventDefault();

    let query = form.querySelector('input').value;

    // console.log(query);

    tvMazeApi(query);
  }
)

async function tvMazeApi(query) {

  const req = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);

  const movies = await req.json();

  // movieListEl.innerHTML = movies.map((movie) => movieHTML(movie).join(''));

 showMovies(movies);
}

function showMovies(movies) {

  for(let movie of movies) {

    let src = movie.show.image.medium;

    const img = document.createElement('img');

    img.src = src;

    container.appendChild(img);
  }
}

// function movieHTML(movie) {

//   return ` <div class="movie__info">
//             <div class="movie__info--container">
//               <p class="movie__rating">Rating: ${movie.rating}</p>
//               <p class="movie__name">Name: </p>
//               <p class="movie__year">Year: </p>
//               <p class="movie__lang">Language: </p>
//               <p class="movie__genre">Genre: </p>
//               <p class="movie__off-site">Official Website: </p>
//             </div>
//           </div>`;
// }