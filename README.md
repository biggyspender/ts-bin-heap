# ts-bin-heap

A flexible [binary-heap](https://en.wikipedia.org/wiki/Binary_heap). This data-structure is optimized for the retrieval of either the maximum or the minimum

This package contains functions for creating binary-heaps conforming to the [`BinaryHeap<T>` interface](./src/interfaces/BinaryHeap.ts)

The main methods of `BinaryHeap<T>` are simply `push` and `pop`. You can push items into the heap, and you can pop items from it. **The item that is popped will always be either the maximum or the minimum item in the collection.**

[![npm version](http://img.shields.io/npm/v/ts-bin-heap.svg?style=flat)](https://npmjs.org/package/ts-bin-heap 'View this project on npm')
[![Build Status](https://travis-ci.org/biggyspender/ts-bin-heap.svg?branch=master)](https://travis-ci.org/biggyspender/ts-bin-heap)

[Auto-generated documentation](https://biggyspender.github.io/ts-bin-heap/)

## Usage

```typescript
import { createBinaryHeap } from 'ts-bin-heap'
```

### `createBinaryHeap`

The `createBinaryHeap` function should be all you need to get started.

Play with [this example on codesandbox.io](https://codesandbox.io/s/binaryheap-8tffl?expanddevtools=1&fontsize=14&module=%2Fsrc%2Findex.ts).

Say we have a collection of people:

```typescript
const people: Person[] = [
  {
    name: 'will',
    priority: 10
  },
  {
    name: 'jack',
    priority: 7
  },
  {
    name: 'nicole',
    priority: 8
  },
  {
    name: 'poppy',
    priority: 44
  }
]
```

Now we can make a binary heap to hold these people, using the `rankSelector` parameter to pass in a function that calculates the order ranking of the items that are inserted.

```typescript
const heap: BinaryHeap<Person> = createBinaryHeap<Person>(person => person.priority)
people.forEach(p => heap.push(p))
const lowestPriorityUser = heap.pop() // returns {name: 'jack', priority: 7}
```

The full definition of `createBinaryHeap` is as follows:

```typescript
createBinaryHeap<T>(
  rankSelector: (item: T) => number,
  type: 'min' | 'max' = 'min',
  stable: boolean = true
): BinaryHeap<T>
```

#### `rankSelector`

**Required** : A method that takes an item and selects from it an order ranking.

#### `type`

One of `"min"` or `"max"`. Changes the behaviour of `pop` to return either the minimum or the maximum item in the collection. Defaults to `"min"`

#### `stable`

Binary heaps are inherently [unstable](https://en.wikipedia.org/wiki/Sorting_algorithm#Stability). This means that items that are inserted with equal order ranking will be popped in an indeterminate order. It is possible to make the heap stable by tagging each entry with an "order-of-insertion" field, and using this as a secondary comparison when selecting the maximum/minimum item. **This option is switched on by default.** Supplying `false` here will revert to the faster, unstable version.

### acknowledgements

Created using the wonderful [https://github.com/alexjoverm/typescript-library-starter](https://github.com/alexjoverm/typescript-library-starter).
