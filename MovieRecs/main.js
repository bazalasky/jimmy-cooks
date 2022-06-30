let APIKEY = '75cd58ba7fdf29b8b74300d1e35505e3';
let baseURL = 'https://api.themoviedb.org/3/';
let configData = null;
let baseImageURL = 'https://image.tmdb.org/t/p/original/';

$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchField').val();
        getMovies(searchText);
        e.preventDefault();
    })
});

function showMovieDetails(id) {
    let url = ''.concat(baseURL, 'movie/' , id, '?api_key=', APIKEY, '&language=en-US');
    fetch (url)
    .then(result => result.json())
    .then((data) => {
        console.log(data);
    })
}

function getMovies(searchText) {
    let url = ''.concat(baseURL, 'search/movie?api_key=', APIKEY, '&query=', searchText);
    fetch(url)
    .then(result => result.json())
    .then((data) => {
        let movies = data.results;
        let output = '';
        $.each (movies, (index, movie) => {
            output +=
            '<div class="col-md-3" style="margin-top: 20px; margin-bottom: 20px; cursor: pointer;" onclick="showMovieDetails(' + movie.id + ')"><div class="card text-center"><img src="' + baseImageURL + movie.poster_path + '"><h5>' + movie.title +'</h5><p>' + movie.release_date + '</p></div></div>';
            
            $('#moviesList').html(output);
        })
    })
}

