import main from 'main'
import naiveRouter from 'main/subscriptions/naiveRouter'
import TraversableHistory from 'main/internals/TraversableHistory'
import css from './styles.css'

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

const selected = (t) =>
  t && css.selected

const view = (router) => (
  ['main', [
    ['nav', [
      ['a', {class: selected(router === 'home'), href: '#home'}, 'Home'],
      ['a', {class: selected(router === 'faq'), href: '#faq'}, 'FAQ'],
      ['a', {class: selected(router === 'contact'), href: '#contact'}, 'Contact']
    ]],
    ['article', [
      routes[router] || home,
      ['button', {click: undo}, 'Undo']
    ]]
  ]]
)

const subscriptions = { naiveRouter }

main(view, { model: 'home', subscriptions, historyClass: TraversableHistory })
