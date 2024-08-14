import * as THREE from 'three';

let contextStarted = false;

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
    }, { threshold: 0.5 }); // Adjust threshold as needed

    // Start observing #story1
    observer.observe(story1);

    // Add an event listener for when the video ends
    video.addEventListener('ended', function() {
        // Hide the first story section
        story1.style.display = 'none';
        
        // Show the end story section
        const endStory = document.getElementById('endstory');
        if (endStory) {
            endStory.style.display = 'block';
        }
    });
}

// Automatically start video logic when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    playVideoWhenInView();
});