import {
  AdditionalAction,
  DefaultAction,
} from "features/common/reducers/sortingAnimationReducer";
import React, { createContext } from "react";
import { SelectionSortItem, SelectionSortState } from "../reducer";

export const SelectionSortContext =
  createContext<{
    state: SelectionSortState;
    dispatch: React.Dispatch<
      DefaultAction | AdditionalAction<SelectionSortItem>
    >;
  } | null>(null);
