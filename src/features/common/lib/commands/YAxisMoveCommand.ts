import { BaseState } from "features/common/reducers/sortingAnimationReducer";
import { BaseItem, YAxisMovable } from "../types";
import { Command } from "./CommandInterface";

type IndexInfo = {
  initialIndex: number;
  indexBeforeMoving: number;
  indexAfterMoving: number;
};

export class YAxisMoveCommand<
  Item extends BaseItem & YAxisMovable,
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
      yPos: indexAfterMoving,
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
      yPos: indexBeforeMoving,
    };

    newState.list = newList;

    return newState;
  }
}
