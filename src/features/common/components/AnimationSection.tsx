import { BubbleAnimation } from "features/bubbleSort/components/BubbleAnimation";
import React from "react";
import { css } from "stitches.config";
import { useAlgorithm } from "../contexts/algorithm";
import { SortingAlgorithm } from "../lib/types";

const animationComponentMap: Record<SortingAlgorithm, React.ElementType> = {
  bubble: BubbleAnimation,
  insertion: () => <div>Insertion</div>,
  merge: () => <div>Merge</div>,
  quick: () => <div>Quick</div>,
  selection: () => <div>Selection</div>,
};

export function AnimationSection() {
  const { algorithm } = useAlgorithm();
  let AnimationComponent: React.ElementType;
  AnimationComponent = animationComponentMap[algorithm];

  return (
    <>
      <section className={animationSectionClass()}>
        <AnimationComponent />
      </section>
    </>
  );
}

const animationSectionClass = css({
  flex: 1,
  display: "flex",
  flexDirection: "column",
});
