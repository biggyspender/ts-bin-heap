export const swapArrayIndexes = <T>(src: T[], idx1: number, idx2: number): void => {
  const x = src[idx1]
  src[idx1] = src[idx2]
  src[idx2] = x
}
