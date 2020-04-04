import Highway from '@/lib/highway'
import instant from '@/transitions/instant'

export default new Highway.Core({
  renderers: {},
  transitions: {
    default: instant,
  },
})
