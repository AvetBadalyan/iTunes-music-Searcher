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
        `https://itunes.apple.com/lookup?id=${trackId}`
      );
      const responseData = await response.json();
      setSong(responseData.results[0] || {});
    };
    fetchMusic();
  }, [trackId]);

  const millisToMinutesAndSeconds = (millis) => {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes} minutes ${seconds < 10 ? "0" : ""}${seconds} seconds`;
  };

  const duration = song.trackTimeMillis 
    ? millisToMinutesAndSeconds(song.trackTimeMillis)
    : "Unavailable";

  return (
    <div className="song-details">
      <div className="song-details-content">
        <h1>iTunes Music Searcher</h1>
        <Link to="/">Go Back</Link>
        <div className="song-image-and-info">
          <div className="singer-image">
            <img src={song.artworkUrl100} alt="artist" />
          </div>
          <div className="song-infos">
            <div className="song-info">Track price: {song.trackPrice || "Unavailable"} $</div>
            <div className="song-info">
              Release Date: {song.releaseDate ? `${song.releaseDate}`.slice(0, 10) : "Unavailable"}
            </div>
            <div className="song-info">Duration: {duration}</div>
            <div className="song-info">Country: {song.country || "Unavailable"}</div>
            <div className="song-info">Currency: {song.currency || "Unavailable"}</div>
            <div className="song-info">Genre: {song.primaryGenreName || "Unavailable"}</div>
            <div className="song-info">
              <p>
                {`Collection: `}
                {song.collectionName
                  ? song.collectionName.length < 40
                    ? song.collectionName
                    : ` ${song.collectionName.slice(0, 40)}...`
                  : "Unavailable"}
              </p>
            </div>
          </div>
        </div>
        <div className="song-text">
          {song.artistName || "Unknown artist"} - {song.trackName || "Unknown track"}
        </div>
        <div>
          <p>Preview:</p>
          <audio src={song.previewUrl} controls />
        </div>

        <div>
          <a target="_blank" href={song.artistViewUrl} rel="noreferrer">
            Check the Artist's page on Apple music
          </a>
        </div>
        <div>
          <a target="_blank" href={song.collectionViewUrl} rel="noreferrer">
            Check the collection on Apple music
          </a>
        </div>
        <div>
          <a target="_blank" href={song.trackViewUrl} rel="noreferrer">
            Check the track on Apple music
          </a>
        </div>
      </div>
    </div>
  );
}
