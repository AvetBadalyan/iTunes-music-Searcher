import React from "react";
import SingleSongDiv from "./SingleSongDiv";
import "./SongsList.css";

export default function SongsList({ searchResults }) {
  return (
    <div className="search-result">
      {searchResults &&
        searchResults.results.map((result, index) => (
          <SingleSongDiv key={result.trackId || index} result={result} />
        ))}
    </div>
  );
}
