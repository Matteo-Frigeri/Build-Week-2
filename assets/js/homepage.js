const urlTrack = "https://striveschool-api.herokuapp.com/api/deezer/track/";
const urlAlbum = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const urlArtist = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
const urlSearch = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const bannerHomeQueen = [9997018, 12206946, 12206933, 568120932, 7868649];
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
window.onload = init();

function init() {
  let index = Math.floor(Math.random() * 5);
  let id = bannerHomeQueen[index];

  fetch(urlTrack + id, {
    headers: headers,
  })
    .then((response) => response.json())
    .then((track) => {
      populateBannerHome(track);
    })
    .catch((err) => console.log(err));

  fetch("https://striveschool-api.herokuapp.com/api/product/", {
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
                            <h1 class="display-5 fw-bold lh-1 mb-2 text-nowrap">${track.title_short}</h1>
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
    <div class="bg-secondary mb-2 d-flex rounded align-items-center gap-2">
        <img src=${element.imageUrl}
            class="img-fluid rounded-start imgSizing">
        <p class="fw-bold h6">${element.name}</p>
    </div>
</div>`;

    let centralRow = document.getElementById("centralPlaylist");

    centralRow.innerHTML += cardPlaylist;
  });
}

// canzoni = [62710442,]
// immaginiOggetti = [ {
//   "url": "",
//   "titolo": ""
// }]
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
    let albumTitle = array.data[i].album.title;
    let albumId = array.data[i].album.id;
    let albumCover = array.data[i].album.cover_big;

    let xmas = document.querySelector(`#${string}`);
    let centralAlbum = `<div class="col-2">
    <img src=${albumCover} class="w-100 rounded">
    <p class="h6 m-2">${albumTitle}</p>
    <p class="text-secondary h6 m-2">${artistName}</small>
</div>`;

    xmas.innerHTML += centralAlbum;
  }
}
