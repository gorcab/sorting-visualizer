import { css } from "stitches.config";

type CloseIconButtonProps = {
  onClose: () => void;
};

export function CloseIconButton({ onClose }: CloseIconButtonProps) {
  return (
    <button onClick={onClose} className={buttonClass()}>
      <svg width={30} height={30} viewBox="0 0 30 30" fill="transparent">
        <path
          fill="transparent"
          strokeWidth={3}
          stroke="#ffffff"
          strokeLinecap="round"
          d="M 8 22 L 22 8"
        ></path>
        <path
          fill="transparent"
          strokeWidth={3}
          stroke="#ffffff"
          strokeLinecap="round"
          d="M 8 8 L 22 22"
        ></path>
      </svg>
    </button>
  );
}

const buttonClass = css({
  cursor: "pointer",
  backgroundColor: "transparent",
  borderRadius: "5px",
  border: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  outline: "none",

  "&:focus": {
    outline: "$white solid",
  },
});
