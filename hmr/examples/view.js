import preventDefault from '@act/main/processes/preventDefault'
import valueOnEnter from '@act/main/processes/valueOnEnter'
import css from './styles.css'
import map from 'ramda/src/map'
import always from '@act/main/signals/processes/always'
import pipe from '@act/main/signals/pipe'

const view = (cols) => (
  ['main', [
    addCol,
    ['h1', 'Act HMR Kanban Board'],
    ['table', { class: css.grid }, [
      ['tr', map(col, cols)]
    ]]
  ]]
)

const col = (col) => {
  return (
    ['td',
      {
        class: css.col,
        style: { border: col.over ? '1px solid #4592fb' : '1px solid #eee' },
        drop: { drop: col.id },
        dragenter: { over: pipe(preventDefault, always(col.id)) },
        dragover: (ev) => ev.preventDefault()
      },
      [
        ['h3', [col.title, ' (', col.tasks.length, ')']],
        col.id === 1 && addTask,
        ...map(task, col.tasks)
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

const task = (task) =>
  ['div', {
    draggable: true,
    class: css.task,
    style: { opacity: task.dragged ? 0.3 : 1 },
    dragstart: { drag: task.id },
    dragend: { drag: null }
  }, task.desc]

export default view
