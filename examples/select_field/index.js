import main from 'main'
import map from 'ramda/src/map'
import value from 'main/processes/value'
import selection from 'main/processes/selection'

const cynics = [
  'Antisthenes',
  'Diogenes of Sinope',
  'Onesicritus',
  'Philiscus of Aegina'
]

const select = (v) =>
  console.log('VALUE:', v)

const selectText = (v) =>
  console.log('SELECTION:', v)

const view = () =>
['main', [
  ['input', {select: [selectText, selection], value: `Cynicism (Greek: κυνισμός) is a school of Ancient Greek philosophy as practiced by the Cynics (Greek: Κυνικοί, Latin: Cynici). For the Cynics, the purpose of life was to live in virtue, in agreement with nature. As reasoning creatures, people could gain happiness by rigorous training and by living in a way which was natural for themselves, rejecting all conventional desires for wealth, power, sex and fame. Instead, they were to lead a simple life free from all possessions.`}],
  ['h4', 'Favorite cynic:'],
  ['select', {change: [select, value]}, [
    ['option', '=== Choose ==='],
    ...map((value) => (
      ['option', {value}, value]
    ), cynics)
  ]]
]]

main(view)
