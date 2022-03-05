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
  // (key: initialIndex, value: currentIndex)
  const indicesMap: Map<number, number> = new Map();
  list.forEach((_, index) => indicesMap.set(index, index));
  const commands: Array<Command<BubbleSortItem>> = [];
  const compare = getCompareFunc(sortingOrder);
  let isSwapped = false;
  let firstIndex: number = -1,
    secondIndex: number = -1;
  let selectedIndices: Array<number> = [];

  for (let i = 0; i < list.length; i++) {
    isSwapped = false;
    selectedIndices = [];
    for (let j = 0; j < list.length - 1 - i; j++) {
      selectedIndices.push(j);
      firstIndex = indicesMap.get(j)!;
      secondIndex = indicesMap.get(j + 1)!;

      commands.push(new SelectCommand(firstIndex, secondIndex));

      if (compare(list[firstIndex], list[firstIndex])) {
        isSwapped = true;
        indicesMap.set(j, secondIndex);
        indicesMap.set(j + 1, firstIndex);

        commands.push(
          new SwapCommand(
            { initialIndex: j, currentIndex: firstIndex },
            { initialIndex: j + 1, currentIndex: secondIndex }
          )
        );
      }

      commands.push(
        new RevertCommand(new SelectCommand(firstIndex, secondIndex))
      );
    }

    if (!isSwapped) {
      commands.push(new CompleteCommand(...selectedIndices));
      return commands;
    }

    commands.push(new CompleteCommand(firstIndex));
  }

  return commands;
}
