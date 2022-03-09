import { AnimationController } from "features/common/components/AnimationController";
import { AnimationDisplay } from "features/common/components/AnimationDisplay";
import { useId } from "features/common/hooks/useId";
import { useSelectionSortAnimationContext } from "../hooks/useSelectionSortAnimationContext";
import { SelectionSortNode } from "./SelectionSortNode";

export function SelectionSortAnimationTemplate() {
  const id = useId("animate-list");
  const { state, dispatch } = useSelectionSortAnimationContext();
  const { list, currentStep, totalStep } = state;

  return (
    <>
      <AnimationDisplay animationSectionId={id}>
        {list.map((item) => (
          <SelectionSortNode key={item.id} {...item} />
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
