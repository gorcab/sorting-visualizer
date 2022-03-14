import { Command } from "../lib/commands/CommandInterface";
import { BaseItem, SortingOrder } from "../lib/types";

export const ACTION_TYPES = {
  ADD_ITEM: "ADD_ITEM",
  DELETE_ITEM: "DELETE_ITEM",
  START_ANIMATION: "START_ANIMATION",
  GO_TO_NEXT_STEP: "GO_TO_NEXT_STEP",
  GO_TO_PREV_STEP: "GO_TO_PREV_STEP",
  GO_TO_SPECIFIC_STEP: "GO_TO_SPECIFIC_STEP",
  END_ANIMATION: "END_ANIMATION",
} as const;

export type AnimationAction<Item extends BaseItem> =
  | {
      type: typeof ACTION_TYPES.ADD_ITEM;
      payload: Item;
    }
  | {
      type: typeof ACTION_TYPES.DELETE_ITEM;
    }
  | {
      type: typeof ACTION_TYPES.START_ANIMATION;
      payload: { list: Array<number>; sortingOrder: SortingOrder };
    }
  | { type: typeof ACTION_TYPES.END_ANIMATION }
  | {
      type: typeof ACTION_TYPES.GO_TO_NEXT_STEP;
    }
  | {
      type: typeof ACTION_TYPES.GO_TO_PREV_STEP;
    }
  | {
      type: typeof ACTION_TYPES.GO_TO_SPECIFIC_STEP;
      step: number;
    };

export type BaseState<Item extends BaseItem> = {
  list: Array<Item>;
  commands: unknown;
  sortingOrder: SortingOrder;
  startAnimation: boolean;
  totalStep: number;
  currentStep: number;
};

export type ReducerFactoryOption<
  Item extends BaseItem,
  State extends BaseState<Item>
> = {
  numToItemMappingFunc: (num: number, index: number) => Item;
  initialState: State;
  sortingAlgorithm: (
    list: Array<Item>,
    sortingOrder: SortingOrder
  ) => Array<Command<Item, State>>;
};

type Reducer<Item extends BaseItem, State extends BaseState<Item>> = {
  (state: State, action: AnimationAction<Item>): State;
};

export function createReducer<
  Item extends BaseItem,
  State extends BaseState<Item>
>({
  initialState,
  numToItemMappingFunc,
  sortingAlgorithm,
}: ReducerFactoryOption<Item, State>): Reducer<Item, State> {
  function reducer(state: State, action: AnimationAction<Item>) {
    switch (action.type) {
      case ACTION_TYPES.ADD_ITEM: {
        const list = state.list.concat(action.payload);
        return { ...state, list };
      }
      case ACTION_TYPES.DELETE_ITEM: {
        const list = state.list.slice(0, state.list.length - 1);
        return { ...state, list };
      }
      case ACTION_TYPES.START_ANIMATION: {
        const {
          payload: { list, sortingOrder },
        } = action;
        const mappedList = list.map(numToItemMappingFunc);
        const commands: Array<Command<Item, State>> = sortingAlgorithm(
          mappedList,
          sortingOrder
        );
        const totalStep = commands.length;
        const currentStep = 0;
        return {
          ...state,
          sortingOrder,
          list: mappedList,
          currentStep,
          totalStep,
          commands,
          startAnimation: true,
        };
      }
      case ACTION_TYPES.END_ANIMATION: {
        return { ...initialState };
      }
      case ACTION_TYPES.GO_TO_NEXT_STEP: {
        const nextStep =
          state.currentStep < state.totalStep ? state.currentStep + 1 : -1;
        if (nextStep === -1) return { ...state };

        const commands = state.commands as Array<Command<Item, State>>;
        const newState = commands[state.currentStep].execute(state);
        return {
          ...newState,
          currentStep: nextStep,
        };
      }
      case ACTION_TYPES.GO_TO_PREV_STEP: {
        const prevStep = state.currentStep > 0 ? state.currentStep - 1 : -1;
        if (prevStep === -1) return { ...state };

        const commands = state.commands as Array<Command<Item, State>>;
        const newState = commands[prevStep].undo(state);
        return {
          ...newState,
          currentStep: prevStep,
        };
      }
      case ACTION_TYPES.GO_TO_SPECIFIC_STEP: {
        const startStep = state.currentStep;
        let endStep = action.step;
        let newState = { ...state };
        const commands = state.commands as Array<Command<Item, State>>;
        if (startStep > endStep) {
          for (let i = startStep - 1; i >= endStep; i--) {
            newState = commands[i].undo(newState);
          }
        } else {
          for (let i = startStep; i <= endStep - 1; i++) {
            newState = commands[i].execute(newState);
          }
        }

        return {
          ...newState,
          currentStep: endStep,
        };
      }
    }
  }

  return reducer;
}
