import { Link, useNavigate, useParams } from 'react-router-dom'
import { useTrackDetails } from '../hooks/useTrackDetails'
import {
	formatDuration,
	formatReleaseDate,
	getHighResArtwork
} from '../services/itunes'
import { truncate } from '../utils/text'

const FALLBACK_ARTWORK =
	'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 200%22%3E%3Crect width=%22200%22 height=%22200%22 fill=%22%23262626%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2288%22 text-anchor=%22middle%22 dominant-baseline=%22central%22%3E%F0%9F%8E%B5%3C/text%3E%3C/svg%3E'

export default function TrackDetailPage() {
	const { trackId } = useParams()
	const navigate = useNavigate()
	const { track, isLoading, error } = useTrackDetails(trackId)

	// Go back to the previous page (preserving search results). Fall back to the
	// home page when there is no history to return to (e.g. a shared deep link).
	const handleGoBack = () => {
		if (window.history.length > 1) {
			navigate(-1)
		} else {
			navigate('/')
		}
	}

	if (isLoading) {
		return (
			<div className="track-detail">
				<div className="track-detail__content">
					<header className="track-detail__header">
						<h1 className="track-detail__logo">iTunes Music Searcher</h1>
					</header>
					<div className="track-detail__loading">
						<i
							className="fa-solid fa-spinner fa-spin fa-2x"
							aria-hidden="true"
						></i>
						<p>Loading track details...</p>
					</div>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className="track-detail">
				<div className="track-detail__content">
					<header className="track-detail__header">
						<h1 className="track-detail__logo">iTunes Music Searcher</h1>
					</header>
					<div
						className="track-detail__error"
						role="alert"
					>
						<i
							className="fa-solid fa-circle-exclamation fa-2x"
							aria-hidden="true"
						></i>
						<p>{error}</p>
						<Link
							to="/"
							className="btn btn--primary"
						>
							Back to Home
						</Link>
					</div>
				</div>
			</div>
		)
	}

	if (!track) return null

	const artworkUrl = getHighResArtwork(track.artworkUrl100) || FALLBACK_ARTWORK

	return (
		<div className="track-detail">
			<div className="track-detail__content">
				<header className="track-detail__header">
					<h1 className="track-detail__logo">iTunes Music Searcher</h1>
					<button
						type="button"
						onClick={handleGoBack}
						className="track-detail__back"
					>
						<i
							className="fa-solid fa-arrow-left"
							aria-hidden="true"
						></i>
						Back
					</button>
				</header>

				<div className="track-detail__main">
					<div className="track-detail__artwork">
						<img
							src={artworkUrl}
							alt={`${track.artistName} - ${track.trackName}`}
							onError={e => {
								e.currentTarget.src = FALLBACK_ARTWORK
							}}
						/>
					</div>

					<div className="track-detail__info">
						<InfoRow
							label="Track Price"
							value={track.trackPrice ? `$${track.trackPrice}` : null}
						/>
						<InfoRow
							label="Release Date"
							value={formatReleaseDate(track.releaseDate)}
						/>
						<InfoRow
							label="Duration"
							value={formatDuration(track.trackTimeMillis)}
						/>
						<InfoRow
							label="Country"
							value={track.country}
						/>
						<InfoRow
							label="Currency"
							value={track.currency}
						/>
						<InfoRow
							label="Genre"
							value={track.primaryGenreName}
						/>
						<InfoRow
							label="Collection"
							value={truncate(track.collectionName, 40)}
						/>
					</div>
				</div>

				<h2 className="track-detail__title">
					{track.artistName || 'Unknown Artist'} —{' '}
					{track.trackName || 'Unknown Track'}
				</h2>

				{track.previewUrl && (
					<div className="track-detail__preview">
						<p className="track-detail__preview-label">Preview</p>
						<audio
							className="track-detail__audio"
							src={track.previewUrl}
							controls
						/>
					</div>
				)}

				<nav
					className="track-detail__links"
					aria-label="External links"
				>
					{track.artistViewUrl && (
						<a
							href={track.artistViewUrl}
							target="_blank"
							rel="noreferrer"
							className="track-detail__link"
						>
							<i
								className="fa-solid fa-user"
								aria-hidden="true"
							></i>
							Artist on Apple Music
						</a>
					)}
					{track.collectionViewUrl && (
						<a
							href={track.collectionViewUrl}
							target="_blank"
							rel="noreferrer"
							className="track-detail__link"
						>
							<i
								className="fa-solid fa-compact-disc"
								aria-hidden="true"
							></i>
							Collection on Apple Music
						</a>
					)}
					{track.trackViewUrl && (
						<a
							href={track.trackViewUrl}
							target="_blank"
							rel="noreferrer"
							className="track-detail__link"
						>
							<i
								className="fa-solid fa-music"
								aria-hidden="true"
							></i>
							Track on Apple Music
						</a>
					)}
				</nav>
			</div>
		</div>
	)
}

function InfoRow({ label, value }) {
	return (
		<div className="track-detail__row">
			<span className="track-detail__label">{label}</span>
			<span className="track-detail__value">{value || 'Unavailable'}</span>
		</div>
	)
}
