import { Link } from 'react-router-dom'
import { truncate } from '../utils/text'

const FALLBACK_ARTWORK =
	'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 72 72%22%3E%3Crect width=%2272%22 height=%2272%22 fill=%22%23262626%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2232%22 text-anchor=%22middle%22 dominant-baseline=%22central%22%3E%F0%9F%8E%B5%3C/text%3E%3C/svg%3E'

export default function SongCard({ track }) {
	const handleImgError = e => {
		e.currentTarget.src = FALLBACK_ARTWORK
	}

	return (
		<div className="song-card">
			<div className="song-card__artwork">
				<img
					src={track.artworkUrl100 || FALLBACK_ARTWORK}
					alt={`${track.artistName} - ${track.trackName}`}
					loading="lazy"
					onError={handleImgError}
				/>
			</div>
			<div className="song-card__artist">
				{truncate(track.artistName, 30, 'Unknown Artist')}
			</div>
			<div className="song-card__title">
				{truncate(track.trackName, 40, 'Unknown Track')}
			</div>
			<div className="song-card__action">
				<Link
					to={`/track/${track.trackId}`}
					className="song-card__link"
				>
					Details
				</Link>
			</div>
		</div>
	)
}
