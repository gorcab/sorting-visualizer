import { BaseItem } from "../types";
import { Command } from "./CommandInterface";

type IndexInfo = {
  initialIndex: number;
  currentIndex: number;
};

export class SwapCommand<Item extends BaseItem> implements Command<Item> {
  private indicesTuple: [IndexInfo, IndexInfo];

  constructor(...indicesTuple: [IndexInfo, IndexInfo]) {
    this.indicesTuple = indicesTuple;
  }

  public execute(list: Array<Item>): Array<Item> {
    const newList = list.slice();
    newList[this.indicesTuple[0].initialIndex] = {
      ...newList[this.indicesTuple[0].initialIndex],
      currentIndex: this.indicesTuple[1].currentIndex,
    };
    newList[this.indicesTuple[1].initialIndex] = {
      ...newList[this.indicesTuple[1].initialIndex],
      currentIndex: this.indicesTuple[0].currentIndex,
    };

    return newList;
  }

  public undo(list: Array<Item>): Array<Item> {
    const newList = list.slice();
    newList[this.indicesTuple[0].initialIndex] = {
      ...newList[this.indicesTuple[0].initialIndex],
      curretIndex: this.indicesTuple[0].currentIndex,
    };
    newList[this.indicesTuple[1].initialIndex] = {
      ...newList[this.indicesTuple[1].initialIndex],
      curretIndex: this.indicesTuple[1].currentIndex,
    };

    return newList;
  }
}
