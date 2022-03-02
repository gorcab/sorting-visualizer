import { useCallback, useState } from "react";
import { getRandomNumber } from "../lib/utility";

type Item = {
  id: string;
  value: number;
};

let itemId = 1;

export function useList() {
  const [list, setList] = useState<Array<Item>>([]);
  const addListItem = useCallback(
    () =>
      setList((prev) => [
        ...prev,
        { id: (itemId++).toString(), value: getRandomNumber() },
      ]),
    []
  );
  const deleteListItem = useCallback(
    () => setList((prev) => prev.slice(0, prev.length - 1)),
    []
  );

  const reorderList = setList;

  return {
    list,
    addListItem,
    deleteListItem,
    reorderList,
  };
}
