import { Command } from "features/common/lib/commands/CommandInterface";
import { BaseItem, SelectableItem } from "features/common/lib/types";
import {
  AdditionalAction,
  ADDITIONAL_ACTION_TYPES,
  BaseState,
} from "features/common/reducers/sortingAnimationReducer";
import { bubbleSort } from "../lib/bubbleSort";

export type BubbleSortItem = BaseItem & SelectableItem;

type BubbleSortState = BaseState<BubbleSortItem>;

type BubbleSortReducerMap = {
  [key in keyof typeof ADDITIONAL_ACTION_TYPES]: (
    state: BubbleSortState,
    action: Extract<AdditionalAction<BubbleSortItem>, { type: key }>
  ) => BubbleSortState;
};

export function numToBubbleSortItemMappingFunc(num: number, index: number) {
  const bubbleSortItem: BubbleSortItem = {
    value: num,
    currentIndex: index,
    initialIndex: index,
    isSelected: false,
    isSorted: false,
  };
  return bubbleSortItem;
}

export const bubbleSortReducerMap: BubbleSortReducerMap = {
  ADD_ITEM: (state, action) => {
    const list = state.list.concat(action.payload);
    return { ...state, list };
  },
  INITIALIZE: (state, action) => {
    const {
      payload: { list, sortingOrder },
    } = action;
    const commands: Array<Command<BubbleSortItem>> = bubbleSort(
      list,
      sortingOrder
    );
    const totalStep = commands.length;
    const currentStep = 0;
    return {
      ...state,
      sortingOrder,
      list,
      totalStep,
      commands,
      currentStep,
      startAnimation: true,
    };
  },
};
