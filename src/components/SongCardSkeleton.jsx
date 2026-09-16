export default function SongCardSkeleton() {
  return (
    <div className="song-card song-card--skeleton">
      <div className="song-card__artwork skeleton-pulse"></div>
      <div className="song-card__artist skeleton-pulse"></div>
      <div className="song-card__title skeleton-pulse"></div>
      <div className="song-card__action skeleton-pulse"></div>
    </div>
  );
}
