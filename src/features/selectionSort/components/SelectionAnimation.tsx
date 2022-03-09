import { useSortingAnimation } from "features/common/hooks/useSortingAnimation";
import { SortingOrder } from "features/common/lib/types";
import { AnimationSettingTemplate } from "features/setting/components/AnimationSettingTemplate";
import { SelectionSortContext } from "../context/selectionSortContext";
import {
  numToSelectionSortItemMappingFunc,
  selectionSortReducerMap,
} from "../reducer";
import { SelectionSortAnimationTemplate } from "./SelectionSortAnimationTemplate";

export function SelectionAnimation() {
  const { state, dispatch } = useSortingAnimation({
    reducerMap: selectionSortReducerMap,
    initialState: {
      commands: [],
      list: [],
      currentStep: 0,
      sortingOrder: "ASC",
      startAnimation: false,
      totalStep: 0,
    },
  });

  const contextValue = {
    state,
    dispatch,
  };

  const { startAnimation } = state;

  const initAnimation = (nums: Array<number>, sortingOrder: SortingOrder) => {
    dispatch({
      type: "INITIALIZE",
      payload: {
        list: nums.map(numToSelectionSortItemMappingFunc),
        sortingOrder,
      },
    });
  };

  return startAnimation ? (
    <SelectionSortContext.Provider value={contextValue}>
      <SelectionSortAnimationTemplate />
    </SelectionSortContext.Provider>
  ) : (
    <AnimationSettingTemplate onInit={initAnimation} />
  );
}
