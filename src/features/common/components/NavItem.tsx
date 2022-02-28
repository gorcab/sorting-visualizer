import React from "react";
import { css } from "stitches.config";
import { Algorithm, useAlgorithm } from "../contexts/algorithm";
import { useDrawer } from "../contexts/drawer";

type NavItemProps = {
  algorithm: Algorithm;
  children: React.ReactNode;
};

export function NavItem({ algorithm, children }: NavItemProps) {
  const { toggleOpen } = useDrawer();
  const { selectAlgorithm, algorithm: selectedAlgorithm } = useAlgorithm();
  const isSelected = selectedAlgorithm === algorithm;
  const changeAlgorithm = () => {
    selectAlgorithm(algorithm);
    toggleOpen(0);
  };

  return (
    <li>
      <button
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
  outlineColor: "$green500",
  backgroundColor: "transparent",
  color: "$white",
  cursor: "pointer",
  fontSize: "$lg",
  width: "100%",
  textAlign: "left",

  "&:hover": {
    color: "$green500",
  },

  "& + li": {
    paddingLeft: "$base",
  },

  "@lg": {
    width: "unset",
  },
});
