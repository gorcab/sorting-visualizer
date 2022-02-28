import { useState } from "react";

const prefixMap = new Map<string, number>();

export function useId(prefix: string) {
  const [id] = useState(() => {
    const curId = prefixMap.get(prefix);
    if (curId) {
      prefixMap.set(prefix, curId + 1);
      return `${prefix}-${curId + 1}`;
    } else {
      prefixMap.set(prefix, 1);
      return `${prefix}-${1}`;
    }
  });

  return id;
}
