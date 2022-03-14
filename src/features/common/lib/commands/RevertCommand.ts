import { BaseState } from "features/common/reducers/sortingAnimationReducer";
import { BaseItem } from "../types";
import { Command } from "./CommandInterface";

export class RevertCommand<Item extends BaseItem, State extends BaseState<Item>>
  implements Command<Item, State>
{
  private command: Command<Item, State>;

  constructor(command: Command<Item, State>) {
    this.command = command;
  }

  public execute(state: State): State {
    return this.command.undo(state);
  }

  public undo(state: State): State {
    return this.command.execute(state);
  }
}
