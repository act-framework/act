import main from '../../hmr'
import map from 'ramda/src/map'
import propEq from 'ramda/src/propEq'
import filter from 'ramda/src/filter'
import view from './view'
import pipe from '@act/main/signals/pipe'

const presenter = (model) => map((col) => ({
  ...col,
  over: col.id === model.over,
  tasks: map((task) => ({ ...task, dragging: model.dragging === task.id }),
    filter(propEq('col', col.id), model.tasks))
}), model.cols)

const reducer = (state, { type, payload }) => {
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

const model = {
  uid: 3,
  dragging: null,
  over: null,
  cols: [
    { id: 1, title: 'too' },
    { id: 2, title: 'doing' },
    { id: 3, title: 'one' }
  ],
  tasks: [
    { id: 1, desc: 'Add hmr example', col: 3 },
    { id: 2, desc: 'Make hmr as simple as possible', col: 1 },
    { id: 3, desc: 'Finish docs', col: 1 }
  ]
}

main(pipe(presenter, view), { model, reducer, module })
