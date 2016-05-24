// A list of DOM events, split by use-case.

export const form = [
  'reset',
  'submit'
]

export const input = [
  'blur',
  'change',
  // 'contextmenu', // not really supported
  'focus',
  'input',
  'invalid',
  'search',
  'select'
]

export const keyboard = [
  'keydown',
  'keypress',
  'keyup'
]

export const mouse = [
  'click',
  'dblclick',
  'drag',
  'dragend',
  'dragenter',
  'dragleave',
  'dragover',
  'dragstart',
  'drop',
  'mousedown',
  'mousemove',
  'mouseout',
  'mouseover',
  'mouseup',
  'scroll',
  'wheel'
]

// TODO: create some example to understand the use case
export const clipboard = [
  'copy',
  'cut',
  'paste'
]

export const media = [
  'abort',
  'canplay',
  'canplaythrough',
  'cuechange',
  'durationchange',
  'emptied',
  'ended',
  'error',
  'loadeddata',
  'loadedmetadata',
  'loadstart',
  'pause',
  'play',
  'progress',
  'ratechange',
  'seeked',
  'seeking',
  'stalled',
  'suspend',
  'timeupdate',
  'volumechange',
  'waiting'
]

export const misc = [
  'show', // contextmenu
  'toggle' // <details> tag
]

export default [
  ...form,
  ...input,
  ...keyboard,
  ...mouse,
  ...clipboard,
  ...media,
  ...misc
]
