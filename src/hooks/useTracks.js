import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchTrendingSongs, searchTracks } from '../services/itunes'
import { useDebounce } from './useDebounce'

/**
 * Custom hook for managing track search and trending songs.
 * The search term is stored in the URL (`?q=`) so results survive navigation
 * to a track detail page and back, and are shareable/bookmarkable.
 * @returns {Object} Track state and handlers
 */
export function useTracks() {
	const [searchParams, setSearchParams] = useSearchParams()
	const searchTerm = searchParams.get('q') ?? ''

	const setSearchTerm = useCallback(
		value => {
			setSearchParams(
				prev => {
					const next = new URLSearchParams(prev)
					if (value) {
						next.set('q', value)
					} else {
						next.delete('q')
					}
					return next
				},
				{ replace: true }
			)
		},
		[setSearchParams]
	)

	const [tracks, setTracks] = useState([])
	const [trendingTracks, setTrendingTracks] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [isLoadingMore, setIsLoadingMore] = useState(false)
	const [error, setError] = useState(null)
	const [offset, setOffset] = useState(0)
	const [hasMore, setHasMore] = useState(false)

	const debouncedSearchTerm = useDebounce(searchTerm, 400)

	// Fetch trending songs on mount
	useEffect(() => {
		const loadTrending = async () => {
			try {
				const trending = await fetchTrendingSongs()
				setTrendingTracks(trending)
			} catch (err) {
				console.error('Failed to load trending songs:', err)
				// Don't set error state for trending - it's secondary content
			}
		}

		loadTrending()
	}, [])

	// Search when debounced term changes
	useEffect(() => {
		const performSearch = async () => {
			if (debouncedSearchTerm.trim().length < 2) {
				setTracks([])
				setHasMore(false)
				setOffset(0)
				setError(null)
				return
			}

			setIsLoading(true)
			setError(null)

			try {
				const { results, hasMore: more } = await searchTracks(
					debouncedSearchTerm,
					0
				)
				setTracks(results)
				setHasMore(more)
				setOffset(0)
			} catch (err) {
				setError('Failed to search tracks. Please try again.')
				setTracks([])
				setHasMore(false)
			} finally {
				setIsLoading(false)
			}
		}

		performSearch()
	}, [debouncedSearchTerm])

	// Load more results
	const loadMore = useCallback(async () => {
		if (isLoadingMore || !hasMore) return

		setIsLoadingMore(true)
		setError(null)
		const nextOffset = offset + 50

		try {
			const { results, hasMore: more } = await searchTracks(
				debouncedSearchTerm,
				nextOffset
			)
			setTracks(prev => [...prev, ...results])
			setHasMore(more)
			setOffset(nextOffset)
		} catch (err) {
			// Keep already-loaded tracks and the Load More button so the user can retry.
			setError('Failed to load more tracks. Please try again.')
		} finally {
			setIsLoadingMore(false)
		}
	}, [debouncedSearchTerm, offset, hasMore, isLoadingMore])

	// Determine what to display
	const isSearching = searchTerm.trim().length >= 2
	const displayTracks = isSearching ? tracks : trendingTracks
	const showTrendingLabel = !isSearching && trendingTracks.length > 0

	return {
		searchTerm,
		setSearchTerm,
		tracks: displayTracks,
		isLoading,
		isLoadingMore,
		error,
		hasMore: isSearching ? hasMore : false,
		loadMore,
		isSearching,
		showTrendingLabel,
		resultCount: isSearching ? tracks.length : 0
	}
}
