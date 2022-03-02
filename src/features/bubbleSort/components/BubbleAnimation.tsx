import { useSortingAnimation } from "features/common/hooks/useSortingAnimation";
import { SortingOrder } from "features/common/lib/types";
import { AnimationSettingTemplate } from "features/setting/components/AnimationSettingTemplate";
import {
  bubbleSortReducerMap,
  numToBubbleSortItemMappingFunc,
} from "../reducer";

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
    <div>Sorting start</div>
  ) : (
    <AnimationSettingTemplate onInit={initAnimation} />
  );
}
