const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const messages = []

io.on('connection', (socket) => {
  console.log('user connected')
  socket.on('message', (msg) => {
    messages.unshift(msg)
    io.sockets.emit('messages', messages)
  })
})

http.listen(8081, () => {
  console.log('listening on *:8081')
})
