import { SelectionSortItem } from "../types";

export function numToSelectionSortItemMappingFunc(num: number, index: number) {
  const selectionSortItem: SelectionSortItem = {
    id: index + 1,
    value: num,
    currentIndex: index,
    initialIndex: index,
    isSorted: false,
    isSelected: false,
  };

  return selectionSortItem;
}
