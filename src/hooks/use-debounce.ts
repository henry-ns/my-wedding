import { useCallback, useRef } from "react";

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
