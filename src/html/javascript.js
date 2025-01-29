const images = [
    //add all images from assets/images here
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


document.getElementById('textInput').addEventListener('input', function() {
    let memeText = document.getElementById('memeText');
    memeText.textContent = this.value.toUpperCase();
});

function getRandomMemes(imageArray, numberOfMemes) {
    let shuffledImages = imageArray.sort(() => 0.5 - Math.random());
    return shuffledImages.slice(0, numberOfMemes);
}

const selectedMemes = getRandomMemes(images, 10);
let currentIndex = 0;


document.getElementById('next-button').addEventListener('click', function() {
    console.log("next clicked");
    currentIndex++;
    if (currentIndex >= selectedMemes.length) {
        currentIndex = 0;
    }
    document.getElementById('meme-image').src = selectedMemes[currentIndex];
});

document.getElementById('download-link').addEventListener('click', function() {
    console.log("download clicked");
    let memeElement = document.querySelector("#textImage");

    html2canvas(memeElement, {
        useCORS: true,  // Erlaubt das Laden von Bildern von anderen Quellen
        backgroundColor: null, // Verhindert weißen Hintergrund
        scale: 2 // Höhere Qualität
    }).then(canvas => {
        let image = canvas.toDataURL("image/png");
        let link = document.createElement('a');
        link.href = image;
        link.download = "meme.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    });