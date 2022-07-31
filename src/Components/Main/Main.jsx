import React from "react";
import "./Main.css";

export default function Main() {
  return (
    <div className="main">
      <div className="welcome-text">
        <h1>Discover new music every day.</h1>
        <p>
          Get playlists and albums inspired by the artists and genres you’re
          listening to. 1 month free, then $9.99/month
        </p>
      </div>
      <input type="text" placeholder="search..." />
    </div>
  );
}
