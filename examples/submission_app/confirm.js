import guard from 'main/helpers/reducer/guard'
import always from 'ramda/src/always'

const view = (state) =>
  state === 'confirm' ? viewConfirm() : viewWaiting(state)

const viewConfirm = () =>
  ['span', [
    ['button', {click: 'cancelSubmit'}, 'Cancel'],
    ['button', {click: 'confirmSubmit'}, 'Confirm']
  ]]

const viewWaiting = (state) =>
  ['button', {click: 'maybeSubmit', disabled: state === 'disabled'}, 'Submit']

const reducer = guard({
  maybeSubmit: always('confirm'),
  cancelSubmit: always('waiting')
})

export default { view, reducer, model: 'disabled' }
