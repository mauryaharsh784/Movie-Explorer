import axios from 'axios';

// OMDb (Open Movie Database) configuration — the API key is pulled from the
// .env file and must never be committed to source control (see .env.example).
// Get a free key instantly at https://www.omdbapi.com/apikey.aspx
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

// A single shared axios instance keeps base URL / API key configuration
// in one place instead of repeating it on every request.
const omdbClient = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
});

// How many search results to hydrate with full details (rating/plot/date).
// OMDb's search endpoint only returns title/year/poster, so each card's
// extra info requires a follow-up request — this cap keeps that fan-out
// reasonable and free-tier friendly.
const MAX_RESULTS_TO_HYDRATE = 10;

/**
 * Fetches full details (plot, rating, release date, etc.) for a single
 * title by its IMDb ID. Used to "hydrate" search results, since OMDb's
 * search endpoint alone doesn't include this information.
 * @param {string} imdbID
 */
const getMovieDetails = async (imdbID) => {
  const response = await omdbClient.get('', {
    params: { i: imdbID, plot: 'short' },
  });
  return response.data;
};

/**
 * Runs an OMDb title search, then hydrates each result with full details
 * (poster, rating, release date, overview) via individual lookups.
 * @param {string} query - the search term
 */
const searchAndHydrate = async (query) => {
  const searchResponse = await omdbClient.get('', {
    params: { s: query, type: 'movie' },
  });

  const { data } = searchResponse;

  // OMDb signals "no matches" via Response: "False" with HTTP 200,
  // rather than an error status — so we check the body explicitly.
  if (data.Response === 'False') {
    // A missing-results error is a normal empty state, not a failure.
    if (data.Error === 'Movie not found!') return [];
    throw new Error(data.Error || 'OMDb request failed.');
  }

  const basicResults = (data.Search || []).slice(0, MAX_RESULTS_TO_HYDRATE);

  // Fetch full details for each result in parallel.
  const detailed = await Promise.all(
    basicResults.map((item) => getMovieDetails(item.imdbID))
  );

  return detailed;
};

/**
 * Fetches a default set of "popular" movies to populate the grid before
 * the user searches for anything. OMDb has no built-in "popular" list
 * endpoint, so this searches a handful of well-known blockbuster titles
 * and merges the results into a single curated grid.
 */
export const getPopularMovies = async () => {
  const seedQueries = ['Avengers', 'Batman', 'Spider-Man'];

  const resultsPerQuery = await Promise.all(
    seedQueries.map((query) => searchAndHydrate(query))
  );

  // Merge and de-duplicate by imdbID (some seed queries can overlap).
  const merged = resultsPerQuery.flat();
  const seen = new Set();
  const deduped = merged.filter((movie) => {
    if (seen.has(movie.imdbID)) return false;
    seen.add(movie.imdbID);
    return true;
  });

  return { results: deduped };
};

/**
 * Searches OMDb for movies matching a text query and returns fully
 * hydrated results (poster, rating, release date, overview).
 * @param {string} query - the search term typed by the user
 */
export const searchMovies = async (query) => {
  const results = await searchAndHydrate(query);
  return { results };
};

export default omdbClient;
