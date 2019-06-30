const movieApiKey = 'api_key=f565fbe8e4c3d996435b7ecb4cbacbc0'
const movieBaseUrl = 'https://api.themoviedb.org/3/search/movie'
const movieSearchUrl = 'https://api.themoviedb.org/3/movie/'
const movieAdditionalQs = '&page=1&include_adult=false'
const posterBaseUrl = 'https://image.tmdb.org/t/p/w500/'

const songBaseUrl ='http://ws.audioscrobbler.com/2.0/?method=track.search&track='
const songSearchUrl = 'http://ws.audioscrobbler.com/2.0/?method=track.getInfo'
const songApiKey ='&api_key=5693fd68291fa577eff3066dbff9bbc2'
const songAdditionalQs ='&format=json'



function handleMovieSearch() {
  $('#movie-form').submit(function(event){
    event.preventDefault()
    movieSearch = $('#movie-value').val()
    encodedMovieSearch = encodeURIComponent(movieSearch)
    fetchMovieData(encodedMovieSearch)
  })

}
function fetchMovieData(movieSearchData) {
  url = `${movieBaseUrl}?${movieApiKey}&language=en-US&query=${movieSearchData}${movieAdditionalQs}`
  fetch(url)
  .then(function(response){
    return response.json()
  })
  .then(function(responseJson) {
    getSpecificMovie(responseJson)
  })
}
function getSpecificMovie(data) {
  movieId = data.results[0].id
  idUrl = `${movieSearchUrl}${movieId}?${movieApiKey}&language=en-US&append_to_response=similar,credits`
  fetch(idUrl)
  .then(function(response){
    return response.json()
  })
  .then(function(responseJson){
    console.log(responseJson)
    displayMovieData(responseJson)
  })
}

function displayMovieData(data) {
  console.log(data.release_date)
  displayMovieImage(data)
  console.log(data.credits.crew[0].name)
  console.log(data.credits.cast[0].name)
  console.log(data.credits.cast[1].name)
  console.log(data.credits.cast[2].name)
  console.log(data.overview)
  console.log(data.similar.results[0].title)
  console.log(data.similar.results[1].title)
  console.log(data.similar.results[2].title)
}
function displayMovieImage(imageData){
  posterPath = imageData.poster_path
  posterUrl = `${posterBaseUrl}${posterPath}`
  $('#results-section').append(`<img src='${posterUrl}'></img>`)
}
  

function handleSongSearch() {
$('#song-form').submit(function(event){
  event.preventDefault()
  songSearch = $('#song-value').val()
  encodedSongSearch = encodeURIComponent(songSearch)
  fetchSongData(encodedSongSearch)
})
}

function fetchSongData(songData){
  url = `${songBaseUrl}${songData}${songApiKey}${songAdditionalQs}`
  fetch(url)
  .then(function(response){
    return response.json()
  })
  .then(function(responseJson){
    songData = responseJson
    songNum = songData.results.trackmatches.track[0].mbid
    getSpecificSong(songNum)
    console.log(songNum)
    console.log(songData)
  })
}

function getSpecificSong(songNum) {
  songIdUrl = `${songSearchUrl}${songApiKey}&mbid=${songNum}${songAdditionalQs}`
  console.log(songIdUrl)
  fetch(songIdUrl)
  .then(function(response){
    return response.json()
  })
  .then(function(responseJson){
    console.log(responseJson)
    displayMusicData(responseJson)
  })
}

function displayMusicData(musicData){
  console.log(musicData.track.wiki.published)
  musicImg = (musicData.track.album.image[3]["#text"])
  displayMusicImage(musicImg)
  console.log(musicImg)
}

function displayMusicImage(musicImgSrc) {
  console.log(musicImgSrc)
  $('#results-section').append(`<img src="${musicImgSrc}"</img>`)
}

function callHandles() {
  handleMovieSearch()
  handleSongSearch()
}


$(callHandles)