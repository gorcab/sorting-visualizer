import { css } from "stitches.config";
import { Toolbar } from "./Toolbar";

type ListHandlingToolbarProps = {
  animationSectionId: string;
};

export function ListHandlingToolbar({
  animationSectionId,
}: ListHandlingToolbarProps) {
  return (
    <Toolbar
      label="Set the list to use for animation"
      ariaControls={animationSectionId}
    >
      <Toolbar.Button className={toolbarBtnClass()}>Add</Toolbar.Button>
      <Toolbar.Button className={toolbarBtnClass()}>Delete</Toolbar.Button>
      <Toolbar.Button className={toolbarBtnClass()}>Start</Toolbar.Button>
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

  "&:hover": {
    color: "$green500",
  },
});
