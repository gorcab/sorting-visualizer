import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { marginLeftOfNodes } from "features/common/lib/constants";
import { CSSProperties } from "react";
import { Node } from "../../common/components/Node";

type SortableItemProps = {
  id: string;
  value: number;
};

export function SortableItem({ id, value }: SortableItemProps) {
  const {
    transform,
    transition,
    setNodeRef,
    attributes,
    listeners,
    isDragging,
  } = useSortable({ id });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Node
      css={{
        nodeHeight: value,
        opacity: isDragging ? 0.4 : 1,
        cursor: isDragging ? "grabbing" : "grab",
        [`& + ${Node}`]: {
          marginLeft: marginLeftOfNodes,
        },
      }}
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      {value}
    </Node>
  );
}
