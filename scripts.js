// scripts.js

// Fetch the sounds.json file and create the soundboard
fetch('sounds.json')
    .then(response => response.json())
    .then(sounds => {
        const soundboard = document.getElementById('soundboard');

        sounds.forEach(sound => {
            const soundItem = document.createElement('div');
            soundItem.className = 'sound-item';

            const img = document.createElement('img');
            img.src = sound.image;
            img.alt = sound.name;
            soundItem.appendChild(img);

            const button = document.createElement('button');
            button.innerText = sound.name;
            button.onclick = () => playSound(sound.audio);
            soundItem.appendChild(button);

            soundboard.appendChild(soundItem);
        });
    })
    .catch(error => console.error('Error fetching sounds:', error));

// Function to play the sound
function playSound(audioPath) {
    const outputDevice = document.getElementById('outputDevice').value;
    const audio = new Audio(audioPath);

    if (outputDevice === 'virtual') {
        // Route audio to virtual audio cable
        audio.setSinkId('virtualAudioDeviceId') // Replace 'virtualAudioDeviceId' with the actual device ID of the virtual audio cable
            .then(() => {
                audio.play();
                console.log('Audio routed to virtual audio cable');
            })
            .catch(error => {
                console.error('Error routing audio:', error);
                audio.play(); // Fallback to default device if routing fails
            });
    } else {
        // Play audio through speakers (default)
        audio.play();
    }
}

// Add sound from user input
const addSoundButton = document.getElementById('addSoundButton');
const imageInput = document.getElementById('imageInput');
const audioInput = document.getElementById('audioInput');

addSoundButton.onclick = () => {
    const imageFile = imageInput.files[0];
    const audioFile = audioInput.files[0];

    if (imageFile && audioFile) {
        const imageURL = URL.createObjectURL(imageFile);
        const audioURL = URL.createObjectURL(audioFile);

        addSound(imageURL, audioURL, audioFile.name);
    } else {
        alert('Please select both an image and an MP3 file.');
    }
};

// Function to add the sound to the soundboard
function addSound(imageURL, audioURL, soundName) {
    const soundboard = document.getElementById('soundboard');

    const soundItem = document.createElement('div');
    soundItem.className = 'sound-item';

    const img = document.createElement('img');
    img.src = imageURL;
    img.alt = soundName;
    soundItem.appendChild(img);

    const button = document.createElement('button');
    button.innerText = soundName;
    button.onclick = () => playSound(audioURL);
    soundItem.appendChild(button);

    soundboard.appendChild(soundItem);
}