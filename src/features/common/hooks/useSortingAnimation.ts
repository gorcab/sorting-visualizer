import { useReducer } from "react";
import { BaseItem } from "../lib/types";
import {
  BaseState,
  AdditionalAction,
  DefaultAction,
  ADDITIONAL_ACTION_TYPES,
  DefaultReducerMap,
} from "../reducers/sortingAnimationReducer";

type SortingAnimationOptions<
  Item extends BaseItem,
  State extends BaseState<Item> = BaseState<Item>
> = {
  reducerMap: {
    [key in keyof typeof ADDITIONAL_ACTION_TYPES]: (
      state: State,
      action: Extract<AdditionalAction<Item>, { type: key }>
    ) => State;
  };
  initialState: State;
};

export function useSortingAnimation<
  Item extends BaseItem,
  State extends BaseState<Item> = BaseState<Item>
>({ reducerMap, initialState }: SortingAnimationOptions<Item, State>) {
  const defaultReducerMap: DefaultReducerMap<Item, State> = {
    DELETE_ITEM: (state) => {
      const list = state.list.slice(0, state.list.length - 1);
      return { ...state, list };
    },

    END_ANIMATION: () => {
      return {
        ...initialState,
      };
    },

    GO_TO_NEXT_STEP: (state) => {
      const nextStep =
        state.currentStep < state.totalStep ? state.currentStep + 1 : -1;
      if (nextStep === -1) return { ...state };

      const newList = state.commands[state.currentStep].execute(state.list);
      return {
        ...state,
        list: newList,
        currentStep: nextStep,
      };
    },

    GO_TO_PREV_STEP: (state) => {
      const prevStep = state.currentStep > 0 ? state.currentStep - 1 : -1;

      if (prevStep === -1) return { ...state };

      const newList = state.commands[prevStep].undo(state.list);
      return {
        ...state,
        list: newList,
        currentStep: prevStep,
      };
    },

    GO_TO_SPECIFIC_STEP: (state, action) => {
      let startStep = state.currentStep;
      let endStep = action.step;
      let newList = state.list;
      if (startStep > endStep) {
        for (let i = startStep - 1; i >= endStep; i--) {
          newList = state.commands[i].undo(newList);
        }
      } else {
        for (let i = startStep; i <= endStep - 1; i++) {
          newList = state.commands[i].execute(newList);
        }
      }
      return {
        ...state,
        list: newList,
        currentStep: endStep,
      };
    },
  };

  const stateReducer = (
    state: State,
    action: DefaultAction | AdditionalAction<Item>
  ) => {
    switch (action.type) {
      case "ADD_ITEM": {
        return reducerMap[action.type](state, action);
      }
      case "INITIALIZE": {
        return reducerMap[action.type](state, action);
      }
      case "DELETE_ITEM": {
        return defaultReducerMap[action.type](state, action);
      }
      case "END_ANIMATION": {
        return defaultReducerMap[action.type](state, action);
      }
      case "GO_TO_NEXT_STEP": {
        return defaultReducerMap[action.type](state, action);
      }
      case "GO_TO_PREV_STEP": {
        return defaultReducerMap[action.type](state, action);
      }
      case "GO_TO_SPECIFIC_STEP": {
        return defaultReducerMap[action.type](state, action);
      }
    }
  };

  const [state, dispatch] = useReducer(stateReducer, initialState);

  return {
    state,
    dispatch,
  };
}
