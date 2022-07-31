import React, { useEffect, useState } from "react";
import "./Main.css";

export default function Main() {
  const [products, setProducts] = useState({
    results: [
      {
        wrapperType: "track",
        kind: "song",
        artistId: 3097598,
        collectionId: 724396358,
        trackId: 724397429,
        artistName: "Charles Aznavour",
        collectionName: "Charles Aznavour: Palais des Congrès 2000",
        trackName: "Sa jeunesse / Hier encore",
        collectionCensoredName: "Charles Aznavour: Palais des Congrès 2000",
        trackCensoredName: "Sa jeunesse / Hier encore",
        artistViewUrl:
          "https://music.apple.com/us/artist/charles-aznavour/3097598?uo=4",
        collectionViewUrl:
          "https://music.apple.com/us/album/sa-jeunesse-hier-encore/724396358?i=724397429&uo=4",
        trackViewUrl:
          "https://music.apple.com/us/album/sa-jeunesse-hier-encore/724396358?i=724397429&uo=4",
        previewUrl:
          "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/8d/4f/ff/8d4fffed-c032-ae89-4310-f42802c131f1/mzaf_6021857347694418740.plus.aac.p.m4a",
        artworkUrl30:
          "https://is4-ssl.mzstatic.com/image/thumb/Music6/v4/92/45/17/924517d5-7f73-8a5a-6083-46ee549d3982/00724353202057.jpg/30x30bb.jpg",
        artworkUrl60:
          "https://is4-ssl.mzstatic.com/image/thumb/Music6/v4/92/45/17/924517d5-7f73-8a5a-6083-46ee549d3982/00724353202057.jpg/60x60bb.jpg",
        artworkUrl100:
          "https://is4-ssl.mzstatic.com/image/thumb/Music6/v4/92/45/17/924517d5-7f73-8a5a-6083-46ee549d3982/00724353202057.jpg/100x100bb.jpg",
        collectionPrice: 24.99,
        trackPrice: 1.29,
        releaseDate: "2001-09-18T12:00:00Z",
        collectionExplicitness: "notExplicit",
        trackExplicitness: "notExplicit",
        discCount: 2,
        discNumber: 2,
        trackCount: 16,
        trackNumber: 8,
        trackTimeMillis: 295467,
        country: "USA",
        currency: "USD",
        primaryGenreName: "French Pop",
        isStreamable: true,
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
        {products.results.map((result) => (
          <div key={result.trackId}>artistName: {result.artistName}</div>
        ))}
      </div>
    </div>
  );
}
