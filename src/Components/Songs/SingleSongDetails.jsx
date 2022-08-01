import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SingleSongDetails.css";
import { useParams } from "react-router-dom";

export default function SingleSongDetails() {
  const [song, setSong] = useState({});
  const { trackId } = useParams();

  useEffect(() => {
    const fetchMusic = async () => {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${trackId}`
      );
      const responseData = await response.json();
      setSong(responseData.results[0]);
    };
    fetchMusic();
  }, [trackId]);

  return (
    <div className="song-details">
      <div className="song-details-content">
        <h1>iTunes Music Searcher</h1>
        <Link to="/">Go Back</Link>
        <div className="singer-image">
          <img src={song.artworkUrl100} alt="artist-image" />
        </div>
        <div className="song-text">
          {song.artistName} - {song.trackName}
        </div>
        <div>
          <p>Preview:</p>
          <audio src={song.previewUrl} controls />
        </div>
      </div>
    </div>
  );
}
