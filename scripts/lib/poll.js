export default function poll(delay, cb, first = true) {
  let timeoutId
  first ? cb(done) : done()
  function done() {
    timeoutId = setTimeout(() => cb(done), delay)
  }
  return () => clearTimeout(timeoutId)
}
