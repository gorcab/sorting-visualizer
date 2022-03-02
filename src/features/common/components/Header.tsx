import { useRef } from "react";
import { css } from "stitches.config";
import { useDrawer } from "../contexts/drawer";
import { useClickOutside } from "../hooks/useClickOutside";
import { Navigation } from "./Navigation";
import { DrawerToggleButton } from "./DrawerToggleButton";

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const { isOpen, toggleOpen } = useDrawer();
  const closeDrawer = () => {
    if (isOpen) {
      toggleOpen(0);
    }
  };
  useClickOutside(headerRef, closeDrawer);

  return (
    <header ref={headerRef} className={headerClass()}>
      <DrawerToggleButton />
      <h1 className={titleClass()}>Sorting Visualizer</h1>
      <Navigation />
    </header>
  );
}

const headerClass = css({
  position: "relative",
  height: "$16",
  display: "flex",
  flexDirection: "row",
  borderBottom: "1px solid #1f2937",
  padding: "$sm",
  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  "@lg": {
    padding: "$md",
  },
});

const titleClass = css({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate3D(-50%, -50%, 0)",
  fontSize: "$xl2",
  textAlign: "center",

  "@md": {
    fontSize: "$xl3",
  },

  "@lg": {
    left: "unset",
    top: "unset",
    paddingLeft: "$1",
    fontSize: "$xl3",
    textAlign: "unset",
    position: "unset",
    transform: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
