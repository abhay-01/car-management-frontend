import React, { useState } from 'react';

const CarForm = ({ onSubmit, initialData }) => {
  const [carData, setCarData] = useState(initialData || { title: '', description: '', images: [], tags: '' });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(carData, image);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        value={carData.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full p-2 border rounded"
      />
      <textarea
        name="description"
        value={carData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 border rounded"
      />
      <input
        type="file"
        onChange={handleImageChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="tags"
        value={carData.tags}
        onChange={handleChange}
        placeholder="Tags"
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Submit</button>
    </form>
  );
};

export default CarForm;
