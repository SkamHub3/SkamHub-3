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
