import {
  BaseItem,
  Focusable,
  Pickable,
  Selectable,
} from "features/common/lib/types";
import { BaseState } from "features/common/reducers/sortingAnimationReducer";

export type QuickSortItem = BaseItem & Selectable & Pickable & Focusable;

export type IndicatorIndicesInfo = {
  pivotIndex: number;
  lowIndex: number;
  highIndex: number;
};
export type QuickSortState = BaseState<QuickSortItem> &
  Focusable &
  IndicatorIndicesInfo;
