/**
 * Error state shown when an OMDb request fails (network error, invalid
 * API key, rate limiting, etc). Gives the user a clear message and a
 * way to retry the last action instead of a dead end.
 */
const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <div
        className="w-16 h-16 rounded-full bg-marquee-crimson/10 border border-marquee-crimson/40
                   flex items-center justify-center mb-4"
      >
        <svg className="w-8 h-8 text-marquee-crimson" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
      </div>
      <h3 className="font-display text-2xl tracking-wide text-gray-50 mb-2">Something went wrong</h3>
      <p className="text-gray-400 max-w-md mb-6">
        {message || 'We could not reach the movie database. Please check your connection and try again.'}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="px-6 py-2.5 rounded-full bg-marquee-gold text-cinema-950 font-semibold
                   hover:bg-marquee-gold/90 active:scale-95 transition-all duration-150"
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorState;
