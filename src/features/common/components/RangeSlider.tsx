import { useEffect, useState } from "react";
import { Range } from "react-range";
import { styled } from "stitches.config";
import { AutoPlayState } from "./AnimationController";

type RangeSliderProps = {
  autoPlayState: AutoPlayState;
  currentStep: number;
  totalStep: number;
  onStepChange: (changedStep: number) => void;
};

const AUTOPLAY_DELAY = 500;

export function RangeSlider({
  autoPlayState,
  currentStep,
  totalStep,
  onStepChange,
}: RangeSliderProps) {
  const [curSteps, setCurSteps] = useState([currentStep]);

  useEffect(() => {
    setCurSteps([currentStep]);
  }, [currentStep]);

  useEffect(() => {
    if (autoPlayState === "start" && curSteps[0] < totalStep) {
      const timerId = setTimeout(() => {
        onStepChange(curSteps[0] + 1);
      }, AUTOPLAY_DELAY);

      return () => clearTimeout(timerId);
    }
  }, [curSteps, onStepChange, autoPlayState, totalStep]);

  const stepChangeHandler = (values: Array<number>) => {
    setCurSteps(values);
  };

  const finalChangeHandler = (values: Array<number>) => {
    onStepChange(values[0]);
  };

  return (
    <Range
      step={1}
      min={0}
      max={totalStep}
      values={curSteps}
      onChange={stepChangeHandler}
      onFinalChange={finalChangeHandler}
      renderTrack={({ props, children }) => {
        return <Track {...props}>{children}</Track>;
      }}
      renderThumb={({ props, isDragged }) => (
        <Thumb
          {...props}
          css={{
            backgroundColor: isDragged ? "$green400" : "$green500",
          }}
        />
      )}
    />
  );
}

const Track = styled("div", {
  width: "100%",
  height: "$2",
  backgroundColor: "$gray400",
  position: "absolute",
  zIndex: 10,
});

const Thumb = styled("div", {
  width: "$6",
  height: "$6",
  backgroundColor: "$green500",
  borderRadius: "50%",

  "&:focus": {
    outlineOffset: "1px",
    outline: "$green500 solid",
  },
});
