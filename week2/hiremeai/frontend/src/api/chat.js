import axios from 'axios'

const API_BASE = 'http://localhost:8000'

export async function sendChatMessage(question) {
  const response = await axios.post(`${API_BASE}/chat`, { question })
  return response.data.answer
}
