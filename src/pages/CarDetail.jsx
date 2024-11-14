import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCar } from "../services/carService";
import { Link } from "react-router-dom";

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await getCar(id);
        console.log("response", response);
        setCar(response);
      } catch (error) {
        setError("Car not found or an error occurred.");
      }
    };
    fetchCar();
  }, [id]);

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!car) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-semibold text-center mb-6">{car.title}</h2>
        <p className="text-gray-700 mb-4">{car.description}</p>

        <div className="mb-4">
          <h3 className="text-xl font-semibold">Tags:</h3>
          <ul className="flex gap-2 mt-2">
            {car.tags.map((tag, index) => (
              <li key={index} className="px-3 py-1 bg-blue-200 rounded-full">
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold">Images:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            {car.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Car ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <Link to={`/car/${id}/edit`} className="text-blue-500">
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
