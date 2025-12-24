import { useState, useEffect } from 'react';
import { Download, TrendingUp, RefreshCw, Clock, Wifi, WifiOff } from 'lucide-react';
import { fetchDownloadStats, formatDownloads, getCachedStats, shouldRefreshCache, clearCache } from '../api/api';

const DownloadCounter = ({ showLabel = true, compact = false }) => {
  const [downloads, setDownloads] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isBackgroundLoading, setIsBackgroundLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [cacheInfo, setCacheInfo] = useState(null);
  const [usingFallbackCache, setUsingFallbackCache] = useState(false);

  const loadDownloadStats = async (forceRefresh = false) => {
    try {
      setError(null);
      setUsingFallbackCache(false);
      
      if (forceRefresh) {
        setIsLoading(true);
      }

      const stats = await fetchDownloadStats({
        bypassCache: forceRefresh,
        
        // Callback when cached data is used (instant display)
        onCacheUsed: (cachedData) => {
          setDownloads(cachedData.totalDownloads);
          setLastUpdated(cachedData.lastUpdated);
          setCacheInfo(cachedData.cacheStatus);
          setIsLoading(false);
          
          // If cache is stale, show background loading indicator
          if (cachedData.cacheStatus.isStale) {
            setIsBackgroundLoading(true);
          }
        },
        
        // Callback when fresh fetch starts
        onFetchStart: () => {
          if (!forceRefresh) {
            setIsBackgroundLoading(true);
          }
        }
      });
      
      if (stats.success) {
        setDownloads(stats.totalDownloads);
        setLastUpdated(stats.lastUpdated);
        setCacheInfo(stats.cacheStatus || null);
        setUsingFallbackCache(!!stats.usingFallbackCache);
        
        if (stats.usingFallbackCache) {
          setError(stats.error);
        }
      } else {
        setError(stats.error);
        // The API already handles fallback cache internally
        if (stats.totalDownloads > 0) {
          setDownloads(stats.totalDownloads);
          setLastUpdated(stats.lastUpdated);
          setUsingFallbackCache(true);
        }
      }
    } catch (err) {
      console.error('Error loading download stats:', err);
      setError(err.message);
      
      // Try to get any cached data as final fallback
      const cached = getCachedStats(true);
      if (cached) {
        setDownloads(cached.totalDownloads);
        setLastUpdated(cached.lastUpdated);
        setCacheInfo(cached.cacheStatus);
        setUsingFallbackCache(true);
      }
    } finally {
      setIsLoading(false);
      setIsBackgroundLoading(false);
    }
  };

  useEffect(() => {
    // Initial load - this will show cached data instantly if available
    loadDownloadStats();

    // Set up automatic background refresh based on cache status
    const intervalId = setInterval(() => {
      // Only refresh if cache is stale or doesn't exist
      if (shouldRefreshCache()) {
        console.log('🔄 Auto-refreshing stale cache...');
        loadDownloadStats(false); // Don't force refresh, let it use cache strategy
      }
    }, 5 * 60 * 1000); // Check every 5 minutes

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleRefresh = () => {
    loadDownloadStats(true); // Force refresh
  };

  const handleClearCache = () => {
    clearCache();
    loadDownloadStats(true); // Force fresh fetch
  };

  const formatLastUpdated = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  if (compact) {
    return (
      <div className="download-counter-compact">
        <div className="download-stats-compact">
          <Download size={16} className="download-icon-compact" />
          <span className="download-number-compact">
            {isLoading ? '...' : formatDownloads(downloads)}
          </span>
          {showLabel && <span className="download-label-compact">downloads</span>}
        </div>
      </div>
    );
  }

  return (
    <div className="download-counter">
      <div className="download-header">
        <div className="download-icon-wrapper">
          <TrendingUp size={24} className="download-icon" />
        </div>
        <div className="download-info">
          <h3>Total Downloads</h3>
          {lastUpdated && (
            <p className="last-updated">
              Updated {formatLastUpdated(lastUpdated)}
              {cacheInfo && (
                <span className={`cache-status ${cacheInfo.isFresh ? 'fresh' : 'stale'}`}>
                  {cacheInfo.isFresh ? ' • Fresh' : ' • Cached'}
                  {usingFallbackCache && ' • Offline'}
                </span>
              )}
            </p>
          )}
        </div>
        <div className="download-actions">
          {isBackgroundLoading && (
            <div className="background-loading" title="Updating in background...">
              <Wifi size={14} className="spinning" />
            </div>
          )}
          <button 
            onClick={handleRefresh} 
            className="refresh-btn"
            disabled={isLoading}
            title="Force refresh download stats"
          >
            <RefreshCw size={16} className={isLoading ? 'spinning' : ''} />
          </button>
          {cacheInfo && (
            <button 
              onClick={handleClearCache}
              className="clear-cache-btn"
              title="Clear cache and refresh"
            >
              <Clock size={14} />
            </button>
          )}
        </div>
      </div>
      
      <div className="download-stats">
        {isLoading ? (
          <div className="download-loading">
            <div className="loading-spinner"></div>
            <span>Loading...</span>
          </div>
        ) : error && !usingFallbackCache ? (
          <div className="download-error">
            <span>Failed to load stats</span>
            <button onClick={handleRefresh} className="retry-btn">
              Retry
            </button>
          </div>
        ) : (
          <div className="download-number-wrapper">
            <span className="download-number">{formatDownloads(downloads)}</span>
            <span className="download-raw">({downloads.toLocaleString()})</span>
            {usingFallbackCache && (
              <div className="offline-indicator">
                <WifiOff size={14} />
                <span>Offline mode</span>
              </div>
            )}
          </div>
        )}
      </div>
      
      {error && (
        <div className={usingFallbackCache ? "download-offline-info" : "download-error-details"}>
          <small>
            {usingFallbackCache 
              ? `Server temporarily unavailable. Showing cached data from ${cacheInfo?.ageFormatted || 'earlier'}.`
              : `Error: ${error}`
            }
          </small>
          {usingFallbackCache && (
            <button 
              onClick={handleRefresh} 
              className="reconnect-btn"
              disabled={isLoading}
              title="Try to reconnect to server"
            >
              <Wifi size={12} />
              Reconnect
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DownloadCounter; 