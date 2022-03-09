import { BaseItem, Pickable } from "../types";
import { Command } from "./CommandInterface";

export class PickCommand<Item extends BaseItem & Pickable>
  implements Command<Item>
{
  private pickedIndices: Array<number>;

  constructor(...pickedIndices: Array<number>) {
    this.pickedIndices = pickedIndices;
  }

  public execute(list: Array<Item>): Array<Item> {
    const newList = list.slice();
    this.pickedIndices.forEach((idx) => {
      newList[idx] = {
        ...newList[idx],
        depth: newList[idx].depth + 1,
      };
    });

    return newList;
  }

  public undo(list: Array<Item>): Array<Item> {
    const newList = list.slice();
    this.pickedIndices.forEach((idx) => {
      newList[idx] = {
        ...newList[idx],
        depth: newList[idx].depth - 1,
      };
    });

    return newList;
  }
}
