import { Command } from "features/common/lib/commands/CommandInterface";
import { CompleteCommand } from "features/common/lib/commands/CompleteCommand";
import { RevertCommand } from "features/common/lib/commands/RevertCommand";
import { SelectCommand } from "features/common/lib/commands/SelectCommand";
import { SwapCommand } from "features/common/lib/commands/SwapCommand";
import { SortingOrder } from "features/common/lib/types";
import { getCompareFunc } from "features/common/lib/utility";
import { BubbleSortItem } from "../reducer";

export function bubbleSort(
  list: Array<BubbleSortItem>,
  sortingOrder: SortingOrder
): Array<Command<BubbleSortItem>> {
  const _list = list.slice();
  const commands: Array<Command<BubbleSortItem>> = [];
  const compare = getCompareFunc<BubbleSortItem>(sortingOrder);
  let isSwapped = false;
  let firstInitalIdx = -1,
    secondInitialIdx = -1;
  // const selectedIndicesSet = new Set<number>();

  for (let i = 0; i < list.length; i++) {
    isSwapped = false;
    // selectedIndicesSet.clear();
    for (let j = 0; j < list.length - 1 - i; j++) {
      firstInitalIdx = _list[j].initialIndex;
      secondInitialIdx = _list[j + 1].initialIndex;
      // selectedIndicesSet.add(firstInitalIdx);
      // selectedIndicesSet.add(secondInitialIdx);

      commands.push(new SelectCommand(firstInitalIdx, secondInitialIdx));

      if (compare(_list[j], _list[j + 1])) {
        isSwapped = true;

        commands.push(
          new SwapCommand<BubbleSortItem>(
            { initialIndex: _list[j].initialIndex, currentIndex: j + 1 },
            { initialIndex: _list[j + 1].initialIndex, currentIndex: j }
          )
        );
        [_list[j], _list[j + 1]] = [_list[j + 1], _list[j]];
      }

      commands.push(
        new RevertCommand<BubbleSortItem>(
          new SelectCommand<BubbleSortItem>(firstInitalIdx, secondInitialIdx)
        )
      );
    }

    if (!isSwapped) {
      const selectedIndices = Array.from(
        { length: _list.length - i },
        (_, index) => _list[index].initialIndex
      );
      commands.push(new CompleteCommand<BubbleSortItem>(...selectedIndices));
      return commands;
    }

    commands.push(
      new CompleteCommand<BubbleSortItem>(
        _list[_list.length - 1 - i].initialIndex
      )
    );
  }

  return commands;
}
