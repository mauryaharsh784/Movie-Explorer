/**
 * Truncates a string to `limit` characters, adding an ellipsis if it
 * was cut short.
 */
const truncateText = (text, limit) => {
  if (!text || text === 'N/A') return 'No overview available for this title.';
  if (text.length <= limit) return text;
  return `${text.slice(0, limit).trim()}...`;
};

/**
 * OMDb returns "N/A" as a literal string for missing fields instead of
 * null/undefined, so this normalizes that into a friendly fallback.
 */
const withFallback = (value, fallback) => (!value || value === 'N/A' ? fallback : value);

/**
 * Single movie card shown in the grid. Displays poster, title, rating,
 * release date, and a 120-character-limited overview. Includes a subtle
 * hover lift/glow animation for interactivity.
 *
 * Expects an OMDb-shaped movie object: { Title, Poster, imdbRating, Released, Plot, imdbID }
 */
const MovieCard = ({ movie }) => {
  const posterUrl = withFallback(movie.Poster, null);
  const rating = withFallback(movie.imdbRating, 'N/A');
  const releaseDate = withFallback(movie.Released, movie.Year || 'Release date unknown');

  return (
    <article
      className="group bg-cinema-800 rounded-xl overflow-hidden border border-cinema-700
                 hover:border-marquee-gold/60 hover:-translate-y-1.5 hover:shadow-glow
                 transition-all duration-300 ease-out flex flex-col h-full"
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] bg-cinema-700 overflow-hidden">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`${movie.Title} poster`}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm px-4 text-center">
            No poster available
          </div>
        )}

        {/* Rating badge, overlaid top-right on the poster */}
        <div
          className="absolute top-2 right-2 flex items-center gap-1 bg-cinema-950/85 backdrop-blur-sm
                     rounded-full px-2.5 py-1 text-xs font-semibold text-marquee-gold border border-marquee-gold/30"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
            <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6L10 1.5z" />
          </svg>
          {rating}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-display text-lg tracking-wide text-gray-50 leading-tight line-clamp-2">
          {movie.Title}
        </h3>
        <p className="text-xs text-gray-400 mt-1 mb-2">{releaseDate}</p>
        <p className="text-sm text-gray-300 leading-relaxed line-clamp-4">
          {truncateText(movie.Plot, 120)}
        </p>
      </div>
    </article>
  );
};

export default MovieCard;
