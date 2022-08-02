import React from "react";
import SingleSongDiv from "./SingleSongDiv";
import "./SongsList.css";

export default function SongsList({ searchResults }) {
  return (
    <div>

      {searchResults &&
        searchResults.results.map((result) => (
          <SingleSongDiv key={result.trackId} result={result} />
        ))}
    </div>
  );
}
