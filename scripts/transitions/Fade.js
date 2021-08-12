import Highway from '@dogstudio/highway'
import gsap from 'gsap'

class Fade extends Highway.Transition {
  in({ from, to, done }) {
    window.scrollTo(0, 0)
    from.remove()
    gsap.to(to, {
      duration: 0.5,
      autoAlpha: 1,
      onComplete: done,
    })
  }

  out({ from, done }) {
    gsap.to(from, {
      duration: 0.5,
      autoAlpha: 0,
      onComplete: done,
    })
  }
}

export default Fade
