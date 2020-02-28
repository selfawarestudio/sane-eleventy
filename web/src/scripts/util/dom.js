import { isArray } from './is'

/**
 * A helper function that applies the provide function to the provided
 * item or array of items
 *
 * @param  {*}          x the item or items
 * @param  {function}   fn the function to apply
 * @return {null}
 */
const apply = (x, fn) => {
  if (isArray(x)) {
    for (let i = 0; i < x.length; i++) {
      fn(x[i])
    }
  } else {
    return fn(x)
  }
}

/**
 * A factory function using partial currying to create an event listener util
 *
 * @param  {string}     action 'add' or 'remove' + 'EventListener'
 * @return {function}
 */
const events = (action) => (item, e, fn) =>
  apply(item, (item) => item[`${action}EventListener`](e, fn))

/**
 * A factory function using partial currying to create a classList util
 *
 * @param  {string}    action 'classList.' + 'add', 'remove', 'toggle', or 'contains'
 * @return {function}
 */
const classes = (action) => (item, cn) =>
  apply(item, (item) => item.classList[action](cn))

export const on = (node, ev, cb) => {
  events('add')(node, ev, cb)
  return () => events('remove')(node, ev, cb)
}

export const once = (item, e, fn) =>
  events('add')(item, e, function handler(ev) {
    events('remove')(item, e, handler)
    fn(ev)
  })

export const ready = (fn) => once(document, 'DOMContentLoaded', fn)

export const add = classes('add')
export const remove = classes('remove')
export const toggle = classes('toggle')
export const has = classes('contains')

export const html = document.documentElement
export const body = document.body

// Rather than measuring viewport dimensions using `window.innerWidth` and
// `window.innerHeight`, we store the dimensions of a dom element that we can
// guarantee will always be 100% viewport size. This technique provides
// consistent viewport dimensions, avoiding common bugs/quirks.
//
// Relevant links:
// https://bugs.webkit.org/show_bug.cgi?id=170595
// https://benfrain.com/the-ios-safari-menu-bar-is-hostile-to-web-apps-discuss/
const sizeReferenceElement = document.getElementById('size')
export function size() {
  const bounds = sizeReferenceElement.getBoundingClientRect()
  const width = bounds.width
  const height = bounds.height
  const dpr = window.devicePixelRatio
  const isLandscape = width > height
  return { width, height, dpr, isLandscape }
}

export const parser = new DOMParser()

export const index = (el) => Array.from(el.parentNode.children).indexOf(el)
