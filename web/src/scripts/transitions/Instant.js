import Highway from '@dogstudio/highway'

class Instant extends Highway.Transition {
  in({ from, to, done }) {
    window.scrollTo(0, 0)
    from.remove()
    done()
  }

  out({ from, done }) {
    done()
  }
}

export default Instant
