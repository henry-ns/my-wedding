import { useCallback, useEffect, useRef, useState } from "react";

export function useDebouncedCallback<
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  P extends [...args: any],
  T extends (...args: P) => void = (...args: P) => void,
>(callback: T, wait: number) {
  const timeout = useRef<NodeJS.Timeout>();

  return useCallback(
    (...args: P) => {
      const later = () => {
        if (timeout.current) {
          clearTimeout(timeout.current);
        }

        callback(...args);
      };

      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      timeout.current = setTimeout(later, wait);
    },
    [callback, wait],
  );
}

export function useDebounceValue<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}
