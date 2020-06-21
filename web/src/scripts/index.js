import Highway from '@dogstudio/highway'

// renderers
import Base from '@/renderers/Base'

// transitions
import Fade from '@/transitions/Fade'

const H = new Highway.Core({
  renderers: {
    default: Base,
  },
  transitions: {
    default: Fade,
  },
})
