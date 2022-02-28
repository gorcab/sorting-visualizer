import { css } from "stitches.config";

export function Overlay() {
  return <div aria-hidden="true" className={overlayClass()}></div>;
}

const overlayClass = css({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.9)",
});
