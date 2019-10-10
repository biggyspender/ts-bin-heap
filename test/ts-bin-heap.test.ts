import { createBinaryHeap } from '../src/ts-bin-heap'
import { range, blinq } from 'blinq'
/**
 * Dummy test
 */
describe('Dummy test', () => {
  it('works', () => {
    for (const direction of ['min', 'max'] as (('min' | 'max')[])) {
      for (const isStable of [false, true]) {
        const heap = createBinaryHeap<[number, number]>(([n]) => n, direction, isStable)
        const numItems = 25
        range(0, numItems).forEach(n => heap.push([n, 1]))
        heap.push([5, 2])
        heap.push([5, 3])
        const out: [number, number][] = []
        while (heap.length > 0) {
          out.push(heap.pop()!)
        }

        const correctOrder = (direction === 'min'
          ? blinq(out).orderBy(([n]) => n)
          : blinq(out).orderByDescending(([n]) => n)
        )
          .thenBy(([, n]) => n)
          .toArray()

        if (isStable) {
          const comparisons = blinq(out).zip(correctOrder, (a, b) => ({ a, b }))
          for (const c of comparisons) {
            expect(c.a).toEqual(c.b)
          }
        } else {
          const comparisons = blinq(out).zip(correctOrder, (a, b) => ({ a, b }))
          for (const c of comparisons) {
            expect(c.a[0]).toEqual(c.b[0])
          }
        }
      }
    }
  })
  it('works with default params', () => {
    const direction = 'min'
    const isStable = true
    const heap = createBinaryHeap<[number, number]>(([n]) => n)
    const numItems = 25
    range(0, numItems).forEach(n => heap.push([n, 1]))
    heap.push([5, 2])
    heap.push([5, 3])
    const out: [number, number][] = []
    while (heap.length > 0) {
      out.push(heap.pop()!)
    }

    const correctOrder = (direction === 'min'
      ? blinq(out).orderBy(([n]) => n)
      : blinq(out).orderByDescending(([n]) => n)
    )
      .thenBy(([, n]) => n)
      .toArray()

    if (isStable) {
      const comparisons = blinq(out).zip(correctOrder, (a, b) => ({ a, b }))
      for (const c of comparisons) {
        expect(c.a).toEqual(c.b)
      }
    } else {
      const comparisons = blinq(out).zip(correctOrder, (a, b) => ({ a, b }))
      for (const c of comparisons) {
        expect(c.a[0]).toEqual(c.b[0])
      }
    }
  })
  it('pushRange works', () => {
    for (const isStable of [false, true]) {
      const h = createBinaryHeap<number>(n => n, 'min', isStable)
      h.pushRange(range(0, 20))
      const out: number[] = []
      while (h.length > 0) {
        out.push(h.pop()!)
      }
      expect(out).toEqual([...range(0, 20)])
    }
  })
  it('pops null when empty', () => {
    const h = createBinaryHeap<number>(n => n)
    expect(h.pop()).toBeNull()
  })
  it('thrashes', () => {
    for (let i = 0; i < 200; ++i) {
      for (const isStable of [false, true]) {
        for (const direction of ['min', 'max'] as (('min' | 'max')[])) {
          const h = createBinaryHeap<number>(n => n, direction, isStable)
          range(0, 100).forEach(_ => h.push((Math.random() * 10) | 0))
          let current: number | null | undefined
          while (h.length > 0) {
            const v = h.pop()
            if (current != null) {
              if (direction === 'min') {
                expect(v).toBeGreaterThanOrEqual(current)
              } else {
                expect(v).toBeLessThanOrEqual(current)
              }
            }
            current = v
          }
        }
      }
    }
  })
})
