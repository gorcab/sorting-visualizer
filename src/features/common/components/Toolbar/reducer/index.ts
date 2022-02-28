export type ToolbarAction =
  | { type: "REGISTER_BUTTON"; id: string }
  | { type: "UNREGISTER_BUTTON"; id: string }
  | { type: "FOCUS_SPECIFIC"; id: string }
  | { type: "FOCUS_NEXT" }
  | { type: "FOCUS_PREV" };

export type ToolbarState = {
  buttonIds: Array<string>;
  focusedButtonIndex: number;
};

export const toolbarInitialState: ToolbarState = {
  buttonIds: [],
  focusedButtonIndex: 0,
};

export function toolbarReducer(
  state: ToolbarState,
  action: ToolbarAction
): ToolbarState {
  switch (action.type) {
    case "REGISTER_BUTTON": {
      const buttonIds = state.buttonIds.concat(action.id);
      return { ...state, buttonIds };
    }
    case "UNREGISTER_BUTTON": {
      const buttonIds = state.buttonIds.slice();
      const idToUnregisterIndex = buttonIds.findIndex((id) => id === action.id);
      if (idToUnregisterIndex === -1) {
        return { ...state, buttonIds };
      }
      buttonIds.splice(idToUnregisterIndex, 1);
      return { ...state, buttonIds };
    }
    case "FOCUS_SPECIFIC": {
      const focusedButtonIndex = state.buttonIds.findIndex(
        (id) => id === action.id
      );
      return { ...state, focusedButtonIndex };
    }
    case "FOCUS_NEXT": {
      const nextIndex =
        state.focusedButtonIndex < state.buttonIds.length - 1
          ? state.focusedButtonIndex + 1
          : 0;
      return { ...state, focusedButtonIndex: nextIndex };
    }
    case "FOCUS_PREV": {
      const nextIndex =
        state.focusedButtonIndex > 0
          ? state.focusedButtonIndex - 1
          : state.buttonIds.length - 1;
      return { ...state, focusedButtonIndex: nextIndex };
    }

    default: {
      throw new Error("Invalid toolbar action type");
    }
  }
}
