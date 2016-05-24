import mapObjIndexed from 'ramda/src/mapObjIndexed'
import map from '../../signals/processes/map'

// clipboard
export const clipboard = (mime) =>
  map((ev) => ev.clipboardData.getData(mime))

// https://www.w3.org/TR/clipboard-apis/#mandatory-data-types
const mimes = {
  text: 'text/plain',
  uriList: 'text/uri-list',
  csv: 'text/csv',
  css: 'text/css',
  html: 'text/html',
  xhtml: 'application/xhtml+xml',
  png: 'image/png',
  jpg: 'image/jpg, image/jpeg',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  xml: 'application/xml, text/xml',
  js: 'application/javascript',
  json: 'application/json',
  octet: 'application/octet-stream'
}

export default mapObjIndexed(clipboard, mimes)
