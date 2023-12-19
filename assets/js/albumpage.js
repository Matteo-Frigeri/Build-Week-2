const urlAlbum = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const urlSearch = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const urlTrack = "https://striveschool-api.herokuapp.com/api/deezer/track/";
const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get("id")

populateAlbumPage(id)


async function populateAlbumPage(id){
    await fetch(urlAlbum + id, {
        headers: headers,
      })
        .then((response) => response.json())
        .then((album) => {
            console.log(album)
            printAlbumInfo(album)
            printAlbumSongs(album)
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


function printAlbumInfo(album){
    let albumTitle = album.title
    let albumArtist = album.artist.name
    let albumCover = album.cover_big
    let albumRelease = album.release_date
    let artistImage = album.artist.picture_small
    let albumReleaseYear = albumRelease.substring(0,4)
    let tracksNumber = album.nb_tracks
    let albumDuration = album.duration 

    let minutes = Math.floor(albumDuration / 60)
    let seconds = (albumDuration % 60).toString()
    if(seconds.length === 1){
        seconds = "0" + seconds
    }
    let time = `${minutes} min e ${seconds} sec`

    let containerAlbumCover = document.querySelector(".albumCover")
    containerAlbumCover.setAttribute("src", `${albumCover}`)

    let containerAlbumName = document.querySelector(".albumName")
    containerAlbumName.innerText = albumTitle

    let containerArtistImage = document.querySelector(".artistImage")
    containerArtistImage.setAttribute("src", `${artistImage}`)
    
    let containerAlbumInfo = document.querySelector(".albumInfo")
    containerAlbumInfo.innerText = `${albumArtist} • ${albumReleaseYear} • ${tracksNumber} brani, ${time}`
}


// titolo, nome artista, rank, time

function printAlbumSongs(album) {
    let songs = album.tracks.data
    songs.forEach((element, index) => {
        let title = element.title_short
        let artist = element.artist.name
        let rank = element.rank
        let duration = element.duration
        let minutes = Math.floor(duration / 60)
        let seconds = (duration % 60).toString()
        if(seconds.length === 1){
            seconds = "0" + seconds
        }
        let time = `${minutes}:${seconds}`
        let idTrack = element.id

        let songCard = `
        <li class="row pt-2 popular align-items-center" onclick="populateFooter(this.id)" id="id${idTrack}")>
            <span class="col-1">${index + 1}</span>
            <div class="col-6 d-flex flex-column">
                <span class="text-light songTitle">${title}</span>
                <span class="artistName h6">${artist}</span>
            </div>
            <p class="col-3 rank">${rank}</p>
            <p class="col-1 ms-4 time">${time}</p>
        </li>`
        let songsList = document.querySelector(".songsList")
        songsList.innerHTML += songCard
    })
}


let chosenTrack = ''

function populateFirstFooter(){
    fetch(urlTrack + firstSong.id, {
        headers: headers,
      })
        .then((response) => response.json())
        .then((song) => {
            console.log(song)
            getFooterInfo(song)
        })
        .catch((err) => console.log(err));
}

function getFooterInfo(song){
    let footerContainer = document.querySelector('.footerContainer')
    footerContainer.innerHTML = ''
    let albumPicture = song.album.cover_small
    let albumArtist = song.artist.name
    let songTitle = song.title


    footerContainer.innerHTML += `<div class="col-2 me-2 p-0 d-none d-sm-block"><img src=${albumPicture} alt="avatar"
    class="customAvatar m-3">
    </div>
    <div class="col-6 ms-1">
    <small class="fw-bold text-light text-nowrap p-0 ms-3 mb-0 footerFont">${songTitle}</small>
    <small class="text-secondary m-0 text-nowrap p-0 mb-3 ms-3 mt-0 footerFont">${albumArtist}</small>
    </div>`
}

function populateFooter(id){
    let track = id.substring(2)
    console.log(track)
    fetch(urlTrack + track, {
        headers: headers,
      })
        .then((response) => response.json())
        .then((song) => {
            console.log(song)
            getFooterInfo(song)
            saveSong(song)
        })
        .catch((err) => console.log(err));
}

function saveSong(song){
  let stringSong = JSON.stringify(song)
  localStorage.setItem("song", stringSong)

}

let newString = localStorage.getItem("song")

let newJson = JSON.parse(newString)
function createFooter(song){
  let footerContainer = document.querySelector('.footerContainer')
    footerContainer.innerHTML = ''
    let albumPicture = song.album.cover_small
    let albumArtist = song.artist.name
    let songTitle = song.title


    footerContainer.innerHTML += `<div class="col-2 me-2 p-0 d-none d-sm-block"><img src=${albumPicture} alt="avatar"
    class="customAvatar m-3">
    </div>
    <div class="col-6 ms-1">
    <small class="fw-bold text-light text-nowrap p-0 ms-3 mb-0 footerFont">${songTitle}</small>
    <small class="text-secondary m-0 text-nowrap p-0 mb-3 ms-3 mt-0 footerFont">${albumArtist}</small>
    </div>`
}

createFooter(newJson);