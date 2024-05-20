let data = {
    singer: [
        "Miyagi & Endshpil",
        "2Pac",
        "Eminem",
        "Miyagi & Endshpil",
        "Santiz"
    ],
    title: [
        "Kosandra",
        "All Eyez On Me",
        "Mockingbird",
        "Yamakasi",
        "Rastafari"
    ],
    song: [
        "music/Miyagi & Andy Panda – Kosandra.mp3", 
        "music/2Pac, Big Syke – All Eyez On Me (Dj Belite Remix).mp3",
        "music/Eminem – Mockingbird.mp3", 
        "music/Miyagi & Andy Panda – Yamakasi.mp3",
        "music/santiz_-_rastafari.mp3"
    ],
    poster: [
        "https://i1.sndcdn.com/artworks-RaFaybtKkvjDwdHy-SvcrtA-t500x500.jpg",
        "https://i.ytimg.com/vi/3TX-QudCCys/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBse7U-fW_6oh3zJL8op4alOdnOTA",
        "https://eminem.news/wp-content/uploads/2020/08/With-hailie-e1598088722929.jpg",
        "https://images.genius.com/4c5c580b6456d14ed7e62c4e25fd6826.1000x1000x1.jpg",
        "https://i.ytimg.com/vi/RNaUpa313nY/sddefault.jpg"
    ]
}

let song = new Audio();
let currentSong = 0;

window.onload = function () {
    createPlaylist();
    playSong();
}

function createPlaylist() {
    let playlist = document.querySelector('.playlist');
    data.singer.forEach((singer, index) => {
        let item = document.createElement('div');
        item.className = 'playlist-item';
        item.onclick = () => {
            currentSong = index;
            playSong();
            song.play();
            document.getElementById("play").src = "Photos/pause.png";
        };

        let img = document.createElement('img');
        img.src = data.poster[index];
        let info = document.createElement('div');
        info.className = 'info';
        let title = document.createElement('div');
        title.className = 'title';
        title.textContent = data.title[index];
        let singerName = document.createElement('div');
       

        info.appendChild(title);
        info.appendChild(singerName);
        item.appendChild(img);
        item.appendChild(info);
        playlist.appendChild(item);
    });
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

// Function to add a new song to the playlist
function addNewSong() {
    let newSongTitle = document.getElementById('newSongTitle').value;
    let newSinger = document.getElementById('newSinger').value;
    let newSongUrl = document.getElementById('newSongUrl').value;
    let newPosterUrl = document.getElementById('newPosterUrl').value;

    if (newSongTitle && newSinger && newSongUrl && newPosterUrl) {
        // Add new song data to the existing data object
        data.title.push(newSongTitle);
        data.singer.push(newSinger);
        data.song.push(newSongUrl);
        data.poster.push(newPosterUrl);

        // Add new song to the playlist
        let playlist = document.querySelector('.playlist');
        let item = document.createElement('div');
        item.className = 'playlist-item';
        let index = data.title.length - 1;

        item.onclick = () => {
            currentSong = index;
            playSong();
            song.play();
            document.getElementById("play").src = "Photos/pause.png";
        };

        let img = document.createElement('img');
        img.src = newPosterUrl;
        let info = document.createElement('div');
        info.className = 'info';
        let title = document.createElement('div');
        title.className = 'title';
        title.textContent = newSongTitle;
        let singerName = document.createElement('div');
        singerName.className = 'singer';
        singerName.textContent = newSinger;

        info.appendChild(title);
        info.appendChild(singerName);
        item.appendChild(img);
        item.appendChild(info);
        playlist.appendChild(item);

        // Clear the input fields
        document.getElementById('newSongTitle').value = '';
        document.getElementById('newSinger').value = '';
        document.getElementById('newSongUrl').value = '';
        document.getElementById('newPosterUrl').value = '';

        // If the newly added song is the first one, start playing it
        if (data.song.length === 1) {
            playSong();
            song.play();
            document.getElementById("play").src = "Photos/pause.png";
        }
    } else {
        alert('Please fill out all fields');
    }
}

// Update the time of the current song and total time
song.addEventListener("timeupdate", function () {
    let fill = document.getElementsByClassName("fill");
    let position = song.currentTime / song.duration;
    fill[0].style.width = position * 100 + "%";

    convertTime(song.currentTime);
    if (song.ended) {
        next();
    }
});

// Function to convert time format
function convertTime(seconds) {
    currentTime = document.getElementsByClassName("currentTime");
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);

    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;
    currentTime[0].textContent = min + ":" + sec;

    // Get total duration of the song
    totalTime(Math.round(song.duration));
}


//