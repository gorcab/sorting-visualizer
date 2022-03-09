import { MouseEventHandler, useState } from "react";
import { useId } from "../../common/hooks/useId";
import { useList } from "../../common/hooks/useList";
import { SortableList } from "./SortableList";
import { MAX_ITEM_NUM } from "../../common/lib/constants";
import { SortingOrder } from "../../common/lib/types";
import { ListHandlingToolbar } from "./ListHandlingToolbar";
import { SelectSortingOrderModal } from "./SelectSortingOrderModal";
import { css } from "stitches.config";

type AnimationSettingTemplateProps = {
  onInit: (list: Array<number>, sortingOrder: SortingOrder) => void;
};

export function AnimationSettingTemplate({
  onInit,
}: AnimationSettingTemplateProps) {
  const id = useId("setting-list");
  const { list, addListItem, deleteListItem, reorderList } = useList();
  const [sortingOrder, setSortingOrder] = useState<SortingOrder>("ASC");
  const [openModal, setOpenModal] = useState(false);

  const showSelectSortingOrderModal: MouseEventHandler = (event) => {
    event.stopPropagation();
    setOpenModal(true);
  };

  const changeSortingOrder = (sortingOrder: SortingOrder) =>
    setSortingOrder(sortingOrder);

  const closeModal = () => {
    if (openModal) {
      setOpenModal(false);
    }
  };

  const startAnimation = () => {
    const numberList = list.map((item) => item.value);
    onInit(numberList, sortingOrder);
  };

  return (
    <>
      <div className={containerClass()}>
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
      {openModal && (
        <SelectSortingOrderModal
          sortingOrder={sortingOrder}
          onChange={changeSortingOrder}
          onClose={closeModal}
          onStart={startAnimation}
        />
      )}
    </>
  );
}

const containerClass = css({
  flex: 1,
  padding: "$md",
  display: "flex",
  alignItems: "center",
  overflow: "auto",

  "@md": {
    justifyContent: "center",
  },
});
