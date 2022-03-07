import { SelectableItem } from "../types";
import { Command } from "./CommandInterface";

export class SelectCommand<Item extends SelectableItem>
  implements Command<Item>
{
  private selectedIndices: Array<number>;

  constructor(...selectedIndices: Array<number>) {
    this.selectedIndices = selectedIndices;
  }

  public execute(list: Array<Item>): Array<Item> {
    const newList = list.slice();
    this.selectedIndices.forEach((idx) => {
      newList[idx] = {
        ...newList[idx],
        isSelected: true,
      };
    });

    return newList;
  }

  public undo(list: Array<Item>): Array<Item> {
    const newList = list.slice();
    this.selectedIndices.forEach((idx) => {
      newList[idx] = {
        ...newList[idx],
        isSelected: false,
      };
    });

    return newList;
  }
}
