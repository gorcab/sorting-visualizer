import { createContext } from "react";
import { IndicatorIndicesInfo } from "../types";

export const IndicatorIndicesContext =
  createContext<IndicatorIndicesInfo | null>(null);
