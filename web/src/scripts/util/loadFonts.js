const FontFaceObserver = require('fontfaceobserver')

export default function loadFonts(fontManifest) {
  return new Promise((resolve, reject) => {
    const observers = fontManifest.map(
      (entry) => new FontFaceObserver(entry.family, entry.options),
    )

    Promise.all(observers.map((font) => font.load()))
      .then((res) => {
        // if (process.env.NODE_ENV !== 'production') {
        //   console.group('FontFaceObserver')
        //   res.forEach((font) =>
        //     console.log(`Loaded ${font.family} (${font.style})`),
        //   )
        //   console.groupEnd()
        // }
        resolve()
      })
      .catch(() => {
        // if (process.env.NODE_ENV !== 'production') {
        //   console.warn('FFO: 3s loading timeout exceeded.')
        // }
        reject()
      })
  })
}
