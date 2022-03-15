import { Command } from "features/common/lib/commands/CommandInterface";
import { CompleteCommand } from "features/common/lib/commands/CompleteCommand";
import { CompositeCommand } from "features/common/lib/commands/CompositeCommand";
import { FocusCommand } from "features/common/lib/commands/FocusCommand";
import { MutateCommand } from "features/common/lib/commands/MutateCommand";
import { PickCommand } from "features/common/lib/commands/PickCommand";
import { RevertCommand } from "features/common/lib/commands/RevertCommand";
import { SelectCommand } from "features/common/lib/commands/SelectCommand";
import { XAxisMoveCommand } from "features/common/lib/commands/XAxisMoveCommand";
import { YAxisMoveCommand } from "features/common/lib/commands/YAxisMoveCommand";
import { SortingOrder } from "features/common/lib/types";
import { getCompareFunc } from "features/common/lib/utility";
import { MergeSortItem, MergeSortState } from "../types";

export function mergeSort(
  list: Array<MergeSortItem>,
  sortingOrder: SortingOrder
): Array<Command<MergeSortItem, MergeSortState>> {
  const _list = list.slice();
  const indices = _list.map((item) => item.initialIndex);
  const compare = getCompareFunc(sortingOrder);
  const commands: Array<Command<MergeSortItem, MergeSortState>> = [];
  _mergeSort(0, _list.length - 1);
  commands.push(
    new CompositeCommand<MergeSortItem, MergeSortState>(
      new SelectCommand(...indices),
      new CompleteCommand(...indices)
    )
  );
  return commands;

  function _mergeSort(low: number, high: number) {
    if (low < high) {
      const pickedIndices = Array.from(
        { length: high - low + 1 },
        (_, index) => _list[low + index].initialIndex
      );
      commands.push(new PickCommand(...pickedIndices));
      const mid = Math.floor(low + (high - low) / 2);
      _mergeSort(low, mid);
      _mergeSort(mid + 1, high);
      merge(low, mid, high);
      commands.push(
        new RevertCommand<MergeSortItem, MergeSortState>(
          new PickCommand(...pickedIndices)
        )
      );
    } else {
      const pickedIndices = Array.from(
        { length: 1 },
        (_, index) => _list[low + index].initialIndex
      );
      commands.push(new PickCommand(...pickedIndices));
      commands.push(
        new CompositeCommand<MergeSortItem, MergeSortState>(
          new SelectCommand(...pickedIndices),
          new CompleteCommand(...pickedIndices)
        )
      );
      commands.push(
        new CompositeCommand<MergeSortItem, MergeSortState>(
          new RevertCommand<MergeSortItem, MergeSortState>(
            new SelectCommand(...pickedIndices)
          ),
          new RevertCommand<MergeSortItem, MergeSortState>(
            new CompleteCommand(...pickedIndices)
          ),
          new RevertCommand<MergeSortItem, MergeSortState>(
            new PickCommand(...pickedIndices)
          )
        )
      );
    }
  }

  function merge(low: number, mid: number, high: number) {
    const selectedIndicesCache = new Map<number, boolean>();
    const focusedIndices = Array.from(
      { length: high - low + 1 },
      (_, index) => _list[index + low].initialIndex
    );
    commands.push(
      new CompositeCommand<MergeSortItem, MergeSortState>(
        new MutateCommand<MergeSortItem, MergeSortState>({
          isFocused: true,
        }),
        new FocusCommand(...focusedIndices)
      )
    );

    const mergedList: Array<MergeSortItem> = new Array(high - low + 1);
    let leftPosIdx = low,
      rightPosIdx = mid + 1,
      mergedPosIdx = 0;

    while (leftPosIdx <= mid && rightPosIdx <= high) {
      const selectedindices = [];
      const lPosIdx = _list[leftPosIdx].initialIndex;
      const rPosIdx = _list[rightPosIdx].initialIndex;
      if (!selectedIndicesCache.get(lPosIdx)) {
        selectedindices.push(lPosIdx);
        selectedIndicesCache.set(lPosIdx, true);
      }
      if (!selectedIndicesCache.has(rPosIdx)) {
        selectedindices.push(rPosIdx);
        selectedIndicesCache.set(rPosIdx, true);
      }
      commands.push(new SelectCommand(...selectedindices));

      if (compare(_list[leftPosIdx], _list[rightPosIdx])) {
        mergedList[mergedPosIdx] = _list[rightPosIdx];
        commands.push(
          new CompositeCommand<MergeSortItem, MergeSortState>(
            new YAxisMoveCommand({
              initialIndex: _list[rightPosIdx].initialIndex,
              indexBeforeMoving: 0,
              indexAfterMoving: 1,
            }),
            new XAxisMoveCommand({
              initialIndex: _list[rightPosIdx].initialIndex,
              indexBeforeMoving: rightPosIdx,
              indexAfterMoving: low + mergedPosIdx,
            }),
            new CompleteCommand(_list[rightPosIdx].initialIndex)
          )
        );
        rightPosIdx++;
      } else {
        mergedList[mergedPosIdx] = _list[leftPosIdx];
        commands.push(
          new CompositeCommand<MergeSortItem, MergeSortState>(
            new YAxisMoveCommand({
              initialIndex: _list[leftPosIdx].initialIndex,
              indexBeforeMoving: 0,
              indexAfterMoving: 1,
            }),
            new XAxisMoveCommand({
              initialIndex: _list[leftPosIdx].initialIndex,
              indexBeforeMoving: leftPosIdx,
              indexAfterMoving: low + mergedPosIdx,
            }),
            new CompleteCommand(_list[leftPosIdx].initialIndex)
          )
        );
        leftPosIdx++;
      }

      mergedPosIdx++;
    }

    while (leftPosIdx <= mid) {
      const lPosIdx = _list[leftPosIdx].initialIndex;
      if (!selectedIndicesCache.get(lPosIdx)) {
        selectedIndicesCache.set(lPosIdx, true);
        commands.push(new SelectCommand(lPosIdx));
      }

      mergedList[mergedPosIdx] = _list[leftPosIdx];
      commands.push(
        new CompositeCommand<MergeSortItem, MergeSortState>(
          new YAxisMoveCommand({
            initialIndex: _list[leftPosIdx].initialIndex,
            indexBeforeMoving: 0,
            indexAfterMoving: 1,
          }),
          new XAxisMoveCommand({
            initialIndex: _list[leftPosIdx].initialIndex,
            indexBeforeMoving: leftPosIdx,
            indexAfterMoving: low + mergedPosIdx,
          }),
          new CompleteCommand(_list[leftPosIdx].initialIndex)
        )
      );
      leftPosIdx++;
      mergedPosIdx++;
    }

    while (rightPosIdx <= high) {
      const rPosIdx = _list[rightPosIdx].initialIndex;
      if (!selectedIndicesCache.get(rPosIdx)) {
        selectedIndicesCache.set(rPosIdx, true);
        commands.push(new SelectCommand(rPosIdx));
      }

      mergedList[mergedPosIdx] = _list[rightPosIdx];
      commands.push(
        new CompositeCommand<MergeSortItem, MergeSortState>(
          new YAxisMoveCommand({
            initialIndex: _list[rightPosIdx].initialIndex,
            indexBeforeMoving: 0,
            indexAfterMoving: 1,
          }),
          new XAxisMoveCommand({
            initialIndex: _list[rightPosIdx].initialIndex,
            indexBeforeMoving: rightPosIdx,
            indexAfterMoving: low + mergedPosIdx,
          }),
          new CompleteCommand(_list[rightPosIdx].initialIndex)
        )
      );
      rightPosIdx++;
      mergedPosIdx++;
    }
    mergedList.forEach((_, idx, list) => {
      _list[low + idx] = list[idx];
    });
    const mergedIndices = mergedList.map((item) => item.initialIndex);
    commands.push(
      new CompositeCommand<MergeSortItem, MergeSortState>(
        new RevertCommand<MergeSortItem, MergeSortState>(
          new CompleteCommand(...mergedIndices)
        ),
        new RevertCommand<MergeSortItem, MergeSortState>(
          new SelectCommand(...mergedIndices)
        ),
        ...mergedIndices.map((idx) => {
          return new YAxisMoveCommand<MergeSortItem, MergeSortState>({
            initialIndex: _list[idx].initialIndex,
            indexBeforeMoving: 1,
            indexAfterMoving: 0,
          });
        }),
        new MutateCommand<MergeSortItem, MergeSortState>({
          isFocused: false,
        }),
        new RevertCommand<MergeSortItem, MergeSortState>(
          new FocusCommand(...focusedIndices)
        )
      )
    );
  }
}
