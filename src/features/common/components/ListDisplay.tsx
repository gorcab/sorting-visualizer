import { styled } from "stitches.config";

export const ListDisplay = styled("ul", {
  display: "flex",
  justifyContent: "flex-start",
  height: 200,
  alignItems: "flex-end",
  gap: "$md",

  "@md": {
    justifyContent: "center",
  },
});
