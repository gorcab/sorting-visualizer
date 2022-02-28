import { createContext, useContext } from "react";
import { ToolbarState, ToolbarAction } from "../reducer";

export const ToolbarContext =
  createContext<{
    state: ToolbarState;
    dispatch: React.Dispatch<ToolbarAction>;
  } | null>(null);

export function useToolbarContext(componentName: String) {
  const context = useContext(ToolbarContext);
  if (!context) {
    throw new Error(
      `<${componentName} /> Component must be used within <Toolbar /> component.`
    );
  }

  return context;
}
