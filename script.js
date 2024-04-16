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
async function main() {
  let songs = await getSongs();
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
  
  // console.log(songUL);
  var audio = new Audio(songs[0]);
  // audio.play();
  // audio.pause();
  audio.addEventListener("loadeddata", () => {
    let duration = audio.duration;
    console.log(duration/60);
    // The duration variable now holds the duration (in seconds) of the audio clip
  });
}
main();
