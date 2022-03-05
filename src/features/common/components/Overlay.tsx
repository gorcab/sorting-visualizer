import { css } from "stitches.config";

type OverlayProps = {
  zIndex?: number;
};

export function Overlay({ zIndex }: OverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={overlayClass({
        css: {
          zIndex: zIndex ?? 5,
        },
      })}
    ></div>
  );
}

const overlayClass = css({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.9)",
});
