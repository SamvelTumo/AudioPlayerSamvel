let data = {
    singer: [
        "Miyagi & Endshpil ",
        "2Pac",
        "Eminem",
        "Miyagi & Endshpil",
    ],
    title: [
        "Kosandra",
        "All Eyez On Me",
        "Mockingbird",
        "Yamakasi"
    ],
    song: [
        "music/Miyagi & Andy Panda – Kosandra.mp3", 
        "music/2Pac, Big Syke – All Eyez On Me (Dj Belite Remix).mp3",
        "music/Eminem – Mockingbird.mp3", 
        "music/Miyagi & Andy Panda – Yamakasi.mp3"
    ],
    poster: [
        "https://ideogram.ai/api/images/direct/lNGrJDcmRq2rvS_D5qOeBw.png",
        "https://ideogram.ai/api/images/direct/5CifQVIHRhatKTfv1c7wwA.png",
        "https://i.pinimg.com/564x/88/51/c5/8851c5fca759677bb77399b3b8baced5.jpg",
        "https://ideogram.ai/api/images/direct/c06MT5ChQFeJgSLJUJonpg.png"
    ]
}

let song = new Audio();
let currentSong = 0;

window.onload = function () {
    playSong();
}

function playSong() {
    song.src = data.song[currentSong];
    let songTitle = document.getElementsByClassName("songTitle");
    songTitle[0].textContent = data.title[currentSong];
    let singer = document.getElementsByClassName("singer");
    singer[0].textContent = data.singer[currentSong];
    let img = document.getElementsByClassName("row1");
    img[0].style.backgroundImage = "url(" + data.poster[currentSong] + ")";
    let main = document.getElementsByClassName("main");
    main[0].style.backgroundImage = "url(" + data.poster[currentSong] + ")";
    
    // Preload the next song to avoid delay in updating information
    if (currentSong < data.song.length - 1) {
        let nextSong = new Audio();
        nextSong.src = data.song[currentSong + 1];
        nextSong.addEventListener("canplaythrough", function() {
            nextSong.remove(); // Remove the preloaded audio element
        });
    }
}

function playOrPause() {
    let play = document.getElementById("play");

    if (song.paused) {
        song.play();
        play.src = "Photos/pause.png";
    } else {
        song.pause();
        play.src = "Photos/play-button-arrowhead.png";
    }
}

song.addEventListener("timeupdate", function () {
    let fill = document.getElementsByClassName("fill");
    let position = song.currentTime / song.duration;
    fill[0].style.width = position * 100 + "%"; // Use width instead of margin-left

    convertTime(song.currentTime);
    if (song.ended) {
        next();
    }
});

function convertTime(seconds) {
    currentTime = document.getElementsByClassName("currentTime");
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);

    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;
    currentTime[0].textContent = min + ":" + sec;
    totalTime(Math.round(song.duration));
}

function totalTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);

    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;
    currentTime[0].textContent += " / " + min + ":" + sec;
}

function next() {
    currentSong++;
    if (currentSong >= data.song.length) {
        currentSong = 0;
    }
    playSong();
    song.play();
    document.getElementById("play").src = "Photos/pause.png";
}

function prev() {
    currentSong--;
    if (currentSong < 0) {
        currentSong = data.song.length - 1;
    }
    playSong();
    song.play();
    document.getElementById("play").src = "Photos/pause.png";
}

// Seek bar functionality
document.querySelector('.handle').addEventListener('click', function (event) {
    let bar = this;
    let newTime = (event.offsetX / bar.offsetWidth) * song.duration;
    song.currentTime = newTime;
});

function mute() {
    let mute = document.getElementById("mute");

    if (song.muted) {
        mute.src = "Photos/volume.png";
        song.muted = false;
    } else {
        mute.src = "Photos/volume-mute.png";
        song.muted = true;
    }
}

function decrease() {
    song.volume -= 0.2;
}

function increase() {
    song.volume += 0.2;
}

