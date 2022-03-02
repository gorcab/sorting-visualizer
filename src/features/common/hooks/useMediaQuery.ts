import { useLayoutEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => {
    const media = window.matchMedia(query);
    return media.matches;
  });

  useLayoutEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const mediaChangeListener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    media.addEventListener("change", mediaChangeListener);

    return () => {
      media.removeEventListener("change", mediaChangeListener);
    };
  }, [matches, query]);

  return matches;
}
