import Highway from '@dogstudio/highway'

// renderers
import base from '@/renderers/base'

// transitions
import instant from '@/transitions/instant'

const H = new Highway.Core({
  renderers: {
    default: base,
  },
  transitions: {
    default: instant,
  },
})
