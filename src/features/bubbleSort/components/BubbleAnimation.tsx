import { useSortingAnimation } from "features/common/hooks/useSortingAnimation";
import { SortingOrder } from "features/common/lib/types";
import { AnimationSettingTemplate } from "features/setting/components/AnimationSettingTemplate";
import { BubbleSortContext } from "../context";
import {
  bubbleSortReducerMap,
  numToBubbleSortItemMappingFunc,
} from "../reducer";
import { BubbleSortAnimationTemplate } from "./BubbleSortAnimationTemplate";

export function BubbleAnimation() {
  const { state, dispatch } = useSortingAnimation({
    reducerMap: bubbleSortReducerMap,
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

  const initAnimation = (nums: Array<number>, sortingOrder: SortingOrder) => {
    dispatch({
      type: "INITIALIZE",
      payload: {
        list: nums.map(numToBubbleSortItemMappingFunc),
        sortingOrder,
      },
    });
  };

  const { startAnimation } = state;
  return startAnimation ? (
    <BubbleSortContext.Provider value={contextValue}>
      <BubbleSortAnimationTemplate />
    </BubbleSortContext.Provider>
  ) : (
    <AnimationSettingTemplate onInit={initAnimation} />
  );
}
