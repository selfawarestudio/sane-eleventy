import 'focus-visible'
import app from '@/app'
import router from '@/router'
import { ready } from '@/util/dom'

ready(() => {
  app.mount()

  router.on('NAVIGATE_IN', () => {
    app.unmount()
    app.mount()
  })
})
