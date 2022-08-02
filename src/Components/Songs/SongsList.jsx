import React from "react";
import SingleSongDiv from "./SingleSongDiv";
import "./SongsList.css"

export default function SongsList({products}) {
    return (
      <div>
        {products && products.results.map((result) => (
          <SingleSongDiv key={result.trackId} result={result} />
        ))}
      </div>
    );
}
