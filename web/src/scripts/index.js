import app from '@/app'
import router from '@/router'
import gsap from 'gsap'
import { on, size } from '@selfaware/martha'

// broadcast resize event
on(window, 'resize', resize)

// setup render loop
gsap.ticker.add(tick)

// mount picoapp
app.mount()
resize()

router.on('NAVIGATE_IN', () => {
  app.unmount()
  app.mount()
})

function resize() {
  app.emit('resize', size())
}

function tick() {
  app.emit('tick')
}
