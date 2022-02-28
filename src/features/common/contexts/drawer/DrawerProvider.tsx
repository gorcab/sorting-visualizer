import { useCycle } from "framer-motion";
import { DrawerContext } from "./context";

type DrawerProviderProps = {
  children: React.ReactNode;
};

export function DrawerProvider({ children }: DrawerProviderProps) {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const value = {
    isOpen,
    toggleOpen,
  };

  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
}
