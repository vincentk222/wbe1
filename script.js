const captureButton = document.getElementById('capture-button');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    captureButton.addEventListener('click', captureImage);
} else {
    alert('This browser does not support MediaDevices API.');
}

async function captureImage() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        captureButton.addEventListener('click', () => {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(blob => {
                // Send the image to Firebase Storage
                const storageRef = storage.ref();
                const uploadTask = storageRef.child('images/' + blob.type).put(blob);

                uploadTask.on('state_changed',
                    (snapshot) => {
                        // handle progress
                    },
                    (error) => {
                        // handle error
                    },
                    () => {
                        // handle success
                        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                            console.log('File available at', downloadURL);
                        });
                    }
                );
            });
        });
    } catch (error) {
        console.error('Error: ', error);
    }
}
