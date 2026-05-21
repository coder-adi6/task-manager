import axios from 'axios';

const api = axios.create({
  baseURL: 'https://shiny-sniffle-q7p79wwj9g4g24qjx-8000.app.github.dev/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Token ${token}`;
  return config;
});

export default api;
