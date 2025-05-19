import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.15.7:5038/api/', // Substitua pelo IP da sua máquina local
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
