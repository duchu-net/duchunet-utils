class Reducer {
  hookedActions = {}
  initialState = {}

  constructor(props) {
    this.props = props
  }

  reducer(state = { ...this.initialState }, action) {
    if (action.type in this.hookedActions) {
      return this.hookedActions[action.type].bind(this)(state, action)
    }
    return state
  }

  exportReducer() {
    return (...props) => this.reducer(...props)
  }
}


export { Reducer }
export default Reducer
