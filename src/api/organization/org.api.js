import axios from 'axios';

// Use a separate instance with no baseURL so Vite's proxy can forward
// /api/* requests to the local dev server (or Vercel in production).
const localApi = axios.create({
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

localApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error?.message ||
      'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export async function getOrganizations() {
  const response = await localApi.get('/api/organizations');
  return response.data;
}

export async function registerOrganization(payload) {
  const response = await localApi.post('/api/register-organization', payload);
  return response.data;
}


