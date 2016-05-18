// This module requires the package `socket.io-client`

import io from 'socket.io-client'

class FromSocket {
  constructor (http) {
    this.io = io(http)
  }

  on (action) {
    return (next) => {
      this.io.on(action, next)
    }
  }

  emit (...args) {
    this.io.emit(...args)
  }
}

export default (...args) => new FromSocket(...args)
