import { picoapp } from 'picoapp'
import { size } from 'martha'

const components = {}

const state = {
  ...size(),
  mouse: {},
  time: 0,
  deltaTime: 0,
  frame: 0,
}

export default picoapp(components, state)
