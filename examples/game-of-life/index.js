import main from 'main'
import map from 'ramda/src/map'
import next from './next'
import { gosperGun } from './patterns'

const view = (cells) =>
  ['main', [
    ['button', { click: 'next' }, 'Next'],
    ...map(cell, cells)
  ]]

const style = { background: 'black', width: 19, height: 19, position: 'absolute' }

const cell = ([cx, cy]) =>
  ['div', { style: { ...style, left: cx * 20, top: cy * 20 } }]

main(view, { model: gosperGun, reducer: next })
