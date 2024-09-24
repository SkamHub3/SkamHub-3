// List of valid users
const validUsers = [
    { username: 'admin1', password: 'G1T7V' },
    { username: 'hmistry', password: '86WSP' },
    { username: 'hnadeem', password: 'J3J62' },
    { username: 'wyounis', password: '4PEDF' },
    { username: 'arayet', password: 'ZFB1N' },
    { username: 'egulraiz', password: 'PEQ7G' },
    { username: 'qmistry', password: 'ITS0H' },
    { username: 'lwarwick', password: '6Q1S3' },
    { username: 'mzablocki', password: 'BU24Z' },
    { username: 'wjlee', password: '4LJIX' },
    { username: 'rcrawley', password: 'M5OF8' },
    { username: 'guest', password: 'guest' }

];

// Check login status when the page loads
window.onload = function () {
    checkLoginStatus();
};

// Function to check login status and redirect if not logged in
function checkLoginStatus() {
    const username = localStorage.getItem('username');
    const user = validUsers.find(u => u.username === username);

    if (!user) {
        // If not logged in, show login section
        document.getElementById('login-section').style.display = 'block';
        document.getElementById('game-content').style.display = 'none';
    } else {
        // User is logged in, show the game content
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('game-content').style.display = 'block';
    }
}

// Handle login button click
document.getElementById('login-btn').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = validUsers.find(u => u.username === username && u.password === password);

    if (user) {
        // Successful login
        localStorage.setItem('username', username);
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('game-content').style.display = 'block';
    } else {
        // Failed login
        document.getElementById('login-error').style.display = 'block';
    }
});

// Handle the play game button click for embedded game
document.querySelectorAll('.game a').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        const iframeSrc = this.href;
        const gameFrame = document.getElementById('game-frame');
        const widget = document.getElementById('game-widget');

        // Set the source URL for the game
        gameFrame.src = iframeSrc;
        
        // Show the widget
        widget.style.display = 'block';
    });
});

// Handle fullscreen button click
document.getElementById('fullscreen-btn').addEventListener('click', function() {
    const gameFrame = document.getElementById('game-frame');
    if (gameFrame.requestFullscreen) {
        gameFrame.requestFullscreen();
    } else if (gameFrame.mozRequestFullScreen) { // Firefox
        gameFrame.mozRequestFullScreen();
    } else if (gameFrame.webkitRequestFullscreen) { // Chrome, Safari and Opera
        gameFrame.webkitRequestFullscreen();
    } else if (gameFrame.msRequestFullscreen) { // IE/Edge
        gameFrame.msRequestFullscreen();
    }
});

// Handle close widget button click
document.getElementById('close-widget-btn').addEventListener('click', function() {
    document.getElementById('game-widget').style.display = 'none';
    document.getElementById('game-frame').src = ''; // Clear the game URL
});

// Logout functionality
document.getElementById('logout').addEventListener('click', function () {
    localStorage.removeItem('username');
    window.location.href = 'premium.html'; // Redirect to the login page after logout
});

// Function to load game in iframe
function loadGame(url) {
    const gameFrame = document.getElementById('game-frame');
    const gameError = document.getElementById('game-error');

    gameFrame.src = url;

    // Check if the game frame loads successfully
    gameFrame.onload = function() {
        gameError.style.display = 'none';
    };

    gameFrame.onerror = function() {
        gameError.style.display = 'block';
    };
}

// Function to open the modal and load game info
function openGameModal(gameName, description, releaseDate, reviews) {
    const title = document.getElementById('game-title');
    const desc = document.getElementById('game-description');
    const release = document.getElementById('game-release-date');
    const revs = document.getElementById('game-reviews');

    title.innerText = gameName;
    desc.innerText = description;
    release.innerText = `Release Date: ${releaseDate}`;
    revs.innerText = `Reviews: ${reviews}`;

    // Show the modal
    document.getElementById('game-modal').style.display = 'flex';
}

// Function to close the modal
function closeGameModal() {
    document.getElementById('game-modal').style.display = 'none';
}

// Function to filter games based on search input
function searchGames() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const games = document.querySelectorAll('.game');

    games.forEach(game => {
        const name = game.getAttribute('data-name').toLowerCase();
        if (name.includes(query)) {
            game.style.display = 'block';
        } else {
            game.style.display = 'none';
        }
    });
}
