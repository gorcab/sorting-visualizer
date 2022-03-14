import { BaseState } from "features/common/reducers/sortingAnimationReducer";
import { BaseItem, Pickable } from "../types";
import { Command } from "./CommandInterface";

export class PickCommand<
  Item extends BaseItem & Pickable,
  State extends BaseState<Item>
> implements Command<Item, State>
{
  private pickedIndices: Array<number>;

  constructor(...pickedIndices: Array<number>) {
    this.pickedIndices = pickedIndices;
  }

  public execute(state: State): State {
    const newState = { ...state };
    const newList = newState.list.slice();
    this.pickedIndices.forEach((idx) => {
      newList[idx] = {
        ...newList[idx],
        depth: newList[idx].depth + 1,
      };
    });
    newState.list = newList;

    return newState;
  }

  public undo(state: State): State {
    const newState = { ...state };
    const newList = newState.list.slice();
    this.pickedIndices.forEach((idx) => {
      newList[idx] = {
        ...newList[idx],
        depth: newList[idx].depth - 1,
      };
    });
    newState.list = newList;

    return newState;
  }
}
