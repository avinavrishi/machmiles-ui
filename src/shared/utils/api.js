import { Platform } from 'react-native';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };

  // Add platform-specific headers
  if (Platform.OS === 'native') {
    headers['X-Platform'] = 'mobile';
  } else {
    headers['X-Platform'] = 'web';
  }

  // Add authentication token if available
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

export const api = {
  get: async (endpoint, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = `${BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders(),
    });
    
    return handleResponse(response);
  },

  post: async (endpoint, data = {}) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    
    return handleResponse(response);
  },

  put: async (endpoint, data = {}) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    
    return handleResponse(response);
  },

  delete: async (endpoint) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    
    return handleResponse(response);
  },

  upload: async (endpoint, file, onProgress) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        ...getHeaders(),
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          onProgress(progress);
        }
      },
    });
    
    return handleResponse(response);
  },
}; 