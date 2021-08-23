import { component } from 'picoapp'
import { on, rect } from 'martha'
import gsap from 'gsap'

export default component((node, ctx) => {
  ctx.on('resize', ({ dom }) => {
    gsap.set(dom.scrollProxy, { height: rect(node).height })
    gsap.set(node, { y: 0 })
    ctx.emit('resize:reset')
  })

  ctx.on('tick', ({ scroll }) => {
    gsap.set(node, { y: -scroll })
  })

  let offKeydown = on(document, 'keydown', ({ key }) => {
    if (key !== 'Tab') return

    requestAnimationFrame(() => {
      const { wh } = ctx.getState()
      const activeEl = document.activeElement
      const bounds = rect(activeEl)
      const isFullyVisible = bounds.top >= 0 && bounds.bottom <= wh

      if (!isFullyVisible) {
        const midY = wh * 0.5 - bounds.height * 0.5
        const offset = window.scrollY + bounds.top - midY
        window.scroll(0, offset)
      }
    })
  })

  return () => {
    offKeydown()
    gsap.set(ctx.getState().dom.scrollProxy, { height: 0 })
  }
})
