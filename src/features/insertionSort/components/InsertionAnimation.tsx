import { useSortingAnimation } from "features/common/hooks/useSortingAnimation";
import { SortingOrder } from "features/common/lib/types";
import { AnimationSettingTemplate } from "features/setting/components/AnimationSettingTemplate";
import { InsertionSortContext } from "../context/insertionSortContext";
import {
  insertionSortReducerMap,
  numToInsertionSortItemMappingFunc,
} from "../reducer";
import { InsertionSortAnimationTemplate } from "./InsertionSortAnimationTemplate";

export function InsertionAnimation() {
  const { state, dispatch } = useSortingAnimation({
    reducerMap: insertionSortReducerMap,
    initialState: {
      commands: [],
      currentStep: 0,
      sortingOrder: "ASC",
      list: [],
      startAnimation: false,
      totalStep: 0,
    },
  });

  const contextValue = {
    state,
    dispatch,
  };

  const initAnimation = (nums: Array<number>, sortingOrder: SortingOrder) => {
    dispatch({
      type: "INITIALIZE",
      payload: {
        list: nums.map(numToInsertionSortItemMappingFunc),
        sortingOrder,
      },
    });
  };

  const { startAnimation } = state;

  return startAnimation ? (
    <InsertionSortContext.Provider value={contextValue}>
      <InsertionSortAnimationTemplate />
    </InsertionSortContext.Provider>
  ) : (
    <AnimationSettingTemplate onInit={initAnimation} />
  );
}
