import { BaseState } from "features/common/reducers/sortingAnimationReducer";
import { BaseItem } from "../types";
import { Command } from "./CommandInterface";

type IndexInfo = {
  initialIndex: number;
  indexBeforeMoving: number;
  indexAfterMoving: number;
};

export class XAxisMoveCommand<
  Item extends BaseItem,
  State extends BaseState<Item>
> implements Command<Item, State>
{
  private indexInfo: IndexInfo;

  constructor(indexInfo: IndexInfo) {
    this.indexInfo = indexInfo;
  }

  public execute(state: State): State {
    const newState = { ...state };
    const newList = newState.list.slice();
    const { initialIndex, indexAfterMoving } = this.indexInfo;

    newList[initialIndex] = {
      ...newList[initialIndex],
      currentIndex: indexAfterMoving,
    };
    newState.list = newList;

    return newState;
  }

  public undo(state: State): State {
    const newState = { ...state };
    const newList = newState.list.slice();
    const { initialIndex, indexBeforeMoving } = this.indexInfo;

    newList[initialIndex] = {
      ...newList[initialIndex],
      currentIndex: indexBeforeMoving,
    };
    newState.list = newList;

    return newState;
  }
}
