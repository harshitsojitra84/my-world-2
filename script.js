const videoContainer = document.getElementById('video-container');
const slides = document.querySelectorAll('.video-slide');
let currentIndex = 0;

// Initialize the first video in view
function showSlide(index) {
    slides.forEach((slide, idx) => {
        const video = slide.querySelector('video');
        if (idx === index) {
            // Show and play the current video
            slide.style.transform = `translateY(0)`;
            video.play();
            video.loop = true;
            video.muted = false;
        } else {
            // Hide and pause other videos
            slide.style.transform = `translateY(${(idx - index) * 100}%)`;
            video.pause();
        }
    });
}

// Listen for swipe events to navigate
let startY = 0;
let endY = 0;

videoContainer.addEventListener('touchstart', (event) => {
    startY = event.touches[0].clientY;
});

videoContainer.addEventListener('touchend', (event) => {
    endY = event.changedTouches[0].clientY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50; // Minimum swipe distance

    if (startY - endY > swipeThreshold) {
        // Swipe up
        currentIndex = (currentIndex + 1) % slides.length;
    } else if (endY - startY > swipeThreshold) {
        // Swipe down
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    }

    showSlide(currentIndex);
}

// Show the first slide initially
showSlide(currentIndex);
