import React from 'react';
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <img src={car.images[0]} alt={car.title} className="w-full h-40 object-cover rounded-md" />
      <h2 className="text-lg font-semibold mt-2">{car.title}</h2>
      <p>{car.description}</p>
      <div className="mt-2">
        <Link to={`/product/${car._id}`} className="text-blue-500">View Details</Link>
      </div>
    </div>
  );
};

export default CarCard;
