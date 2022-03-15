import { ITEM_WIDTH, MARGIN_LEFT } from "features/common/lib/constants";
import { motion } from "framer-motion";
import { useMemo, useRef } from "react";
import { css } from "stitches.config";

type IndicatorProps = {
  type: "pivot" | "low" | "high";
  children: React.ReactNode;
  pivotIndex: number;
  lowIndex: number;
  highIndex: number;
};

export function Indicator({
  children,
  type,
  pivotIndex,
  lowIndex,
  highIndex,
}: IndicatorProps) {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const overlapCount = useMemo(() => {
    let result = 0;
    if (pivotIndex === lowIndex || pivotIndex === highIndex) {
      result += 1;
    }
    if (lowIndex === highIndex) {
      result += 1;
    }

    if (result === 1) {
      if (pivotIndex === lowIndex) {
        return type === "pivot" || type === "high" ? 0 : 1;
      }
      if (pivotIndex === highIndex) {
        return type === "pivot" || type === "low" ? 0 : 1;
      }
      if (lowIndex === highIndex) {
        return type === "high" ? 1 : 0;
      }
    } else if (result === 2) {
      if (type === "pivot") {
        return 0;
      } else if (type === "low") {
        return 1;
      } else if (type === "high") {
        return 2;
      }
    }

    return result;
  }, [pivotIndex, lowIndex, highIndex, type]);

  const index =
    type === "pivot" ? pivotIndex : type === "low" ? lowIndex : highIndex;

  return (
    <motion.div
      ref={indicatorRef}
      initial={false}
      animate={{ x: index * (ITEM_WIDTH + MARGIN_LEFT) }}
      onAnimationStart={() => {
        if (!indicatorRef.current) return;
        indicatorRef.current.scrollIntoView({
          behavior: "smooth",
          inline: "nearest",
        });
      }}
      className={indicatorClass({
        css: {
          position: "absolute",
          left: 0,
          width: ITEM_WIDTH,
        },
      })}
    >
      <motion.span initial={false} animate={{ y: -(overlapCount * 30) }}>
        {children}
      </motion.span>
      <motion.svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="transparent"
        aria-hidden="true"
      >
        <path
          fill="transparent"
          strokeWidth="3"
          stroke="#ffffff"
          strokeLinecap="round"
          d="M 13 5 L 13 25"
        />
        <path
          fill="transparent"
          strokeWidth="3"
          stroke="#ffffff"
          strokeLinecap="round"
          d="M 5 15 L 13 25"
        />
        <path
          fill="transparent"
          strokeWidth="3"
          stroke="#ffffff"
          strokeLinecap="round"
          d="M 22 15 L 13 25"
        />
      </motion.svg>
    </motion.div>
  );
}

const indicatorClass = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});
