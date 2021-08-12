import { rect, clamp } from 'martha'

function scrollPercentage(el, wh) {
  const bounds = rect(el)
  return 1 - clamp(bounds.bottom / (wh + bounds.height), 0, 1)
}

export default function inview(el, wh) {
  const percent = scrollPercentage(el, wh)
  return percent > 0 && percent < 1
}
