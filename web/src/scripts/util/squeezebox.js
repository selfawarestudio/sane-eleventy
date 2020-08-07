import choozy from 'choozy'
import { on, add, remove, has } from '@selfaware/martha'

export default function squeezebox(
  node,
  { openMultiple = false, strictMode = -1, autoResize = false } = {},
) {
  const { headers, panels, inners } = choozy(node)
  let offResize = null
  const fns = []

  setAttributes(headers, panels)

  if (autoResize) {
    resize()
    offResize = on(window, 'resize', resize)
  }

  let offClick = on(headers, 'click', (ev) => {
    const header = ev.currentTarget
    const index = parseInt(header.dataset.index)
    const panel = panels[index]

    const otherHeaders = removeIndexFromArray(headers, index)
    const otherPanels = removeIndexFromArray(panels, index)

    if (has(panel, 'is-hidden')) {
      expand(header, panel)

      fns.forEach((fn) => fn({ type: 'expand', index, header, panel }))

      if (openMultiple) return

      otherHeaders.forEach((header, i) => {
        collapse(header, otherPanels[i])
      })
    } else {
      if (strictMode > -1) return

      collapse(header, panel)

      fns.forEach((fn) => fn({ type: 'collapse', index, header, panel }))
    }
  })

  function expand(header, panel) {
    let off = on(panel, 'transitionend', () => {
      off()
      fns.forEach((fn) => fn({ type: 'transitionend', header, panel }))
    })

    header.setAttribute('aria-expanded', true)
    remove(panel, 'is-hidden')
  }

  function collapse(header, panel) {
    header.setAttribute('aria-expanded', false)
    add(panel, 'is-hidden')
  }

  function setAttributes(headers, panels) {
    headers.forEach((header, i) => {
      header.setAttribute('aria-controls', `panel-${i}`)
      header.setAttribute('id', `header-${i}`)
      header.setAttribute('data-index', i)
      header.setAttribute('aria-expanded', strictMode > -1 && strictMode === i)
    })

    panels.forEach((panel, i) => {
      panel.setAttribute('role', 'region')
      panel.setAttribute('aria-labelledby', `header-${i}`)
      panel.setAttribute('id', `panel-${i}`)

      if (strictMode > -1 && i === strictMode) return

      add(panel, 'is-hidden')
    })
  }

  function resize() {
    panels.forEach((panel, i) => {
      panel.style.maxHeight = inners[i].clientHeight + 'px'
    })
  }

  function removeIndexFromArray(array, index) {
    const left = array.slice(0, index)
    const right = array.slice(index + 1)
    return left.concat(right)
  }

  return {
    resize,
    unmount() {
      autoResize && offResize()
      offClick()
    },
    onChange(fn) {
      fns.push(fn)
      return () => fns.splice(fns.indexOf(fn), 1)
    },
  }
}
