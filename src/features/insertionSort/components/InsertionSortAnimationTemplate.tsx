import { AnimationController } from "features/common/components/AnimationController";
import { AnimationDisplay } from "features/common/components/AnimationDisplay";
import { useId } from "features/common/hooks/useId";
import { useInsertionSortAnimationContext } from "../hooks/useInsertionSortAnimationContext";
import { InsertionSortNode } from "./InsertionSortNode";

export function InsertionSortAnimationTemplate() {
  const id = useId("animate-list");
  const { state, dispatch } = useInsertionSortAnimationContext();
  const { list, totalStep, currentStep } = state;
  return (
    <>
      <AnimationDisplay animationSectionId={id}>
        {list.map((item) => (
          <InsertionSortNode key={item.id} {...item} />
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
