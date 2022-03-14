import { BaseState } from "features/common/reducers/sortingAnimationReducer";
import { BaseItem, Selectable } from "../types";
import { Command } from "./CommandInterface";

export class SelectCommand<
  Item extends BaseItem & Selectable,
  State extends BaseState<Item>
> implements Command<Item, State>
{
  private selectedIndices: Array<number>;

  constructor(...selectedIndices: Array<number>) {
    this.selectedIndices = selectedIndices;
  }

  public execute(state: State): State {
    const newState = { ...state };
    const newList = newState.list.slice();
    this.selectedIndices.forEach((idx) => {
      newList[idx] = {
        ...newList[idx],
        isSelected: true,
      };
    });
    newState.list = newList;

    return newState;
  }

  public undo(state: State): State {
    const newState = { ...state };
    const newList = newState.list.slice();
    this.selectedIndices.forEach((idx) => {
      newList[idx] = {
        ...newList[idx],
        isSelected: false,
      };
    });
    newState.list = newList;

    return newState;
  }
}
