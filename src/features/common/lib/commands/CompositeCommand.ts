import { BaseItem } from "../types";
import { Command } from "./CommandInterface";

export class CompositeCommand<Item extends BaseItem> implements Command<Item> {
  private commands: Array<Command<Item>>;

  constructor(...commands: Array<Command<Item>>) {
    this.commands = commands;
  }

  public execute(list: Array<Item>): Array<Item> {
    return this.commands.reduce(
      (changedList, cmd) => cmd.execute(changedList),
      list
    );
  }

  public undo(list: Array<Item>): Array<Item> {
    return this.commands.reduce(
      (changedList, cmd) => cmd.undo(changedList),
      list
    );
  }
}
