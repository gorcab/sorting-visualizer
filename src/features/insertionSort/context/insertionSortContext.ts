import {
  AdditionalAction,
  DefaultAction,
} from "features/common/reducers/sortingAnimationReducer";
import React, { createContext } from "react";
import { InsertionSortItem, InsertionSortState } from "../reducer";

export const InsertionSortContext =
  createContext<{
    state: InsertionSortState;
    dispatch: React.Dispatch<
      DefaultAction | AdditionalAction<InsertionSortItem>
    >;
  } | null>(null);
