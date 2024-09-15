// Dynamically load MP3 files from the "music" folder
let songs = [];

// Fetch the list of MP3 files in the "music" folder
fetch('music/')
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        const links = doc.querySelectorAll('a[href$=".mp3"]');

        links.forEach(link => {
            let fileName = link.getAttribute('href');
            songs.push({ file: 'music/' + fileName });
        });

        // Now that songs are loaded, process each one
        loadSongs();
    });

// Function to load the song's metadata
function loadSongs() {
    const musicGrid = document.getElementById('music-grid');

    songs.forEach((song, index) => {
        fetch(song.file)
            .then(response => response.blob())
            .then(blob => {
                musicMetadata.parseBlob(blob).then(metadata => {
                    song.title = metadata.common.title || `Song ${index + 1}`;
                    song.artist = metadata.common.artist || 'Unknown Artist';
                    song.album = metadata.common.album || 'Unknown Album';
                    song.cover = getCoverArt(metadata);

                    const songElement = document.createElement('div');
                    songElement.classList.add('music');
                    songElement.setAttribute('data-index', index);
                    songElement.onclick = () => playSong(index);

                    const coverImg = document.createElement('img');
                    coverImg.src = song.cover || 'default-cover.jpg';
                    songElement.appendChild(coverImg);

                    const overlay = document.createElement('div');
                    overlay.classList.add('overlay');
                    overlay.innerHTML = `${song.title}`;
                    songElement.appendChild(overlay);

                    musicGrid.appendChild(songElement);
                });
            });
    });
}

// Function to get cover art from the metadata
function getCoverArt(metadata) {
    if (metadata.common.picture && metadata.common.picture.length > 0) {
        const picture = metadata.common.picture[0];
        const base64String = `data:${picture.format};base64,${arrayBufferToBase64(picture.data)}`;
        return base64String;
    }
    return null;
}

// Helper function to convert an array buffer to base64
function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

// Function to play a selected song
function playSong(index) {
    const song = songs[index];

    // Play the song
    const audio = new Audio(song.file);
    audio.play();

    // Update player UI with song information
    document.getElementById('player-cover').src = song.cover || 'default-cover.jpg';
    document.getElementById('player-title').innerText = song.title;
    document.getElementById('player-artist').innerText = song.artist;
    document.getElementById('player-album').innerText = song.album;

    document.getElementById('play-button').innerText = '⏸'; // Change to pause icon
}

// Function to toggle play/pause
function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        document.getElementById('play-button').innerText = '⏸';
    } else {
        audio.pause();
        document.getElementById('play-button').innerText = '▶️';
    }
}

// Function to rewind the current song
function rewindSong() {
    audio.currentTime = 0;
}
