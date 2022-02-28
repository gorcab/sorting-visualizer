import { useCycle } from "framer-motion";
import { createContext } from "react";

export const DrawerContext =
  createContext<{
    isOpen: boolean;
    toggleOpen: ReturnType<typeof useCycle>[1];
  } | null>(null);
