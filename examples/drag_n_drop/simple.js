import main from '../..'
import map from 'ramda/src/map'
import propEq from 'ramda/src/propEq'
import filter from 'ramda/src/filter'
import always from '../../signals/processes/always'
import pipe from '../../signals/pipe'
import preventDefault from '../../processes/preventDefault'
import css from './styles.css'

const col = (col, model) => (
  ['td',
    {
      class: css.col,
      style: { border: model.over === col ? '1px dashed red' : '1px solid #eee' },
      drop: { drop: col },
      dragenter: { over: pipe(preventDefault, always(col.id)) },
      dragover: (_, ev) => ev.preventDefault()
    },
    [
      ['h1', col],
      ...map((t) => task(t, t.id === model.dragging), filter(propEq('col', col), model.tasks))
    ]
  ]
)

const view = (model) => (
  ['table', { class: css.grid }, [
    ['tr', map((c) => (col(c, model)), cols)]
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
  switch (type) {
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

const cols = ['todo', 'doing', 'done']

const model = {
  dragging: null,
  over: null,
  tasks: [
    {id: 1, desc: 'Add drag & drop example', col: 'done'},
    {id: 2, desc: 'Implement presenters', col: 'todo'},
    {id: 3, desc: 'Finish docs', col: 'todo'}
  ]
}

main(view, { model, reducer })
