import map from '../signals/processes/map'

// clipboard
const clipboard = (mime) =>
  map((ev) => ev.clipboardData.getData(mime))

// https://www.w3.org/TR/clipboard-apis/#mandatory-data-types
export const text = clipboard('text/plain')
export const uriList = clipboard('text/uri-list')
export const csv = clipboard('text/csv')
export const css = clipboard('text/css')
export const html = clipboard('text/html')
export const xhtml = clipboard('application/xhtml+xml')
export const png = clipboard('image/png')
export const jpg = clipboard('image/jpg, image/jpeg')
export const gif = clipboard('image/gif')
export const svg = clipboard('image/svg+xml')
export const xml = clipboard('application/xml, text/xml')
export const js = clipboard('application/javascript')
export const json = clipboard('application/json')
export const octet = clipboard('application/octet-stream')
