import { component } from 'picoapp'
import gsap from 'gsap'
import { qs, rect } from 'martha'

export default component((node, ctx) => {
  let el = qs('[data-sticky-el]', node)
  let minWidth = ctx.getState().screens?.[node.dataset.screen]
  let nodeRect = null
  let elRect = null

  ctx.on('resize:reset', () => {
    gsap.set(el, { y: 0 })
    nodeRect = rect(node)
    elRect = rect(el)
  })

  ctx.on('tick', ({ scroll, ww }) => {
    if (typeof minWidth === 'undefined' || ww >= minWidth) {
      let top = elRect.top - scroll
      if (top <= 0) {
        let bottom = nodeRect.top + nodeRect.height - scroll
        if (bottom > elRect.height) {
          gsap.set(el, { y: scroll - elRect.top })
        } else {
          const val =
            nodeRect.height - elRect.height - nodeRect.top - elRect.top
          gsap.set(el, { y: val })
        }
      } else {
        gsap.set(el, { y: null })
      }
    } else {
      gsap.set(el, { clearProps: 'y' })
    }
  })

  return () => {}
})
