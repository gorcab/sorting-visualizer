import { useContext } from "react";
import { BubbleSortContext } from "../context/bubbleSortContext";

export function useBubbleSortAnimationContext() {
  const context = useContext(BubbleSortContext);

  if (!context) {
    throw new Error(
      `useBubbleSortAnimationContext hook must be used within <BubbleSortAnimationProvider />`
    );
  }

  return context;
}
