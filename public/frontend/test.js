function displayASLImages() {
    const wordInput = document.getElementById('wordInput').value.trim();
    const aslImagesDiv = document.getElementById('aslImages');
    aslImagesDiv.innerHTML = ''; 
    if (wordInput.length > 2) {
        const images = [...wordInput].map(letter => {
            const lowerCaseLetter = letter.toLowerCase();
            return <img src="../asl/words/${lowerCaseLetter}.png" alt="${lowerCaseLetter} ASL" />;
        });
        aslImagesDiv.innerHTML = images.join('');
    } else {
        const firstLetter = wordInput.charAt(0).toLowerCase();
        if (firstLetter) {
            aslImagesDiv.innerHTML = <img src="../asl/${firstLetter}.png" alt="${firstLetter} ASL" />;
        }
    }
   console.log("hi")
}
