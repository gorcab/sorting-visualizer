import { useSortingAnimation } from "features/common/hooks/useSortingAnimation";
import { Command } from "features/common/lib/commands/CommandInterface";
import { quickSort } from "../lib/quickSort";
import { numToQuickSortItemMappingFunc } from "../lib/helper";
import { IndicatorIndicesInfo, QuickSortItem, QuickSortState } from "../types";
import { SortingOrder } from "features/common/lib/types";
import { QuickSortAnimationTemplate } from "./QuickSortAnimationTemplate";
import { AnimationSettingTemplate } from "features/setting/components/AnimationSettingTemplate";
import { IndicatorIndicesContext } from "../context/indicatorIndices";

export function QuickAnimation() {
  const { state, dispatch } = useSortingAnimation({
    initialState: {
      commands: [] as Array<Command<QuickSortItem, QuickSortState>>,
      currentStep: 0,
      totalStep: 0,
      list: [],
      sortingOrder: "ASC",
      startAnimation: false,
      highIndex: NaN,
      lowIndex: NaN,
      pivotIndex: NaN,
      isFocused: false,
    },
    numToItemMappingFunc: numToQuickSortItemMappingFunc,
    sortingAlgorithm: quickSort,
  });
  // console.log("state: ", state);

  const { pivotIndex, lowIndex, highIndex } = state;

  const contextValue: IndicatorIndicesInfo = {
    highIndex,
    lowIndex,
    pivotIndex,
  };

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
    <IndicatorIndicesContext.Provider value={contextValue}>
      <QuickSortAnimationTemplate state={state} dispatch={dispatch} />
    </IndicatorIndicesContext.Provider>
  ) : (
    <AnimationSettingTemplate onInit={initAnimation} />
  );
}
