import main from '../..'
import guard from '../../helpers/reducer/guard'
import inc from 'ramda/src/inc'
import dec from 'ramda/src/dec'
import add from 'ramda/src/add'
import multiply from 'ramda/src/multiply'

const view = (val) => (
  ['main', [
    ['h1', val],
    ['button', { click: 'inc' }, 'Inc'],
    ['button', { click: 'dec' }, 'Dec'],
    ['button', { click: { multiply: 2 } }, 'Duplicate'],
    ['button', { click: { multiply: 3 } }, 'Triplicate'],
    ['button', { click: { add: 5 } }, 'Add 5'],
    ['button', { click: { add: 10 } }, 'Add 10'],
    ['button', { click: 'fortyTwo' }, 'Set to 42']
  ]]
)

const fortyTwo = 42
const reducer = guard({ inc, dec, multiply, add, fortyTwo })

/**
*  This is the same as ...
*
*  ```
*  var reducer = guard({
*   inc: (state, { payload }) => state + 1
*   dec: (state, { payload }) => state - 1
*   dup: (state, { payload }) => state * 2
* ])
* ```
*
* ... and ...
*
* ```
* const reducer = (state, {type, payload}) => {
*   switch(type) {
*     case 'add':
*       return state + 1
*     case 'sub':
*       return state - 1
*     case 'dup':
*       return state * 2
*     default:
*       retutn state
*   }
* }
* ```
*/

const model = 0
main(view, { model, reducer })
