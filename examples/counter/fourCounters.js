import twoCounters from './twoCounters'
import nest from 'main/nest'

const view = ({left, right}) => (
  ['table', [
    ['tr', [
      ['td', [
        nest.view('left', twoCounters.view(left))
      ]],
      ['td', [
        nest.view('right', twoCounters.view(right))
      ]]
    ]]
  ]]
)

const reducer = nest.reducers({
  left: twoCounters.reducer,
  right: twoCounters.reducer
})

const model = {
  left: twoCounters.model,
  right: twoCounters.model
}

export default { view, model, reducer }
