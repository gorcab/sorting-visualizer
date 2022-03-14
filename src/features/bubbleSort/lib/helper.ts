import { BubbleSortItem } from "../types";

export function numToBubbleSortItemMappingFunc(num: number, index: number) {
  const bubbleSortItem: BubbleSortItem = {
    id: index + 1,
    value: num,
    currentIndex: index,
    initialIndex: index,
    isSorted: false,
    isSelected: false,
  };
  return bubbleSortItem;
}
