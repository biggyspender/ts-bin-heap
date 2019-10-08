export interface BinaryHeap<T> {
  push(item: T): void
  pushRange(items: Iterable<T>): void
  pop(): T | null
  readonly length: number
}
