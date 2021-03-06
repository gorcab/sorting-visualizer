import { createContext } from "react";

export type Algorithm =
  | "bubble"
  | "insertion"
  | "selection"
  | "merge"
  | "quick";

type ContextValue = {
  algorithm: Algorithm;
  selectAlgorithm: (algorithm: Algorithm) => void;
};

export const AlgorithmContext = createContext<ContextValue | null>(null);
