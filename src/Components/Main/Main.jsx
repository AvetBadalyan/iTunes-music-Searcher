import React, { useEffect, useState } from "react";
import SongsList from "../Songs/SongsList";
import "./Main.css";

export default function Main() {
  const [searchResults, setSearchResults] = useState({ results: [] });
  const [inputValue, setInputValue] = useState("");
  const [isPlaceholder, setIsPlaceholder] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (inputValue.trim().length > 1) {
      setIsPlaceholder(false);
      setIsSearching(true);
      const timer = setTimeout(() => {
        fetch(
          `https://itunes.apple.com/search?term=${encodeURIComponent(inputValue)}&media=music`
        )
          .then((res) => res.json())
          .then((data) => {
            setSearchResults(data);
            setIsSearching(false);
          })
          .catch(() => setIsSearching(false));
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setSearchResults({ results: [] });
      setIsPlaceholder(true);
      setIsSearching(false);
    }
  }, [inputValue]);

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
        {isPlaceholder && <p>Please type a name / title...</p>}
        {isSearching && <p>Searching...</p>}
        <div className="search-result-count">
          {!isPlaceholder &&
            (searchResults.results.length < 1
              ? "No results"
              : `Great! Found ${searchResults.resultCount} tracks 🎼`)}
        </div>
      </div>
      <SongsList searchResults={searchResults} />
    </div>
  );
}
