import filter from 'ramda/src/filter'
import contains from 'ramda/src/contains'
import uniq from 'ramda/src/uniq'
import map from 'ramda/src/map'
import length from 'ramda/src/length'
import curry from 'ramda/src/curry'
import unnest from 'ramda/src/unnest'
import flip from 'ramda/src/flip'
import ap from 'ramda/src/ap'
import compose from 'ramda/src/compose'
import complement from 'ramda/src/complement'
import of from 'ramda/src/of'
import equals from 'ramda/src/equals'
import either from 'ramda/src/either'
import remove from 'ramda/src/remove'
import xprod from 'ramda/src/xprod'

const iter = curry((iter, fn, list) => iter(fn(list), list))

// neighbours : Cell -> Cells
const neighbours = ([fst, snd]) =>
  remove(4, 1, xprod([fst - 1, fst, fst + 1], [snd - 1, snd, snd + 1]))

// newBornsFor : Cells -> Cell -> Cells
const newBornsFor = curry((livingCells, cell) =>
  filter(isBorn(livingCells), deadNeighbours(cell, livingCells)))

// isAlive : Cells -> Cell -> Bool
// isDead : Cells -> Cell -> Bool
const isAlive = flip(contains)
const isDead = complement(isAlive)

// liveNeighbours : Cell -> Cells -> Cells
// deadNeighbours : Cell -> Cells -> Cells
const liveNeighbours = (cell, livingCells) =>
  length(filter(isAlive(livingCells), neighbours(cell)))
const deadNeighbours = (cell, livingCells) =>
  filter(isDead(livingCells), neighbours(cell))

// survive : Cells -> Cell -> Bool
// isBorn : Cells -> Cell -> Bool
const survive = curry(compose(either(equals(2), equals(3)), flip(liveNeighbours)))
const isBorn = curry(compose(equals(3), flip(liveNeighbours)))

// newBorns : Cells -> Cells
// survivors : Cells -> Cells
const newBorns = compose(uniq, unnest, iter(map, newBornsFor))
const survivors = iter(filter, survive)

// next : Cells -> Cells
export default compose(unnest, ap([survivors, newBorns]), of)
