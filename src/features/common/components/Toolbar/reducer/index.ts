export type ToolbarAction =
  | { type: "REGISTER_BUTTON"; id: string }
  | { type: "UNREGISTER_BUTTON"; id: string }
  | { type: "FOCUS_SPECIFIC"; id: string }
  | { type: "FOCUS_NEXT" }
  | { type: "FOCUS_PREV" }
  | { type: "CHANGE_STATE"; payload: { id: string; disabled: boolean } };

export type ToolbarState = {
  buttonIds: Array<string>;
  buttonDisabledMap: { [buttonId: string]: boolean };
  focusedButtonIndex: number;
  isFocusable: boolean;
};

export const toolbarInitialState: ToolbarState = {
  buttonIds: [],
  buttonDisabledMap: {},
  focusedButtonIndex: 0,
  isFocusable: false,
};

export function toolbarReducer(
  state: ToolbarState,
  action: ToolbarAction
): ToolbarState {
  switch (action.type) {
    case "REGISTER_BUTTON": {
      const { id } = action;
      const buttonIds = state.buttonIds.concat(id);
      const isFocusable = false;
      const buttonDisabledMap = { ...state.buttonDisabledMap };
      buttonDisabledMap[id] = true;

      return { ...state, buttonIds, buttonDisabledMap, isFocusable };
    }

    case "UNREGISTER_BUTTON": {
      const { id } = action;
      const buttonIds = state.buttonIds.slice();
      const idToUnregisterIndex = buttonIds.findIndex((id) => id === action.id);

      if (idToUnregisterIndex === -1) {
        return { ...state, buttonIds };
      }

      const buttonDisabledMap = { ...state.buttonDisabledMap };
      delete buttonDisabledMap[id];
      buttonIds.splice(idToUnregisterIndex, 1);

      return { ...state, buttonIds, buttonDisabledMap };
    }

    case "FOCUS_SPECIFIC": {
      const { id } = action;
      const isFocusable = true;
      const focusedButtonIndex = state.buttonIds.findIndex(
        (id) => id === action.id
      );

      if (state.buttonDisabledMap[id]) {
        return { ...state };
      }

      return { ...state, focusedButtonIndex, isFocusable };
    }

    case "FOCUS_NEXT": {
      let nextIndex =
        state.focusedButtonIndex < state.buttonIds.length - 1
          ? state.focusedButtonIndex + 1
          : 0;
      while (state.buttonDisabledMap[state.buttonIds[nextIndex]]) {
        nextIndex = nextIndex < state.buttonIds.length - 1 ? nextIndex + 1 : 0;
        if (nextIndex === state.focusedButtonIndex) {
          return { ...state };
        }
      }
      const isFocusable = true;

      return { ...state, focusedButtonIndex: nextIndex, isFocusable };
    }

    case "FOCUS_PREV": {
      let nextIndex =
        state.focusedButtonIndex > 0
          ? state.focusedButtonIndex - 1
          : state.buttonIds.length - 1;
      while (state.buttonDisabledMap[state.buttonIds[nextIndex]]) {
        nextIndex = nextIndex > 0 ? nextIndex - 1 : state.buttonIds.length - 1;
        if (nextIndex === state.focusedButtonIndex) {
          return { ...state };
        }
      }
      const isFocusable = true;

      return { ...state, focusedButtonIndex: nextIndex, isFocusable };
    }

    case "CHANGE_STATE": {
      const { id: buttonId, disabled } = action.payload;
      const index = state.buttonIds.findIndex((id) => id === buttonId);
      if (index === -1) {
        return { ...state };
      }
      const buttonDisabledMap = { ...state.buttonDisabledMap };
      buttonDisabledMap[buttonId] = disabled;
      if (
        buttonDisabledMap[buttonId] &&
        state.buttonIds[state.focusedButtonIndex] === buttonId
      ) {
        let nextIndex =
          state.focusedButtonIndex < state.buttonIds.length - 1
            ? state.focusedButtonIndex + 1
            : 0;
        while (state.buttonDisabledMap[state.buttonIds[nextIndex]]) {
          nextIndex =
            nextIndex < state.buttonIds.length - 1 ? nextIndex + 1 : 0;
          if (nextIndex === state.focusedButtonIndex) {
            break;
          }
        }

        return {
          ...state,
          buttonDisabledMap,
          focusedButtonIndex: nextIndex,
          isFocusable: false,
        };
      }

      return { ...state, buttonDisabledMap };
    }

    default: {
      throw new Error("Invalid toolbar action type");
    }
  }
}
