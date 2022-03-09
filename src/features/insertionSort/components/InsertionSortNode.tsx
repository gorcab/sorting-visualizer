import { Node } from "features/common/components/Node";
import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { InsertionSortItem } from "../reducer";

type InsertionSortNodeProps = InsertionSortItem;

const marginLeft = 24;

type VariantsCustomProps = {
  indexDiff: number;
  translateDistance: number;
  depth: number;
};

const variants = {
  move: ({ indexDiff, translateDistance }: VariantsCustomProps) => ({
    x: indexDiff * translateDistance,
  }),
  pick: ({ depth }: VariantsCustomProps) => ({
    y: depth * 200,
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

export function InsertionSortNode({
  isSorted,
  currentIndex,
  depth,
  initialIndex,
  isSelected,
  value,
}: InsertionSortNodeProps) {
  const [translateDistance, setTranslateDistance] = useState(0);
  const nodeRef = useRef<HTMLDivElement>(null);

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
      animateArray.push("move");
    }
    if (depth > 0) {
      animateArray.push("pick");
    }
    return animateArray;
  }, [isSelected, isSorted, currentIndex, initialIndex, depth]);

  const customValue: VariantsCustomProps = {
    indexDiff: currentIndex - initialIndex,
    translateDistance,
    depth,
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
