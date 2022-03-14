import { useReducer } from "react";
import { BaseItem } from "../lib/types";
import {
  BaseState,
  createReducer,
  ReducerFactoryOption,
} from "../reducers/sortingAnimationReducer";

export function useSortingAnimation<
  Item extends BaseItem,
  State extends BaseState<Item>
>(options: ReducerFactoryOption<Item, State>) {
  const reducer = createReducer(options);
  const [state, dispatch] = useReducer(reducer, options.initialState);

  return { state, dispatch };
}
