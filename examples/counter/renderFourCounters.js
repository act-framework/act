import twoCounters from './twoCounters'
import main from '../../src'
import nest from '../../src/nest'

const view = ({left, right}) => (
  ['main', [
    ['.left', {style: 'float: left'}, [
      nest.view('left', twoCounters.view(left))
    ]],
    ['.right', {style: 'float: right'}, [
      nest.view('right', twoCounters.view(right))
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

main(view, model, reducer)
