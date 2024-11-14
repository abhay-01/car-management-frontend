import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCar } from '../services/carService';

const CreateCar = () => {
  const navigate = useNavigate();
  const [carData, setCarData] = useState({
    title: '',
    description: '',
    tags: ''
  });
  const [imageFiles, setImageFiles] = useState([]); // Store selected image files
  const [imageUrls, setImageUrls] = useState([]); // Store uploaded image URLs

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImageFiles(Array.from(e.target.files)); // Store selected files in state
  };

  const uploadImagesToCloudinary = async () => {
    const urls = [];
    const cloudName = 'dctz4wuix';
    const uploadPreset = 'ngmnmuma';

    for (const file of imageFiles) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      urls.push(data.secure_url); // Get the image URL from Cloudinary response
    }

    return urls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const urls = await uploadImagesToCloudinary();
      const formData = { ...carData, images: urls }; // Send images as URLs to backend
      console.log("formData",formData);
      await createCar(formData);
      navigate('/dashboard');
    } catch (error) {
      console.error("Error uploading images", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="max-w-lg w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Add New Car</h2>
        <input
          type="text"
          name="title"
          value={carData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full mb-4 p-2 border rounded-lg"
          required
        />
        <textarea
          name="description"
          value={carData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full mb-4 p-2 border rounded-lg"
          required
        />
        <input
          type="text"
          name="tags"
          value={carData.tags}
          onChange={handleChange}
          placeholder="Tags (comma-separated)"
          className="w-full mb-4 p-2 border rounded-lg"
          required
        />

        <input
          type="file"
          onChange={handleImageChange}
          multiple
          accept="image/*"
          className="w-full mb-4"
        />

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">Add Car</button>
      </form>
    </div>
  );
};

export default CreateCar;
