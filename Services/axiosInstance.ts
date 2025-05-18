import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://192.168.x.x :7202/api/', // Substitua pelo IP da sua máquina local
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
