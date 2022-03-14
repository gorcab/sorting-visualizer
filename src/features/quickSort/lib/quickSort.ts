import { Command } from "features/common/lib/commands/CommandInterface";
import { CompleteCommand } from "features/common/lib/commands/CompleteCommand";
import { CompositeCommand } from "features/common/lib/commands/CompositeCommand";
import { FocusCommand } from "features/common/lib/commands/FocusCommand";
import { MutateCommand } from "features/common/lib/commands/MutateCommand";
import { PickCommand } from "features/common/lib/commands/PickCommand";
import { RevertCommand } from "features/common/lib/commands/RevertCommand";
import { SelectCommand } from "features/common/lib/commands/SelectCommand";
import { SwapCommand } from "features/common/lib/commands/SwapCommand";
import { SortingOrder } from "features/common/lib/types";
import { getCompareFunc } from "features/common/lib/utility";
import { QuickSortItem, QuickSortState } from "../types";

export function quickSort(
  list: Array<QuickSortItem>,
  sortingOrder: SortingOrder
): Array<Command<QuickSortItem, QuickSortState>> {
  const _list = list.slice();
  const commands: Array<Command<QuickSortItem, QuickSortState>> = [];
  const compare = getCompareFunc(sortingOrder, true);

  _quickSort(0, _list.length - 1);

  return commands;

  function _quickSort(low: number, high: number): void {
    const pickedIndices = Array.from(
      { length: high - low + 1 },
      (_, index) => _list[low + index].initialIndex
    );
    if (pickedIndices.length === 0) return;

    commands.push(new PickCommand(...pickedIndices));

    let completeIndex: number = -1;

    if (high > low) {
      let pivotIndex = partition(low, high);
      _quickSort(low, pivotIndex - 1);
      _quickSort(pivotIndex + 1, high);
    } else {
      if (low >= 0 && low < _list.length) {
        completeIndex = low;
      } else if (high >= 0 && high < _list.length) {
        completeIndex = high;
      }
      if (completeIndex !== -1) {
        commands.push(
          new CompositeCommand<QuickSortItem, QuickSortState>(
            new SelectCommand(_list[completeIndex].initialIndex),
            new CompleteCommand(_list[completeIndex].initialIndex)
          )
        );
      }
    }

    if (pickedIndices.length > 0) {
      if (pickedIndices.length === 1) {
        commands.push(
          new CompositeCommand<QuickSortItem, QuickSortState>(
            new RevertCommand<QuickSortItem, QuickSortState>(
              new SelectCommand(_list[completeIndex].initialIndex)
            ),
            new RevertCommand<QuickSortItem, QuickSortState>(
              new PickCommand(...pickedIndices)
            )
          )
        );
      } else {
        if (pickedIndices.length === _list.length) {
          commands.push(
            new CompositeCommand<QuickSortItem, QuickSortState>(
              new SelectCommand(...pickedIndices),
              new RevertCommand<QuickSortItem, QuickSortState>(
                new PickCommand(...pickedIndices)
              )
            )
          );
        } else {
          commands.push(
            new RevertCommand<QuickSortItem, QuickSortState>(
              new PickCommand(...pickedIndices)
            )
          );
        }
      }
    }
  }

  function partition(low: number, high: number): number {
    const focusedIndices = Array.from(
      { length: high - low + 1 },
      (_, index) => _list[low + index].initialIndex
    );
    const pivotIndex = low;
    let lowIndex = low + 1;
    let highIndex = high;
    commands.push(
      new CompositeCommand<QuickSortItem, QuickSortState>(
        new FocusCommand(...focusedIndices),
        new MutateCommand<QuickSortItem, QuickSortState>({ pivotIndex }),
        new MutateCommand<QuickSortItem, QuickSortState>({ lowIndex }),
        new MutateCommand<QuickSortItem, QuickSortState>({ highIndex })
      )
    );

    while (true) {
      while (compare(_list[pivotIndex], _list[lowIndex])) {
        if (lowIndex === high) {
          break;
        }
        lowIndex++;
        commands.push(
          new MutateCommand<QuickSortItem, QuickSortState>({ lowIndex })
        );
      }

      while (compare(_list[highIndex], _list[pivotIndex])) {
        if (highIndex === low) {
          break;
        }
        highIndex--;
        commands.push(
          new MutateCommand<QuickSortItem, QuickSortState>({ highIndex })
        );
      }

      if (lowIndex >= highIndex) break;

      commands.push(
        new CompositeCommand<QuickSortItem, QuickSortState>(
          new SelectCommand(_list[lowIndex].initialIndex),
          new SelectCommand(_list[highIndex].initialIndex)
        )
      );
      commands.push(
        new SwapCommand(
          {
            initialIndex: _list[lowIndex].initialIndex,
            currentIndex: highIndex,
          },
          {
            initialIndex: _list[highIndex].initialIndex,
            currentIndex: lowIndex,
          }
        )
      );
      [_list[lowIndex], _list[highIndex]] = [_list[highIndex], _list[lowIndex]];
      commands.push(
        new CompositeCommand<QuickSortItem, QuickSortState>(
          new RevertCommand<QuickSortItem, QuickSortState>(
            new SelectCommand(_list[lowIndex].initialIndex)
          ),
          new RevertCommand<QuickSortItem, QuickSortState>(
            new SelectCommand(_list[highIndex].initialIndex)
          )
        )
      );
    }

    if (pivotIndex !== highIndex) {
      commands.push(
        new CompositeCommand<QuickSortItem, QuickSortState>(
          new SelectCommand(_list[pivotIndex].initialIndex),
          new SelectCommand(_list[highIndex].initialIndex)
        )
      );
      commands.push(
        new SwapCommand(
          {
            initialIndex: _list[pivotIndex].initialIndex,
            currentIndex: highIndex,
          },
          {
            initialIndex: _list[highIndex].initialIndex,
            currentIndex: pivotIndex,
          }
        )
      );
      [_list[pivotIndex], _list[highIndex]] = [
        _list[highIndex],
        _list[pivotIndex],
      ];
      commands.push(
        new CompositeCommand<QuickSortItem, QuickSortState>(
          new RevertCommand<QuickSortItem, QuickSortState>(
            new SelectCommand(_list[pivotIndex].initialIndex)
          ),
          new RevertCommand<QuickSortItem, QuickSortState>(
            new SelectCommand(_list[highIndex].initialIndex)
          )
        )
      );
    }

    commands.push(
      new CompositeCommand<QuickSortItem, QuickSortState>(
        new SelectCommand(_list[highIndex].initialIndex),
        new CompleteCommand(_list[highIndex].initialIndex)
      )
    );

    commands.push(
      new CompositeCommand<QuickSortItem, QuickSortState>(
        new RevertCommand<QuickSortItem, QuickSortState>(
          new SelectCommand(_list[highIndex].initialIndex)
        ),
        new RevertCommand<QuickSortItem, QuickSortState>(
          new FocusCommand(...focusedIndices)
        ),
        new MutateCommand<QuickSortItem, QuickSortState>({ pivotIndex: NaN }),
        new MutateCommand<QuickSortItem, QuickSortState>({ lowIndex: NaN }),
        new MutateCommand<QuickSortItem, QuickSortState>({ highIndex: NaN })
      )
    );
    return highIndex;
  }
}
