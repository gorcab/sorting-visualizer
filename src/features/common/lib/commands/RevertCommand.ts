import { BaseItem } from "../types";
import { Command } from "./CommandInterface";

export class RevertCommand<Item extends BaseItem> implements Command<Item> {
  private command: Command<Item>;

  constructor(command: Command<Item>) {
    this.command = command;
  }

  public execute(list: Array<Item>): Array<Item> {
    return this.command.undo(list);
  }

  public undo(list: Array<Item>): Array<Item> {
    return this.command.execute(list);
  }
}
