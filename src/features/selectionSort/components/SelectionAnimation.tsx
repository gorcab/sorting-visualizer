import { useSortingAnimation } from "features/common/hooks/useSortingAnimation";
import { Command } from "features/common/lib/commands/CommandInterface";
import { SortingOrder } from "features/common/lib/types";
import { AnimationSettingTemplate } from "features/setting/components/AnimationSettingTemplate";
import { numToSelectionSortItemMappingFunc } from "../lib/helper";
import { selectionSort } from "../lib/selectionSort";
import { SelectionSortItem, SelectionSortState } from "../types";
import { SelectionSortAnimationTemplate } from "./SelectionSortAnimationTemplate";

export function SelectionAnimation() {
  const { state, dispatch } = useSortingAnimation({
    initialState: {
      commands: [] as Array<Command<SelectionSortItem, SelectionSortState>>,
      currentStep: 0,
      totalStep: 0,
      list: [],
      sortingOrder: "ASC",
      startAnimation: false,
    },
    numToItemMappingFunc: numToSelectionSortItemMappingFunc,
    sortingAlgorithm: selectionSort,
  });

  const { startAnimation } = state;

  const initAnimation = (nums: Array<number>, sortingOrder: SortingOrder) => {
    dispatch({
      type: "START_ANIMATION",
      payload: {
        list: nums,
        sortingOrder,
      },
    });
  };

  return startAnimation ? (
    <SelectionSortAnimationTemplate state={state} dispatch={dispatch} />
  ) : (
    <AnimationSettingTemplate onInit={initAnimation} />
  );
}
