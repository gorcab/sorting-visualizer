import { useBubbleSortAnimationContext } from "features/bubbleSort/context";
import { useEffect, useState } from "react";
import { css } from "stitches.config";
import { AnimationHandlingToolbar } from "./AnimationHandlingToolbar";
import { RangeSlider } from "./RangeSlider";

type AnimationControllerProps = {
  animationSectionId: string;
};

export type AutoPlayState = "start" | "stop" | "replay";

export function AnimationController({
  animationSectionId,
}: AnimationControllerProps) {
  const { state, dispatch } = useBubbleSortAnimationContext();
  const [autoPlayState, setAutoPlayState] = useState<AutoPlayState>("stop");
  const { currentStep, totalStep } = state;

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

  return (
    <div className={controllerClass()}>
      <RangeSlider
        currentStep={currentStep}
        totalStep={totalStep}
        autoPlayState={autoPlayState}
        onStepChange={stepChangeHandler}
      />
      <AnimationHandlingToolbar
        autoPlayState={autoPlayState}
        onPrevStepClick={goToPrevStep}
        onAutoPlayClick={changeAutoPlayState}
        onNextStepClick={goToNextStep}
        animationSectonId={animationSectionId}
      />
    </div>
  );
}

const controllerClass = css({
  position: "relative",
});
