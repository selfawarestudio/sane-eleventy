const Stats = require('stats.js')

module.exports = function() {
  const stats = new Stats()

  stats.domElement.style.cssText =
    'position:fixed;left:0;bottom:0px;z-index:10000'
  stats.domElement.id = 'stats'

  if (!document.getElementById('stats')) {
    document.body.appendChild(stats.domElement)
  }

  requestAnimationFrame(update)

  function update() {
    stats.update()
    requestAnimationFrame(update)
  }
}
