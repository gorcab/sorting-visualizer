import { forwardRef } from "react";
import { Node } from "../../common/components/Node";

type OverlayItemProps = {
  id: string;
  value: number;
};

export const OverlayItem = forwardRef(
  ({ id, value }: OverlayItemProps, ref: any) => {
    return (
      <Node
        as="div"
        css={{
          nodeHeight: value,
        }}
        ref={ref}
      >
        {value}
      </Node>
    );
  }
);
