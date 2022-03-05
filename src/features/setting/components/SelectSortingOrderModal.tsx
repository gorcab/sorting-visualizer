import { Modal } from "features/common/components/Modal/components/Modal";
import { SortingOrder } from "features/common/lib/types";
import { css } from "stitches.config";

type SelectSortingOrderModalProps = {
  sortingOrder: SortingOrder;
  onChange: (sortingOrder: SortingOrder) => void;
  onClose: () => void;
  onStart: () => void;
};

export function SelectSortingOrderModal({
  sortingOrder,
  onChange,
  onClose,
  onStart,
}: SelectSortingOrderModalProps) {
  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.target.value as SortingOrder);
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onStart();
  };

  return (
    <Modal onClose={onClose} title="Select Sorting Order">
      <form onSubmit={submitHandler}>
        <div className={inputGroupClass()}>
          <input
            className={radioButtonClass()}
            value="ASC"
            type="radio"
            name="sortingOrder"
            id="ASC"
            checked={sortingOrder === "ASC"}
            onChange={changeHandler}
          />
          <label className={labelClass()} htmlFor="ASC">
            Ascending Order
          </label>
        </div>
        <div className={inputGroupClass()}>
          <input
            className={radioButtonClass()}
            value="DESC"
            type="radio"
            name="sortingOrder"
            id="DESC"
            checked={sortingOrder === "DESC"}
            onChange={changeHandler}
          />
          <label className={labelClass()} htmlFor="DESC">
            Descending Order
          </label>
        </div>
        <div className={buttonBoxClass()}>
          <button className={startButtonClass()}>Start</button>
        </div>
      </form>
    </Modal>
  );
}

const inputGroupClass = css({
  padding: "$sm",
  fontSize: "$lg",
  display: "flex",
  height: 40,
  alignItems: "center",
});

const radioButtonClass = css({
  position: "absolute",
  width: 0,
  height: 0,
  left: -9999,
  transition: "scale 0.5s",

  "&:checked + label::after": {
    content: "",
    position: "absolute",
    left: "3px",
    top: "50%",
    transform: "translate3D(0, -50%, 0)",
    width: 9,
    height: 9,
    backgroundColor: "$green500",
    borderRadius: "50%",
    scale: 1,
    border: "1px solid $green500",
  },

  "&:focus + label::before": {
    outline: "solid",
  },
});

const labelClass = css({
  paddingLeft: 20,
  position: "relative",
  cursor: "pointer",
  lineHeight: 1.5,

  "&::before": {
    content: "",
    width: 15,
    height: 15,
    top: "50%",
    left: "0%",
    transform: "translate3D(0, -50%, 0)",
    border: "1px solid $white",
    borderRadius: "50%",
    position: "absolute",
  },
});

const buttonBoxClass = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
});

const startButtonClass = css({
  padding: "$base",
  borderRadius: "0.5rem",
  backgroundColor: "$bg",
  color: "$white",
  cursor: "pointer",
  border: "1px solid $white",
  outline: "none",

  "&:hover": {
    backgroundColor: "$gray900",
  },

  "&:focus": {
    outline: "solid",
  },
});
