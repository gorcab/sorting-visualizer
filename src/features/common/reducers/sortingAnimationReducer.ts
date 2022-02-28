import { Command } from "features/common/lib/commands/CommandInterface";
import { BaseItem, SortingAlgorithm } from "../lib/types";

export const COMMON_ACTION_TYPES = {
  DELETE_ITEM: "DELETE_ITEM",
  END_ANIMATION: "END_ANIMATION",
  GO_TO_NEXT_STEP: "GO_TO_NEXT_STEP",
  GO_TO_PREV_STEP: "GO_TO_PREV_STEP",
  GO_TO_SPECIFIC_STEP: "GO_TO_SPECIFIC_STEP",
} as const;

export const ADDITIONAL_ACTION_TYPES = {
  ADD_ITEM: "ADD_ITEM",
  START_ANIMATION: "START_ANIMATION",
} as const;

export type AdditionalAction<Item extends BaseItem> =
  | { type: typeof ADDITIONAL_ACTION_TYPES.ADD_ITEM; payload: Item }
  | {
      type: typeof ADDITIONAL_ACTION_TYPES.START_ANIMATION;
      algorithm: SortingAlgorithm;
    };

export type DefaultAction =
  | { type: typeof COMMON_ACTION_TYPES.DELETE_ITEM }
  | { type: typeof COMMON_ACTION_TYPES.END_ANIMATION }
  | { type: typeof COMMON_ACTION_TYPES.GO_TO_NEXT_STEP }
  | { type: typeof COMMON_ACTION_TYPES.GO_TO_PREV_STEP }
  | { type: typeof COMMON_ACTION_TYPES.GO_TO_SPECIFIC_STEP; step: number };

export type BaseState<Item extends BaseItem> = {
  list: Array<Item>;
  commands: Array<Command<Item>>;
  startAnimation: boolean;
  totalStep: number;
  currentStep: number;
};

export type DefaultReducerMap<
  Item extends BaseItem = BaseItem,
  State extends BaseState<Item> = BaseState<Item>
> = {
  [key in keyof typeof COMMON_ACTION_TYPES]: (
    state: State,
    action: Extract<DefaultAction, { type: key }>
  ) => State;
};
