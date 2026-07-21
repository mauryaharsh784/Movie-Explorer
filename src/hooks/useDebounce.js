import { useEffect, useState } from 'react';

/**
 * Returns a debounced copy of `value` that only updates after `delay`
 * milliseconds have passed without `value` changing again.
 *
 * Used on the search input so we don't fire an API request on every
 * keystroke — only once the user pauses typing.
 *
 * @param {*} value - the fast-changing value (e.g. search input text)
 * @param {number} delay - debounce delay in milliseconds
 */
const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Schedule the update after `delay` ms
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // If `value` changes again before the timer fires, cancel the
    // previous timer so we don't apply a stale update.
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
