import * as quicklink from 'quicklink'
import { on, size } from 'martha'
import { animate } from 'motion'
import { aware } from './lib/aware'
import app from './app'
import fonts from './lib/fonts'

main()

async function main() {
  quicklink.listen()

  on(window, 'resize', resize)
  on(document, 'mousemove', mousemove)

  await fonts(app.getState().fonts)

  let pjax = aware({
    transitions: {
      default: {
        enter({ from, to }) {
          window.scrollTo(0, 0)
          from && from.remove()
          return animate(to, { opacity: 1 }, { duration: 1 }).finished
        },
        leave({ from }) {
          return animate(from, { opacity: 0 }, { duration: 1 }).finished
        },
      },
      test: {
        enter({ from, to, leaveCancelled }) {
          window.scrollTo(0, 0)
          from && from.remove()
          return animate(
            to,
            { opacity: 1, x: leaveCancelled ? 0 : [-10, 0] },
            { duration: 1 },
          ).finished
        },
        leave({ from }) {
          return animate(from, { opacity: 0, x: 10 }, { duration: 1 }).finished
        },
      },
    },
  })

  pjax.on('beforeLeave', () => {
    console.log('beforeLeave')
    app.unmount()
  })

  pjax.on('afterLeave', () => {
    console.log('afterLeave')
  })

  pjax.on('beforeEnter', () => {
    console.log('beforeEnter')
    resize()
    app.mount()
  })

  pjax.on('afterEnter', () => {
    console.log('afterEnter')
    console.log('---')
  })

  pjax.on('leaveCancelled', ({ from }) => {
    animate(from, { x: 0 }, { duration: 1 })
    console.log('---')
    console.log('%cleaveCancelled', 'font-weight:700;color:blue;')
  })

  pjax.on('enterCancelled', () => {
    console.log('---')
    console.log('%centerCancelled', 'font-weight:700;color:blue;')
  })

  pjax.on('error', error => {
    console.log('%cerror', 'font-weight:700;color:red;', error)
  })

  pjax.on('samePage', () => {
    console.log('samePage')
    console.log('---')
  })
}

function resize() {
  app.emit('resize', size())
}

function mousemove({ x, y }) {
  app.emit('mousemove', { mx: x, my: y })
}
