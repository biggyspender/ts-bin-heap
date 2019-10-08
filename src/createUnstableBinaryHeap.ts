import { Comparer } from 'ts-comparer-builder'
import { swapArrayIndexes } from './helpers/swapArrayIndexes'
import { maxBy } from './helpers/maxBy'
import { SwapItem } from './interfaces/SwapItem'
import { BinaryHeap } from './interfaces/BinaryHeap'
export function createUnstableBinaryHeap<T>(comparer: Comparer<T>): BinaryHeap<T> {
  const heapArray: T[] = []
  const swapItemSelector = (items: SwapItem<T>[]) =>
    maxBy(items, ({ item: a }, { item: b }) => comparer(b, a))
  const heap: BinaryHeap<T> = {
    push(item: T) {
      let currentIndex = heapArray.length
      heapArray.push(item)
      while (currentIndex > 0) {
        const parentItemIndex = (currentIndex - 1) >> 1
        if (comparer(item, heapArray[parentItemIndex]) < 0) {
          swapArrayIndexes(heapArray, currentIndex, parentItemIndex)
          currentIndex = parentItemIndex
        } else {
          break
        }
      }
    },
    pushRange(items: Iterable<T>) {
      for (const item of items) {
        heap.push(item)
      }
    },
    pop(): T | null {
      if (heapArray.length === 0) {
        return null
      }
      const returnValue = heapArray[0]
      heapArray[0] = heapArray[heapArray.length - 1]
      heapArray.length = heapArray.length - 1
      let currentIndex = 0
      for (;;) {
        const currentItem = heapArray[currentIndex]
        const leftChildIndex = (currentIndex << 1) + 1
        const items: SwapItem<T>[] = []
        for (let i = 0; i < 2; ++i) {
          const childIdx = leftChildIndex + i
          if (childIdx < heapArray.length) {
            items.push({
              item: heapArray[childIdx],
              index: childIdx
            })
          }
        }
        if (items.length === 0) {
          break
        }
        // const currItemRank = rankSelector(currItem);
        const swapItem = swapItemSelector(items)
        if (comparer(swapItem!.item, currentItem) < 0) {
          swapArrayIndexes(heapArray, currentIndex, swapItem!.index)
          currentIndex = swapItem!.index
        } else {
          break
        }
      }
      return returnValue
    },
    get length() {
      return heapArray.length
    }
  }
  return heap
}
