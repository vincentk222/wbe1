const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/upload-image', upload.single('image'), (req, res) => {
  // Save the image to a permanent location
  const imagePath = 'path/to/save/image/' + req.file.filename;
  fs.renameSync(req.file.path, imagePath);

  // Send a response
  res.send('Image uploaded successfully');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
