import main from '../..'
import naiveRouter from '../../subscriptions/naiveRouter'
import TraversableHistory from '../../internals/TraversableHistory'

const undo = (_, history) => {
  // Regular undo doesn't cover side effects
  // therefore we have to run the original event
  // to simulate undoing
  history.undo()
  history.current &&
    window.history.replaceState(null, null, '#' + history.current.payload)
}

const home = ['h1', 'Home']
const faq = ['h1', 'FAQ']
const contact = ['h1', 'Contact']

const routes = { home, faq, contact }

const view = (router) => (
  ['main', [
    routes[router] || home,
    ['a', {href: '#home'}, 'Home'],
    ['a', {href: '#faq'}, 'FAQ'],
    ['a', {href: '#contact'}, 'Contact'],
    ['button', {click: undo}, 'Undo']
  ]]
)

const subscriptions = { naiveRouter }

main(view, { model: 'home', subscriptions, historyClass: TraversableHistory })
