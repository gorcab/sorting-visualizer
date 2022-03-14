import { InsertionSortItem } from "../types";

export function numToInsertionSortItemMappingFunc(num: number, index: number) {
  const insertionSortItem: InsertionSortItem = {
    id: index + 1,
    value: num,
    currentIndex: index,
    initialIndex: index,
    isSorted: false,
    isSelected: false,
    depth: 0,
  };
  return insertionSortItem;
}
