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
 * Fetch project download statistics with enhanced caching strategy
 * @param {Object} options - Fetch options
 * @param {boolean} options.bypassCache - Force fresh fetch, ignoring cache
 * @param {Function} options.onCacheUsed - Callback when cache is used
 * @param {Function} options.onFetchStart - Callback when fetch starts
 * @returns {Promise<Object>} Project download data
 */
export const fetchDownloadStats = async (options = {}) => {
  const { bypassCache = false, onCacheUsed, onFetchStart } = options;
  const fetchStartTime = Date.now();
  
  try {
    // First, try to get cached data for instant display
    if (!bypassCache) {
      const cached = getCachedStats(true); // Allow stale cache
      if (cached) {
        console.log(`💾 Using cached data (${cached.cacheStatus.ageFormatted})`);
        if (onCacheUsed) {
          onCacheUsed(cached);
        }
        
        // If cache is fresh, return it immediately
        if (cached.cacheStatus.isFresh) {
          return cached;
        }
        
        // If cache is stale, continue to fetch fresh data in background
        console.log('🔄 Cache is stale, fetching fresh data in background...');
      }
    }
    
    if (onFetchStart) {
      onFetchStart();
    }
    
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    
    console.log('🚀 Fetching download stats from FastAPI backend...');
    
    // Make request to our FastAPI backend instead of directly to Pepy.tech
    const response = await axios.get(`${BACKEND_URL}/api/downloads`, {
      timeout: 70000, // Increased timeout to 70 seconds
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    const fetchDuration = Date.now() - fetchStartTime;
    console.log(`✅ Backend API Response received in ${fetchDuration}ms`);
    
    const freshData = {
      success: response.data.success,
      data: response.data,
      totalDownloads: response.data.total_downloads,
      projectId: response.data.project_id,
      versions: response.data.versions,
      lastUpdated: new Date().toISOString(),
      fetchDuration
    };
    
    // Cache the fresh data
    cacheStats(freshData);
    
    return freshData;
    
  } catch (error) {
    const fetchDuration = Date.now() - fetchStartTime;
    console.error(`❌ Failed to fetch download stats after ${fetchDuration}ms:`, error);
    
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
    } else if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
      userFriendlyError = 'Request timed out. The backend is taking longer than expected.';
    } else {
      userFriendlyError = errorMessage;
    }
    
    // Try to return cached data as fallback, even if stale
    const cached = getCachedStats(true);
    if (cached) {
      console.log('📦 Returning cached data as fallback due to fetch error');
      return {
        ...cached,
        error: userFriendlyError,
        usingFallbackCache: true
      };
    }
    
    return {
      success: false,
      error: userFriendlyError,
      totalDownloads: 0,
      lastUpdated: new Date().toISOString(),
      fetchDuration
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
 * Cache configuration
 */
const CACHE_CONFIG = {
  FRESH_TIME: 30 * 60 * 1000, // 30 minutes - consider cache fresh
  STALE_TIME: 24 * 60 * 60 * 1000, // 24 hours - cache becomes stale but still usable
  MAX_AGE: 7 * 24 * 60 * 60 * 1000, // 7 days - cache expires completely
};

/**
 * Format cache age for display
 * @param {number} ageInMs - Cache age in milliseconds
 * @returns {string} Formatted age string
 */
const formatCacheAge = (ageInMs) => {
  const minutes = Math.floor(ageInMs / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'just now';
};

/**
 * Get cached download stats from localStorage with enhanced logic
 * @param {boolean} allowStale - Whether to return stale cache data
 * @returns {Object|null} Cached data with status info or null
 */
export const getCachedStats = (allowStale = true) => {
  try {
    const cached = localStorage.getItem('jackofalltrades_download_stats');
    if (cached) {
      const data = JSON.parse(cached);
      const cacheAge = Date.now() - new Date(data.timestamp).getTime();
      
      // Check cache status
      const isFresh = cacheAge < CACHE_CONFIG.FRESH_TIME;
      const isStale = cacheAge >= CACHE_CONFIG.FRESH_TIME && cacheAge < CACHE_CONFIG.STALE_TIME;
      const isExpired = cacheAge >= CACHE_CONFIG.MAX_AGE;
      
      if (isExpired) {
        // Cache is too old, remove it
        localStorage.removeItem('jackofalltrades_download_stats');
        return null;
      }
      
      if (isFresh || (isStale && allowStale)) {
        return {
          ...data,
          cacheStatus: {
            isFresh,
            isStale,
            ageInMs: cacheAge,
            ageFormatted: formatCacheAge(cacheAge)
          }
        };
      }
    }
  } catch (error) {
    console.error('Failed to get cached stats:', error);
  }
  return null;
};

/**
 * Cache download stats in localStorage with enhanced metadata
 * @param {Object} stats - Download statistics
 */
export const cacheStats = (stats) => {
  try {
    const cacheData = {
      ...stats,
      timestamp: new Date().toISOString(),
      cacheVersion: '2.0', // Version for future cache migrations
      fetchDuration: stats.fetchDuration || null
    };
    localStorage.setItem('jackofalltrades_download_stats', JSON.stringify(cacheData));
    console.log('📦 Download stats cached successfully');
  } catch (error) {
    console.error('Failed to cache stats:', error);
  }
};

/**
 * Check if cache needs refresh (is stale)
 * @returns {boolean} True if cache needs background refresh
 */
export const shouldRefreshCache = () => {
  const cached = getCachedStats(true);
  return cached ? cached.cacheStatus.isStale : true;
};

/**
 * Clear all cached data
 */
export const clearCache = () => {
  try {
    localStorage.removeItem('jackofalltrades_download_stats');
    console.log('🗑️ Cache cleared successfully');
  } catch (error) {
    console.error('Failed to clear cache:', error);
  }
};

/**
 * Get cache information for debugging/display
 * @returns {Object|null} Cache information or null
 */
export const getCacheInfo = () => {
  const cached = getCachedStats(true);
  if (!cached) return null;
  
  return {
    hasCache: true,
    isFresh: cached.cacheStatus.isFresh,
    isStale: cached.cacheStatus.isStale,
    ageFormatted: cached.cacheStatus.ageFormatted,
    lastUpdated: cached.lastUpdated,
    totalDownloads: cached.totalDownloads,
    cacheVersion: cached.cacheVersion || '1.0'
  };
};

export default api; 