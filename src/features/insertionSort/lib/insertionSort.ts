import { Command } from "features/common/lib/commands/CommandInterface";
import { CompleteCommand } from "features/common/lib/commands/CompleteCommand";
import { CompositeCommand } from "features/common/lib/commands/CompositeCommand";
import { MoveCommand } from "features/common/lib/commands/MoveCommand";
import { PickCommand } from "features/common/lib/commands/PickCommand";
import { RevertCommand } from "features/common/lib/commands/RevertCommand";
import { SelectCommand } from "features/common/lib/commands/SelectCommand";
import { SortingOrder } from "features/common/lib/types";
import { getCompareFunc } from "features/common/lib/utility";
import { InsertionSortItem } from "../reducer";

export function insertionSort(
  list: Array<InsertionSortItem>,
  sortingOrder: SortingOrder
): Array<Command<InsertionSortItem>> {
  const _list = list.slice();
  const commands: Array<Command<InsertionSortItem>> = [];
  const compare = getCompareFunc(sortingOrder);

  for (let i = 1; i < _list.length; i++) {
    const itemToInsert = _list[i];

    commands.push(
      new CompositeCommand(
        new SelectCommand(itemToInsert.initialIndex),
        new PickCommand(itemToInsert.initialIndex)
      )
    );

    let j = i - 1;
    while (j >= 0) {
      commands.push(new SelectCommand(_list[j].initialIndex));
      if (!compare(_list[j], itemToInsert)) {
        break;
      }

      commands.push(
        new MoveCommand({
          initialIndex: _list[j].initialIndex,
          indexBeforeMoving: j,
          indexAfterMoving: j + 1,
        })
      );
      _list[j + 1] = _list[j];
      j = j - 1;
    }

    commands.push(
      new CompositeCommand(
        new RevertCommand(new PickCommand(itemToInsert.initialIndex)),
        new MoveCommand({
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
    commands.push(new RevertCommand(new SelectCommand(...selectedIndices)));
  }

  commands.push(new CompleteCommand(..._list.map((_, index) => index)));

  return commands;
}
