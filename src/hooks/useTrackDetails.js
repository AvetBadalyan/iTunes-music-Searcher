import { useState, useEffect } from 'react';
import { fetchTrackById } from '../services/itunes';

/**
 * Custom hook for fetching single track details
 * @param {string} trackId - The iTunes track ID
 * @returns {Object} Track details state
 */
export function useTrackDetails(trackId) {
  const [track, setTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!trackId) {
      setError('No track ID provided');
      setIsLoading(false);
      return;
    }

    const loadTrack = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const trackData = await fetchTrackById(trackId);
        setTrack(trackData);
      } catch (err) {
        setError('Failed to load track details. The track may not exist.');
      } finally {
        setIsLoading(false);
      }
    };

    loadTrack();
  }, [trackId]);

  return { track, isLoading, error };
}
