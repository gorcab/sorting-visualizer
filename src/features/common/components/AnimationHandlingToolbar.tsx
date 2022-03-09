import { ReactComponent as PreviousStepIcon } from "../../../previousStep.svg";
import { ReactComponent as NextStepIcon } from "../../../nextStep.svg";
import { ReactComponent as PlayIcon } from "../../../play.svg";
import { ReactComponent as PauseIcon } from "../../../pause.svg";
import { ReactComponent as ReplayIcon } from "../../../replay.svg";
import { Toolbar } from "./Toolbar";
import { css } from "stitches.config";
import { AutoPlayState } from "./AnimationController";

type AnimationHandlingToolbarProps = {
  animationSectonId: string;
  currentStep: number;
  totalStep: number;
  autoPlayState: AutoPlayState;
  onNextStepClick: () => void;
  onPrevStepClick: () => void;
  onAutoPlayClick: () => void;
  onResetClick: () => void;
};

export function AnimationHandlingToolbar({
  animationSectonId,
  currentStep,
  totalStep,
  autoPlayState,
  onPrevStepClick,
  onAutoPlayClick,
  onNextStepClick,
  onResetClick,
}: AnimationHandlingToolbarProps) {
  return (
    <Toolbar label="Operate animation" ariaControls={animationSectonId}>
      <div className={operationBtnContainerClass()}>
        <Toolbar.IconButton
          disabled={currentStep === 0}
          onClick={onPrevStepClick}
          SvgIcon={PreviousStepIcon}
        >
          Go to Previous Step
        </Toolbar.IconButton>
        <Toolbar.IconButton
          onClick={onAutoPlayClick}
          SvgIcon={
            autoPlayState === "stop"
              ? PlayIcon
              : autoPlayState === "start"
              ? PauseIcon
              : ReplayIcon
          }
        >
          {autoPlayState === "stop"
            ? "Start autoplay"
            : autoPlayState === "start"
            ? "Stop autoplay"
            : "Replay"}
        </Toolbar.IconButton>
        <Toolbar.IconButton
          disabled={currentStep === totalStep}
          onClick={onNextStepClick}
          SvgIcon={NextStepIcon}
        >
          Go to Next Step
        </Toolbar.IconButton>
      </div>
      <Toolbar.Button className={resetBtnClass()} onClick={onResetClick}>
        Reset
      </Toolbar.Button>
    </Toolbar>
  );
}

const operationBtnContainerClass = css({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate3D(-50%, -50%, 0)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "$base",
});

const resetBtnClass = css({
  position: "absolute",
  border: "none",
  color: "$white",
  padding: "$sm",
  fontSize: "$lg",
  cursor: "pointer",
  outline: "none",
  backgroundColor: "transparent",
  top: "50%",
  right: "1rem",
  transform: "translate3D(0, -50%, 0)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  "&:focus, &:active": {
    outline: "$green500 solid",
  },
});
