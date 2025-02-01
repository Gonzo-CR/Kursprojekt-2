
const images = [
    "V1.jpg",
    "V2.jpg",
    "V3.jpg",
    "V5.jpg",
    "V6.jpg",
    "V7.jpg",
    "V8.jpg",
    "Jungook1.jpg",
    "Jungook2.jpg",
    "Jungkook3.jpg",
    "Jungkook4.jpg",
    "Jin1.jpg",
    "Jin2.jpg",
    "Jimin2.jpg",
    "JHope1.jpg",
    "JHope2.jpg",
    "Jimin3.jpg",
    "Jimin4.jpg",
    "Jimin5.jpg",
    "Jimin6.jpg",
    "JHope3.jpg",
];

/**
 * Stores the current time when loading the page.
 */
document.addEventListener('DOMContentLoaded', function() {
    const startTime = Date.now();
    localStorage.setItem('startTime', startTime);
});

/**
 * 
 * Makes the pop-up window appear on screen with varying text inside. It displays
 * the time spent on the platform.
 * @param {boolean} tick - true if called by home-button, false otherwise.
 */
function activatePopup(tick) {
    //Expose the popup-window.
    const popup = document.getElementById('popup-message');
    popup.hidden = false; 

    //Calculating the time spent.
    const startTime = parseInt(localStorage.getItem('startTime'), 10);
    const currentTime = Date.now();
    const timeSpentMinutes = Math.floor((currentTime - startTime) / 1000);
    let timeSpent = document.getElementById('time-spent');

    // Display different text depending on the button pressed.
    if (tick) {
        document.getElementById('top-text-popup').textContent = `You made ${currentIndex + 1} Memes and spent:`;
    } else {
        document.getElementById('top-text-popup').textContent = "You used this app for:"
    }

    // Displays either minutes or seconds.
    if (timeSpentMinutes < 60) {
        timeSpent.textContent = `${timeSpentMinutes} sec`;
    } else {
        timeSpent.textContent = `${Math.floor(timeSpentMinutes / 60)} min`
    }
}

/**
 * Event Listener for the home button. Activates the popup.
 */
document.getElementById('home-button').addEventListener('click', function() {
    activatePopup(true);    
});

/**
 * Event Listener for the text input. While typing the same text will be displayed
 * inside the lower third of the image. 
 */
document.getElementById('textInput').addEventListener('input', function() {
    let memeText = document.getElementById('memeText');
    memeText.textContent = this.value.toUpperCase();
});


/**
 * Returns a specified number of random memes from an array of images.
 *
 * @param {Array} imageArray - The array of image URLs or image objects.
 * @param {number} numberOfMemes - The number of random memes to select.
 * @returns {Array} An array containing the specified number of random memes.
 */
function getRandomMemes(imageArray, numberOfMemes) {
    let shuffledImages = imageArray.sort(() => 0.5 - Math.random());
    return shuffledImages.slice(0, numberOfMemes);
}

const selectedMemes = getRandomMemes(images, 10);
let currentIndex = 0;

/**
 * Event Listener for the popup-window closing-button.
 */
document.getElementById('close-popup-button').addEventListener('click', function() {
    document.getElementById('popup-message').hidden = true;
});

/**
 * Event Listener for the next-button. Skips to the next image within the selectedMemes array.
 * Triggers popup-window if all images have been seen. 
 */
document.getElementById('next-button').addEventListener('click', function() {
    console.log("next clicked");
    currentIndex++;
    if (currentIndex >= selectedMemes.length) {
        activatePopup(false);
    } else {
        document.getElementById('meme-image').src = selectedMemes[currentIndex];
        document.getElementById('memeText').textContent = "";
        document.getElementById('textInput').value = "";
    }
});

/**
 * Event Listener for the download-button. 
 */
document.getElementById('download-button').addEventListener('click', function() {
    let memeElement = document.querySelector("#textImage");

    html2canvas(memeElement).then(canvas => {
        let image = canvas.toDataURL("image/png");
        let link = document.createElement('a');
        link.href = image;
        link.download = "meme.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});