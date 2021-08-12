export default function allToArray(obj) {
  return Object.entries(obj).reduce((acc, [key, val]) => {
    acc[key] = [val].flat()
    return acc
  }, {})
}
