import twoCounters from './fourCounters'
import main from 'main'
import nest from 'main/nest'
import './styles.css'

const view = ({left, right}) => (
  ['main', [
    ['h1', 'Act nested counters'],
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

main(view, { model, reducer })
