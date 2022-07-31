import React, { useEffect, useState } from "react";
import SongsList from "../Songs/SongsList";
import "./Main.css";

export default function Main() {
  const [products, setProducts] = useState({
    results: [
      {
        kind: "song",
        artistId: 3097598,
        trackId: 724397429,
        artistName: "Charles Aznavour",
        collectionName: "Charles Aznavour: Palais des Congrès 2000",
        trackName: "Sa jeunesse / Hier encore",
        artworkUrl100:
          "https://is4-ssl.mzstatic.com/image/thumb/Music6/v4/92/45/17/924517d5-7f73-8a5a-6083-46ee549d3982/00724353202057.jpg/100x100bb.jpg",
      },
    ],
  });
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    fetch(`https://itunes.apple.com/search?term=${inputValue}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  useEffect(() => {
    if (inputValue.length > 2) {
      handleSearch();
    }
  }, [inputValue]);

  return (
    <div className="main">
      <div className="welcome-text">
        <h1>Discover new music every day.</h1>
        <p>
          Get playlists and albums inspired by the artists and genres you’re
          listening to. 1 month free, then $9.99/month
        </p>
      </div>
      <input
        type="text"
        placeholder="search..."
        value={inputValue}
        onChange={handleInputChange}
      />
      <div className="search-result">
        <SongsList products={products} />
      </div>
    </div>
  );
}
