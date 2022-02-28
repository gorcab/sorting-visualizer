import React, { useRef } from "react";
import { useId } from "features/common/hooks/useId";
import { useEffect } from "react";
import { useToolbarContext } from "../context";
import { callAll } from "features/common/lib/utility";

type ToolbarButtonProps = React.HTMLProps<HTMLButtonElement>;

export function ToolbarButton(props: ToolbarButtonProps) {
  const buttonId = useId("toobar-button");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { state, dispatch } = useToolbarContext(ToolbarButton.name);
  const { buttonIds, focusedButtonIndex } = state;
  const isFocused = buttonIds[focusedButtonIndex] === buttonId;
  const { onClick, ...restProps } = props;

  useEffect(() => {
    dispatch({ type: "REGISTER_BUTTON", id: buttonId });
    return () => dispatch({ type: "UNREGISTER_BUTTON", id: buttonId });
  }, [buttonId, dispatch]);

  useEffect(() => {
    if (!buttonRef.current) return;
    if (isFocused) {
      buttonRef.current.focus();
    }
  }, [isFocused]);

  const focusChange = () => dispatch({ type: "FOCUS_SPECIFIC", id: buttonId });

  const clickHandler = callAll(focusChange, onClick);

  const Button = React.createElement("button", {
    ...restProps,
    ref: buttonRef,
    type: "button",
    tabIndex: isFocused ? 0 : -1,
    onClick: clickHandler,
  });

  return Button;
}
