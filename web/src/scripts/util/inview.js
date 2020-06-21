import { clamp } from '@selfaware/martha'

/**
 * Reports the current scroll percentage of an element within the viewport
 *
 * @param  {HTMLElement} el   Element to track
 * @param  {number}      vh   Current viewport height
 * @return {number}
 */
function scrollPercentage(el, wh) {
  const bounds = el.getBoundingClientRect()
  return 1 - clamp(bounds.bottom / (wh + bounds.height), 0, 1)
}

/**
 * Returns true if the provided element is currently within the viewport
 *
 * @param  {HTMLElement} el   Element to track
 * @param  {number}      vh   Current viewport height
 * @return {boolean}
 */
export default function inview(el, wh) {
  const percent = scrollPercentage(el, wh)
  return percent > 0 && percent < 1
}
