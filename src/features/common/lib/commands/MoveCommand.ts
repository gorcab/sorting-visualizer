import { BaseItem } from "../types";
import { Command } from "./CommandInterface";

type IndexInfo = {
  initialIndex: number;
  indexBeforeMoving: number;
  indexAfterMoving: number;
};

export class MoveCommand<Item extends BaseItem> implements Command<Item> {
  private indexInfo: IndexInfo;

  constructor(indexInfo: IndexInfo) {
    this.indexInfo = indexInfo;
  }

  public execute(list: Array<Item>): Array<Item> {
    const newList = list.slice();
    const { initialIndex, indexAfterMoving } = this.indexInfo;

    newList[initialIndex] = {
      ...newList[initialIndex],
      currentIndex: indexAfterMoving,
    };

    return newList;
  }

  public undo(list: Array<Item>): Array<Item> {
    const newList = list.slice();
    const { initialIndex, indexBeforeMoving } = this.indexInfo;

    newList[initialIndex] = {
      ...newList[initialIndex],
      currentIndex: indexBeforeMoving,
    };

    return newList;
  }
}
