import main from '../..'
import css from './styles.css'
import lens from '../../helpers/view/lens'
import identity from 'ramda/src/identity'

const getName = lens(['user', 'name'])
const getAvatar = lens(['user', 'avatar'])

const name = getName((name) => (
  ['h1', ['Hello, ', name, '!']]
))

const avatar = (avatar) => (
  ['img', { class: css.avatar, src: avatar }]
)

const address = (address) => (
  ['dl', [
    ['h3', 'Address'],
    ['dt', 'Street: '], ['dd', address.street],
    ['dt', 'Number: '], ['dd', address.number],
    // yes, with lenses you can actually go back in your data structure, pretty
    // insane, hum?
    ['dt', 'City: '], ['dd', lens(['user', 'city'], identity)]
  ]]
)

const latestPurchase = (purchase) =>
  ['div', { class: css.purchase }, [
    ['h3', 'Latest purchase'],
    ['div', { class: css.total }, ['$', purchase.total]],
    ['div', purchase.store]
  ]]

const view = () =>
  ['main', [
    getAvatar(avatar), // using the fn filter
    name, // creating a function that will filter by itself
    ['hr'],
    lens(['user', 'address'], address), // the whole thing
    lens(['purchases', 0], latestPurchase) // the whole thing, but now with array index
  ]]

const complexModel = {
  user: {
    name: 'John Doe',
    age: 33,
    avatar: 'http://a1.mzstatic.com/us/r30/Music/bb/4a/26/mzi.lpoyjlvq.200x200-75.jpg',
    // you know... "real life data" :D
    city: 'New York',
    address: {
      street: '5th Avenue',
      number: 345,
      state: 'NY',
      country: 'US'
    },
    preferences: {
      backgroundColor: 'red'
    }
  },
  purchases: [
      {total: 457.30, store: 'Amazon'},
      {total: 99.00, store: 'Ebay'},
      {total: 4.50, store: 'Ali Baba'}
  ]
}

main(view, { model: complexModel })
