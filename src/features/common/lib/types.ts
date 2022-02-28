export type BaseItem = {
  value: number;
  initialIndex: number;
  currentIndex: number;
  isSorted: boolean;
};

export type SelectableItem = BaseItem & {
  isSelected: boolean;
};

export type SortingAlgorithm =
  | "bubble"
  | "selection"
  | "insertion"
  | "merge"
  | "quick";
