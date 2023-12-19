const urlSearch = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const urlArtist = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

let imageContent = [
  "Musica",
  "Podcast",
  "Eventi dal vivo",
  "Create per te",
  "Nuove uscite",
  "Il 2023 musica",
  "Il 2023 in Podcast",
  "Merch",
  "Estate",
  "Pop",
  "Buone feste",
  "Hip Pop",
  "Classifiche podcast",
  "Nuove uscite nei podcast",
  "Video podcast",
  "Solo su Spotify",
  "Classifiche",
  "Dance/Elettronica",
  "Latina",
  "Rock",
  "Indie",
  "Scopri",
  "Mood",
  "Sanremo",
  "In auto",
  "Di tendenza",
  "EQUAL",
  "RADAR",
  "Allenamento",
  "Party",
];

// fetch("https://striveschool-api.herokuapp.com/api/product/", {
//   headers: {
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTdjM2ZiY2QxZGYyYjAwMThmMjk3YTQiLCJpYXQiOjE3MDI2NDE1OTYsImV4cCI6MTcwMzg1MTE5Nn0.DI0LNNdE4ZzXf8unKeaj3veYk9cataeFdQ_eZ6YSXZo",
//     "Content-type": "application/json",
//   },
// })
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//     createPlaylist(data);
//   })
//   .catch((err) => console.log(err));

// function createPlaylist(playlist) {
//   playlist.forEach((el) => {
//     let ulPlaylist = document.getElementById("sidebarUl");
//     let liPlaylist = `<li class="list-group-item text-secondary bg-black border-0 ps-0 fw-bold">${el.name}</li>`;

//     ulPlaylist.innerHTML += liPlaylist;
//   });
// }

function getImages(imageContent) {
  imageContent.forEach((element, index) => {
    let randomNumber1 = Math.floor(Math.random() * 256);
    let randomNumber2 = Math.floor(Math.random() * 256);
    let randomNumber3 = Math.floor(Math.random() * 256);
    let card = `<div class="col-5 col-sm-2 cardGenre rounded-3 overflow-hidden position-relative" id="card${index}">
        <h5 class="p-3 p-sm-0 m-2">${element}</h5>
        <img class="rounded position-absolute bottom-0 end-0 m-2" src="./assets/img/logoSpotify.png"
        style="width: 50px; rotate: 25deg;">
    </div>`;
    let cardContainer = document.querySelector(".cardContainer");
    cardContainer.innerHTML += card;
    let singleCard = document.getElementById(`card${index}`);
    singleCard.setAttribute(
      "style",
      `background-color:rgb(${randomNumber1},${randomNumber2},${randomNumber3})`
    );
  });
}

getImages(imageContent);

function searchKeyword() {
  let searchedkeyWord = document.getElementById('searchQuery').value
  
  fetch(urlSearch + searchedkeyWord, {
    headers: headers,
  })
    .then((response) => response.json())
    .then((songs) => {
      populateSearchPage(songs);
      populateArtists(songs);
    });
}

// let oldValue = "";
// function debounce(value) {
//   // if (oldValue === "") {
//   //   oldValue = value;
//   // }
//   setTimeout(() => {
//     // if (oldValue === value) {
//       fetch(
//         `https://striveschool-api.herokuapp.com/api/deezer/search?q=${value}`
//       )
//         .then((response) => response.json())
//         .then((data) => {
//           populateSearchPage(data);
//           populateArtists(data);
//         });
//     // } else {
//     //   oldValue = value;
//     // }
//   }, 1000);
// }

function populateSearchPage(songs) {
  let containerResults = document.querySelector(".containerResults");
  let containerCards = document.querySelector(".containerCards");
  containerCards.style.display = "none";
  let topResultImage = songs.data[0].album.cover_medium;
  let topResultTitle = songs.data[0].title_short;
  let topResultArtist = songs.data[0].artist.name;
  let topResult = `<h2 class="m-3">Miglior risultato</h2>
        <div class="card col-4 m-3 p-3 bg-dark topResultBody">
        <img src=${topResultImage} class="card-img-top" alt="...">
        <div class="card-body d-flex flex-column text-white">
          <span class="card-text h3">${topResultTitle}</span>
          <span class="card-text h6">${topResultArtist}</span>
        </div>
      </div>`;

  containerResults.innerHTML = topResult;
  containerResults.innerHTML += ` <ul class="songsList col-6 ms-2">
      <h2 class="m-1">Brani</h2>                      
      </ul>`;
  for (let i = 1; i < 5; i++) {
    let songImage = songs.data[i].album.cover_medium;
    let songTitle = songs.data[i].title_short;
    let songArtist = songs.data[i].artist.name;
    let songDuration = songs.data[i].duration;
    let minutes = Math.floor(songDuration / 60);
    let seconds = (songDuration % 60).toString();
    if (seconds.length === 1) {
      seconds = "0" + seconds;
    }
    let time = `${minutes}:${seconds}`;
    let songCard = `<li class="row pt-2 my-2 popular align-items-center position-relative bodyCard rounded-3 p-2">
                <img class="col-2 ps-2" src=${songImage} alt="immagine traccia">
                <div class="d-flex flex-column col">
                <span class="col ps-2 text-white">${songTitle}</span>
                <span class="col ps-2">${songArtist}</span>
                </div>
                <p class="col-1 position-absolute end-0 me-3">${time}</p>
            </li>`;

    let list = document.querySelector(".songsList");
    list.innerHTML += songCard;
  }
}
let arrayIdArtist = [];
let artistResults = document.querySelector(".containerResults");

async function populateArtists(songs) {
  arrayIdArtist = [];

  songs.data.forEach((el) => {
    if (!arrayIdArtist.includes(el.artist.id)) {
      arrayIdArtist.push(el.artist.id);
    }
  });

  artistResults.innerHTML += `<h3 class="m-3">Artisti</h3>`;

  for (let i = 0; i < 5; i++) {
    await fetch(urlArtist + arrayIdArtist[i], {
      headers: headers,
    })
      .then((res) => res.json())
      .then((info) => {
        infoArtist(info);
      })
      .catch((err) => console.log(err));
  }
}

function infoArtist(info) {
  let artistName = info.name;
  let artistImage = info.picture_medium;

  let artistCard = `<div class="card col-2 m-1 p-1 bg-dark topResultBody">
    <img src=${artistImage} class="card-img-top rounded-circle" alt="...">
    <div class="card-body d-flex flex-column text-white">
      <span class="card-text h5">${artistName}</span>
      <span class="card-text h6">Artist</span>
    </div>
  </div>`;

  artistResults.innerHTML += artistCard;
}
