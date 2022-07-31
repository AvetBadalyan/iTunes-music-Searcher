import React from "react";
import { Link } from "react-router-dom";
import "./SingleSongDiv.css";

export default function SingleSongDiv({ result }) {
  return (
    <div className="single-song">
      <div className="single-song-img">
        <img src={result.artworkUrl100} />
      </div>
      <div className="single-song-artist-name"> {result.artistName}</div>
      <div className="single-song-trackName">{result.trackName}</div>
      <div className="single-song-details"> details </div>
    </div>
  );
}
