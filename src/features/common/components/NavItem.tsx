import React, { useRef } from "react";
import { css } from "stitches.config";
import { Algorithm, useAlgorithm } from "../contexts/algorithm";
import { useDrawer } from "../contexts/drawer";

type NavItemProps = {
  algorithm: Algorithm;
  children: React.ReactNode;
};

export function NavItem({ algorithm, children }: NavItemProps) {
  const { toggleOpen } = useDrawer();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { selectAlgorithm, algorithm: selectedAlgorithm } = useAlgorithm();
  const isSelected = selectedAlgorithm === algorithm;
  const changeAlgorithm = () => {
    selectAlgorithm(algorithm);
    toggleOpen(0);
    requestAnimationFrame(() => {
      buttonRef.current?.blur();
    });
  };

  return (
    <li>
      <button
        ref={buttonRef}
        onClick={changeAlgorithm}
        className={buttonClass({ css: { selectAlgorithm: isSelected } })}
      >
        {children}
      </button>
    </li>
  );
}

const buttonClass = css({
  padding: "$base",
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  color: "$white",
  cursor: "pointer",
  fontSize: "$lg",
  width: "100%",
  textAlign: "left",

  "&:focus": {
    color: "$green500",
  },

  "&:hover": {
    color: "$green500",
  },

  "@lg": {
    width: "unset",
  },
});
