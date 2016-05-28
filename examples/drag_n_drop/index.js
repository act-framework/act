import main from '../..'
import map from 'ramda/src/map'
import propEq from 'ramda/src/propEq'
import filter from 'ramda/src/filter'
import always from '../../signals/processes/always'
import pipe from '../../signals/pipe'
import preventDefault from '../../processes/preventDefault'
import valueOnEnter from '../../processes/valueOnEnter'
import css from './styles.css'

const col = (col, model) => {
  const tasks = filter(propEq('col', col.id), model.tasks)
  return (
    ['td',
      {
        class: css.col,
        style: { border: model.over === col.id ? '1px solid #4592fb' : '1px solid #eee' },
        drop: { drop: col.id },
        dragenter: { over: pipe(preventDefault, always(col.id)) },
        dragover: (_, ev) => ev.preventDefault()
      },
      [
        ['h3', [col.title, ' (', tasks.length, ')']],
        col.id === 1 && addTask,
        ...map((t) => task(t, t.id === model.dragging), tasks)
      ]
    ]
  )
}

const addTask = () =>
  ['input', {
    class: css.addTask,
    placeholder: 'Add task',
    value: '',
    keyup: { addTask: valueOnEnter }
  }]

const addCol = () =>
  ['input', {
    class: css.addCol,
    placeholder: 'Add column',
    value: '',
    keyup: { addCol: valueOnEnter }
  }]

const view = (model) => (
  ['main', [
    addCol,
    ['h1', 'Act Kanban Board'],
    ['table', { class: css.grid }, [
      ['tr', map((c) => (col(c, model)), model.cols)]
    ]]
  ]]
)

const task = (task, dragged) => (
  ['div', {
    draggable: true,
    class: css.task,
    style: { opacity: dragged ? 0.3 : 1 },
    dragstart: { drag: task.id },
    dragend: { drag: null }
  }, task.desc]
)

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
    { id: 1, title: 'todo' },
    { id: 2, title: 'doing' },
    { id: 3, title: 'done' }
  ],
  tasks: [
    { id: 1, desc: 'Add drag & drop example', col: 3 },
    { id: 2, desc: 'Implement presenters', col: 1 },
    { id: 3, desc: 'Finish docs', col: 1 }
  ]
}

main(view, { model, reducer })
