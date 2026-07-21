/**
 * Full-width spinner used for lightweight loading indication
 * (e.g. while a subsequent page of results is being fetched).
 */
const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3" role="status" aria-live="polite">
      <div
        className="w-12 h-12 rounded-full border-4 border-cinema-700 border-t-marquee-gold animate-spin"
        aria-hidden="true"
      />
      <p className="text-sm text-gray-400">Loading movies...</p>
    </div>
  );
};

export default Loading;
