import { BaseState } from "features/common/reducers/sortingAnimationReducer";
import { BaseItem, Focusable } from "../types";
import { Command } from "./CommandInterface";

export class FocusCommand<
  Item extends BaseItem & Focusable,
  State extends BaseState<Item> & Focusable
> implements Command<Item, State>
{
  private focusedIndices: Array<number>;

  constructor(...focusedIndices: Array<number>) {
    this.focusedIndices = focusedIndices;
  }

  public execute(state: State): State {
    const newState = { ...state };
    const newList = newState.list.slice();
    newState.isFocused = true;
    this.focusedIndices.forEach((index) => {
      newList[index] = {
        ...newList[index],
        isFocused: true,
      };
    });
    newState.list = newList;

    return newState;
  }

  public undo(state: State): State {
    const newState = { ...state };
    const newList = newState.list.slice();
    newState.isFocused = false;
    this.focusedIndices.forEach((index) => {
      newList[index] = {
        ...newList[index],
        isFocused: false,
      };
    });
    newState.list = newList;

    return newState;
  }
}
