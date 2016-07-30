import always from '../signals/processes/always'
import fromEvent from '../signals/sources/fromEvent'
import identity from '../signals/processes/identity'
import isArrayLike from 'ramda/src/isArrayLike'
import map from 'ramda/src/map'
import toPairs from 'ramda/src/toPairs'

const eventsAsList = (events) => {
  if (typeof events === 'function' || typeof events === 'string') return [[events, identity]]
  if (isArrayLike(events)) return isArrayLike(events[0]) ? events : [events]
  if (typeof events === 'object') return toPairs(events)
  return []
}

class SignalHandler {
  constructor (event, events, history, namespaces = []) {
    this.events = eventsAsList(events)
    this.history = history
    this.namespaces = namespaces
    this.processes = {}
    this.sources = {}
    this.actions = {}
    this.event = event
  }

  hook (node, _, prev) {
    let index = 0
    map(([typeOrAction, processOrValue]) => {
      const [type, action] = typeof typeOrAction === 'string'
        ? [typeOrAction, (payload, history) => this.history.push({ type: [...this.namespaces, type].join('.'), payload })]
        : [`${this.event}-${++index}`, typeOrAction]

      this.actions[type] = action
      this.processes[type] = typeof processOrValue === 'function'
        ? processOrValue
        : always(processOrValue)

      if (prev) {
        if (
          prev.processes[type] === this.processes[type] &&
          prev.actions[type] === this.actions[type]) {
          this.sources[type] = prev.sources[type]
          return
        }
        prev.sources[type].stop()
      }

      this.sources[type] = fromEvent(node, this.event)

      this.processes[type](this.sources[type].start())((payload) => {
        action(payload, this.history)
      })
    }, this.events)
  }
}

export default (...args) => new SignalHandler(...args)
