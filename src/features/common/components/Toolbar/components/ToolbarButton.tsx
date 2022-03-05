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
  const { buttonIds, focusedButtonIndex, isFocusable } = state;
  const isFocused = buttonIds[focusedButtonIndex] === buttonId;
  const { onMouseDown, onClick, disabled, ...restProps } = props;

  useEffect(() => {
    dispatch({ type: "REGISTER_BUTTON", id: buttonId });
    return () => dispatch({ type: "UNREGISTER_BUTTON", id: buttonId });
  }, [buttonId, dispatch]);

  useEffect(() => {
    if (disabled !== undefined) {
      dispatch({
        type: "CHANGE_STATE",
        payload: { id: buttonId, disabled: disabled },
      });
    }
  }, [disabled, dispatch, buttonId]);

  useEffect(() => {
    if (!buttonRef.current) return;

    if (isFocusable && isFocused) {
      buttonRef.current.focus();
    }
  }, [isFocusable, isFocused]);

  const mouseDownHandler: React.MouseEventHandler<HTMLInputElement> = () => {
    dispatch({ type: "FOCUS_SPECIFIC", id: buttonId });
  };

  const clickHandler: React.MouseEventHandler<HTMLInputElement> = () => {
    dispatch({ type: "FOCUS_SPECIFIC", id: buttonId });
  };

  const allMouseDownHandlers = callAll(onMouseDown, mouseDownHandler);
  const allClickHandlers = callAll(clickHandler, onClick);

  const Button = React.createElement("button", {
    ...restProps,
    disabled,
    "aria-disabled": disabled,
    ref: buttonRef,
    type: "button",
    tabIndex: isFocused ? 0 : -1,
    onMouseDown: allMouseDownHandlers,
    onClick: allClickHandlers,
  });

  return Button;
}
