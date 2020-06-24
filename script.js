const songs = [
  "songs/bensound-creativeminds.mp3",
  "songs/bensound-cute.mp3",
  "songs/bensound-goinghigher.mp3",
  "songs/bensound-happyrock.mp3",
  "songs/bensound-inspire.mp3"
];

function changeHandler({
  target
}) {
  // Make sure we have files to use
  if (!target.files.length) return;

  // Create a blob that we can use as an src for our audio element
  const urlObj = URL.createObjectURL(target.files[0]);

  // Create an audio element
  const audio = document.createElement("audio");

  // Clean up the URL Object after we are done with it
  audio.addEventListener("load", () => {
    URL.revokeObjectURL(urlObj);
  });

  // Append the audio element
  document.body.appendChild(audio);

  // Set the src and start loading the audio from the file
  audio.src = urlObj;
}

document
  .getElementById("audio-upload")
  .addEventListener("change", changeHandler);

const list = document.getElementById('songList');

function addSongToList(listItem) {
  list.appendChild(listItem);
}

function createSongListItem(title, location) {
  const item = document.createElement('li');
  const titleElement = document.createTextNode(title);
  item.appendChild(titleElement);
  item.dataset.location = location;
  return item;
}

const createSongList = () => {
  for(let i = 0; i<songs.length; i++) {
    const title = songs[i];
    const location = songs[i];
    const item = createSongListItem(title, location);
    addSongToList(item);
  }
}
createSongList();

songList.onclick = (e) => {
  const clickedItem = e.target
  const location = clickedItem.dataset.location;
  const source = document.getElementById('source')
  source.src = location
  // 'songs/' + clickedItem.innerText

  document.getElementById('currentlyPlayingSong').innerText= "Currently Playing: "
  document.getElementById('currentSong').innerText=clickedItem.innerText
  player.load()
  player.play()
}

const playAudio = () => {
  if(player.readyState) {
    player.play()
  }
}

const pauseAudio = () => {
  player.pause()
}

const slider = document.getElementById('volumeSlider')
slider.oninput = (e) => {
  const volume = e.target.value
  player.volume = volume
}

const updateProgress = () => {
  if(player.currentTime > 0) {
    const progressBar = document.getElementById('progress')
    progressBar.value = (player.currentTime / player.duration) * 100
  }
}
