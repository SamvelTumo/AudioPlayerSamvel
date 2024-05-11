let data = {
    title: [
        "Miyagi - Kosandra",
        "2 Pac - All Eyez On Me",
        "Eminem - Mockingbird",
        "Miyagi - Yamakasi"],
    song: ["music/Miyagi & Andy Panda – Kosandra.mp3", "On Me (Dj Belite Remix).mp3", "Eminem – Mockingbird.mp3", "Miyagi & Andy Panda – Yamakasi.mp3"],
    poster: ["https://i1.sndcdn.com/artworks-anyyVSIXMl2Y6nLs-3lFOcg-t500x500.jpg", "https://www.emp.co.uk/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dw47a0c1d3/images/4/7/5/5/475575d.jpg?sfrm=png", "https://i.pinimg.com/originals/1f/76/f1/1f76f19400952fbf65c63e5fbb2e07d5.jpg", "https://images.genius.com/cf2f320a368e711c369764f0b62bf772.1000x1000x1.png"]
    
}

let song = new Audio()

window.onload = function (){
    playSong()
}

let currentSong = 0

function playSong (){
    song.src = data.song[currentSong]
    let songTitle = document.getElementsByClassName("songTitle")
    songTitle[0].textContent = data.title[currentSong]
    let img = document.getElementsByClassName("row1")
    img[0].style.backgroundImage = "url("+ data.poster[currentSong] +")"
    let main = document.getElementsByClassName("main")
    main[0].style.backgroundImage = "url("+ data.poster[currentSong] +")"
}

function playOrPause(){
    let play = document.getElementById("play")

    if(song.paused){
        song.play()
        play.src = "Photos/pause.png"

    }else{
        song.pause()
        play.src = "Photos/play-button-arrowhead.png"
    }
} 