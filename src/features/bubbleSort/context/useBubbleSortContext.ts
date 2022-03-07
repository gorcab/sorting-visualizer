import { useContext } from "react";
import { BubbleSortContext } from "./bubbleSortContext";

export function useBubbleSortAnimationContext() {
  const context = useContext(BubbleSortContext);

  if (!context) {
    throw new Error(
      `useBubbleSortContext hook must be used within <BubbleSortAnimationProvider />`
    );
  }

  return context;
}
