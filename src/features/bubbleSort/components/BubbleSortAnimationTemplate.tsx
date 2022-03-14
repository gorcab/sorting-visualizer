import { AnimationAction } from "../../common/reducers/sortingAnimationReducer";
import { useId } from "features/common/hooks/useId";
import { BubbleSortNode } from "./BubbleSortNode";
import { AnimationController } from "../../common/components/AnimationController";
import { BubbleSortItem, BubbleSortState } from "../types";
import { DefaultAnimationDisplay } from "features/common/components/AnimationDisplay/DefaultAnimationDisplay";

type BubbleSortAnimationTemplateProps = {
  state: BubbleSortState;
  dispatch: React.Dispatch<AnimationAction<BubbleSortItem>>;
};

export function BubbleSortAnimationTemplate({
  state,
  dispatch,
}: BubbleSortAnimationTemplateProps) {
  const id = useId("animate-list");
  const { list, currentStep, totalStep } = state;
  return (
    <>
      <DefaultAnimationDisplay animationSectionId={id}>
        {list.map((item) => (
          <BubbleSortNode key={item.id} {...item} />
        ))}
      </DefaultAnimationDisplay>
      <AnimationController
        dispatch={dispatch}
        currentStep={currentStep}
        totalStep={totalStep}
        animationSectionId={id}
      />
    </>
  );
}
