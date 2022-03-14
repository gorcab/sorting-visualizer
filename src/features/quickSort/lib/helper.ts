import { QuickSortItem } from "../types";

export function numToQuickSortItemMappingFunc(num: number, index: number) {
  const quickSortItem: QuickSortItem = {
    id: index + 1,
    value: num,
    currentIndex: index,
    initialIndex: index,
    depth: 0,
    isFocused: false,
    isSelected: false,
    isSorted: false,
  };

  return quickSortItem;
}
