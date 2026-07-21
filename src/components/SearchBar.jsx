/**
 * Controlled search input. The parent (App) owns the search term state
 * and debouncing logic; this component is purely presentational plus
 * a clear button for convenience.
 */
const SearchBar = ({ value, onChange }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <label htmlFor="movie-search" className="sr-only">
        Search movies
      </label>
      <div className="relative">
        {/* Search icon */}
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
          />
        </svg>

        <input
          id="movie-search"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for a movie title..."
          className="w-full bg-cinema-800 border border-cinema-600 rounded-full py-3 pl-12 pr-12
                     text-gray-100 placeholder-gray-500 outline-none
                     focus:border-marquee-gold focus:ring-2 focus:ring-marquee-gold/30
                     transition-all duration-200"
        />

        {/* Clear button, only shown once the user has typed something */}
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="Clear search"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-marquee-gold
                       transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
