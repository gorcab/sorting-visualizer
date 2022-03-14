import { BaseItem, Selectable } from "features/common/lib/types";
import { BaseState } from "features/common/reducers/sortingAnimationReducer";

export type BubbleSortItem = BaseItem & Selectable;

export type BubbleSortState = BaseState<BubbleSortItem>;
