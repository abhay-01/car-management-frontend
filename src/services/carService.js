import axios from "axios";

const API_URL = "https://car-management-backend-1.onrender.com/api/cars";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  console.log("token", token);
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const createCar = async (formData) => {
  console.log("formData", formData);

  try {
    const response = await axios.post(API_URL, formData, {
      headers: getAuthHeaders(),
    });

    return response.data;
  } catch (err) {
    console.log("Error in createCar", err);
  }
};

export const getCars = async () => {
  const response = await axios.get(API_URL, { headers: getAuthHeaders() });
  return response.data;
};

export const getCar = async (carId) => {
  const response = await axios.get(`${API_URL}/${carId}`, {
    headers: getAuthHeaders(),
  });
  console.error("response---", response.data);
  return response.data;
};

export const updateCar = async (carId, carData, image) => {
  const response = await axios.put(
    `${API_URL}/${carId}`,
    {
      title: carData.title,
      description: carData.description,
      tags: carData.tags,
      image: image,
    },
    { headers: getAuthHeaders() }
  );
  return response.data;
};

export const deleteCar = async (carId) => {
  const response = await axios.delete(`${API_URL}/${carId}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};
