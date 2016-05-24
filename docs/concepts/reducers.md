# Reducers

A reducer is a function that gets the current state and an action (an object
with the format `{ type: 'some type', payload: 'some value' }` and returns a
completely new state.

Reducers make updates predictable – since they are pure by definition –, and,
therefore reproduceable.

They have the following signature: `Model, Action -> Model`, where `Model` is
any value, and `Action` is `object { type: string, payload: any, * }`. This
means the action object must have at least the `type` and `payload` keys, but
can have any other key you want.

Example:

```
const calculatorReducer = (state, { type, payload }) {
  switch (type) {
    case 'add':
      return state + payload
    case 'sub':
      return state - payload
    case 'mult':
      return state * payload
    case 'div':
      return state / payload
    default:
      return state
  }
}
```
