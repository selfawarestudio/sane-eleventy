import gsap from 'gsap'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import { rect, qs, on, round, lerp } from 'martha'

gsap.registerPlugin(ScrollToPlugin)

export default function raf(app) {
  let target = 0
  let current = 0
  let ease = 0.15

  gsap.ticker.fps(-1)
  gsap.ticker.add(tick)

  on(window, 'scroll', scroll)
  app.on('scroll:to', scrollTo)
  app.on('scroll:reset', reset)
  app.on('resize:reset', resize)

  function tick() {
    current =
      app.getState().ww >= 768
        ? round(lerp(current, target, ease), 100)
        : target
    app.emit('tick', { scroll: current })
  }

  function scroll() {
    target = window.scrollY
  }

  function scrollTo(_, target) {
    const top = target.offsetTop
    const offset = top === 0 ? target.parentNode.offsetTop : top
    const padding = rect(qs('[data-scroll-padding-top]'))?.bottom ?? 0

    gsap.to(window, {
      scrollTo: offset - padding,
      duration: 0.5,
      ease: 'expo.inOut',
    })
  }

  function reset() {
    target = current = 0
  }

  function resize() {
    current = target
  }
}
