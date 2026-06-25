import React from "react";
import SingleSongDiv from "./SingleSongDiv";
import "./SongsList.css";

export default function SongsList({ results, hasMore, isLoadingMore, onLoadMore }) {
  if (!results || results.length === 0) return null;
  return (
    <div className="search-result">
      {results.map((result, index) => (
        <SingleSongDiv key={result.trackId || index} result={result} />
      ))}
      {hasMore && (
        <div className="load-more">
          <button
            className="load-more-btn"
            onClick={onLoadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
