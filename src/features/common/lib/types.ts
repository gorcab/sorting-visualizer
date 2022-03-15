export type BaseItem = {
  id: number;
  value: number;
  initialIndex: number;
  currentIndex: number;
  isSorted: boolean;
};

export type Selectable = {
  isSelected: boolean;
};

export type Pickable = {
  depth: number;
};

export type Focusable = {
  isFocused: boolean;
};

export type YAxisMovable = {
  yPos: number;
};

export type SortingAlgorithm =
  | "bubble"
  | "selection"
  | "insertion"
  | "merge"
  | "quick";

export type SortingOrder = "ASC" | "DESC";
