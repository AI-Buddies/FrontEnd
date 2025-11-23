import axios from 'axios';
import { getAccessToken } from './tokenStorage';

const client = axios.create({
    baseURL: "https://sketch-talk.com",
    headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
    },
    timeout: 15000,
});

client.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default client;