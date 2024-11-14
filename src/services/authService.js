import axios from 'axios';

const API_URL = 'https://car-management-backend-1.onrender.com/api/auth';

export const signup = async (userData) => {
  try{
    console.log("userData", userData);
    const response = await axios.post("https://car-management-backend-1.onrender.com/api/auth/signup", {
      username: userData.username,
      email: userData.email,
      password: userData.password
    });
    return response.data;
  }catch(err){
    console.log("Error in signup", err);
  }
};

export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  localStorage.setItem('token', response.data.token);
  return response.data;
};
