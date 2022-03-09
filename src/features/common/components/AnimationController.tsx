import { useEffect, useState } from "react";
import { css } from "stitches.config";
import { BaseItem } from "../lib/types";
import {
  AdditionalAction,
  DefaultAction,
} from "../reducers/sortingAnimationReducer";
import { AnimationHandlingToolbar } from "./AnimationHandlingToolbar";
import { RangeSlider } from "./RangeSlider";

type AnimationControllerProps<Item extends BaseItem> = {
  animationSectionId: string;
  currentStep: number;
  totalStep: number;
  dispatch: React.Dispatch<DefaultAction | AdditionalAction<Item>>;
};

export type AutoPlayState = "start" | "stop" | "replay";

export function AnimationController<Item extends BaseItem>({
  animationSectionId,
  currentStep,
  totalStep,
  dispatch,
}: AnimationControllerProps<Item>) {
  const [autoPlayState, setAutoPlayState] = useState<AutoPlayState>("stop");

  useEffect(() => {
    if (totalStep === currentStep) {
      setAutoPlayState("replay");
    } else if (totalStep !== currentStep && autoPlayState !== "start") {
      setAutoPlayState("stop");
    }
  }, [autoPlayState, totalStep, currentStep]);

  const stepChangeHandler = (nextStep: number) => {
    dispatch({ type: "GO_TO_SPECIFIC_STEP", step: nextStep });
  };
  const goToPrevStep = () => dispatch({ type: "GO_TO_PREV_STEP" });
  const goToNextStep = () => dispatch({ type: "GO_TO_NEXT_STEP" });
  const changeAutoPlayState = () => {
    if (autoPlayState === "stop") {
      setAutoPlayState("start");
    } else if (autoPlayState === "start") {
      setAutoPlayState("stop");
    } else {
      dispatch({ type: "GO_TO_SPECIFIC_STEP", step: 0 });
      setAutoPlayState("start");
    }
  };
  const endAnimation = () => dispatch({ type: "END_ANIMATION" });

  return (
    <div className={controllerClass()}>
      <RangeSlider
        currentStep={currentStep}
        totalStep={totalStep}
        autoPlayState={autoPlayState}
        onStepChange={stepChangeHandler}
      />
      <AnimationHandlingToolbar
        totalStep={totalStep}
        currentStep={currentStep}
        autoPlayState={autoPlayState}
        onPrevStepClick={goToPrevStep}
        onAutoPlayClick={changeAutoPlayState}
        onNextStepClick={goToNextStep}
        onResetClick={endAnimation}
        animationSectonId={animationSectionId}
      />
    </div>
  );
}

const controllerClass = css({
  position: "relative",
});
