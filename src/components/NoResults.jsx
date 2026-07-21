/**
 * Empty state shown when a search completes successfully but returns
 * zero movies. Distinct from the Error state, which represents a
 * failed request rather than a valid empty response.
 */
const NoResults = ({ query }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <div
        className="w-16 h-16 rounded-full bg-cinema-800 border border-cinema-600
                   flex items-center justify-center mb-4"
      >
        <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="font-display text-2xl tracking-wide text-gray-50 mb-2">No movies found</h3>
      <p className="text-gray-400 max-w-md">
        We couldn't find anything for <span className="text-marquee-gold">"{query}"</span>. Try a different title
        or check your spelling.
      </p>
    </div>
  );
};

export default NoResults;
