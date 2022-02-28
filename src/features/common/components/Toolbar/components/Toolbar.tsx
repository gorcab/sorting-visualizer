import { Keyboard } from "features/common/lib/constant";
import { useReducer } from "react";
import { css } from "stitches.config";
import { ToolbarContext } from "../context";
import { toolbarInitialState, toolbarReducer } from "../reducer";
import { ToolbarButton } from "./ToolbarButton";

type ToolbarProps = {
  children: React.ReactNode;
  label: string;
  ariaControls: string;
};

export function Toolbar({ children, label, ariaControls }: ToolbarProps) {
  const [state, dispatch] = useReducer(toolbarReducer, toolbarInitialState);

  const value = {
    state,
    dispatch,
  };

  const keydownHandler: React.KeyboardEventHandler<HTMLDivElement> = (
    event
  ) => {
    switch (event.key) {
      case Keyboard.ArrowRight:
      case Keyboard.ArrowDown: {
        event.preventDefault();
        event.stopPropagation();
        dispatch({ type: "FOCUS_NEXT" });
        return;
      }
      case Keyboard.ArrowLeft:
      case Keyboard.ArrowUp: {
        event.preventDefault();
        event.stopPropagation();
        dispatch({ type: "FOCUS_PREV" });
      }
    }
  };

  return (
    <ToolbarContext.Provider value={value}>
      <div
        onKeyDown={keydownHandler}
        role="toolbar"
        aria-label={label}
        aria-controls={ariaControls}
        className={toolbarClass()}
      >
        {children}
      </div>
    </ToolbarContext.Provider>
  );
}

Toolbar.Button = ToolbarButton;

const toolbarClass = css({
  height: "$20",
  padding: "$sm",
  borderTop: "2px solid #1f2937",
  boxShadow:
    "0 -4px 6px 3px rgb(0 0 0 / 0.1), 0 -2px 4px -2px rgb(0 0 0 / 0.1)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
