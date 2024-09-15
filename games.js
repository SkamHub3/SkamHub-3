// Function to open the modal and load game info
function openGameModal(gameName) {
    const gamePath = `${gameName}.txt`; // Path to the text file
    const title = document.getElementById('game-title');
    const description = document.getElementById('game-description');
    const releaseDate = document.getElementById('game-release-date');
    const reviews = document.getElementById('game-reviews');

    // Fetch the game info from the txt file
    fetch(gamePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Game file not found');
            }
            return response.text();
        })
        .then(data => {
            const info = data.split('\n').filter(line => line.trim() !== ''); // Ensure no empty lines

            // Assign values to modal elements based on lines
            title.innerText = info[0] || 'No title available';  // Game title from the first line
            description.innerText = info[1] || 'No description available';  // Description from the second line
            releaseDate.innerText = `Release Date: ${info[2] || 'Unknown'}`;  // Release date from the third line

            // Display reviews starting from the fourth line
            const reviewsData = info.slice(3);  // Start from the fourth line for reviews
            if (reviewsData.length > 0) {
                reviews.innerText = reviewsData.join('\n');  // Join the reviews with new lines
            } else {
                reviews.innerText = 'No reviews available';  // If there are no reviews
            }
        })
        .catch(error => {
            console.error('Error fetching game info:', error);
            title.innerText = 'Error';
            description.innerText = 'Could not load game info.';
            releaseDate.innerText = '';
            reviews.innerText = '';
        });

    // Show the modal
    document.getElementById('game-modal').style.display = 'flex';
}

// Function to close the modal
function closeGameModal() {
    document.getElementById('game-modal').style.display = 'none';
}
