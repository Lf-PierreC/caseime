// Configuração da API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.MODE === 'production' 
    ? 'https://giftlist-api-kj59.onrender.com' // Substitua pela URL real do Render
    : 'http://localhost:3000');

export const API_ENDPOINTS = {
  PRESENTES: `${API_BASE_URL}/api/presentes`,
  UPDATE_PRESENTE: (id: number) => `${API_BASE_URL}/api/presentes/${id}`
};

export default API_BASE_URL;