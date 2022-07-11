let APIKEY = '75cd58ba7fdf29b8b74300d1e35505e3';
let baseURL = 'https://api.themoviedb.org/3/';
let configData = null;
let baseImageURL = 'https://image.tmdb.org/t/p/original/';

function showMovieDetails() {
    let id = sessionStorage.getItem('movieId')
    if (id) {
        let url = ''.concat(baseURL, 'movie/' , id, '?api_key=', APIKEY, '&language=en-US');
        fetch (url)
        .then(result => result.json())
        .then((data) => {
            let output = '';
            output += '<div class="container"><div class="row" id="movieInfo"><div class="col-sm-4" style="padding-left: 0px;"><div class="card text-center"><img src="' + baseImageURL + data.poster_path + '"></div></div><div class="col-sm-8"><div class="vitals text-center"><h1>' + data.title + '</h1><ul class="list-inline"><li class="list-inline-item">' + data.release_date + '</li><li class="list-inline-item">' + data.runtime + ' min</li></ul></div><p>' + data.overview + '</p><a class="btn btn-primary" href="/MovieRecs/index.html" style="position: absolute; bottom: 25; right: 25;">Back</a></div> </div></div>';
            
            $('#movieInfo').html(output);
        })
    }
    
}

function getSearch(searchText) {
    let url = ''.concat(baseURL, 'search/movie?api_key=', APIKEY, '&query=', searchText);
    fetch(url)
    .then(result => result.json())
    .then((data) => {
        let movies = data.results;
        let output = '';
        $.each (movies, (index, movie) => {
            output +=
            '<div class="col-sm-3" style="margin-top: 20px; margin-bottom: 20px; cursor: pointer;" onclick="movieSelected(' + movie.id + ')"><div class="card text-center"><img src="' + baseImageURL + movie.poster_path + '"><h5>' + movie.title +'</h5><p>' + movie.release_date + '</p><a onclick="movieSelected(' + movie.id + ')" class="btn btn-primary" href="#">Movie Details</a></div></div>';
            
            $('#moviesList').html(output);
        })
    })
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getNowPlaying() {
    let url = ''.concat(baseURL, 'movie/now_playing?api_key=', APIKEY, '&language=en-us');
    fetch(url)
    .then(result => result.json())
    .then((data) => {
        let movies = data.results;
        $.each(movies, (index, movie) => {
            let output = '';
            output += '<div class="col" style="margin-top: 20px; margin-bottom: 20px; cursor: pointer;" onclick="movieSelected(' + movie.id + ')"><div class="card text-center"><img src="' + baseImageURL + movie.poster_path + '"></div></div>';
            $('.slickSlider').slick('slickAdd', output);
        })        
    })
}


