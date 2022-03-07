import { styled } from "stitches.config";

export const ListContainer = styled("div", {
  flex: 1,
  padding: "$md",
  display: "flex",
  alignItems: "center",
  overflow: "auto",

  "@md": {
    justifyContent: "center",
  },
});
