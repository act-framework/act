import map from '@act/main/signals/processes/map'

export default (socket, event) =>
  map((value) => socket.emit(event, value))
