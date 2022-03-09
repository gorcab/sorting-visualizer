import { Command } from "features/common/lib/commands/CommandInterface";
import { BaseItem, Selectable, Pickable } from "features/common/lib/types";
import {
  AdditionalAction,
  ADDITIONAL_ACTION_TYPES,
  BaseState,
} from "features/common/reducers/sortingAnimationReducer";
import { insertionSort } from "../lib/insertionSort";

export type InsertionSortItem = BaseItem & Selectable & Pickable;

export type InsertionSortState = BaseState<InsertionSortItem>;

type InsertionSortReducerMap = {
  [key in keyof typeof ADDITIONAL_ACTION_TYPES]: (
    state: InsertionSortState,
    action: Extract<AdditionalAction<InsertionSortItem>, { type: key }>
  ) => InsertionSortState;
};

export function numToInsertionSortItemMappingFunc(num: number, index: number) {
  const insertionSortItem: InsertionSortItem = {
    id: index + 1,
    value: num,
    currentIndex: index,
    initialIndex: index,
    isSelected: false,
    depth: 0,
    isSorted: false,
  };
  return insertionSortItem;
}

export const insertionSortReducerMap: InsertionSortReducerMap = {
  ADD_ITEM: (state, action) => {
    const list = state.list.concat(action.payload);
    return { ...state, list };
  },
  INITIALIZE: (state, action) => {
    const {
      payload: { list, sortingOrder },
    } = action;
    const commands: Array<Command<InsertionSortItem>> = insertionSort(
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
