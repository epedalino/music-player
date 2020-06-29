/**
 * Represents a book.
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 * @returns {object} The object that represents the book.
 */
function createNewBook(title, author) {
}

const songs = [
  "songs/bensound-creativeminds.mp3",
  "songs/bensound-cute.mp3",
  "songs/bensound-goinghigher.mp3",
  "songs/bensound-happyrock.mp3",
  "songs/bensound-inspire.mp3"
];
/**
 *
 * @param {HTMLElement} fileInput - File Input for audio files
 * @returns {string} location of the file in the input
 */
function getLocationFromFileInput(fileInput){
  if (!fileInput.files.length) return;

  const urlObj = URL.createObjectURL(fileInput.files[0]);
  console.log (urlObj)
  return urlObj
}
const list = document.getElementById('songList');
function createSongListItem(title, location) {
    const item = document.createElement('li');
    const titleElement = document.createTextNode(title);
    item.appendChild(titleElement);
    item.dataset.location = location;
    return item;
  }

function createSongList() {
  for(let i = 0; i<songs.length; i++) {
    const title = songs[i];
    const location = songs[i];
    const item = createSongListItem(title, location);
    addSongToList(item);
  }
}
createSongList();

function addSongToList(listItem) {
  //createSongListItem(newInput[0].name)
  list.appendChild(listItem);
}

let input = document.getElementById("fileUpload")
input.addEventListener("change", function(e) {
  if (e.target.files.length > 0) {
    Array.from(e.target.files).forEach((file) => {
      fileUpload.innerHTML += '<br>' + file.name;
      let newInputFiles = e.target.files
      console.log(newInputFiles)
      const title = newInputFiles[0].name;
      console.log(e.target);
      const location = getLocationFromFileInput(e.target)
      const item = createSongListItem(title, location);
      addSongToList(item);
    })
  }
})

const displayCurrentPlayingTrack = (e) => {
  const clickedItem = e.target;
  const location = clickedItem.dataset.location;
  console.log("location", location);
  const source = document.getElementById('source');
  source.src = location;

  document.getElementById('currentlyPlayingSong').innerText= "Currently Playing: "
  document.getElementById('currentSong').innerText=clickedItem.innerText
  player.load()
  player.play()
}
songList.onclick = displayCurrentPlayingTrack;

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
