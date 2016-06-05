import map from 'ramda/src/map'
import propEq from 'ramda/src/propEq'
import filter from 'ramda/src/filter'

export default (model) => map((col) => ({
  ...col,
  over: col.id === model.over,
  tasks: map((task) => ({ ...task, dragging: model.dragging === task.id }),
    filter(propEq('col', col.id), model.tasks))
}), model.cols)

