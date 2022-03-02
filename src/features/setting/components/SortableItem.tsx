import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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
