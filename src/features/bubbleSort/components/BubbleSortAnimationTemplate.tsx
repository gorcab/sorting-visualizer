import { AnimationController } from "features/common/components/AnimationController";
import { ListContainer } from "features/common/components/ListContainer";
import { ListDisplay } from "features/common/components/ListDisplay";
import { useId } from "features/common/hooks/useId";
import { MotionConfig } from "framer-motion";
import { useBubbleSortAnimationContext } from "../context";
import { BubbleSortNode } from "./BubbleSortNode";

export function BubbleSortAnimationTemplate() {
  const id = useId("animate-list");
  const { state } = useBubbleSortAnimationContext();
  const { list } = state;
  return (
    <>
      <ListContainer>
        <ListDisplay id={id} css={{ gap: "unset" }}>
          <MotionConfig transition={{ duration: 0.3 }}>
            {list.map((item) => (
              <BubbleSortNode key={item.id} {...item} />
            ))}
          </MotionConfig>
        </ListDisplay>
      </ListContainer>
      <AnimationController animationSectionId={id} />
    </>
  );
}
