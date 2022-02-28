import { MutableRefObject, useEffect, useRef } from "react";

export function useClickOutside(
  elementRef: MutableRefObject<HTMLElement | null>,
  eventHandler: (mouseEvent: MouseEvent) => void
) {
  const listenerRef = useRef(eventHandler);
  listenerRef.current = eventHandler;

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!elementRef.current) return;
      if (
        event.target &&
        elementRef.current.contains(event.target as HTMLElement)
      ) {
        return;
      }

      listenerRef.current(event);
    };

    document.addEventListener("click", listener);

    return () => document.removeEventListener("click", listener);
  }, [elementRef]);
}
