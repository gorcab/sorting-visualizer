import { useSortingAnimation } from "features/common/hooks/useSortingAnimation";
import { Command } from "features/common/lib/commands/CommandInterface";
import { SortingOrder } from "features/common/lib/types";
import { AnimationSettingTemplate } from "features/setting/components/AnimationSettingTemplate";
import { numToInsertionSortItemMappingFunc } from "../lib/helper";
import { insertionSort } from "../lib/insertionSort";
import { InsertionSortItem, InsertionSortState } from "../types";
import { InsertionSortAnimationTemplate } from "./InsertionSortAnimationTemplate";

export function InsertionAnimation() {
  const { state, dispatch } = useSortingAnimation({
    initialState: {
      commands: [] as Array<Command<InsertionSortItem, InsertionSortState>>,
      currentStep: 0,
      totalStep: 0,
      list: [],
      sortingOrder: "ASC",
      startAnimation: false,
    },
    numToItemMappingFunc: numToInsertionSortItemMappingFunc,
    sortingAlgorithm: insertionSort,
  });

  const initAnimation = (nums: Array<number>, sortingOrder: SortingOrder) => {
    dispatch({
      type: "START_ANIMATION",
      payload: {
        list: nums,
        sortingOrder,
      },
    });
  };

  const { startAnimation } = state;

  return startAnimation ? (
    <InsertionSortAnimationTemplate state={state} dispatch={dispatch} />
  ) : (
    <AnimationSettingTemplate onInit={initAnimation} />
  );
}
