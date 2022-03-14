import { BaseState } from "features/common/reducers/sortingAnimationReducer";
import { BaseItem } from "../types";

export interface Command<Item extends BaseItem, State extends BaseState<Item>> {
  execute: (state: State) => State;
  undo: (state: State) => State;
}
