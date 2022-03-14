import { BaseState } from "features/common/reducers/sortingAnimationReducer";
import { BaseItem } from "../types";
import { Command } from "./CommandInterface";

type IndexInfo = {
  initialIndex: number;
  currentIndex: number;
};

export class SwapCommand<Item extends BaseItem, State extends BaseState<Item>>
  implements Command<Item, State>
{
  private indicesTuple: [IndexInfo, IndexInfo];

  constructor(...indicesTuple: [IndexInfo, IndexInfo]) {
    this.indicesTuple = indicesTuple;
  }

  public execute(state: State): State {
    const newState = { ...state };
    const newList = newState.list.slice();
    newList[this.indicesTuple[0].initialIndex] = {
      ...newList[this.indicesTuple[0].initialIndex],
      currentIndex: this.indicesTuple[0].currentIndex,
    };
    newList[this.indicesTuple[1].initialIndex] = {
      ...newList[this.indicesTuple[1].initialIndex],
      currentIndex: this.indicesTuple[1].currentIndex,
    };
    newState.list = newList;

    return newState;
  }

  public undo(state: State): State {
    const newState = { ...state };
    const newList = newState.list.slice();
    newList[this.indicesTuple[0].initialIndex] = {
      ...newList[this.indicesTuple[0].initialIndex],
      currentIndex: this.indicesTuple[1].currentIndex,
    };

    newList[this.indicesTuple[1].initialIndex] = {
      ...newList[this.indicesTuple[1].initialIndex],
      currentIndex: this.indicesTuple[0].currentIndex,
    };
    newState.list = newList;

    return newState;
  }
}
