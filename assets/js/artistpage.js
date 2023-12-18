const urlArtist = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
const urlSearch = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
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

function populateSongs(songsList){
   
    for (let i = 0 ; i < 5 ; i++){
        let title = songsList.data[i].title
        let rank = songsList.data[i].rank

        let duration = songsList.data[i].duration
        let minutes = Math.floor(duration / 60)
        let seconds = (duration % 60).toString()
        if(seconds.length === 1){
            seconds = "0" + seconds
        }
        let time = `${minutes}:${seconds}`

        let image = songsList.data[i].album.cover_medium
        let songCard = `<li class="row pt-2 my-2 popular align-items-center">
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



