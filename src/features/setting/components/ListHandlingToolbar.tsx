import { css } from "stitches.config";
import { Toolbar } from "../../common/components/Toolbar";

type ListHandlingToolbarProps = {
  animationSectionId: string;
  onAddClick: () => void;
  onDeleteClick: () => void;
  onStartClick: () => void;
  isDisabledAddButton: boolean;
  isDisabledDeleteButton: boolean;
  isDisabledStartButton: boolean;
};

export function ListHandlingToolbar({
  animationSectionId,
  onAddClick,
  onDeleteClick,
  onStartClick,
  isDisabledAddButton,
  isDisabledDeleteButton,
  isDisabledStartButton,
}: ListHandlingToolbarProps) {
  return (
    <Toolbar
      label="Set the list to use for animation"
      ariaControls={animationSectionId}
    >
      <Toolbar.Button
        disabled={isDisabledAddButton}
        onClick={onAddClick}
        className={toolbarBtnClass()}
      >
        Add
      </Toolbar.Button>
      <Toolbar.Button
        disabled={isDisabledDeleteButton}
        onClick={onDeleteClick}
        className={toolbarBtnClass()}
      >
        Delete
      </Toolbar.Button>
      <Toolbar.Button
        disabled={isDisabledStartButton}
        onClick={onStartClick}
        className={toolbarBtnClass()}
      >
        Start
      </Toolbar.Button>
    </Toolbar>
  );
}

const toolbarBtnClass = css({
  border: "none",
  backgroundColor: "transparent",
  color: "$white",
  padding: "$sm",
  outlineColor: "$green500",
  flex: 1,
  height: "100%",
  fontSize: "$lg",
  cursor: "pointer",

  "&:disabled": {
    color: "$disabled",
  },

  "&:hover:not(:disabled)": {
    color: "$green500",
  },
});
