import React from "react";
import { BubbleAnimation } from "features/bubbleSort/components/BubbleAnimation";
import { InsertionAnimation } from "features/insertionSort/components/InsertionAnimation";
import { QuickAnimation } from "features/quickSort/components/QuickAnimation";
import { SelectionAnimation } from "features/selectionSort/components/SelectionAnimation";
import { css } from "stitches.config";
import { useAlgorithm } from "../contexts/algorithm";
import { SortingAlgorithm } from "../lib/types";

const animationComponentMap: Record<SortingAlgorithm, React.ElementType> = {
  bubble: BubbleAnimation,
  insertion: InsertionAnimation,
  merge: () => <div>Merge</div>,
  quick: QuickAnimation,
  selection: SelectionAnimation,
};

export function AnimationSection() {
  const { algorithm } = useAlgorithm();
  let AnimationComponent: React.ElementType;
  AnimationComponent = animationComponentMap[algorithm];

  return (
    <section className={animationSectionClass()}>
      <AnimationComponent />
    </section>
  );
}

const animationSectionClass = css({
  flex: 1,
  display: "flex",
  flexDirection: "column",
});
