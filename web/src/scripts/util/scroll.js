import { clamp } from './math'
import { on } from './dom'

export function rafScroll(cb) {
  let tick = false
  let lastScrollY = 0

  const off = on(window, 'scroll', raf)

  function raf(e) {
    if (tick) return
    requestAnimationFrame(run(e))
    tick = true
  }

  function run(e) {
    return () => {
      let scrollY = pageYOffset
      let delta = -(scrollY - lastScrollY)
      lastScrollY = scrollY
      cb(scrollY, delta, e)
      tick = false
    }
  }

  return off
}

export function scrollPercentage(el) {
  const bounds = el.getBoundingClientRect()
  const vh = window.innerHeight
  const threshold = 0
  const offsetTop = threshold * vh * 0.25
  const offsetBottom = threshold * vh * 0.25

  return (
    1 -
    clamp(
      (bounds.bottom - offsetTop) /
        (vh + bounds.height - offsetBottom - offsetTop),
      0,
      1,
    )
  )
}

export function scrollReset() {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  } else {
    window.onbeforeunload = function() {
      window.scrollTo(0, 0)
    }
  }
}
