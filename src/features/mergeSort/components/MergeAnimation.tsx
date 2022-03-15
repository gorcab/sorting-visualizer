import { useSortingAnimation } from "features/common/hooks/useSortingAnimation";
import { Command } from "features/common/lib/commands/CommandInterface";
import { SortingOrder } from "features/common/lib/types";
import { AnimationSettingTemplate } from "features/setting/components/AnimationSettingTemplate";
import { numToMergeSortItemMappingFunc } from "../lib/helper";
import { mergeSort } from "../lib/mergeSort";
import { MergeSortItem, MergeSortState } from "../types";
import { MergeSortAnimationTemplate } from "./MergeSortAnimationTemplate";

export function MergeAnimation() {
  const { state, dispatch } = useSortingAnimation({
    initialState: {
      commands: [] as Array<Command<MergeSortItem, MergeSortState>>,
      currentStep: 0,
      totalStep: 0,
      list: [],
      sortingOrder: "ASC",
      startAnimation: false,
      isFocused: false,
    },
    numToItemMappingFunc: numToMergeSortItemMappingFunc,
    sortingAlgorithm: mergeSort,
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
    <MergeSortAnimationTemplate state={state} dispatch={dispatch} />
  ) : (
    <AnimationSettingTemplate onInit={initAnimation} />
  );
}
