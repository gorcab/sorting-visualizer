import { useContext } from "react";
import { IndicatorIndicesContext } from "../context/indicatorIndices";

export function useIndicatorIndices() {
  const context = useContext(IndicatorIndicesContext);
  if (!context) {
    throw new Error(
      `useIndicatorIndices hook must used within <IndicatorIndicesProvider />`
    );
  }

  return context;
}
