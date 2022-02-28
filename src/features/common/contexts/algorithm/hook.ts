import { useContext } from "react";
import { AlgorithmContext } from "./context";

export const useAlgorithm = () => {
  const context = useContext(AlgorithmContext);

  if (!context) {
    throw new Error(
      `useAlgorithm hook must be used within <AlgorithmProvider />`
    );
  }

  return context;
};
