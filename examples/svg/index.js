import main from 'main'

const svg = ['svg', {width: 1000, height: 1000, fill: '#4592FB', 'stroke-width': 0}, [
  ['title', 'ACT symbol'],
  ['g', {transform: 'translate(0, 50)'}, [
    ['path', {'fill-opacity': 0.6, d: 'M600,0 l0,700 l-600,-350 l600,-350'}],
    ['path', {'fill-opacity': 0.6, d: 'M400,200 l0,700 l600,-350 l-600,-350'}],
    ['path', {'fill-opacity': 0.2, fill: 'black', d: 'M600,0 L600,784 L400,900 L400,116 L600,0'}]
  ]]
]]

main(svg)
