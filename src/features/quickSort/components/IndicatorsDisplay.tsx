import { AnimatePresence, motion } from "framer-motion";
import { css } from "stitches.config";
import { useIndicatorIndices } from "../hooks/useIndicatorIndices";
import { Indicator } from "./Indicator";

type IndicatorsDisplayProps = {
  isFocused: boolean;
};

export function IndicatorsDisplay({ isFocused }: IndicatorsDisplayProps) {
  const { highIndex, lowIndex, pivotIndex } = useIndicatorIndices();

  return (
    <AnimatePresence>
      {isFocused && (
        <motion.div
          className={rowClass()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.3 } }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
        >
          <Indicator
            pivotIndex={pivotIndex}
            highIndex={highIndex}
            lowIndex={lowIndex}
            type="pivot"
          >
            Pivot
          </Indicator>
          <Indicator
            pivotIndex={pivotIndex}
            highIndex={highIndex}
            lowIndex={lowIndex}
            type="low"
          >
            Low
          </Indicator>
          <Indicator
            pivotIndex={pivotIndex}
            highIndex={highIndex}
            lowIndex={lowIndex}
            type="high"
          >
            High
          </Indicator>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const rowClass = css({
  display: "flex",
  position: "relative",
  height: 80,
});
