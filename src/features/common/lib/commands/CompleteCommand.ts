import { BaseItem } from "../types";
import { Command } from "./CommandInterface";

export class CompleteCommand<Item extends BaseItem> implements Command<Item> {
  private indices: Array<number>;

  constructor(...indices: Array<number>) {
    this.indices = indices;
  }

  public execute(list: Array<Item>): Array<Item> {
    const newList = list.slice();
    this.indices.forEach((index) => {
      newList[index] = {
        ...newList[index],
        isSorted: true,
      };
    });

    return newList;
  }

  public undo(list: Array<Item>): Array<Item> {
    const newList = list.slice();
    this.indices.forEach((index) => {
      newList[index] = {
        ...newList[index],
        isSorted: false,
      };
    });

    return newList;
  }
}
