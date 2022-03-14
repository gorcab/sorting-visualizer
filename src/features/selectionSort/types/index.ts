import { BaseItem, Selectable } from "features/common/lib/types";
import { BaseState } from "features/common/reducers/sortingAnimationReducer";

export type SelectionSortItem = BaseItem & Selectable;

export type SelectionSortState = BaseState<SelectionSortItem>;
