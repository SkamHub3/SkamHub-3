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
    { username: 'rcrawley', password: 'M5OF8' }
];

// Check login status when the page loads
window.onload = function () {
    checkLoginStatus();
};

// Function to check login status and update the page accordingly
function checkLoginStatus() {
    const username = localStorage.getItem('username');
    const user = validUsers.find(u => u.username === username);
    
    if (user) {
        // User is logged in, show the games section
        document.getElementById('games-container').style.display = 'block';
        document.getElementById('login-container').style.display = 'none';
    } else {
        // User is not logged in, show the login form
        document.getElementById('games-container').style.display = 'none';
        document.getElementById('login-container').style.display = 'block';
    }
}

// Handle login action
document.getElementById('login-btn').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check if the username and password are valid
    const user = validUsers.find(u => u.username === username && u.password === password);

    if (user) {
        // Store the username in localStorage as logged in
        localStorage.setItem('username', username);
        checkLoginStatus();  // Refresh to show the games section
    } else {
        // If username or password is incorrect, show error message
        document.getElementById('login-error').textContent = 'Incorrect username or password.';
    }
});

// Logout functionality
document.getElementById('logout').addEventListener('click', function () {
    localStorage.removeItem('username');
    window.location.href = 'premium.html'; // Redirect to the login page after logout
});

// Handle the access games button click
document.getElementById('access-games-btn').addEventListener('click', function() {
    const username = localStorage.getItem('username');
    const user = validUsers.find(u => u.username === username);
    
    if (user) {
        // Redirect to the premium games content (replace this with the actual URL or action)
        window.location.href = 'premium-games.html'; // or any other action
    } else {
        alert('Please log in to access the premium games.');
    }
});





// Elements
const chatButton = document.getElementById("chat-button");
const chatIframeContainer = document.getElementById("chat-iframe-container");
const closeChatButton = document.getElementById("close-chat");

// Open chat iframe and hide button
chatButton.addEventListener("click", function() {
    chatIframeContainer.style.bottom = "20px"; // Slide up to be visible
    chatButton.style.opacity = "0"; // Hide button
    chatButton.style.pointerEvents = "none"; // Prevent interaction while hidden
});

// Close chat iframe and show button again
closeChatButton.addEventListener("click", function() {
    chatIframeContainer.style.bottom = "-500px"; // Slide back down to hide
    chatButton.style.opacity = "1"; // Show button
    chatButton.style.pointerEvents = "auto"; // Enable interaction
});
