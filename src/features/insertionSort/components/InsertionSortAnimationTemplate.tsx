import { AnimationController } from "features/common/components/AnimationController";
import { DefaultAnimationDisplay } from "features/common/components/AnimationDisplay/DefaultAnimationDisplay";
import { useId } from "features/common/hooks/useId";
import { AnimationAction } from "features/common/reducers/sortingAnimationReducer";
import { InsertionSortItem, InsertionSortState } from "../types";
import { InsertionSortNode } from "./InsertionSortNode";

type InsertionSortAnimationTemplateProps = {
  state: InsertionSortState;
  dispatch: React.Dispatch<AnimationAction<InsertionSortItem>>;
};

export function InsertionSortAnimationTemplate({
  state,
  dispatch,
}: InsertionSortAnimationTemplateProps) {
  const id = useId("animate-list");
  const { list, totalStep, currentStep } = state;

  return (
    <>
      <DefaultAnimationDisplay animationSectionId={id}>
        {list.map((item) => (
          <InsertionSortNode key={item.id} {...item} />
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
