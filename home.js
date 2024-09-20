
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
