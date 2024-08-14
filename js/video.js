import * as THREE from 'three';

let contextStarted = false;
let interactionOccurred = false;

// Function to start the audio context
function startAudioContext() {
    if (!contextStarted) {
        const audioContext = THREE.AudioContext.getContext();
        audioContext.resume().then(() => {
            console.log('AudioContext resumed');
        });
        contextStarted = true;
    }
}

// Function to show the first video section and play the video
function playVideoWhenInView() {
    const video = document.getElementById('firstVideo');
    const story1 = document.getElementById('story1');

    if (!video || !story1) {
        console.error('Required elements not found');
        return;
    }

    // Show the first story section
    story1.style.display = 'block';

    // Create an IntersectionObserver to observe when #story1 enters the viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start the audio context when story1 comes into view
                startAudioContext();

                // Play the video when #story1 is in view
                video.play().catch((error) => {
                    console.error('Video playback failed:', error);
                });
            } else {
                // Optionally pause the video when #story1 is out of view
                video.pause();
            }
        });
    }, { threshold: 0.5 });

    // Start observing #story1 only after minimal interaction
    if (interactionOccurred) {
        observer.observe(story1);
    }
}

// Automatically start video logic after minimal interaction
document.addEventListener('DOMContentLoaded', function() {
    function onInteraction() {
        interactionOccurred = true;
        playVideoWhenInView();
        
        // Remove event listeners after the first interaction
        window.removeEventListener('scroll', onInteraction);
        window.removeEventListener('focus', onInteraction);
        window.removeEventListener('click', onInteraction);
        window.removeEventListener('mouseenter', onInteraction);
    }

    // Listen for minimal user interaction like scroll, focus, click, or mouse enter
    window.addEventListener('scroll', onInteraction, { once: true });
    window.addEventListener('focus', onInteraction, { once: true });
    window.addEventListener('click', onInteraction, { once: true });
    window.addEventListener('mouseenter', onInteraction, { once: true });
});