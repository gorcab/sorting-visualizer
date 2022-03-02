import { useState } from "react";
import { css } from "stitches.config";
import { useId } from "../../common/hooks/useId";
import { useList } from "../../common/hooks/useList";
import { SortableList } from "./SortableList";
import { MAX_ITEM_NUM } from "../../common/lib/constants";
import { SortingOrder } from "../../common/lib/types";
import { ListHandlingToolbar } from "./ListHandlingToolbar";

type AnimationSettingTemplateProps = {
  onInit: (list: Array<number>, sortingOrder: SortingOrder) => void;
};

export function AnimationSettingTemplate({
  onInit,
}: AnimationSettingTemplateProps) {
  const { list, addListItem, deleteListItem, reorderList } = useList();
  const [openModal, setOpenModal] = useState(false);

  const showSelectSortingOrderModal = () => setOpenModal(true);
  const id = useId("setting-list");

  return (
    <div className={animationContainerClass()}>
      <div className={listContainerClass()}>
        <SortableList list={list} reorderList={reorderList} ulElementId={id} />
      </div>
      <ListHandlingToolbar
        onAddClick={addListItem}
        onDeleteClick={deleteListItem}
        onStartClick={showSelectSortingOrderModal}
        isDisabledAddButton={list.length === MAX_ITEM_NUM}
        isDisabledDeleteButton={list.length === 0}
        isDisabledStartButton={list.length < 2}
        animationSectionId={id}
      />
    </div>
  );
}

const animationContainerClass = css({
  flex: 1,
  display: "flex",
  flexDirection: "column",
});

const listContainerClass = css({
  flex: 1,
  padding: "$md",
  display: "flex",
  alignItems: "center",
  overflow: "auto",

  "@md": {
    justifyContent: "center",
  },
});
