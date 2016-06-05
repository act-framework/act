import map from 'ramda/src/map'

export default (state, { type, payload }) => {
  const uid = state.uid + 1

  switch (type) {
    case 'addCol':
      return { ...state, uid, cols: [ ...state.cols, { id: uid, title: payload } ] }
    case 'addTask':
      return { ...state, uid,
        tasks: [ { id: uid, desc: payload, col: 1 }, ...state.tasks ] }
    case 'drag':
      return { ...state, dragging: payload, over: null }
    case 'drop':
      return { ...state, dragging: null, over: null, tasks: map((task) => (
        task.id === state.dragging ? { ...task, col: payload } : task
      ), state.tasks) }
    case 'over':
      return { ...state, over: payload }
    default:
      return state
  }
}
