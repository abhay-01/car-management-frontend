import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { login } from './services/authService';
import { getCars } from './services/carService';
import CreateCar from './pages/CreateCar';
import CarDetail from './pages/CarDetail';
import EditCar from './pages/EditCar';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const fetchCars = async () => {
    const carList = await getCars();
    setCars(carList);
  };

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard cars={cars} fetchCars={fetchCars} />} />
        <Route path="/" element={<Dashboard cars={cars} fetchCars={fetchCars} />} />
        <Route path="/create" element = {<CreateCar/>} />
        <Route path = "/car/:id" element = {<CarDetail/>} />
        <Route path = "/car/:id/edit" element = {<EditCar/>} />

      </Routes>
    </Router>
  );
};

export default App;
