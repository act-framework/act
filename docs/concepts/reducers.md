# Reducers

A reducer is a function that gets the current state and an action (an object
with the format `{ type: 'some type', payload: 'some value' }` and returns a
completely new state.

Reducers make updates predictable – since they are pure by definition –, and,
therefore reproduceable.
