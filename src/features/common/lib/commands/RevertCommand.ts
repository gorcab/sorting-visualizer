import { BaseItem } from "../types";
import { Command } from "./CommandInterface";

export class RevertCommand<Item extends BaseItem> implements Command<Item> {
  private command: Command<Item>;

  constructor(command: Command<Item>) {
    this.command = command;
  }

  public execute(list: Array<Item>): Array<Item> {
    const newList = this.command.undo(list);
    return newList;
  }

  public undo(list: Array<Item>): Array<Item> {
    const newList = this.command.execute(list);
    return newList;
  }
}
