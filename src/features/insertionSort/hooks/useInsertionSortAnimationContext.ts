import { useContext } from "react";
import { InsertionSortContext } from "../context/insertionSortContext";

export function useInsertionSortAnimationContext() {
  const context = useContext(InsertionSortContext);
  if (!context) {
    throw new Error(
      `useInsertionSortAnimationContext hook must be used within <InsertionSortAnimationProvider />`
    );
  }

  return context;
}
