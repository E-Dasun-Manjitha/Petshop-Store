import axios from 'axios';
// Using Vite env vars ensures the URL works locally AND when deployed to Vercel
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
});
export default api;
