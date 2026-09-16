import SongCard from './SongCard'
import SongCardSkeleton from './SongCardSkeleton'

export default function SongList({
	tracks,
	isLoading,
	hasMore,
	isLoadingMore,
	onLoadMore,
	error
}) {
	// Initial loading — show skeletons.
	if (isLoading) {
		return (
			<div className="song-list">
				{Array.from({ length: 10 }).map((_, index) => (
					<SongCardSkeleton key={index} />
				))}
			</div>
		)
	}

	// Error with no tracks to fall back on — full error state.
	if (error && (!tracks || tracks.length === 0)) {
		return (
			<div
				className="song-list__error"
				role="alert"
			>
				<i
					className="fa-solid fa-circle-exclamation"
					aria-hidden="true"
				></i>
				<p>{error}</p>
			</div>
		)
	}

	if (!tracks || tracks.length === 0) {
		return null
	}

	return (
		<div className="song-list">
			{tracks.map((track, index) => (
				<SongCard
					key={track.trackId || index}
					track={track}
				/>
			))}

			{/* Inline error (e.g. a failed "load more") keeps existing results + retry visible. */}
			{error && (
				<div
					className="song-list__inline-error"
					role="alert"
				>
					<i
						className="fa-solid fa-circle-exclamation"
						aria-hidden="true"
					></i>
					<span>{error}</span>
				</div>
			)}

			{hasMore && (
				<div className="song-list__load-more">
					<button
						className="btn btn--secondary"
						onClick={onLoadMore}
						disabled={isLoadingMore}
					>
						{isLoadingMore ? (
							<>
								<i
									className="fa-solid fa-spinner fa-spin"
									aria-hidden="true"
								></i>
								Loading...
							</>
						) : error ? (
							'Retry'
						) : (
							'Load More'
						)}
					</button>
				</div>
			)}
		</div>
	)
}
