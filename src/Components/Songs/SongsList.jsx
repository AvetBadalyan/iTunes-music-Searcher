import React from "react";
import SingleSongDiv from "./SingleSongDiv";
import "./SongsList.css";

export default function SongsList({ searchResults }) {
  if (!searchResults || searchResults.results.length === 0) return null;
  return (
    <div className="search-result">
      {searchResults.results.map((result, index) => (
        <SingleSongDiv key={result.trackId || index} result={result} />
      ))}
    </div>
  );
}
