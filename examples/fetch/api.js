import fromFetch from '../../src/signals/sources/fromFetch'

export const good = fromFetch(() => ({
  url: '/good.json'
}))

export const bad = fromFetch(() => ({
  url: '/bad.json'
}))

export const waaat = fromFetch(() => ({
  url: '/waaat.json'
}))
