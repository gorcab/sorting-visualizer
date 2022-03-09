import { AnimationController } from "features/common/components/AnimationController";
import { AnimationDisplay } from "features/common/components/AnimationDisplay";
import { useId } from "features/common/hooks/useId";
import { useBubbleSortAnimationContext } from "../context";
import { BubbleSortNode } from "./BubbleSortNode";

export function BubbleSortAnimationTemplate() {
  const id = useId("animate-list");
  const { state, dispatch } = useBubbleSortAnimationContext();
  const { list, currentStep, totalStep } = state;

  return (
    <>
      <AnimationDisplay animationSectionId={id}>
        {list.map((item) => (
          <BubbleSortNode key={item.id} {...item} />
        ))}
      </AnimationDisplay>
      <AnimationController
        dispatch={dispatch}
        currentStep={currentStep}
        totalStep={totalStep}
        animationSectionId={id}
      />
    </>
  );
}
