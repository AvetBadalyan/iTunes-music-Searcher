import Header from '../components/Header';
import SearchInput from '../components/SearchInput';
import SongList from '../components/SongList';
import { useTracks } from '../hooks/useTracks';

export default function HomePage() {
  const {
    searchTerm,
    setSearchTerm,
    tracks,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMore,
    isSearching,
    showTrendingLabel,
    resultCount,
  } = useTracks();

  return (
    <div className="home-page">
      <div className="container">
        <Header />
      </div>

      <div className="container">
        <main className="main">
          <section className="hero">
            <h1 className="hero__title">Discover new music every day.</h1>
            <p className="hero__subtitle">
              Get playlists and albums inspired by the artists and genres you're
              listening to. 1 month free, then $9.99/month
            </p>
          </section>

          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            isLoading={isLoading}
            resultCount={resultCount}
            isSearching={isSearching}
          />

          {showTrendingLabel && (
            <p className="trending-label">Trending right now</p>
          )}

          <SongList
            tracks={tracks}
            isLoading={isLoading}
            hasMore={hasMore}
            isLoadingMore={isLoadingMore}
            onLoadMore={loadMore}
            error={error}
          />
        </main>
      </div>
    </div>
  );
}
