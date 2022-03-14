import { AnimationController } from "features/common/components/AnimationController";
import { useId } from "features/common/hooks/useId";
import { AnimationAction } from "features/common/reducers/sortingAnimationReducer";
import { QuickSortItem, QuickSortState } from "../types";
import { QuickSortAnimationDisplay } from "./QuickSortAnimationDisplay";
import { QuickSortNode } from "./QuickSortNode";

type QuickSortAnimationTemplateProps = {
  state: QuickSortState;
  dispatch: React.Dispatch<AnimationAction<QuickSortItem>>;
};

export function QuickSortAnimationTemplate({
  state,
  dispatch,
}: QuickSortAnimationTemplateProps) {
  const id = useId("animate-list");
  const { list, currentStep, totalStep, isFocused } = state;
  return (
    <>
      <QuickSortAnimationDisplay animationSectionId={id} isFocused={isFocused}>
        {list.map((item) => (
          <QuickSortNode displayFocused={isFocused} key={item.id} {...item} />
        ))}
      </QuickSortAnimationDisplay>
      <AnimationController
        dispatch={dispatch}
        currentStep={currentStep}
        totalStep={totalStep}
        animationSectionId={id}
      />
    </>
  );
}
