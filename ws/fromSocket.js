// This module requires the package `socket.io-client`

import io from 'socket.io-client'
import curry from 'ramda/src/curry'

const fromSocket = (http) => {
  const client = io(http)

  return {
    on: curry((action, next) => {
      client.on(action, next)
    }),

    emit: curry((message, value) => {
      client.emit(message, value)
    })
  }
}

export default fromSocket
