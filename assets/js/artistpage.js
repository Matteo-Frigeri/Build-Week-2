const urlArtist = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
const urlSearch = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const urlTrack = "https://striveschool-api.herokuapp.com/api/deezer/track/";
const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get("id")

populateArtistPage(id)


async function populateArtistPage(id){
    await fetch(urlArtist + id, {
        headers: headers,
      })
        .then((response) => response.json())
        .then((artist) => {
            console.log(artist)
            printArtistInfo(artist)
            printArtistSongs(artist)
        })
        .catch((err) => console.log(err));
}

function printArtistInfo(artist){
    let artistName = artist.name
    let artistFans = artist.nb_fan
    let artistPicture = artist.picture_big

    let coverImageArtist = document.querySelector(".artistPicture")
    coverImageArtist.setAttribute("style", `background-image: url('${artistPicture}')`)
    
    let containerArtistName = document.querySelector(".artistName")
    containerArtistName.innerText = artistName

    let containerArtistFans = document.querySelector(".nb_fan")
    containerArtistFans.innerText = "Ascoltatori mensili: " + artistFans
}


async function printArtistSongs(artist){
    let artistName = artist.name
    await fetch(urlSearch + artistName, {
        headers: headers
    })
    .then(res => res.json())
    .then(songsList => {
        populateSongs(songsList)
    })
    .catch(err => console.log(err))
}

let firstSong = ''

function populateSongs(songsList){
   firstSong = songsList.data[0]

    for (let i = 0 ; i < 5 ; i++){
        let title = songsList.data[i].title
        let rank = songsList.data[i].rank
        let idTrack = songsList.data[i].id
        let duration = songsList.data[i].duration
        let minutes = Math.floor(duration / 60)
        let seconds = (duration % 60).toString()
        if(seconds.length === 1){
            seconds = "0" + seconds
        }
        let time = `${minutes}:${seconds}`

        let image = songsList.data[i].album.cover_medium
        let songCard = `<li class="row pt-2 my-2 popular align-items-center" onclick="populateFooter(this.id)" id="id${idTrack}">
                <span class="col-1">${i + 1}</span>
                <img class="img-fluid col-2 ps-2" src=${image} alt="immagine traccia" style="width: 15%; height: 15%;">
                <p class="col ps-2 d-inline">${title}</p>
                <p class="col-3 d-inline text-secondary">${rank}</p>
                <p class="col-1 d-inline text-secondary me-3">${time}</p>
            </li>`
        let containerSongsList = document.querySelector(".songsList")
        containerSongsList.innerHTML += songCard
    }
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
        })
        .catch((err) => console.log(err));
}