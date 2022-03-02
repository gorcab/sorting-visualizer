import { BaseItem, SortingOrder } from "./types";

type VoidReturnFunc = (...args: any[]) => void;

export function callAll(...functions: Array<VoidReturnFunc | undefined>) {
  return (...args: any[]) => functions.forEach((func) => func && func(...args));
}

export function getCompareFunc(
  sortingOrder: SortingOrder,
  equalTo: boolean = false
) {
  if (equalTo) {
    if (sortingOrder === "ASC") {
      return <Item extends BaseItem>(item1: Item, item2: Item) =>
        item1.value > item2.value;
    } else {
      return <Item extends BaseItem>(item1: Item, item2: Item) =>
        item1.value < item2.value;
    }
  } else {
    if (sortingOrder === "ASC") {
      return <Item extends BaseItem>(item1: Item, item2: Item) =>
        item1.value >= item2.value;
    } else {
      return <Item extends BaseItem>(item1: Item, item2: Item) =>
        item1.value <= item2.value;
    }
  }
}

export function getRandomNumber(min: number = 10, max: number = 100) {
  // [min, max)
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  return randomNumber;
}
