var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

io.on('connection', (socket) => {
  console.log('user connected')
  const messages = []
  socket.on('message', (msg) => {
    messages.push(msg)
    console.log('message', msg)
    setTimeout(() => {
      socket.emit('messages', messages)
    }, 2000)
  })
})

http.listen(8081, () => {
  console.log('listening on *:8081')
})
