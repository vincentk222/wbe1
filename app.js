const captureButton = document.getElementById('capture-button');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Check if the browser supports MediaDevices API
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  captureButton.addEventListener('click', captureImage);
} else {
  alert('This browser does not support MediaDevices API.');
}

async function captureImage() {
  try {
    // Request access to the user's camera
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });

    // Create a new video element
    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();

    // Set the canvas size to match the user's viewport
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Capture the image when the 'take picture' button is clicked
    captureButton.addEventListener('click', () => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert the canvas image to a Blob
      canvas.toBlob(blob => {
        // Send the image to the server using XMLHttpRequest or Fetch API
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://your-server.com/upload-image', true);
        xhr.send(blob);
      });
    });

  } catch (error) {
    console.error('Error: ', error);
  }
}
