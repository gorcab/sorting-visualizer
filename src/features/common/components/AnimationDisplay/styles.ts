import { css } from "stitches.config";

export const containerClass = css({
  position: "relative",
  display: "flex",
  padding: "$md",
  flex: 1,
  alignItems: "center",
  overflow: "auto",

  "@md": {
    justifyContent: "center",
  },
});

export const listClass = css({
  listDisplay: true,
});
