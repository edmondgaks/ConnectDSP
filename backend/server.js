const express = require("express");
const PORT = 3000 || 5000;
const multer = require("multer");
const AWS = require("aws-sdk");
const app = express();
const upload = multer();

const dotenv = require('dotenv').config();


// AWS configuration
AWS.config.update({
    accessKeyId: `${process.env.ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.SECRET_ACCESS_KEY}`,
    region: `${process.env.REGION}`,
  });
  
  // AWS S3 instance
  const s3 = new AWS.S3();
  
  // Route for handling file upload
  app.post('/upload', upload.single('bannerFile'), (req, res) => {
    const params = {
      Bucket: `${process.env.BUCKET_ID}`,
      Key: req.file.originalname,
      Body: req.file.buffer,
      ACL: 'public-read', // This makes the uploaded banner publicly accessible
    };
  
    s3.upload(params, (err, data) => {
      if (err) {
        console.error('Error uploading banner:', err);
        res.status(500).json({ error: 'Failed to upload banner' });
      } else {
        console.log('Banner uploaded successfully:', data.Location);
        res.json({ url: data.Location });
      }
    });
  });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})