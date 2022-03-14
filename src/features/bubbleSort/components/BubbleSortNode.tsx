import { Node } from "features/common/components/Node";
import { MARGIN_LEFT, TRANSLATE_DISTANCE } from "features/common/lib/constants";
import { motion } from "framer-motion";
import { useLayoutEffect, useMemo, useRef } from "react";
import { BubbleSortItem } from "../types";

type BubbleSortNodeProps = BubbleSortItem;

type VariantsCustomProps = {
  indexDiff: number;
  translateDistance: number;
};

const variants = {
  isSwapping: ({ indexDiff, translateDistance }: VariantsCustomProps) => ({
    x: indexDiff * translateDistance,
  }),
  notSelected: {
    opacity: 0.4,
  },
  selected: {
    opacity: 1,
  },
  sorted: {
    opacity: 1,
    backgroundColor: "rgba(8, 145, 178, 1)",
  },
};

const AnimatedNode = motion(Node);

export function BubbleSortNode({
  value,
  currentIndex,
  initialIndex,
  isSelected,
  isSorted,
}: BubbleSortNodeProps) {
  const nodeRef = useRef<HTMLLIElement>(null);

  useLayoutEffect(() => {
    if (!nodeRef.current) return;
    if (isSelected) {
      nodeRef.current.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }, [isSelected]);

  const animate = useMemo(() => {
    const animateArray = [];
    if (!isSelected) {
      animateArray.push("notSelected");
    }
    if (isSelected) {
      animateArray.push("selected");
    }
    if (isSorted) {
      animateArray.push("sorted");
    }

    if (currentIndex !== initialIndex) {
      animateArray.push("isSwapping");
    }

    return animateArray;
  }, [isSelected, isSorted, currentIndex, initialIndex]);

  const customValue = {
    indexDiff: currentIndex - initialIndex,
    translateDistance: TRANSLATE_DISTANCE,
  };

  return (
    <AnimatedNode
      custom={customValue}
      ref={nodeRef}
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
