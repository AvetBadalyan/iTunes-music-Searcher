import React, { useEffect, useState } from "react";
import SongsList from "../Songs/SongsList";
import "./Main.css";

export default function Main() {
  const [searchResults, setSearchResults] = useState({
    results: [],
  });
  const [inputValue, setInputValue] = useState("");
  const [isPlaceholder, setIsPlaceholder] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const handleSearch = () => {
      fetch(`https://itunes.apple.com/search?term=${inputValue}`)
        .then((res) => res.json())
        .then((data) => setSearchResults(data));
    };
    if (inputValue.trim().length > 1) {
      setIsPlaceholder(false);
      setIsSearching(true);
      handleSearch();
      setIsSearching(false);
    } else {
      setSearchResults({
        results: [],
      });
      setIsPlaceholder(true);
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
          placeholder="search..."
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
