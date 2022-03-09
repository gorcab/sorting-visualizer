import { Command } from "features/common/lib/commands/CommandInterface";
import { CompleteCommand } from "features/common/lib/commands/CompleteCommand";
import { CompositeCommand } from "features/common/lib/commands/CompositeCommand";
import { RevertCommand } from "features/common/lib/commands/RevertCommand";
import { SelectCommand } from "features/common/lib/commands/SelectCommand";
import { SwapCommand } from "features/common/lib/commands/SwapCommand";
import { SortingOrder } from "features/common/lib/types";
import { getCompareFunc } from "features/common/lib/utility";
import { SelectionSortItem } from "../reducer";

export function selectionSort(
  list: Array<SelectionSortItem>,
  sortingOrder: SortingOrder
): Array<Command<SelectionSortItem>> {
  const _list = list.slice();
  const commands: Array<Command<SelectionSortItem>> = [];
  const compare = getCompareFunc(sortingOrder);
  let swapIndex: number = -1;

  for (let i = 0; i < _list.length; i++) {
    swapIndex = i;
    commands.push(new CompleteCommand(_list[swapIndex].initialIndex));

    for (let j = i + 1; j < _list.length; j++) {
      commands.push(new SelectCommand(_list[j].initialIndex));
      if (compare(_list[swapIndex], _list[j])) {
        commands.push(
          new CompositeCommand(
            new RevertCommand(
              new CompleteCommand(_list[swapIndex].initialIndex)
            ),
            new RevertCommand(new SelectCommand(_list[j].initialIndex)),
            new CompleteCommand(_list[j].initialIndex)
          )
        );
        swapIndex = j;
      } else {
        commands.push(
          new RevertCommand(new SelectCommand(_list[j].initialIndex))
        );
      }
    }

    if (swapIndex !== i) {
      commands.push(
        new SwapCommand(
          {
            initialIndex: _list[i].initialIndex,
            currentIndex: swapIndex,
          },
          {
            initialIndex: _list[swapIndex].initialIndex,
            currentIndex: i,
          }
        )
      );
      [_list[swapIndex], _list[i]] = [_list[i], _list[swapIndex]];
    }
  }

  return commands;
}
