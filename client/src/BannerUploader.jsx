import React, { useState } from 'react';
import axios from 'axios';

const BannerUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('bannerFile', selectedFile);

      // Send the file to the backend server for upload
      const response = await axios.post('/upload', formData);

      if (response.data.url) {
        alert('Banner uploaded successfully!');
        // Now, you can use the banner URL (response.data.url) to serve it to the DSP
      } else {
        alert('Failed to upload banner.');
      }
    } catch (error) {
      console.error('Error uploading banner:', error);
      alert('An error occurred while uploading the banner.');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Banner</button>
    </div>
  );
};

export default BannerUploader;