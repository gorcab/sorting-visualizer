import { useContext } from "react";
import { DrawerContext } from "./context";

export const useDrawer = () => {
  const context = useContext(DrawerContext);

  if (context === null) {
    throw new Error("useDrawer hook must be used within <DrawerProvider />");
  }

  return context;
};
