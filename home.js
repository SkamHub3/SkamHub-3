
    // Get all the modals
    var modals = document.querySelectorAll('.modal');
    var btns = document.querySelectorAll('.read-more');
    var spans = document.getElementsByClassName('close');

    // Open the modal when the button is clicked
    btns.forEach((btn, index) => {
        btn.onclick = function() {
            modals[index].style.display = "block";
        }
    });

    // Close the modal when the close button is clicked
    Array.from(spans).forEach(span => {
        span.onclick = function() {
            var modal = span.parentElement.parentElement;
            modal.style.display = "none";
        }
    });

    // Close the modal when clicking outside of the modal content
    window.onclick = function(event) {
        modals.forEach(modal => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    }




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
