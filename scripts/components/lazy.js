import { component } from 'picoapp'
import { noop, on, remove } from 'martha'
import choozy from 'choozy'

export default component((node, ctx) => {
  let offLoad = noop
  let offEnd = noop

  ctx.on('enter:completed', () => {
    let refs = choozy(node)

    offLoad = on(refs.img, 'load', () => {
      offLoad()
      offLoad = noop

      if (refs?.lqip) {
        offEnd = on(refs.img, 'transitionend', () => {
          offEnd()
          offEnd = noop
          refs.lqip.remove()
        })
      }

      remove(refs.img, 'opacity-0')
    })

    refs.img.src = refs.img.dataset.src
    refs.img.removeAttribute('data-src')
  })

  return () => {
    offLoad()
    offEnd()
  }
})
