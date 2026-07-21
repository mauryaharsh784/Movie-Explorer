import MovieCard from './MovieCard';

/**
 * Responsive grid of movie cards.
 * 2 columns on mobile, 3 on tablet, 4 on small desktop, 5 on large desktop.
 */
const MovieGrid = ({ movies }) => {
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
                 gap-4 sm:gap-5 lg:gap-6"
    >
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
