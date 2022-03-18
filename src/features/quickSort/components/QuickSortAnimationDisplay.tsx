import {
  MAX_NODE_HEIGHT,
  TRANSITION_DURATION,
} from "features/common/lib/constants";
import { motion, MotionConfig, Variants } from "framer-motion";
import { css } from "stitches.config";
import { DefaultDisplayProps } from "../../common/components/AnimationDisplay/DefaultAnimationDisplay";
import {
  containerClass,
  listClass,
} from "../../common/components/AnimationDisplay/styles";
import { IndicatorsDisplay } from "./IndicatorsDisplay";

export type QuickSortAnimationDisplayProps = DefaultDisplayProps & {
  isFocused: boolean;
};

const variants: Variants = {
  notFocused: {
    height: "100%",
  },
  focused: {
    height: MAX_NODE_HEIGHT,
    alignItems: "flex-end",
  },
};

export function QuickSortAnimationDisplay({
  animationSectionId,
  children,
  isFocused,
}: QuickSortAnimationDisplayProps) {
  return (
    <div
      className={containerClass({
        css: {
          padding: "$lg",
        },
      })}
    >
      <MotionConfig transition={{ duration: TRANSITION_DURATION }}>
        <motion.div
          animate={isFocused ? "focused" : "notFocused"}
          variants={variants}
        >
          <div className={flexClass()}>
            <IndicatorsDisplay isFocused={isFocused} />
            <ul id={animationSectionId} className={listClass()}>
              {children}
            </ul>
          </div>
        </motion.div>
      </MotionConfig>
    </div>
  );
}

const flexClass = css({
  display: "flex",
  flexDirection: "column",
});
