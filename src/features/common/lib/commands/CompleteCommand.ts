import { BaseState } from "features/common/reducers/sortingAnimationReducer";
import { BaseItem } from "../types";
import { Command } from "./CommandInterface";

export class CompleteCommand<
  Item extends BaseItem,
  State extends BaseState<Item>
> implements Command<Item, State>
{
  private indices: Array<number>;

  constructor(...indices: Array<number>) {
    this.indices = indices;
  }

  public execute(state: State): State {
    const newState = { ...state };
    const newList = newState.list.slice();
    this.indices.forEach((index) => {
      newList[index] = {
        ...newList[index],
        isSorted: true,
      };
    });
    newState.list = newList;

    return newState;
  }

  public undo(state: State): State {
    const newState = { ...state };
    const newList = newState.list.slice();
    this.indices.forEach((index) => {
      newList[index] = {
        ...newList[index],
        isSorted: false,
      };
    });
    newState.list = newList;

    return newState;
  }
}
