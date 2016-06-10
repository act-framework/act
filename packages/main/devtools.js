import TraversableHistory from './internals/TraversableHistory'
import map from 'ramda/src/map'
import addIndex from 'ramda/src/addIndex'
import _main from './'
import jsonPresenter from './devtools/jsonPresenter'

const styles = {
  zIndex: 9999,
  background: '#f4f4f8',
  fontFamily: 'Fira code',
  height: '100%',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  position: 'fixed',
  display: 'table',
  right: 0,
  scroll: 'auto',
  top: 0,
  width: '500px'
}

const stateStyles = {
  display: 'table-cell',
  listStyle: 'none',
  margin: 0,
  padding: 10,
  scroll: 'auto',
  width: '250px'
}

const timelineStyles = {
  display: 'table-cell',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  scroll: 'auto',
  width: '250px'
}

const linkStyles = (current) => ({
  background: current ? 'rgba(0, 0, 0, 0.1)' : 'inherit',
  border: '1px solid #ddd',
  borderTop: 'none',
  color: '#334',
  display: 'block',
  margin: 0,
  padding: '10px',
  textDecoration: 'none'
})

const mapIndexed = addIndex(map)

export const composedView = (view) => (model, history) => (
  ['div', [
    devtools(model, history),
    view(model, history)
  ]]
)
const devtools = (model, history) => (
  ['div#devtools', { style: styles }, [
    ['div.state', { style: stateStyles }, [
      ['h4', 'State'],
      jsonPresenter(history.state)
    ]],
    ['ol.timeline',
      { style: timelineStyles },
      [
        action('initial', history.initialState, 0, history.present === 0),
        ...mapIndexed((act, index) => {
          return action(act.type, act.payload, index + 1, index + 1 === history.present)
        }, history.timeline)
    ]]
  ]]
)

const action = (type, payload, index, current) => (
  ['li', [
    ['a', {
      click: (_, history) => { history.go(index) },
      href: '#',
      style: linkStyles(current)
    }, [
      ['b', type],
      ' ',
      jsonPresenter(payload)
    ]]
  ]]
)

const main = (view, opts) => {
  return _main(composedView(view), { ...opts, historyClass: TraversableHistory })
}
export default main
