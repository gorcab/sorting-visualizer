import { Node } from "features/common/components/Node";
import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { BubbleSortItem } from "../reducer";

type BubbleSortNodeProps = BubbleSortItem;

const marginLeft = 24;

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
  const [translateDistance, setTranslateDistance] = useState(0);
  const nodeRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!nodeRef.current) return;
    setTranslateDistance(nodeRef.current.offsetWidth + marginLeft);
  }, []);

  useLayoutEffect(() => {
    if (!nodeRef.current) return;
    if (isSelected) {
      nodeRef.current.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }, [isSelected]);

  const animate = useMemo(() => {
    let animateArray = [];
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
    translateDistance,
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
          marginLeft,
        },
      }}
    >
      {value}
    </AnimatedNode>
  );
}
