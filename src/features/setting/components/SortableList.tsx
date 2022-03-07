import {
  DndContext,
  closestCenter,
  useSensors,
  useSensor,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  DragStartEvent,
  defaultDropAnimation,
  DragEndEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { OverlayItem } from "./OverlayItem";
import { Portal } from "../../common/components/Portal";
import { SortableItem } from "./SortableItem";
import { ListDisplay } from "features/common/components/ListDisplay";

type Item = {
  id: string;
  value: number;
};

type SortableListProps = {
  list: Array<Item>;
  reorderList: (callback: (oldList: Array<Item>) => Array<Item>) => void;
  ulElementId: string;
};

export function SortableList({
  list,
  reorderList,
  ulElementId,
}: SortableListProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(TouchSensor),
    useSensor(MouseSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const activeIndex = list.findIndex((item) => item.id === activeId);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);
  };
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      reorderList((oldList) => {
        const oldIndex = oldList.findIndex((item) => item.id === active.id);
        const newIndex = oldList.findIndex((item) => item.id === over.id);
        return arrayMove(oldList, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={list} strategy={horizontalListSortingStrategy}>
        <ListDisplay id={ulElementId}>
          {list.map(({ id, value }) => (
            <SortableItem key={id} id={id} value={value} />
          ))}
        </ListDisplay>
      </SortableContext>
      <Portal displayName="dnd-overlay">
        <DragOverlay
          dropAnimation={defaultDropAnimation}
          style={{
            cursor: activeId ? "grabbing" : "unset",
          }}
        >
          {activeId ? (
            <OverlayItem value={list[activeIndex].value} id={activeId} />
          ) : null}
        </DragOverlay>
      </Portal>
    </DndContext>
  );
}
