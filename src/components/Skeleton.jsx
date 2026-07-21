/**
 * Skeleton placeholder for a single movie card, shown while the initial
 * request is in flight so the layout doesn't jump once real data arrives.
 */
const SkeletonCard = () => {
  return (
    <div className="bg-cinema-800 rounded-xl overflow-hidden border border-cinema-700 animate-pulse">
      <div className="aspect-[2/3] bg-cinema-700" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-cinema-700 rounded w-4/5" />
        <div className="h-3 bg-cinema-700 rounded w-2/5" />
        <div className="space-y-2 pt-1">
          <div className="h-3 bg-cinema-700 rounded w-full" />
          <div className="h-3 bg-cinema-700 rounded w-full" />
          <div className="h-3 bg-cinema-700 rounded w-3/4" />
        </div>
      </div>
    </div>
  );
};

/**
 * Renders a grid of skeleton cards matching the MovieGrid layout,
 * used as the initial-load state before the first API response arrives.
 */
const Skeleton = ({ count = 10 }) => {
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
                 gap-4 sm:gap-5 lg:gap-6"
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default Skeleton;
