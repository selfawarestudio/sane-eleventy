import Highway from '@dogstudio/highway'
import { listen } from 'quicklink'
import { on, size, remove } from '@selfaware/martha'
// import loadFonts from '@/util/loadFonts'
import gsap from 'gsap'
import app from '@/app'

class Base extends Highway.Renderer {
  onFirstLoad() {
    // automatically prefetch URLs for links that are in-viewport during idle time
    listen()

    // broadcast resize event
    on(window, 'resize', this.resize)

    // setup render loop
    gsap.ticker.add(this.tick)

    gsap.set('[data-router-view]', { autoAlpha: 1 })

    // loadFonts([
    //   {
    //     family: 'Lorem Ipsum',
    //     options: {
    //       weight: 700,
    //     },
    //   },
    // ]).then(() => {
    //   this.mount()
    //   remove(document.body, 'o0')
    // })

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
