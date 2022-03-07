import {
  AdditionalAction,
  DefaultAction,
} from "features/common/reducers/sortingAnimationReducer";
import { createContext } from "react";
import { BubbleSortState, BubbleSortItem } from "../reducer";

export const BubbleSortContext =
  createContext<{
    state: BubbleSortState;
    dispatch: React.Dispatch<DefaultAction | AdditionalAction<BubbleSortItem>>;
  } | null>(null);
