import { useRef } from "react";
import { css } from "stitches.config";
import { Algorithm } from "../contexts/algorithm";
import { useDrawer } from "../contexts/drawer/hooks";
import { NavItem } from "./NavItem";
import { Overlay } from "./Overlay";
import { Portal } from "./Portal";

const algorithms: Array<Algorithm> = [
  "bubble",
  "insertion",
  "selection",
  "merge",
  "quick",
];

export function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const { isOpen } = useDrawer();
  const width = 200;

  return (
    <>
      <nav
        ref={navRef}
        className={navClass({ css: { navOpen: isOpen, navWidth: width } })}
      >
        <ul className={ulClass()}>
          {algorithms.map((algorithm) => (
            <NavItem key={algorithm} algorithm={algorithm}>
              {algorithm}
            </NavItem>
          ))}
        </ul>
      </nav>

      {isOpen && (
        <Portal displayName="navOverlay">
          <Overlay />
        </Portal>
      )}
    </>
  );
}

const navClass = css({
  position: "absolute",
  padding: "60px 0",
  top: "0%",
  left: "0%",
  height: "$h_screen",
  transition: "transform 0.1s",
  zIndex: 100,
  backgroundColor: "$bg",

  "@lg": {
    position: "unset",
    marginLeft: "$md",
    padding: "unset",
    display: "flex",
    alignItems: "center",
    left: "auto",
    height: "100%",
  },
});

const ulClass = css({
  "@lg": {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
});
