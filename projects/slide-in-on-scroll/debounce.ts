/**
 * Creates a debounced function that delays invoking the passed function `func` until `wait` milliseconds
 * have elapsed since the last time the debounced function was invoked.
 *
 * @typeParam T - The type of the function to debounce
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay (default: 100)
 * @param options - Configuration options
 * - 'leading' - If true, invoke on the leading edge of the timeout (default: false)
 * - 'trailing' - If true, invoke on the trailing edge of the timeout (default: true)
 *
 * @returns A debounced version of the provided function
 *
 * @example
 * // Trailing edge (default) - executes after user stops typing
 * const search = debounce((query: string) => {
 *   console.log('Searching:', query);
 * }, 300);
 *
 * @example
 * // Leading edge - executes immediately, then ignores subsequent calls
 * const handleClick = debounce(() => {
 *   console.log('Clicked!');
 * }, 1000, { leading: true, trailing: false });
 *
 * @example
 * // Both edges - executes immediately and after activity stops
 * const handleResize = debounce(() => {
 *   console.log('Resized!');
 * }, 500, { leading: true, trailing: true });
 *
 */
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number = 100,
  options: { leading?: boolean, trailing?: boolean } = { leading: false, trailing: true }
): (this: ThisParameterType<T>, ...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastContext: ThisParameterType<T> | null = null; // tracks most recent call's context
  let lastArgs: Parameters<T> | null = null;           // tracks most recent call's args

  const leading = options.leading ?? false;
  const trailing = options.trailing ?? true;

  return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
    const context = this;
    const callNow = leading && !timeoutId;

    lastContext = context; // update most recent context
    lastArgs = args;       // update most recent args

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (callNow) {
      func.apply(context, args);
      lastContext = null; // Clear to prevent double execution
      lastArgs = null;
    }

    timeoutId = setTimeout(() => {
      if (trailing && lastArgs && lastContext) { // only works if leading mode doesn't execute and clear it in the if block above
        func.apply(lastContext, lastArgs);
      }
      timeoutId = null;
      lastContext = null; // not strictly necessary, but a good practice (semantic clarity that we're done with execution cycle)
      lastArgs = null; // same as above -- plus if args is a huge object it can stay in memory, so it's nice to clear it up
    }, wait);
  }
}

export { debounce };