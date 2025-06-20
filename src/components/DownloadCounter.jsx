import { useState, useEffect } from 'react';
import { Download, TrendingUp, RefreshCw } from 'lucide-react';
import { fetchDownloadStats, formatDownloads, getCachedStats, cacheStats } from '../api/api';

const DownloadCounter = ({ showLabel = true, compact = false }) => {
  const [downloads, setDownloads] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadDownloadStats = async (useCache = true) => {
    try {
      setIsLoading(true);
      setError(null);

      // Try to get cached data first
      if (useCache) {
        const cached = getCachedStats();
        if (cached && cached.success) {
          setDownloads(cached.totalDownloads);
          setLastUpdated(cached.lastUpdated);
          setIsLoading(false);
          return;
        }
      }

      // Fetch fresh data
      const stats = await fetchDownloadStats();
      
      if (stats.success) {
        setDownloads(stats.totalDownloads);
        setLastUpdated(stats.lastUpdated);
        cacheStats(stats); // Cache the results
      } else {
        setError(stats.error);
        // Use cached data as fallback if available
        const cached = getCachedStats();
        if (cached) {
          setDownloads(cached.totalDownloads);
          setLastUpdated(cached.lastUpdated);
        }
      }
    } catch (err) {
      console.error('Error loading download stats:', err);
      setError(err.message);
      
      // Use cached data as fallback
      const cached = getCachedStats();
      if (cached) {
        setDownloads(cached.totalDownloads);
        setLastUpdated(cached.lastUpdated);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial load
    loadDownloadStats();

    // Set up automatic refresh every 2 minutes (respecting API rate limits)
    const intervalId = setInterval(() => {
      console.log('Refreshing download stats...');
      loadDownloadStats(false); // Force fresh data
    }, 300000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleRefresh = () => {
    loadDownloadStats(false);
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
            </p>
          )}
        </div>
        <button 
          onClick={handleRefresh} 
          className="refresh-btn"
          disabled={isLoading}
          title="Refresh download stats"
        >
          <RefreshCw size={16} className={isLoading ? 'spinning' : ''} />
        </button>
      </div>
      
      <div className="download-stats">
        {isLoading ? (
          <div className="download-loading">
            <div className="loading-spinner"></div>
            <span>Loading...</span>
          </div>
        ) : error ? (
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
          </div>
        )}
      </div>
      
      {error && (
        <div className="download-error-details">
          <small>Using cached data. Error: {error}</small>
        </div>
      )}
    </div>
  );
};

export default DownloadCounter; 