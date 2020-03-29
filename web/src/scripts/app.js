import { picoapp } from 'picoapp'
import { size } from '@selfaware/martha'

const components = {}

const state = {
  ...size(),
}

export default picoapp(components, state)
