import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { getCars } from "./services/carService";
import CreateCar from "./pages/CreateCar";
import CarDetail from "./pages/CarDetail";
import EditCar from "./pages/EditCar";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cars, setCars] = useState([]);
  const [isLogout, setIsLogout] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
      fetchCars(); // Fetch cars when authenticated on initial load
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setIsLogout(true);
  };

  useEffect(() => {
    if (isLogout) {
      setIsLogout(false);
      window.location.href = "/login";
    }
  }, [isLogout]);

  const fetchCars = async () => {
    const carList = await getCars();
    setCars(carList);
  };

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        {isLogout ? (
          <Route
            path="/login"
            element={
              <Login
                setIsAuthenticated={setIsAuthenticated}
                fetchCars={fetchCars}
              />
            }
          />
        ) : null}
        <Route
          path="/login"
          element={
            <Login
              setIsAuthenticated={setIsAuthenticated}
              fetchCars={fetchCars}
            />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={<Dashboard cars={cars} fetchCars={fetchCars} />}
        />
        {isAuthenticated ? (
          <Route
            path="/dashboard"
            element={<Dashboard cars={cars} fetchCars={fetchCars} />}
          />
        ) : (
          <Route
            path="/"
            element={
              <Login
                setIsAuthenticated={setIsAuthenticated}
                fetchCars={fetchCars}
              />
            }
          />
        )}
        <Route path="/create" element={<CreateCar />} />
        <Route path="/car/:id" element={<CarDetail />} />
        <Route path="/car/:id/edit" element={<EditCar />} />
      </Routes>
    </Router>
  );
};

export default App;
