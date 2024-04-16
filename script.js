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
      song.push(element.href);
    }
  }
  return song;
}
async function main() {
  let songs = await getSongs();
  console.log(songs);
  var audio = new Audio(songs[0]);
  audio.play();
  audio.pause();
  audio.addEventListener("loadeddata", () => {
    let duration = audio.duration;
    console.log(duration/60);
    // The duration variable now holds the duration (in seconds) of the audio clip
  });
}
main();
