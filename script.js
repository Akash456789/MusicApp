let songIndex = 0;
let audioElement = new Audio('song/3.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif')
let mastersongName = document.getElementById('mastersongName')
let songItem = Array.from(document.getElementsByClassName('songItem'))

let song = [
    { songName: "love dose", filePath: "song/1.mp3", coverPath: "cover/1.jpg" },
    { songName: "desi boy", filePath: "song/2.mp3", coverPath: "cover/2.jpg" },
    { songName: "lut gaye", filePath: "song/3.mp3", coverPath: "cover/3.jpg" },
    { songName: "tum hi ho", filePath: "song/4.mp3", coverPath: "cover/4.jpg" },
    { songName: "loca", filePath: "song/5.mp3", coverPath: "cover/5.jpg" },
]

songItem.forEach((element, i) => {

    element.getElementsByTagName("img")[0].src = song[i].coverPath
    element.getElementsByClassName("songName")[0].innerText = song[i].songName
})

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

//listen to events
audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate')
        //update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    console.log(progress)
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle')
        element.classList.add('fa-play-circle')
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays()
        songIndex = parseInt(e.target.id);
        console.log(e.target);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `song/${songIndex+1}.mp3`;
        mastersongName.innerText = song[songIndex].songName
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 4) {
        songIndex = 0
    } else {
        songIndex += 1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    mastersongName.innerText = song[songIndex].songName
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})


document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0
    } else {
        songIndex -= 1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    mastersongName.innerText = song[songIndex].songName
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
