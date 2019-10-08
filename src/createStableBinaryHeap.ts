import { Comparer } from 'ts-comparer-builder'
import { StableBinaryHeapItem } from './interfaces/StableBinaryHeapItem'
import { BinaryHeap } from './interfaces/BinaryHeap'
import { createUnstableBinaryHeap } from './createUnstableBinaryHeap'
export function createStableBinaryHeap<T>(comparer: Comparer<T>): BinaryHeap<T> {
  const unstableHeap = createUnstableBinaryHeap<StableBinaryHeapItem<T>>((item1, item2) => {
    const c = comparer(item1.item, item2.item)
    if (c === 0) {
      return item1.order - item2.order
    }
    return c
  })
  let count = 0
  const stableHeap: BinaryHeap<T> = {
    push(item: T) {
      return unstableHeap.push({ item, order: count++ })
    },
    pushRange(items: Iterable<T>) {
      for (const item of items) {
        stableHeap.push(item)
      }
    },
    pop(): T | null {
      const item = unstableHeap.pop()
      if (item) {
        return item.item
      }
      return null
    },
    get length() {
      return unstableHeap.length
    }
  }
  return stableHeap
}
