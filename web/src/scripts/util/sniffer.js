import sniffer from 'sniffer'
import cx from 'nanoclass'
import { body } from './dom'

export default function() {
  const ua = navigator.userAgent.toLowerCase()

  const info = sniffer.getInfos()

  const isFacebook = checkFacebook()
  const isTwitter = checkTwitter()
  const isInstagram = checkInstagram()
  const isPinterest = checkPinterest()
  const isAppBrowser = isFacebook || isTwitter || isInstagram || isPinterest

  const appBrowserInfo = cx([
    isFacebook && 'is-facebook',
    isTwitter && 'is-twitter',
    isInstagram && 'is-instagram',
    isPinterest && 'is-pinterest',
    isAppBrowser && 'is-app-browser',
  ])

  sniffer.addClasses(body)

  if (appBrowserInfo.length) {
    body.className += ' ' + appBrowserInfo
  }

  return {
    ...info,
    isFacebook,
    isTwitter,
    isInstagram,
    isPinterest,
    isAppBrowser: isFacebook || isTwitter || isInstagram || isPinterest,
  }

  function checkFacebook() {
    return ua.indexOf('fban') > -1 || ua.indexOf('fbav') > -1
  }

  function checkTwitter() {
    return ua.indexOf('twitter') > -1
  }

  function checkInstagram() {
    return ua.indexOf('instagram') > -1
  }

  function checkPinterest() {
    return ua.indexOf('pinterest') > -1
  }
}
