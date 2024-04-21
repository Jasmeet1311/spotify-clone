let currentSong = new Audio();
async function getSongs() {
  let songs = await fetch("http://127.0.0.1:5500/songs/");
  let response = await songs.text(); // html document
  // console.log(response);
  let div = document.createElement("div");
  div.innerHTML = response;
  let a = div.getElementsByTagName("a");
  // console.log(a);
  let song = [];
  for (let i = 0; i < a.length; i++) {
    const element = a[i];
    if (element.href.endsWith(".mp3")) {
      song.push(element.href.split("/songs/")[1]);
    }
  }
  return song;
}
function playMusic(music,pause=false){
  currentSong.src="/songs/"+music; 
    if (!pause) {
      currentSong.play(music);
      play.src="https://cdn.hugeicons.com/icons/pause-solid-rounded.svg";
    }
    // let audio = new Audio("/songs/"+music);          
    // currentSong.play(music);
    document.querySelector(".song-info").innerHTML = decodeURI(music);
    document.querySelector(".song-time").innerHTML ="00:00";
    
  
}
function secondsToMinutesSeconds(seconds) {
  // Calculate minutes and remaining seconds
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = Math.floor(seconds % 60);
  
  // Format minutes and seconds with leading zeros if necessary
  var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  var formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
  
  // Return the formatted time as a string
  return formattedMinutes + ':' + formattedSeconds;
}

async function main() {
  
  let songs = await getSongs();
  playMusic(songs[0], true);  
  // console.log(songs);
  let songUL = document.getElementsByTagName("ol")[0];
  // console.log(songUL);
  for (const song of songs) {
    songUL.innerHTML = songUL.innerHTML + `
    <li class="flex">
                    <img class="invert p-1" src="https://cdn.hugeicons.com/icons/music-note-03-stroke-rounded.svg" alt="music-note-03" width="24" height="24" />
                    <div class="info">
                      <div class="song-name" style="padding: 10px">${song.replaceAll("%20"," ")}</div>
                    </div>
                    <img class="invert" src="https://cdn.hugeicons.com/icons/play-circle-solid-rounded.svg" alt="play-circle" width="24" height="24" />
                  </li>`;
  }
  
  // Attach event listener to each song
  let arr = Array.from(document.querySelector(".song-list").getElementsByTagName("li"));
  // Array.from returns array
  arr.forEach((e)=>{
    // console.log(e);
    e.addEventListener("click",(element)=>{
      let music = e.querySelector(".song-name").innerHTML;
      console.log(music);
      playMusic(music);
    })

    })

    // Attach event listener to previous,play,next
    let play = document.getElementById("play");  
    // console.log(play);
    play.addEventListener("click",()=>{
      if (currentSong.paused) {
        currentSong.play();
        play.src="https://cdn.hugeicons.com/icons/pause-solid-rounded.svg";
      }
      else{
        currentSong.pause();
        play.src="https://cdn.hugeicons.com/icons/play-circle-solid-rounded.svg";
      }
    })

    // Listen for time update event
      currentSong.addEventListener("timeupdate",()=>{
      // console.log(secondsToMinutesSeconds(currentSong.currentTime),secondsToMinutesSeconds(currentSong.duration));
      document.querySelector(".song-time").innerHTML =  `${secondsToMinutesSeconds(currentSong.currentTime)}`;
      document.getElementById("total-time").innerHTML =`${secondsToMinutesSeconds(currentSong.duration)}`;  
      document.querySelector(".circle").style.left = (currentSong.currentTime/ currentSong.duration) * 100 + "%";
    })

  // Add an event listenser to seekbar
  document.querySelector(".seekbar").addEventListener("click",(e)=>{
    let percent = e.offsetX/e.target.getBoundingClientRect().width * 100;
    console.log(e.offsetX, e.target.getBoundingClientRect());
    document.querySelector(".circle").style.left = (percent)+ "%";
    currentSong.currentTime = ((currentSong.duration)*percent) /100;
    
    
  })
}
main();
