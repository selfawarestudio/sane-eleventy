import Highway from '@dogstudio/highway'
import { on, size } from '@selfaware/martha'
import gsap from 'gsap'
import app from '@/app'

class Base extends Highway.Renderer {
  onFirstLoad() {
    // broadcast resize event
    on(window, 'resize', this.resize)

    // setup render loop
    gsap.ticker.add(this.tick)

    // mount picoapp
    this.mount()
  }

  onEnter() {
    this.mount()
  }

  onEnterCompleted() {}

  onLeave() {
    this.unmount()
  }

  onLeaveCompleted() {}

  resize = () => {
    app.emit('resize', size())
  }

  tick = () => {
    app.emit('tick')
  }

  mount = () => {
    app.mount()
    this.resize()
  }

  unmount = () => {
    app.unmount()
  }

  setup() {
    this.onFirstLoad()
  }
}

export default Base
