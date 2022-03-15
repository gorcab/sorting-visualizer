import { DefaultDisplayProps } from "features/common/components/AnimationDisplay/DefaultAnimationDisplay";
import {
  containerClass,
  listClass,
} from "features/common/components/AnimationDisplay/styles";
import {
  MAX_NODE_HEIGHT,
  TRANSITION_DURATION,
} from "features/common/lib/constants";
import { motion, MotionConfig, Variants } from "framer-motion";

type MergeSortAnimationDisplayProps = DefaultDisplayProps & {
  isFocused: boolean;
};

const variants: Variants = {
  notFocused: {
    height: "100%",
  },
  focused: {
    height: MAX_NODE_HEIGHT * 2,
  },
};

export function MergeSortAnimationDisplay({
  animationSectionId,
  isFocused,
  children,
}: MergeSortAnimationDisplayProps) {
  return (
    <div className={containerClass()}>
      <MotionConfig transition={{ duration: TRANSITION_DURATION }}>
        <motion.div
          animate={isFocused ? "focused" : "notFocused"}
          variants={variants}
        >
          <ul id={animationSectionId} className={listClass()}>
            {children}
          </ul>
        </motion.div>
      </MotionConfig>
    </div>
  );
}
