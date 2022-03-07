import { css } from "stitches.config";
import { ToolbarButton, ToolbarButtonProps } from "./ToolbarButton";

type ToolbarIconButtonProps = ToolbarButtonProps & {
  SvgIcon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
};

export function ToolbarIconButton({
  SvgIcon,
  children,
  ...props
}: ToolbarIconButtonProps) {
  const { disabled } = props;

  return (
    <ToolbarButton className={buttonClass()} {...props}>
      <SvgIcon
        aria-hidden="true"
        fill={disabled ? "#9ca3af" : "#ffffff"}
        stroke={disabled ? "#9ca3af" : "#ffffff"}
      />
      <span className={labelClass()}>{children}</span>
    </ToolbarButton>
  );
}

const buttonClass = css({
  backgroundColor: "transparent",
  border: "none",
  display: "flex",
  justifyContent: "center",
  cursor: "pointer",
  padding: "$sm",
  alignItems: "center",
  width: "$8",
  height: "$8",

  "&:focus:not(:disabled)": {
    outline: "$green500 solid",
  },

  "&:disabled": {
    cursor: "not-allowed",
  },

  "@md": {
    width: "$9",
    height: "$9",
  },
});

const labelClass = css({
  border: 0,
  clip: "rect(1px, 1px, 1px, 1px)",
  clipPath: "inset(50%)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  width: "1px",
  wordWrap: "normal",
});
