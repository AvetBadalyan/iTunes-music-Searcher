import React, { useEffect, useState } from 'react';
import SongsList from '../Songs/SongsList';
import './Main.css';

export default function Main() {
  const [results, setResults] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isPlaceholder, setIsPlaceholder] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [popularSongs, setPopularSongs] = useState([]);

  useEffect(() => {
    fetch('https://itunes.apple.com/us/rss/topsongs/limit=25/json')
      .then((res) => res.json())
      .then((data) => {
        const normalized = data.feed.entry.map((item) => ({
          trackId: item.id.attributes['im:id'],
          trackName: item['im:name'].label,
          artistName: item['im:artist'].label,
          artworkUrl100: item['im:image'][2].label,
        }));
        setPopularSongs(normalized);
      })
      .catch(() => {});
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (inputValue.trim().length > 1) {
      setIsPlaceholder(false);
      setIsSearching(true);
      setOffset(0);
      setHasMore(false);
      const timer = setTimeout(() => {
        fetch(
          `https://itunes.apple.com/search?term=${encodeURIComponent(inputValue)}&media=music&limit=50&offset=0`,
        )
          .then((res) => res.json())
          .then((data) => {
            setResults(data.results);
            setHasMore(data.results.length === 50);
            setIsSearching(false);
          })
          .catch(() => setIsSearching(false));
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setIsPlaceholder(true);
      setIsSearching(false);
      setHasMore(false);
    }
  }, [inputValue]);

  const handleLoadMore = () => {
    const nextOffset = offset + 50;
    setIsLoadingMore(true);
    fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(inputValue)}&media=music&limit=50&offset=${nextOffset}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setResults((prev) => [...prev, ...data.results]);
        setOffset(nextOffset);
        setHasMore(data.results.length === 50);
        setIsLoadingMore(false);
      })
      .catch(() => setIsLoadingMore(false));
  };

  return (
    <div className="main">
      <div className="welcome-text">
        <div className="welcome-text-container">
          <h1>Discover new music every day.</h1>
          <p>
            Get playlists and albums inspired by the artists and genres you’re
            listening to. 1 month free, then $9.99/month
          </p>
        </div>
      </div>
      <div className="input-div">
        <input
          type="text"
          placeholder="Search by artist, song, or album..."
          value={inputValue}
          onChange={handleInputChange}
        />
        {isPlaceholder && popularSongs.length === 0 && (
          <p>Please type a name / title...</p>
        )}
        {isSearching && <p>Searching...</p>}
        <div className="search-result-count">
          {!isPlaceholder &&
            (results.length < 1
              ? 'No results'
              : `Great! Found ${results.length} tracks 🎼`)}
        </div>
      </div>
      {isPlaceholder && popularSongs.length > 0 && (
        <p className="popular-label">Trending right now</p>
      )}
      <SongsList
        results={isPlaceholder ? popularSongs : results}
        hasMore={isPlaceholder ? false : hasMore}
        isLoadingMore={isPlaceholder ? false : isLoadingMore}
        onLoadMore={handleLoadMore}
      />
    </div>
  );
}
