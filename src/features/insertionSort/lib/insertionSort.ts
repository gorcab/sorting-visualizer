import { Command } from "features/common/lib/commands/CommandInterface";
import { CompleteCommand } from "features/common/lib/commands/CompleteCommand";
import { CompositeCommand } from "features/common/lib/commands/CompositeCommand";
import { XAxisMoveCommand } from "features/common/lib/commands/XAxisMoveCommand";
import { PickCommand } from "features/common/lib/commands/PickCommand";
import { RevertCommand } from "features/common/lib/commands/RevertCommand";
import { SelectCommand } from "features/common/lib/commands/SelectCommand";

import { SortingOrder } from "features/common/lib/types";
import { getCompareFunc } from "features/common/lib/utility";
import { InsertionSortItem, InsertionSortState } from "../types";
export function insertionSort(
  list: Array<InsertionSortItem>,
  sortingOrder: SortingOrder
): Array<Command<InsertionSortItem, InsertionSortState>> {
  const _list = list.slice();
  const commands: Array<Command<InsertionSortItem, InsertionSortState>> = [];
  const compare = getCompareFunc(sortingOrder);

  for (let i = 1; i < _list.length; i++) {
    const itemToInsert = _list[i];

    commands.push(
      new CompositeCommand<InsertionSortItem, InsertionSortState>(
        new SelectCommand(itemToInsert.initialIndex),
        new PickCommand<InsertionSortItem, InsertionSortState>(
          itemToInsert.initialIndex
        )
      )
    );

    let j = i - 1;
    while (j >= 0) {
      commands.push(new SelectCommand(_list[j].initialIndex));
      if (!compare(_list[j], itemToInsert)) {
        break;
      }

      commands.push(
        new XAxisMoveCommand<InsertionSortItem, InsertionSortState>({
          initialIndex: _list[j].initialIndex,
          indexBeforeMoving: j,
          indexAfterMoving: j + 1,
        })
      );
      _list[j + 1] = _list[j];
      j = j - 1;
    }

    commands.push(
      new CompositeCommand<InsertionSortItem, InsertionSortState>(
        new RevertCommand<InsertionSortItem, InsertionSortState>(
          new PickCommand<InsertionSortItem, InsertionSortState>(
            itemToInsert.initialIndex
          )
        ),
        new XAxisMoveCommand<InsertionSortItem, InsertionSortState>({
          initialIndex: itemToInsert.initialIndex,
          indexBeforeMoving: i,
          indexAfterMoving: j + 1,
        })
      )
    );

    _list[j + 1] = itemToInsert;
    j = j < 0 ? 0 : j;

    const selectedIndices = Array.from(
      { length: i - j + 1 },
      (_, index) => _list[j + index].initialIndex
    );
    commands.push(
      new RevertCommand<InsertionSortItem, InsertionSortState>(
        new SelectCommand(...selectedIndices)
      )
    );
  }

  commands.push(new CompleteCommand(..._list.map((_, index) => index)));

  return commands;
}
