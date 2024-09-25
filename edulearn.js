const toggleButton = document.getElementById('toggleTheme');
const body = document.body;

// Load saved theme preference from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    toggleButton.textContent = savedTheme === 'dark-mode' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
}

// Toggle theme on button click
toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        toggleButton.textContent = 'Switch to Light Mode';
        localStorage.setItem('theme', 'dark-mode');
    } else {
        toggleButton.textContent = 'Switch to Dark Mode';
        localStorage.setItem('theme', '');
    }
});

// Handle back button functionality
const goBackButton = document.getElementById('goBackButton');
goBackButton.addEventListener('click', () => {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        // Optionally, redirect to a fallback page (like home.html) if there is no history
        window.location.href = 'home.html';
    }
});
