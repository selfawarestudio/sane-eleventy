/**
 * Run a callback function once per animation frame
 * @param cb A function to call each animation frame
 *
 */
export default function raf(cb) {
  let last = 0
  let frame = 0

  let tick = time => {
    window.requestAnimationFrame(tick)
    let deltaTime = time - last
    last = time
    cb(time, deltaTime, frame)
    frame++
  }

  window.requestAnimationFrame(tick)
}
