import { BaseState } from "features/common/reducers/sortingAnimationReducer";
import { BaseItem } from "../types";
import { Command } from "./CommandInterface";

export class CompositeCommand<
  Item extends BaseItem,
  State extends BaseState<Item>
> implements Command<Item, State>
{
  private commands: Array<Command<Item, State>>;

  constructor(...commands: Array<Command<Item, State>>) {
    this.commands = commands;
  }

  public execute(state: State): State {
    const newState = { ...state };
    return this.commands.reduce(
      (curState, cmd) => cmd.execute(curState),
      newState
    );
  }

  public undo(state: State): State {
    const newState = { ...state };
    return this.commands.reduce(
      (curState, cmd) => cmd.undo(curState),
      newState
    );
  }
}
