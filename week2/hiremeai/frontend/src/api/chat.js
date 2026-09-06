import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'https://hiremeai-backend-k7cw.onrender.com'

export async function sendChatMessage(question) {
  const response = await axios.post(`${API_BASE}/chat`, { question })
  return response.data.answer
}
