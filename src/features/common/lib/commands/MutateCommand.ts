import { BaseState } from "features/common/reducers/sortingAnimationReducer";
import { BaseItem } from "../types";
import { Command } from "./CommandInterface";

type MutationInfo<Item extends BaseItem, State extends BaseState<Item>> = {
  [key in keyof State]?: State[key];
};

export class MutateCommand<Item extends BaseItem, State extends BaseState<Item>>
  implements Command<Item, State>
{
  private mutationInfo: MutationInfo<Item, State>;
  private undoInfo: MutationInfo<Item, State>;

  constructor(mutationInfo: MutationInfo<Item, State>) {
    this.mutationInfo = mutationInfo;
    this.undoInfo = {};
  }

  public execute(state: State): State {
    if (this.mutationInfo === null) return { ...state };

    const info = this.mutationInfo;
    const mutationKeys = Object.keys(this.mutationInfo) as Array<
      keyof typeof info
    >;
    mutationKeys.forEach((prop) => {
      this.undoInfo[prop] = state[prop];
    });

    const newState = {
      ...state,
      ...this.mutationInfo,
    };

    return newState;
  }

  public undo(state: State): State {
    if (this.undoInfo === null) return { ...state };

    const newState = {
      ...state,
      ...this.undoInfo,
    };

    return newState;
  }
}
