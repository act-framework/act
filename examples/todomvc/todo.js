// TODO: focus on fields
// TODO: routes
// TODO: bug when click on toggle inside "Active" filter :/

import main from '@act/core'
import { valueOnEnterAnd, valueOnEnter, valueAnd, onEsc } from '@act/core/processes'
import localStorage from '@act/core/storages/localStorage'
import all from 'ramda/src/all'
import any from 'ramda/src/any'
import call from 'ramda/src/call'
import filter from 'ramda/src/filter'
import identity from 'ramda/src/identity'
import lensProp from 'ramda/src/lensProp'
import map from 'ramda/src/map'
import prop from 'ramda/src/prop'
import propEq from 'ramda/src/propEq'
import reject from 'ramda/src/reject'
import set from 'ramda/src/set'

const view = ({ show, todos }) => (
  ['section.todoapp', todos.length ? [header, list(filters[show](todos)), footer(show, todos)] : [header]]
)

const header = () => (
  ['header.header', [
    ['h1', 'todos'],
    ['input.new-todo', {placeholder: 'What needs to be done?', autofocus: true, value: '',
      keyup: {add: valueOnEnter, clear: onEsc}}]
  ]]
)

const list = (todos) => (
  ['section.main', [
    ['input.toggle-all', {type: 'checkbox', change: {toggleAll: all(prop('completed'), todos)}}],
    ['label', {for: 'toggle-all'}, 'Mark all as complete'],
    ['ul.todo-list', map(todo, todos)]
  ]]
)

const todo = (todo) => todo.editing ? editingTodo(todo) : stdTodo(todo)

const editingTodo = (todo) => (
  ['li.editing', [
    ['input.edit', {value: todo.title, autofocus: true,
      keyup: {edit: valueOnEnterAnd({id: todo.id})},
      blur: {edit: valueAnd({id: todo.id})}}]
  ]]
)

const stdTodo = (todo) => (
  ['li', {class: [[todo.completed, 'completed']]}, [
    ['input.toggle', {type: 'checkbox', checked: todo.completed, click: {toggleCompleted: todo.id}}],
    ['label', {dblclick: {toggleEditing: todo.id}}, todo.title],
    ['button.destroy', {click: {remove: todo.id}}]
  ]]
)

const footer = (show, todos) => (
  ['footer.footer', [
    ['span.todo-count', call(({length}) =>
      [['strong', length], ` ${length === 1 ? 'item' : 'items'} left`], filters['Active'](todos))],
    ['ul.filters', map(filterItem(show), ['All', 'Active', 'Completed'])],
    any(prop('completed'), todos) &&
      ['button.clear-completed', {click: {clearCompleted: true}}, 'Clear completed']
  ]]
)

const filterItem = (show) => (item) => (
  ['li', [
    ['a', {class: [[show === item, 'selected']], href: '#/active', click: {show: item}}, item]
  ]]
)

const filters = {
  All: identity,
  Active: filter(propEq('completed', false)),
  Completed: filter(propEq('completed', true))
}

const toggle = (id, prop, todos) =>
  map((todo) => (
    todo.id === id ? {...todo, [prop]: !todo[prop]} : todo
  ), todos)

const reducer = (state, {type, payload}) => {
  switch (type) {
    case 'add':
      const uid = state.uid + 1
      return {...state, uid, todos: [...state.todos, { id: uid, title: payload, completed: false }]}
    case 'toggleCompleted':
      return {...state, todos: toggle(payload, 'completed', state.todos)}
    case 'remove':
      return {...state, todos: reject(propEq('id', payload), state.todos)}
    case 'clearCompleted':
      return {...state, todos: filters['Active'](state.todos)}
    case 'edit':
      return {...state, todos: map((todo) => (
        todo.id === payload.id ? {...todo, title: payload.value, editing: false} : todo
      ), state.todos)}
    case 'show':
      return {...state, show: payload}
    case 'toggleAll':
      return {...state, todos: map(set(lensProp('completed'), !payload), state.todos)}
    case 'toggleEditing':
      return {...state, todos: toggle(payload, 'editing', state.todos)}
    default:
      return state
  }
}

const model = { todos: [], uid: 1, show: 'All' }

// TODO: Rethink localStorage, maybe async? for better performance
main(view, model, reducer, { storage: localStorage })
