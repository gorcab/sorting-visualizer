import { useSortingAnimation } from "features/common/hooks/useSortingAnimation";
import { Command } from "features/common/lib/commands/CommandInterface";
import { SortingOrder } from "features/common/lib/types";
import { BubbleSortAnimationTemplate } from "./BubbleSortAnimationTemplate";
import { AnimationSettingTemplate } from "features/setting/components/AnimationSettingTemplate";
import { bubbleSort } from "../lib/bubbleSort";
import { BubbleSortItem, BubbleSortState } from "../types";
import { numToBubbleSortItemMappingFunc } from "../lib/helper";

export function BubbleAnimation() {
  const { state, dispatch } = useSortingAnimation({
    initialState: {
      commands: [] as Array<Command<BubbleSortItem, BubbleSortState>>,
      currentStep: 0,
      list: [],
      sortingOrder: "ASC",
      startAnimation: false,
      totalStep: 0,
    },
    numToItemMappingFunc: numToBubbleSortItemMappingFunc,
    sortingAlgorithm: bubbleSort,
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
    <BubbleSortAnimationTemplate state={state} dispatch={dispatch} />
  ) : (
    <AnimationSettingTemplate onInit={initAnimation} />
  );
}
