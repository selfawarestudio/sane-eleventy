import Highway from '@dogstudio/highway'
import * as quicklink from 'quicklink'
import gsap from 'gsap'
import app from './app'
import raf from './lib/raf'
import loadFonts from './lib/loadFonts'
import { on, once, size, remove } from 'martha'
import Fade from './transitions/Fade'

class Base extends Highway.Renderer {
  onLoad() {
    quicklink.listen()
    on(window, 'resize', this.resize)
    on(document, 'mousemove', this.mousemove)
    raf(app)
    gsap.set('[data-router-view]', { autoAlpha: 1 })
    loadFonts(app.getState().fonts)
      .then(this.onLoadCompleted)
      .catch(console.log)
  }

  onLoadCompleted = () => {
    this.mount()
    let { dom } = app.getState()
    once(dom.body, 'transitionend', this.onEnterCompleted)
    remove(dom.body, 'opacity-0')
  }

  onEnter() {
    this.mount()
  }

  onEnterCompleted() {
    app.emit('enter:completed')
  }

  onLeave() {
    this.unmount()
  }

  onLeaveCompleted() {}

  mount = () => {
    app.mount()
    this.resize()
  }

  unmount = () => {
    app.unmount()
  }

  resize = () => {
    app.emit('resize', size())
  }

  mousemove = ({ clientX: mx, clientY: my }) => {
    app.emit('mousemove', { mx, my })
  }

  setup() {
    this.onLoad()
  }
}

const H = new Highway.Core({
  renderers: {
    default: Base,
  },
  transitions: {
    default: Fade,
    contextual: {},
  },
})
