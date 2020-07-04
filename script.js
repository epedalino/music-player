const songs = [
  "songs/bensound-creativeminds.mp3",
  "songs/bensound-cute.mp3",
  "songs/bensound-goinghigher.mp3",
  "songs/bensound-happyrock.mp3",
  "songs/bensound-inspire.mp3"
];

const list = document.getElementById('songList');

/**createSongLingItem function creates song list items
 * @param {string} title - The title of the song.
 * @param {string} location - The song directory location.
 * @returns {HTMLElement} item - Title and location of the song
 */
function createSongListItem(title, location) {
    const item = document.createElement('li');
    const titleElement = document.createTextNode(title);
    item.appendChild(titleElement);
    item.dataset.location = location;
    return item;
  }

/**
 * createSongList function creates the song list based on static array of songs
 * @param {string} title - The title of the song.
 * @param {string} location - The song directory location.
 * @param {HTMLElement} item - Title and location of a song.
 */
  function createSongList() {
    for(let i = 0; i<songs.length; i++) {
      const title = songs[i];
      const location = songs[i];
      const item = createSongListItem(title, location);
      addSongToList(item);
    }
  }
  createSongList();

/**
 * The addSongToList function appends a new listItem to the existing song list
 */
  function addSongToList(listItem) {
    list.appendChild(listItem);
  }

/**
 * Event listener that identifies a change or new song fileUpload.
 * Extracts title and location of the new item and displays the info.
 * @param {HTMLElement} input - new user selected file audio input.
 */
let input = document.getElementById("fileUpload")
input.addEventListener("change", function(e) {
  if (e.target.files.length > 0) {
    Array.from(e.target.files).forEach((file) => {
      fileUpload.innerHTML += '<br>' + file.name;
      let newInputFiles = e.target.files
      const title = newInputFiles[0].name;
      const location = getLocationFromFileInput(e.target)
      const item = createSongListItem(title, location);
      addSongToList(item);
    })
  }
})

/**
 * getLocationFromFileInput identifies the location URL of the song file input
 * @param {string} fileInput - File Input for audio files.
 * @returns {urlObj} - Blob oject representing URL location.
 */
function getLocationFromFileInput(fileInput){
  if (!fileInput.files.length) return;

  const urlObj = URL.createObjectURL(fileInput.files[0]);
  return urlObj;
}

/**
 * displayCurrentPlayingTrack function provides a visual display of the
 * selected song and its location.
 * @param {HTMLElement} location - name and location of the clicked file.
 */
const displayCurrentPlayingTrack = (e) => {
  const clickedItem = e.target;
  const location = clickedItem.dataset.location;
  const source = document.getElementById('source');
  source.src = location;

  document.getElementById('currentlyPlayingSong').innerText= "Currently Playing: ";
  document.getElementById('currentSong').innerText=clickedItem.innerText;
  player.load();
  player.play();
}
songList.onclick = displayCurrentPlayingTrack;

/**
 * Custom control to play the selected song
 */

  const playAudio = () => {
    if(player.readyState) {
      player.play();
    }
  }

/**
 * Custom control to pause the selected song.
 */
  const pauseAudio = () => {
    player.pause();
  }

/**
 * Volume slider to aid user in increasing or decreasing volume.
 */
  const slider = document.getElementById('volumeSlider');
  slider.oninput = (e) => {
    const volume = e.target.value;
    player.volume = volume;
  }

/**
 * Custom progress bar to indicate how much of the song the users has listened to.
 */
  const updateProgress = () => {
    if(player.currentTime > 0) {
      const progressBar = document.getElementById('progress');
      progressBar.value = (player.currentTime / player.duration) * 100;
    }
  }
