import axios from 'axios';

// Base configuration for Pepy.tech API
const PEPY_BASE_URL = 'https://api.pepy.tech';
const PROJECT_NAME = 'jackofalltrades';

// Create axios instance with default config
const api = axios.create({
  baseURL: PEPY_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor to include API key if available
api.interceptors.request.use(
  (config) => {
    const apiKey = import.meta.env.VITE_PEPPY_API_KEY;
    console.log('API Key status:', apiKey ? 'Available' : 'Not set');
    
    // Pepy.tech API might not require an API key for basic requests
    // Only add the header if we have a valid API key
    if (apiKey && apiKey !== 'your_api_key_here' && apiKey.trim() !== '') {
      config.headers['X-API-Key'] = apiKey;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * Fetch project download statistics
 * @returns {Promise<Object>} Project download data
 */
export const fetchDownloadStats = async () => {
  try {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
    
    // console.log('Fetching download stats from FastAPI backend...');
    
    // Make request to our FastAPI backend instead of directly to Pepy.tech
    const response = await axios.get(`${BACKEND_URL}/api/downloads`, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    // console.log('Backend API Response:', response.data);
    
    return {
      success: response.data.success,
      data: response.data,
      totalDownloads: response.data.total_downloads,
      projectId: response.data.project_id,
      versions: response.data.versions,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Failed to fetch download stats:', error);
    
    // Handle backend-specific errors
    const errorMessage = error.response?.data?.error || error.response?.data?.detail || error.message;
    const statusCode = error.response?.status;
    
    let userFriendlyError = '';
    if (statusCode === 401) {
      userFriendlyError = 'Backend API authentication failed. Check backend API key configuration.';
    } else if (statusCode === 404) {
      userFriendlyError = 'Package "jackofalltrades" not found on PyPI';
    } else if (statusCode === 429) {
      userFriendlyError = 'Rate limit exceeded. Please wait before trying again';
    } else if (statusCode === 500) {
      userFriendlyError = 'Backend server error. Please check backend configuration.';
    } else if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
      userFriendlyError = 'Cannot connect to backend server. Make sure FastAPI backend is running on http://localhost:8000';
    } else {
      userFriendlyError = errorMessage;
    }
    
    return {
      success: false,
      error: userFriendlyError,
      totalDownloads: 0,
      lastUpdated: new Date().toISOString()
    };
  }
};

/**
 * Format download number for display
 * @param {number} downloads - Raw download count
 * @returns {string} Formatted download string
 */
export const formatDownloads = (downloads) => {
  if (downloads >= 1000000) {
    return `${(downloads / 1000000).toFixed(1)}M`;
  } else if (downloads >= 1000) {
    return `${(downloads / 1000).toFixed(1)}K`;
  }
  return downloads.toLocaleString();
};

/**
 * Get cached download stats from localStorage
 * @returns {Object|null} Cached data or null
 */
export const getCachedStats = () => {
  try {
    const cached = localStorage.getItem('jackofalltrades_download_stats');
    if (cached) {
      const data = JSON.parse(cached);
      // Check if cache is less than 30 minutes old
      const cacheAge = Date.now() - new Date(data.timestamp).getTime();
      if (cacheAge < 30 * 60 * 1000) { // 30 minutes
        return data;
      }
    }
  } catch (error) {
    console.error('Failed to get cached stats:', error);
  }
  return null;
};

/**
 * Cache download stats in localStorage
 * @param {Object} stats - Download statistics
 */
export const cacheStats = (stats) => {
  try {
    const cacheData = {
      ...stats,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('jackofalltrades_download_stats', JSON.stringify(cacheData));
  } catch (error) {
    console.error('Failed to cache stats:', error);
  }
};

export default api; 