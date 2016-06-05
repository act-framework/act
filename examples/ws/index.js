import main from '@act/main'
import valueOnEnter from '@act/main/processes/valueOnEnter'
import onEnter from '@act/main/processes/onEnter'
import value from '@act/main/processes/value'
import fromSocket from '../fromSocket'
import map from 'ramda/src/map'
import css from './styles.css'

const socket = fromSocket('localhost:8081')

const chat = (model) =>
  ['main', [header(model.value), messages(model.messages)]]

const header = (val) =>
  ['header', [
    ['h1', 'Act web sockets chat'],
    ['small', 'Open this example in two windows and chat'],
    ['input', {placeholder: 'Say something', value: val, autofocus: true, keyup: [
      [socket.emit('message'), valueOnEnter],
      ['value', value],
      ['clear', onEnter]
    ]}]
  ]]

const messages = (messages) =>
  ['ul', map(message, messages)]

const message = (message) =>
  ['li', message]

const model = {
  messages: [],
  value: ''
}

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'messages':
      return { ...state, messages: payload }
    case 'clear':
      return { ...state, value: '' }
    case 'value':
      return { ...state, value: payload }
    default:
      return state
  }
}

const subscriptions = {
  messages: socket.on('messages')
}

main(chat, { model, reducer, subscriptions })
