import main from '../..'
import { emit, valueOnEnter } from '../../processes'
import pipe from '../../signals/pipe'
import fromSocket from '../../signals/sources/fromSocket'
import map from 'ramda/src/map'

const socket = fromSocket('localhost:8081')

const chat = (msgs) => (
  ['main', [header, messages(msgs)]]
)

const header = () => (
  ['header', [
    ['small', 'Type something, press ENTER and wait 2s'],
    ['br'],
    ['input', {value: '', autofocus: true, keyup: {
      clear: pipe(valueOnEnter, emit(socket, 'message'))
    }}]
  ]]
)

const messages = (msgs) => (
  ['ul', map(message, msgs)]
)

const message = (msg) => (
  ['li', msg]
)

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'messages':
      return payload
    default:
      return state
  }
}

const model = []

const subscriptions = {
  messages: socket.on('messages')
}

main(chat, { model, reducer, subscriptions })
