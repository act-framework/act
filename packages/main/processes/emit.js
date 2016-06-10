import map from '../signals/processes/map'

export default (socket, event) =>
  map((value) => socket.emit(event, value))
