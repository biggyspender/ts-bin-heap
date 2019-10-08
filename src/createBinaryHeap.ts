import { comparerBuilder } from 'ts-comparer-builder'
import { createStableBinaryHeap } from './createStableBinaryHeap'
import { createUnstableBinaryHeap } from './createUnstableBinaryHeap'
import { BinaryHeap } from './interfaces/BinaryHeap'
export function createBinaryHeap<T>(
  rankSelector: (item: T) => number,
  type: 'min' | 'max' = 'min',
  stable: boolean = true
): BinaryHeap<T> {
  const builder = comparerBuilder<T>()
  const op = type === 'min' ? builder.sortKey : builder.sortKeyDescending

  const cmp = op.call(builder, rankSelector).build()
  const f = stable ? createStableBinaryHeap : createUnstableBinaryHeap
  return f(cmp)
}
