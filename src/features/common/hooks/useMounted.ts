import { useEffect, useRef } from "react";

export function useMounted() {
  const mountedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return mountedRef.current;
}
