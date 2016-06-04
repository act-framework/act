import fromValue from '../../signals/sources/fromValue'
import compose from 'ramda/src/compose'
import map from 'ramda/src/map'
import filter from 'ramda/src/filter'
import transduce from '../../signals/processes/transduce'

const number = fromValue()

const xform = compose(map((x) => x + 1), filter((x) => x > 10))
const subscriber = transduce(xform, number, (x) => console.log('>>', x))
window.subscriber = subscriber
