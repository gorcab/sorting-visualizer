import {
  BaseItem,
  Focusable,
  Pickable,
  Selectable,
  YAxisMovable,
} from "features/common/lib/types";
import { BaseState } from "features/common/reducers/sortingAnimationReducer";

export type MergeSortItem = BaseItem &
  Selectable &
  Pickable &
  Focusable &
  YAxisMovable;

export type MergeSortState = BaseState<MergeSortItem> & Focusable;
