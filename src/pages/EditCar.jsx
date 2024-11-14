import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCar, updateCar } from '../services/carService';

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [carData, setCarData] = useState({
    title: '',
    description: '',
    tags: [],
    images: []
  });

  useEffect(() => {
    const fetchCar = async () => {
      const response = await getCar(id);
      setCarData(response.data);
    };
    fetchCar();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(carData);
    if(carData === undefined) {
        navigate(`/car/${id}`);
    }else{
    await updateCar(id, carData);
    navigate(`/car/${id}`);
        }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <form onSubmit={handleUpdate} className="max-w-lg w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Edit Car</h2>
        <input
          type="text"
          name="title"
          value={carData?.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full mb-4 p-2 border rounded-lg"
        />
        <textarea
          name="description"
          value={carData?.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full mb-4 p-2 border rounded-lg"
        />
        <input
          type="text"
          name="tags"
          value={carData?.tags?.join(', ')}
          onChange={(e) => setCarData({ ...carData, tags: e.target.value.split(', ') })}
          placeholder="Tags (comma-separated)"
          className="w-full mb-4 p-2 border rounded-lg"
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">Update Car</button>
      </form>
    </div>
  );
};

export default EditCar;
