import { useState } from "react";
import { Algorithm, AlgorithmContext } from "./context";

type AlgorithmProviderProps = {
  children: React.ReactNode;
};

export function AlgorithmProvider({ children }: AlgorithmProviderProps) {
  const [algorithm, setAlgorithm] = useState<Algorithm>("bubble");
  const value = {
    algorithm,
    selectAlgorithm: (algorithm: Algorithm) => setAlgorithm(algorithm),
  };

  return (
    <AlgorithmContext.Provider value={value}>
      {children}
    </AlgorithmContext.Provider>
  );
}
