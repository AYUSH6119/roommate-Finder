
    // Select the review form and rating elements
    const reviewForm = document.getElementById('reviewForm');
    const ratingInput = document.getElementById('rating');
    const commentInput = document.getElementById('comment');
    const errorMessage = document.getElementById('error-message');

    // Handle star rating selection
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            ratingInput.value = value; // Set rating value in the hidden input
            updateStarStyles(value);  // Update star styling to show which one was selected
        });
    });

    // Function to update the star styles based on selected rating
    function updateStarStyles(selectedRating) {
        stars.forEach(star => {
            if (parseInt(star.getAttribute('data-value')) <= selectedRating) {
                star.classList.add('text-yellow-500');
                star.classList.remove('text-gray-400');
            } else {
                star.classList.add('text-gray-400');
                star.classList.remove('text-yellow-500');
            }
        });
    }

    // Form validation before submission
    reviewForm.addEventListener('submit', function(event) {
        let valid = true;
        errorMessage.classList.add('hidden'); // Hide error message by default

        // Check if rating is selected
        if (!ratingInput.value) {
            valid = false;
            errorMessage.textContent = 'Please select a rating (1-5).';
        }

        // Check if comment is provided
        if (!commentInput.value.trim()) {
            valid = false;
            errorMessage.textContent = errorMessage.textContent 
                ? errorMessage.textContent + ' Please write a comment.'
                : 'Please write a comment.';
        }

        // If invalid, prevent form submission and show error
        if (!valid) {
            event.preventDefault(); // Prevent form submission
            errorMessage.classList.remove('hidden');
        }
    });