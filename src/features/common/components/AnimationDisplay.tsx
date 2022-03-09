import { MotionConfig } from "framer-motion";
import { css } from "stitches.config";

type AnimationDisplayProps = {
  animationSectionId: string;
  children: React.ReactNode;
};

export function AnimationDisplay({
  animationSectionId,
  children,
}: AnimationDisplayProps) {
  return (
    <div className={containerClass()}>
      <MotionConfig transition={{ duration: 0.3 }}>
        <ul id={animationSectionId} className={listClass()}>
          {children}
        </ul>
      </MotionConfig>
    </div>
  );
}

const containerClass = css({
  display: "flex",
  padding: "$md",
  flex: 1,
  alignItems: "center",
  overflow: "auto",

  "@md": {
    justifyContent: "center",
  },
});

const listClass = css({
  listDisplay: true,
});
