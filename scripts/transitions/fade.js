import { animate } from 'motion'
import { outQuart } from '../lib/ease'

const fade = {
  async enter({ from, to }) {
    window.scroll(0, 0)
    from?.remove()

    await animate(
      to,
      { opacity: [0, 1] },
      {
        easing: outQuart,
        duration: 0.6,
      },
    ).finished
  },
  async leave({ from }) {
    await animate(
      from,
      { opacity: 0 },
      {
        easing: outQuart,
        duration: 0.6,
      },
    ).finished
  },
}

export default fade
