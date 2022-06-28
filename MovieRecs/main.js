let APIKEY = '75cd58ba7fdf29b8b74300d1e35505e3';
let baseURL = 'https://api.themoviedb.org/3/';
let configData = null;
let baseImageURL = null;

$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchField').val();
        getMovies(searchText);
        e.preventDefault();
    })
});

function getMovies(searchText) {
    let url = ''.concat(baseURL, 'search/keyword?api_key=', APIKEY, '&query=', searchText);
    fetch(url)
    .then(result => result.json())
    .then((data) => {
        document.getElementById('movies').innerHTML = JSON.stringify(data, null, 4);
    })
}