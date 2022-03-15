import { Node } from "features/common/components/Node";
import {
  MARGIN_LEFT,
  MAX_NODE_HEIGHT,
  TRANSLATE_DISTANCE,
} from "features/common/lib/constants";
import { motion, Variants } from "framer-motion";
import { useLayoutEffect, useMemo, useRef } from "react";
import { MergeSortItem } from "../types";

type MergeSortNodeProps = MergeSortItem & {
  displayFocused: boolean;
};

type VariantsCustomProps = {
  indexDiff: number;
  translateDistance: number;
  depth: number;
  yPos: number;
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
  pick: ({ depth }: VariantsCustomProps) => ({
    y: depth * Math.floor(MAX_NODE_HEIGHT / 2),
  }),
  yMoving: ({ yPos }: VariantsCustomProps) => ({
    y: yPos * MAX_NODE_HEIGHT,
  }),
  xMoving: ({ indexDiff }: VariantsCustomProps) => ({
    x: indexDiff * TRANSLATE_DISTANCE,
  }),
};

const AnimatedNode = motion(Node);

export function MergeSortNode({
  value,
  yPos,
  isSelected,
  isFocused,
  displayFocused,
  depth,
  isSorted,
  currentIndex,
  initialIndex,
}: MergeSortNodeProps) {
  const nodeRef = useRef<HTMLLIElement>(null);

  useLayoutEffect(() => {
    if (!nodeRef.current) return;
    if (isSelected) {
      nodeRef.current.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }, [isSelected]);

  const customValue: VariantsCustomProps = {
    indexDiff: currentIndex - initialIndex,
    translateDistance: TRANSLATE_DISTANCE,
    depth,
    yPos,
  };

  const animate = useMemo(() => {
    const animateArray = [];
    if (isSelected) {
      animateArray.push("selected");
    } else {
      animateArray.push("notSelected");
    }

    if (isSorted) {
      animateArray.push("sorted");
    }

    if (yPos > 0) {
      animateArray.push("yMoving");
    }

    if (currentIndex !== initialIndex) {
      animateArray.push("xMoving");
    }

    if (displayFocused) {
      if (!isFocused) {
        animateArray.push("disappeared");
      }
    } else {
      if (depth > 0) {
        animateArray.push("pick");
      }
    }

    return animateArray;
  }, [
    displayFocused,
    depth,
    isSelected,
    isSorted,
    yPos,
    currentIndex,
    initialIndex,
    isFocused,
  ]);

  return (
    <AnimatedNode
      ref={nodeRef}
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
    </AnimatedNode>
  );
}
