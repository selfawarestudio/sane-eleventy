/**
 * Clamp a value between two bounds
 *
 * @param  {number} v   Value to clamp
 * @param  {number} min Minimum boundary
 * @param  {number} max Maximum boundary
 * @return {number}     Clamped value
 */
export function clamp(value, min = 0, max = 1) {
  return value < min ? min : value > max ? max : value
}

/**
 * Diagonal of a rectangle
 *
 * @param  {number} w Width
 * @param  {number} h Height
 * @return {number}   Diagonal length
 */
export function diagonal(w, h) {
  return Math.sqrt(w * w + h * h)
}

/**
 * Distance between two points
 *
 * @param  {number} x1 X coord of the first point
 * @param  {number} y1 Y coord of the first point
 * @param  {number} x2 X coord of the second point
 * @param  {number} y2 Y coord of the second point
 * @return {number}    Computed distance
 */
export function distance(x1, y1, x2, y2) {
  const dx = x1 - x2
  const dy = y1 - y2
  return Math.sqrt(dx * dx + dy * dy)
}

/**
 * Linear interpolation (lerp)
 *
 * @param  {number} v0 current value
 * @param  {number} y1 target value
 * @param  {number} t  progress
 * @return {number}    Interpolated value
 */
export function lerp(v0, v1, t) {
  return v0 * (1 - t) + v1 * t
}

/**
 * Re-maps a number from one range to another
 *
 * @param  {number} value  The incoming value to be converted
 * @param  {number} start1 Lower bound of the value's current range
 * @param  {number} stop1  Upper bound of the value's current range
 * @param  {number} start2 Lower bound of the value's target range
 * @param  {number} stop2  Upper bound of the value's target range
 * @return {number}        Remapped number
 */
export function map(value, start1, stop1, start2, stop2) {
  return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2
}

/**
 * Normalize a value between two bounds
 *
 * @param  {number} value Value to normalize
 * @param  {number} min   Minimum boundary
 * @param  {number} max   Maximum boundary
 * @return {number}       Normalized value
 */
export function norm(value, min, max) {
  return (value - min) / (max - min)
}

/**
 * Rounds a value
 *
 * @param  {number} v  Value to round
 * @param  {number} p  Precision
 * @return {number}    Rounded value
 */
export function round(v, p = 1000) {
  return Math.round(v * p) / p
}

/**
 * Wrap a value around the given length using the modulo operator
 *
 * e.g. wrap(1, 3) // 1
 *      wrap(3, 3) // 0
 *      wrap(-1, 3) // 2
 *
 * @param  {number} index  Index
 * @param  {number} length Length
 * @return {number}        Looped index
 */
export function wrap(index, length) {
  if (index < 0) {
    index = length + (index % length)
  }
  if (index >= length) {
    return index % length
  }
  return index
}
