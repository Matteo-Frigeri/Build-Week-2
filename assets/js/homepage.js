const urlTrack = "https://striveschool-api.herokuapp.com/api/deezer/track/";
const urlAlbum = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const urlArtist = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
const urlSearch = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const bannerHomeQueen = [9997018, 12206946, 12206933, 568120932, 7868649];
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

init();

async function init() {
  let index = Math.floor(Math.random() * 5);
  let id = bannerHomeQueen[index];

  await fetch(urlTrack + id, {
    headers: headers,
  })
    .then((response) => response.json())
    .then((track) => {
      populateBannerHome(track);
    })
    .catch((err) => console.log(err));

  await fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTdjM2ZiY2QxZGYyYjAwMThmMjk3YTQiLCJpYXQiOjE3MDI2NDE1OTYsImV4cCI6MTcwMzg1MTE5Nn0.DI0LNNdE4ZzXf8unKeaj3veYk9cataeFdQ_eZ6YSXZo",
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      createPlaylist(data);
    })
    .catch(err => console.log(err));
}

function populateBannerHome(track) {
  const banner = `
    <div class="announce row d-flex align-items-center p-1 mt-2 mx-1 rounded position-relative">
                        <div class="col-2 ms-0 me-3">
                            <img src="${track.album.cover_medium}" alt="" style="width: 150px">
                        </div>
                        <div class="col-8 ms-5">
                            <p class="mb-3 mt-1">ALBUM</p>
                            <h1 class="display-5 fw-bold lh-1 mb-2">${track.title_short}</h1>
                            <p class="mb-2">${track.artist.name}</p>
                            <p class="mb-2">Ascolta il grande classico dei ${track.artist.name}!</p>
                            <div class="d-grid gap-3 d-flex mb-2 align-items-center">
                                <button type="button" class="btn btn-success rounded-pill h6">Play</button>
                                <button type="button" class="btn btn-outline-light rounded-pill h6">Salva</button>
                                <p class="h4 align-self-start pb-2">...</p>
                            </div>
                        </div>
                        <div
                            class="hideAnnounce col text-secondary text-nowrap position-absolute end-0 top-0 mt-2 me-3 text-center py-1 rounded-pill">
                            NASCONDI ANNUNCI</div>
                    </div>`;

  let bannerContainer = document.querySelector(".bannerContainer");
  bannerContainer.innerHTML = banner;
}

function createPlaylist(playlist) {
  playlist.forEach((el) => {
    let ulPlaylist = document.getElementById("sidebarUl");
    let liPlaylist = `<li class="list-group-item text-secondary bg-black border-0 ps-0 fw-bold">${el.name}</li>`;

    ulPlaylist.innerHTML += liPlaylist;
  });

  playlist.forEach((element) => {
    let cardPlaylist = ` <div class="col-4">
    <div class="bg-black mb-2 d-flex rounded p-2 align-items-center gap-2">
        <img src=${element.imageUrl}
            class="img-fluid rounded imgSizing">
        <p class="fw-bold h6">${element.name}</p>
    </div>
</div>`;

    let centralRow = document.getElementById("centralPlaylist");

    centralRow.innerHTML += cardPlaylist;
  });
}

let xmasArray= []
let loveArray= []
let stopArray= []
let blackArray=[]

function searchQuery(string, array) {
  fetch(urlSearch + string, {
    headers: headers,
  })
    .then((response) => response.json())
    .then((albums) => {
      console.log(albums)
      array = albums;
      createAlbums(string, array)
    });
}

searchQuery('christmas', xmasArray)
searchQuery('love', loveArray)
searchQuery('stop', stopArray)
searchQuery('black', blackArray)

function createAlbums(string, array) {
  let centralPg = document.querySelector('.centralPart');
  let introAlbumCentralPart = `<h5 class="fw-bold my-4 ms-3">More of what you like</h5>
  <div class="container-fluid">
      <div class="row justify-content-evenly" id=${string}>`

    centralPg.innerHTML += introAlbumCentralPart;

  for (let i = 0; i < 5; i++) {

    let artistName = array.data[i].artist.name;
    let artistId = array.data[i].artist.id;
    let albumTitle = array.data[i].album.title;
    let albumId = array.data[i].album.id;
    let albumCover = array.data[i].album.cover_big;

    let xmas = document.querySelector(`#${string}`);
    let centralAlbum = `<div class="col-2 clickable playSong">
    <div class="position-relative">
      <img src=${albumCover} class="w-100 rounded clickable" onclick="goToAlbumPage(${albumId})">
      <svg xmlns="http://www.w3.org/2000/svg" height="28" width="28" viewBox="0 0 512 512" fill="green" class="position-absolute bottom-0 end-0 m-1 hide">
        <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z" />
      </svg>
    </div>
    <p class="h6 m-2 clickable" onclick="goToAlbumPage(${albumId})">${albumTitle}</p>
    <p class="text-secondary h6 m-2 clickable" onclick="goToArtistPage(${artistId})">${artistName}</small>
</div>`;

    xmas.innerHTML += centralAlbum;
  }
}

function goToAlbumPage(id){
  window.location.href = `albumpage.html?id=${id}`
}

function goToArtistPage(id){
  window.location.href = `artistpage.html?id=${id}`
}
