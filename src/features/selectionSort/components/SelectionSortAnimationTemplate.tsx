import { AnimationController } from "features/common/components/AnimationController";
import { DefaultAnimationDisplay } from "features/common/components/AnimationDisplay/DefaultAnimationDisplay";
import { useId } from "features/common/hooks/useId";
import { AnimationAction } from "features/common/reducers/sortingAnimationReducer";
import { SelectionSortNode } from "../components/SelectionSortNode";
import { SelectionSortItem, SelectionSortState } from "../types";

type SelectionSortAnimationTemplateProps = {
  state: SelectionSortState;
  dispatch: React.Dispatch<AnimationAction<SelectionSortItem>>;
};

export function SelectionSortAnimationTemplate({
  state,
  dispatch,
}: SelectionSortAnimationTemplateProps) {
  const id = useId("animate-list");
  const { list, currentStep, totalStep } = state;

  return (
    <>
      <DefaultAnimationDisplay animationSectionId={id}>
        {list.map((item) => (
          <SelectionSortNode key={item.id} {...item} />
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
