export function accumulateArray(array, state, accumulator) {
  for (let i = 0; i < array.length; ++i) {
    state = accumulator(state, array[i])
  }
  return state
}
