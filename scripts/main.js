import 'focus-visible'
import { listen } from 'quicklink'
import { on, size } from 'martha'
import { create } from 'alio'
import app from './app'
import raf from './lib/raf'
import fonts from './lib/fonts'
import fade from './transitions/fade'

main()

async function main() {
  listen()

  on(window, 'resize', resize)
  on(document, 'mousemove', mousemove)
  raf(tick)

  await fonts([
    // { family: 'Example' },
    // { family: 'Example', options: { style: 'italic' } },
    // { family: 'Example', options: { weight: 700 } },
  ])

  const pjax = create({
    transitions: {
      default: fade,
    },
  })

  pjax.on('beforeLeave', () => {
    app.unmount()
  })

  pjax.on('beforeEnter', () => {
    app.mount()
    resize()
  })
}

function resize() {
  app.emit('resize', size())
}

function mousemove(ev) {
  app.emit('mousemove', { mouse: ev })
}

function tick(time, deltaTime, frame) {
  app.emit('tick', { time, deltaTime, frame })
}
