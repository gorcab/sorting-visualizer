import { BaseItem, Pickable, Selectable } from "features/common/lib/types";
import { BaseState } from "features/common/reducers/sortingAnimationReducer";

export type InsertionSortItem = BaseItem & Selectable & Pickable;

export type InsertionSortState = BaseState<InsertionSortItem>;
