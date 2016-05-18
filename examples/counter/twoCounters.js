import counter from './counter'
import nest from '../../src/nest'

const view = ({top, bottom}) => (
  ['main', [
    nest.view('top', counter.view(top)),
    nest.view('bottom', counter.view(bottom))
  ]]
)

const reducer = nest.reducers({
  top: counter.reducer,
  bottom: counter.reducer
})

const model = {
  top: counter.model,
  bottom: counter.model
}

export default { view, model, reducer }
