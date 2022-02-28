import { BaseItem } from "../types";

export interface Command<Item extends BaseItem> {
  execute: (list: Array<Item>) => Array<Item>;
  undo: (list: Array<Item>) => Array<Item>;
}
