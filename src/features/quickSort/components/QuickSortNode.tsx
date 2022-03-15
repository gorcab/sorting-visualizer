import { Node } from "features/common/components/Node";
import {
  MARGIN_LEFT,
  MAX_NODE_HEIGHT,
  TRANSLATE_DISTANCE,
} from "features/common/lib/constants";
import { motion, Variants } from "framer-motion";
import { useMemo } from "react";
import { css } from "stitches.config";
import { QuickSortItem } from "../types";

type QuickSortNodeProps = QuickSortItem & {
  displayFocused: boolean;
};

type VariantsCustomProps = {
  indexDiff: number;
  translateDistance: number;
  depth: number;
};

const variants: Variants = {
  notSelected: {
    opacity: 0.4,
  },
  selected: {
    opacity: 1,
  },
  disappeared: {
    opacity: 0,
  },
  sorted: {
    backgroundColor: "rgba(8, 145, 178, 1)",
  },
  focused: {
    y: 0,
  },
  pick: ({ depth }: VariantsCustomProps) => ({
    y: depth * Math.floor(MAX_NODE_HEIGHT / 2),
  }),
  isSwapping: ({ indexDiff, translateDistance }: VariantsCustomProps) => ({
    x: indexDiff * translateDistance,
  }),
};

const AnimatedNode = motion(Node);

export function QuickSortNode({
  value,
  currentIndex,
  initialIndex,
  depth,
  isSelected,
  displayFocused,
  isSorted,
  isFocused,
}: QuickSortNodeProps) {
  const animate = useMemo(() => {
    const animateArray = [];
    if (displayFocused) {
      if (!isFocused) {
        animateArray.push("disappeared");
      } else {
        animateArray.push("focused");
        if (isSelected) {
          animateArray.push("selected");
        } else {
          animateArray.push("notSelected");
        }
      }
    } else {
      if (!isSelected) {
        animateArray.push("notSelected");
      }
      if (isSelected) {
        animateArray.push("selected");
      }
    }

    if (!displayFocused && depth > 0) {
      animateArray.push("pick");
    }
    if (isSorted) {
      animateArray.push("sorted");
    }
    if (currentIndex !== initialIndex) {
      animateArray.push("isSwapping");
    }

    return animateArray;
  }, [
    isSelected,
    depth,
    isFocused,
    isSorted,
    displayFocused,
    currentIndex,
    initialIndex,
  ]);

  const customValue: VariantsCustomProps = {
    indexDiff: currentIndex - initialIndex,
    translateDistance: TRANSLATE_DISTANCE,
    depth,
  };

  return (
    <AnimatedNode
      layout
      custom={customValue}
      animate={animate}
      variants={variants}
      css={{
        nodeHeight: value,
        [`& + ${Node}`]: {
          marginLeft: MARGIN_LEFT,
        },
      }}
    >
      {value}
      {isFocused && <span className={indexClass()}>[{currentIndex}]</span>}
    </AnimatedNode>
  );
}

const indexClass = css({
  color: "$white",
  position: "absolute",
  bottom: "-30px",
});
