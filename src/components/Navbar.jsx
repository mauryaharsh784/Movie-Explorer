/**
 * Sticky top navigation bar. Purely presentational — displays the app's
 * brand and a thin "film strip" accent stripe that reinforces the cinema
 * theme across breakpoints.
 */
const Navbar = () => {
  return (
    <header className="sticky top-0 z-30 bg-cinema-950/90 backdrop-blur-md border-b border-cinema-700">
      {/* Decorative film-strip stripe */}
      <div className="h-1.5 w-full bg-film-strip opacity-60" aria-hidden="true" />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="font-display text-3xl sm:text-4xl tracking-wide text-marquee-gold leading-none"
            aria-hidden="true"
          >
            🎬
          </span>
          <h1 className="font-display text-2xl sm:text-3xl tracking-widest text-gray-50 leading-none">
            MOVIE <span className="text-marquee-gold">EXPLORER</span>
          </h1>
        </div>

        <a
          href="https://www.omdbapi.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center text-xs font-medium text-gray-400 hover:text-marquee-gold transition-colors"
        >
          Powered by OMDb
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
