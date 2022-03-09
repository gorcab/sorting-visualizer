import { Command } from "features/common/lib/commands/CommandInterface";
import { BaseItem, Selectable } from "features/common/lib/types";
import {
  AdditionalAction,
  ADDITIONAL_ACTION_TYPES,
  BaseState,
} from "features/common/reducers/sortingAnimationReducer";
import { selectionSort } from "../lib/selectionSort";

export type SelectionSortItem = BaseItem & Selectable;

export type SelectionSortState = BaseState<SelectionSortItem>;

type SelectionSortReducerMap = {
  [key in keyof typeof ADDITIONAL_ACTION_TYPES]: (
    state: SelectionSortState,
    action: Extract<AdditionalAction<SelectionSortItem>, { type: key }>
  ) => SelectionSortState;
};

export function numToSelectionSortItemMappingFunc(num: number, index: number) {
  const selectionSortItem: SelectionSortItem = {
    id: index + 1,
    value: num,
    currentIndex: index,
    initialIndex: index,
    isSelected: false,
    isSorted: false,
  };

  return selectionSortItem;
}

export const selectionSortReducerMap: SelectionSortReducerMap = {
  ADD_ITEM: (state, action) => {
    const list = state.list.concat(action.payload);
    return { ...state, list };
  },
  INITIALIZE: (state, action) => {
    const {
      payload: { list, sortingOrder },
    } = action;
    const commands: Array<Command<SelectionSortItem>> = selectionSort(
      list,
      sortingOrder
    );
    const totalStep = commands.length;
    const currentStep = 0;
    return {
      ...state,
      sortingOrder,
      commands,
      list,
      totalStep,
      currentStep,
      startAnimation: true,
    };
  },
};
