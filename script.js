// Function to resize image
function resizeImage() {
    const input = document.getElementById('imageInput');
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;

            img.onload = function () {
                const widthInput = document.getElementById('widthInput').value; // Get user-defined width
                const heightInput = document.getElementById('heightInput').value; // Get user-defined height
                
                // Create a canvas element to render the resized image
                const targetCanvas = document.createElement('canvas');
                const picaInstance = pica();

                // Set the size of the canvas to the user-defined dimensions
                targetCanvas.width = widthInput; 
                targetCanvas.height = heightInput; 

                // Use pica to resize the image
                picaInstance.resize(img, targetCanvas)
                    .then(() => {
                        // Convert canvas to blob
                        return new Promise((resolve, reject) => {
                            targetCanvas.toBlob(resolve, 'image/jpeg', 0.9);
                        });
                    })
                    .then(resultBlob => {
                        // Create an image element to display the resized image
                        const resizedImg = new Image();
                        resizedImg.src = URL.createObjectURL(resultBlob);

                        // Append the resized image to the imagePreview div
                        const imagePreview = document.getElementById('imagePreview');
                        imagePreview.innerHTML = ''; // Clear previous content
                        imagePreview.appendChild(resizedImg);

                        // Show download button
                        const downloadButton = document.getElementById('downloadButton');
                        downloadButton.style.display = 'block';
                        downloadButton.href = resizedImg.src; // Set href for download link
                        downloadButton.download = 'resized_image.jpg'; // Set filename for download
                    })
                    .catch(error => console.error('Error resizing image:', error));
            };
        };

        reader.readAsDataURL(file);
    }
}

// Function to download resized image
function downloadResizedImage() {
    const downloadButton = document.getElementById('downloadButton');
    if (downloadButton.href) {
        downloadButton.click(); // Trigger download
    }
}