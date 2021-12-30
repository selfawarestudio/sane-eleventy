import FFO from 'fontfaceobserver'

export default function fonts(m) {
  return Promise.all(
    m.map((entry) => new FFO(entry.family, entry.options).load()),
  )
}
