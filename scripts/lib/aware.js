import smitter from 'smitter'
import { qs, on } from 'martha'

export function aware({ transitions }) {
  let IDLE = 'idle'
  let LEAVING = 'leaving'
  let ENTERING = 'entering'

  let emitter = smitter()

  let cache = {
    [window.location.pathname]: document.documentElement.outerHTML,
  }

  let root = qs('[a-root]')
  let from = qs('[a-page]', root)
  let to = null

  let abortController,
    parser = new DOMParser()

  let status = IDLE
  let leaveCancelled = false
  let enterCancelled = false

  on(document, 'click', ev => {
    if (
      ev.ctrlKey ||
      ev.metaKey ||
      ev.altKey ||
      ev.shiftKey ||
      ev.defaultPrevented
    ) {
      return
    }

    let el = ev.target.closest(
      'a[href]:not([target]):not([href|="#"]):not([a-ignore])',
    )

    if (!el) return

    let href = el.getAttribute('href')
    let url = new URL(href, window.location.origin)
    let transition = el.getAttribute('a-transition') ?? 'default'

    if (url.pathname !== window.location.pathname) {
      go(url.href, false, transition)
    } else {
      emitter.emit('samePage')
    }

    ev.preventDefault()
  })

  on(window, 'popstate', () => {
    go(window.location.href, true)
  })

  transitions.default.enter({ to: from })

  return {
    on: emitter.on,
    go: href => go(href),
  }

  async function go(href, popping = false, transition = 'default') {
    try {
      let { leave, enter } = transitions[transition]

      let html = null
      from = qs('[a-page]', root)

      if (status === LEAVING) {
        leaveCancelled = true
        abortController.abort()
        emitter.emit('leaveCancelled', { href, from })
        interruptLeaveWithEnter(href, popping, transition)
        return
      }

      if (status === ENTERING) {
        enterCancelled = true
        emitter.emit('enterCancelled', { href, from, to })
      }

      status = LEAVING

      emitter.emit('beforeLeave', { href, from })

      if (!popping) {
        window.history.pushState(null, '', href)
      }

      html = (await Promise.all([get(href), leave({ from })]))[0]

      if (leaveCancelled) {
        leaveCancelled = false
        return
      }

      if (!html) return

      emitter.emit('afterLeave', { href, from })

      status = ENTERING
      let doc = parser.parseFromString(html, 'text/html')
      to = qs('[a-page]', doc)
      document.title = qs('title', doc).textContent
      root.append(to)
      emitter.emit('beforeEnter', { href, from, to })
      await enter({ from, to })

      if (enterCancelled) {
        enterCancelled = false
        return
      }

      emitter.emit('afterEnter', { href, from, to })

      status = IDLE
    } catch (error) {
      if (error.name === 'AbortError') return
      emitter.emit('error', error)
    }
  }

  async function interruptLeaveWithEnter(href, popping, transition) {
    if (status === ENTERING) {
      enterCancelled = true
      emitter.emit('enterCancelled')
    }

    status = ENTERING

    let to = qs('[a-page]', root)

    if (!popping) {
      window.history.pushState(null, '', href)
    }

    emitter.emit('beforeEnter', { href, to })
    await transitions[transition].enter({ to, leaveCancelled: true })

    if (enterCancelled) {
      enterCancelled = false
      return
    }

    emitter.emit('afterEnter', { href, to })

    status = IDLE
  }

  async function get(href) {
    abortController = new AbortController()

    let html = cache[href]

    if (html) return html

    html = await fetch(href, {
      credentials: 'include',
      signal: abortController.signal,
    }).then(res => res.text())

    cache[href] = html

    return html
  }
}
