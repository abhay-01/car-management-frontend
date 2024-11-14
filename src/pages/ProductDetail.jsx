import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarById } from '../services/carService';

const ProductDetail = () => {
  const { carId } = useParams(); 
  const [car, setCar] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarDetail = async () => {
      try {
        const carData = await getCarById(carId);
        setCar(carData);
      } catch (err) {
        setError('Failed to load car details');
      }
    };

    fetchCarDetail();
  }, [carId]);

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!car) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-blue-500 mb-4 inline-block"
          >
            &larr; Back to Dashboard
          </button>
          <div className="flex flex-col lg:flex-row items-center lg:space-x-8">
            <div className="w-full lg:w-1/3">
              <img
                src={car.images[0]} // Assuming images are an array, you can display the first image or implement a carousel
                alt={car.title}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <div className="w-full lg:w-2/3 mt-6 lg:mt-0">
              <h2 className="text-3xl font-semibold text-gray-800">{car.title}</h2>
              <p className="text-lg text-gray-600 mt-2">{car.description}</p>
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Tags:</h3>
                <p className="text-gray-700">{car.tags.join(', ')}</p>
              </div>
              <div className="mt-6">
                <button
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => navigate(`/edit-car/${carId}`)}
                >
                  Edit Car
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
