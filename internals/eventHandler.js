class EventHandler {
  constructor (event, update) {
    this.event = event
    this.update = update
  }

  hook (node, propertyName) {
    const prop = propertyName.split('-')[0]

    if (node['__act'] &&
        node['__act'][prop] &&
        node['__act'][prop].event.toString() === this.event.toString()) {
      return
    }

    node.addEventListener(prop, (event) => this.event(event, this.update))

    node['__act'] = { [prop]: this }
  }
}

export default (...args) => new EventHandler(...args)
