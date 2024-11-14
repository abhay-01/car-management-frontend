import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCars, deleteCar } from "../services/carService";

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filteredCars, setFilteredCars] = useState([]);

  // Fetch all cars from the backend
  const fetchCars = async () => {
    try {
      const carsData = await getCars();
      setCars(carsData);
      setFilteredCars(carsData); 
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    setFilteredCars(
      cars.filter(
        (car) =>
          car.title?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
          car.description?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
          car.tags?.some((tag) =>
            tag.toLowerCase().includes(searchQuery?.toLowerCase())
          )
      )
    );
    console.log("filteredCars", filteredCars);
  }, [searchQuery, cars]);

  // Delete a car
  const handleDelete = async (carId) => {
    try {
      await deleteCar(carId);
      fetchCars(); 
    } catch (error) {
      console.error("Failed to delete car:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-6">Dashboard</h1>

        {/* Search bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search for cars"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Add New Car button */}
        <Link
          to="/create"
          className="mb-4 inline-block bg-green-500 text-white py-2 px-4 rounded-lg"
        >
          Add New Car
        </Link>

        {/* Car list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div key={car._id} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={car?.images[0]}
                alt={car?.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold">{car?.title}</h3>
              <p className="text-sm text-gray-600">{car?.description}</p>
              <div className="flex justify-between mt-4">
                <Link to={`/car/${car._id}`} className="text-blue-500">
                  View
                </Link>
                <button
                  onClick={() => handleDelete(car._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
