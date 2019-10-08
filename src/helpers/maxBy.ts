import { Comparer } from 'ts-comparer-builder'
export const maxBy = <T>(src: T[], comparer: Comparer<T>): T | undefined => {
  if (src.length === 0) {
    return undefined
  }
  let currentMax: T | undefined
  let c = 0
  for (const item of src) {
    currentMax = c++ > 0 ? (comparer(item, currentMax!) > 0 ? item : currentMax!) : item
  }
  return currentMax
}
