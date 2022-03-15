import { AnimationController } from "features/common/components/AnimationController";
import { useId } from "features/common/hooks/useId";
import { AnimationAction } from "features/common/reducers/sortingAnimationReducer";
import { MergeSortItem, MergeSortState } from "../types";
import { MergeSortAnimationDisplay } from "./MergeSortAnimationDisplay";
import { MergeSortNode } from "./MergeSortNode";

type MergeSortAnimationTemplateProps = {
  state: MergeSortState;
  dispatch: React.Dispatch<AnimationAction<MergeSortItem>>;
};

export function MergeSortAnimationTemplate({
  state,
  dispatch,
}: MergeSortAnimationTemplateProps) {
  const id = useId("animate-list");
  const { currentStep, totalStep, isFocused, list } = state;

  return (
    <>
      <MergeSortAnimationDisplay animationSectionId={id} isFocused={isFocused}>
        {list.map((item) => (
          <MergeSortNode key={item.id} displayFocused={isFocused} {...item} />
        ))}
      </MergeSortAnimationDisplay>
      <AnimationController
        dispatch={dispatch}
        animationSectionId={id}
        currentStep={currentStep}
        totalStep={totalStep}
      />
    </>
  );
}
