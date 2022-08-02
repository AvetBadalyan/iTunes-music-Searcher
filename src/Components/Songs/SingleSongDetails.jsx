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

  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes} minutes ${seconds < 10 ? "0" : ""}${seconds} seconds`;
  };

  const duration = millisToMinutesAndSeconds(song.trackTimeMillis);

  return (
    <div className="song-details">
      <div className="song-details-content">
        <h1>iTunes Music Searcher</h1>
        <Link to="/">Go Back</Link>
        <div className="song-image-and-info">
          <div className="singer-image">
            <img src={song.artworkUrl100} alt="artist-image" />
          </div>
          <div className="song-infos">
            <div className="song-info">Track price: {song.trackPrice} $</div>
            <div className="song-info">
              Release Date: {`${song.releaseDate}`.slice(0, 10)}
            </div>
            <div className="song-info">Duration: {duration}</div>
            <div className="song-info">Country: {song.country}</div>
            <div className="song-info">Currency: {song.currency}</div>
            <div className="song-info">
            Genre: {song.primaryGenreName}
            </div>
            <div className="song-info">
              <p>
                {`Collection: `}
                {`${song.collectionName}`.length < 40
                  ? song.collectionName
                  : ` ${song.collectionName.slice(0, 40)}...`}
              </p>
            </div>
          </div>
        </div>
        <div className="song-text">
          {song.artistName} - {song.trackName}
        </div>
        <div>
          <p>Preview:</p>
          <audio src={song.previewUrl} controls />
        </div>

        <div>
          <a target="_blank" href={song.artistViewUrl}>
            Check the Artist's page on Apple music
          </a>
        </div>
        <div>
          <a target="_blank" href={song.collectionViewUrl}>
            Check the collection on Apple music
          </a>
        </div>
        <div>
          <a target="_blank" href={song.trackViewUrl}>
            Check the track on Apple music
          </a>
        </div>
      </div>
    </div>
  );
}
