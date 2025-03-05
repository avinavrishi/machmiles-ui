import { Platform } from 'react-native';
import { storage } from './storage';

class Network {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'X-Platform': Platform.OS,
    };
  }

  async getHeaders() {
    const headers = { ...this.defaultHeaders };
    const token = await storage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  async handleResponse(response) {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
  }

  async get(endpoint, params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `${this.baseURL}${endpoint}${queryString ? `?${queryString}` : ''}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: await this.getHeaders(),
      });
      
      return this.handleResponse(response);
    } catch (error) {
      console.error('GET request failed:', error);
      throw error;
    }
  }

  async post(endpoint, data = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: await this.getHeaders(),
        body: JSON.stringify(data),
      });
      
      return this.handleResponse(response);
    } catch (error) {
      console.error('POST request failed:', error);
      throw error;
    }
  }

  async put(endpoint, data = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PUT',
        headers: await this.getHeaders(),
        body: JSON.stringify(data),
      });
      
      return this.handleResponse(response);
    } catch (error) {
      console.error('PUT request failed:', error);
      throw error;
    }
  }

  async delete(endpoint) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'DELETE',
        headers: await this.getHeaders(),
      });
      
      return this.handleResponse(response);
    } catch (error) {
      console.error('DELETE request failed:', error);
      throw error;
    }
  }

  async upload(endpoint, file, onProgress) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          ...(await this.getHeaders()),
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
      
      return this.handleResponse(response);
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  }

  async download(endpoint, onProgress) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'GET',
        headers: await this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const reader = response.body.getReader();
      const contentLength = +response.headers.get('Content-Length');
      let receivedLength = 0;
      let chunks = [];

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          break;
        }

        chunks.push(value);
        receivedLength += value.length;

        if (onProgress) {
          const progress = (receivedLength / contentLength) * 100;
          onProgress(progress);
        }
      }

      const chunksAll = new Uint8Array(receivedLength);
      let position = 0;

      for (let chunk of chunks) {
        chunksAll.set(chunk, position);
        position += chunk.length;
      }

      return chunksAll;
    } catch (error) {
      console.error('Download failed:', error);
      throw error;
    }
  }

  async retry(fn, retries = 3, delay = 1000) {
    try {
      return await fn();
    } catch (error) {
      if (retries === 0) {
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, delay));
      return this.retry(fn, retries - 1, delay);
    }
  }

  async timeout(promise, ms = 5000) {
    const timeout = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), ms);
    });
    return Promise.race([promise, timeout]);
  }
}

export const network = new Network();

export const useNetwork = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (method, endpoint, data = null) => {
    try {
      setLoading(true);
      setError(null);
      const response = await network[method](endpoint, data);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    get: (endpoint, params) => request('get', endpoint, params),
    post: (endpoint, data) => request('post', endpoint, data),
    put: (endpoint, data) => request('put', endpoint, data),
    delete: (endpoint) => request('delete', endpoint),
  };
}; 