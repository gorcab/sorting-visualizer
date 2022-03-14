import { styled } from "stitches.config";
import { ITEM_WIDTH } from "../lib/constants";

export const Node = styled("li", {
  backgroundColor: "$green600",
  position: "relative",
  color: "$white",
  width: ITEM_WIDTH,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "center",
  padding: "0 0 $sm",
  borderRadius: 5,
});
