import { useContext } from "react";
import { SelectionSortContext } from "../context/selectionSortContext";

export function useSelectionSortAnimationContext() {
  const context = useContext(SelectionSortContext);

  if (!context) {
    throw new Error(
      "useSelectionSortAnimationContext hook must be used within <SelectionSortAnimationProvider />"
    );
  }

  return context;
}
