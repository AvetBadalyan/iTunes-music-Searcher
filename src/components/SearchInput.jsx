export default function SearchInput({
	value,
	onChange,
	isLoading,
	resultCount,
	isSearching
}) {
	return (
		<div className="search-input">
			<div className="search-input__wrapper">
				<i
					className="fa-solid fa-magnifying-glass search-input__icon"
					aria-hidden="true"
				></i>
				<label
					htmlFor="track-search"
					className="visually-hidden"
				>
					Search by artist, song, or album
				</label>
				<input
					id="track-search"
					type="search"
					placeholder="Search by artist, song, or album..."
					value={value}
					onChange={e => onChange(e.target.value)}
					className="search-input__field"
					autoComplete="off"
				/>
				{isLoading && (
					<i
						className="fa-solid fa-spinner fa-spin search-input__spinner"
						aria-hidden="true"
					></i>
				)}
			</div>

			<div
				className="search-input__status"
				aria-live="polite"
			>
				{!isSearching && (
					<span className="search-input__hint">
						Type at least 2 characters to search
					</span>
				)}
				{isSearching && !isLoading && resultCount === 0 && (
					<span className="search-input__no-results">No results found</span>
				)}
				{isSearching && !isLoading && resultCount > 0 && (
					<span className="search-input__count">
						Found {resultCount} track{resultCount !== 1 ? 's' : ''} 🎼
					</span>
				)}
			</div>
		</div>
	)
}
