import { css } from "stitches.config";
import { useAlgorithm } from "../contexts/algorithm";
import { useId } from "../hooks/useId";
import { ListHandlingToolbar } from "./ListHandlingToolbar";

export function AnimationSection() {
  const id = useId("sorting-animation");

  return (
    <>
      <section id={id} className={animationSectionClass()}>
        Animation Section
      </section>
      <ListHandlingToolbar animationSectionId={id} />
    </>
  );
}

const animationSectionClass = css({
  flex: 1,
});
