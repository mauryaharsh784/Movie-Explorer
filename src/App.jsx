import { useEffect, useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import Skeleton from './components/Skeleton';
import ErrorState from './components/Error';
import NoResults from './components/NoResults';
import useDebounce from './hooks/useDebounce';
import { getPopularMovies, searchMovies } from './services/api';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Wait 500ms after the user stops typing before triggering a search,
  // so we don't spam the API on every keystroke.
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  /**
   * Fetches movies from OMDb — either the popular list (default view)
   * or search results, depending on whether a query is present.
   * Wrapped in useCallback so it can be safely reused as the retry handler.
   */
  const fetchMovies = useCallback(async (query) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = query.trim() ? await searchMovies(query.trim()) : await getPopularMovies();
      setMovies(data.results || []);
    } catch (err) {
      // Surface a friendly message; log the real error for debugging.
      console.error('Failed to fetch movies:', err);
      const isKeyError =
        err.response?.status === 401 || /invalid api key/i.test(err.message || '');
      setError(
        isKeyError
          ? 'Invalid OMDb API key. Please check your .env configuration.'
          : 'Unable to load movies right now. Please try again.'
      );
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Re-fetch whenever the debounced search term changes (including on
  // initial mount, where it fetches the popular movies list).
  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm, fetchMovies]);

  const handleRetry = () => fetchMovies(debouncedSearchTerm);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        <div className="mt-4 mb-8 text-center">
          <p className="text-sm text-gray-500">
            {searchTerm.trim() ? `Search results for "${searchTerm.trim()}"` : 'Popular movies right now'}
          </p>
        </div>

        {/* Render exactly one of: skeleton, error, no-results, or the grid */}
        {isLoading && <Skeleton />}

        {!isLoading && error && <ErrorState message={error} onRetry={handleRetry} />}

        {!isLoading && !error && movies.length === 0 && <NoResults query={searchTerm.trim()} />}

        {!isLoading && !error && movies.length > 0 && <MovieGrid movies={movies} />}
      </main>

      <footer className="text-center text-xs text-gray-600 py-6 border-t border-cinema-800">
        Built with React, Vite &amp; Tailwind CSS · Data provided by{' '}
        <a
          href="https://www.omdbapi.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-marquee-gold hover:underline"
        >
          OMDb API
        </a>
      </footer>
    </div>
  );
}

export default App;
