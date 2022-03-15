import { MergeSortItem } from "../types";

export function numToMergeSortItemMappingFunc(num: number, index: number) {
  const mergeSortItem: MergeSortItem = {
    id: index + 1,
    value: num,
    currentIndex: index,
    initialIndex: index,
    depth: 0,
    isFocused: false,
    isSelected: false,
    isSorted: false,
    yPos: 0,
  };

  return mergeSortItem;
}
