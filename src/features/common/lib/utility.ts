import { BaseItem, SortingOrder } from "./types";

type VoidReturnFunc = (...args: any[]) => void;

export function callAll(...functions: Array<VoidReturnFunc | undefined>) {
  return (...args: any[]) => functions.forEach((func) => func && func(...args));
}

export type CompareFn<Item extends BaseItem> = (
  item1: Item,
  items2: Item
) => boolean;

export function getCompareFunc<Item extends BaseItem>(
  sortingOrder: SortingOrder,
  equalTo: boolean = false
): CompareFn<Item> {
  if (equalTo) {
    if (sortingOrder === "ASC") {
      return (item1: Item, item2: Item) => item1.value >= item2.value;
    } else {
      return (item1: Item, item2: Item) => item1.value <= item2.value;
    }
  } else {
    if (sortingOrder === "ASC") {
      return (item1: Item, item2: Item) => item1.value > item2.value;
    } else {
      return (item1: Item, item2: Item) => item1.value < item2.value;
    }
  }
}

export function getRandomNumber(min: number = 10, max: number = 100) {
  const randomNumber = Math.floor(Math.random() * (max - min)) + min; // [min, max)
  return randomNumber;
}

export function debounce(func: VoidReturnFunc, time: number = 200) {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: any) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(func, time, args);
  };
}
