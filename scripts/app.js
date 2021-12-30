import { picoapp } from 'picoapp'
import { size, qs } from 'martha'

import lazy from './components/lazy'

const components = { lazy }

const sizes = size()
const state = {
  ...sizes,
  mx: sizes.ww / 2,
  my: sizes.wh / 2,
  dom: {
    html: document.documentElement,
    body: document.body,
    scrollProxy: qs('.js-scroll-proxy'),
  },
  fonts: [
    // { family: 'GT Walsheim' },
    // { family: 'GT Walsheim', options: { weight: 300 } },
    // { family: 'GT Walsheim', options: { weight: 300, style: 'italic' } },
  ],
}

export default picoapp(components, state)
