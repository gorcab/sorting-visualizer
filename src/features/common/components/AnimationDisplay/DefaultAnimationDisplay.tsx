import { TRANSITION_DURATION } from "features/common/lib/constants";
import { MotionConfig } from "framer-motion";
import { containerClass, listClass } from "./styles";

export type DefaultDisplayProps = {
  animationSectionId: string;
  children: React.ReactNode;
};

export function DefaultAnimationDisplay({
  children,
  animationSectionId,
}: DefaultDisplayProps) {
  return (
    <div className={containerClass()}>
      <MotionConfig transition={{ duration: TRANSITION_DURATION }}>
        <ul id={animationSectionId} className={listClass()}>
          {children}
        </ul>
      </MotionConfig>
    </div>
  );
}
