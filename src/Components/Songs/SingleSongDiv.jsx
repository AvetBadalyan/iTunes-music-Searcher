import React from "react";
import { Link } from "react-router-dom";
import "./SingleSongDiv.css";

export default function SingleSongDiv({ result }) {
  if (window.matchMedia("(max-width: 767px)").matches) {
    // The viewport is less than 768 pixels wide
    let tags = document.getElementsByClassName("single-song-details");
    for (let i = 0; i < tags.length; i++) {
      tags[i].target = "_self";
    }
  }

  return (
    <div className="single-song">
      <div className="single-song-img">
        <img src={result.artworkUrl100} alt="singer" />
      </div>
      <div className="single-song-artist-name">
        {result.artistName.length < 30
          ? result.artistName
          : `${result.artistName.slice(0, 31)}...`}
      </div>
      <div className="single-song-trackName">{result.trackName}</div>
      <div className="single-song-details">
        <Link to={`/songdetails/${result.trackId}`} target="_blank">
          details
        </Link>
      </div>
    </div>
  );
}
