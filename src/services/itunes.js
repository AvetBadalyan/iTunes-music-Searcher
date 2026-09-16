const BASE_URL = 'https://itunes.apple.com';
const RSS_URL = `${BASE_URL}/us/rss/topsongs/limit=25/json`;

/**
 * Fetch trending/top songs from iTunes RSS feed
 */
export async function fetchTrendingSongs() {
  const response = await fetch(RSS_URL);
  
  if (!response.ok) {
    throw new Error('Failed to fetch trending songs');
  }
  
  const data = await response.json();
  
  if (!data.feed?.entry) {
    return [];
  }
  
  return data.feed.entry.map((item) => ({
    trackId: item.id.attributes['im:id'],
    trackName: item['im:name'].label,
    artistName: item['im:artist'].label,
    artworkUrl100: item['im:image'][2].label,
  }));
}

/**
 * Search for tracks by term
 */
export async function searchTracks(term, offset = 0, limit = 50) {
  const url = `${BASE_URL}/search?term=${encodeURIComponent(term)}&media=music&limit=${limit}&offset=${offset}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to search tracks');
  }
  
  const data = await response.json();
  
  return {
    results: data.results || [],
    hasMore: (data.results?.length || 0) === limit,
  };
}

/**
 * Fetch single track details by ID
 */
export async function fetchTrackById(trackId) {
  const url = `${BASE_URL}/lookup?id=${trackId}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch track details');
  }
  
  const data = await response.json();
  
  if (!data.results || data.results.length === 0) {
    throw new Error('Track not found');
  }
  
  return data.results[0];
}

/**
 * Convert milliseconds to readable duration string
 */
export function formatDuration(millis) {
  if (!millis) return 'Unavailable';
  
  const minutes = Math.floor(millis / 60000);
  const seconds = Math.floor((millis % 60000) / 1000);
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Format release date to readable string
 */
export function formatReleaseDate(dateString) {
  if (!dateString) return 'Unavailable';
  
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Get high-resolution artwork URL (600x600)
 */
export function getHighResArtwork(url) {
  if (!url) return null;
  return url.replace('100x100bb', '600x600bb');
}
