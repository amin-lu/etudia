/**
 * Etudia Referral Tracker — Script autonome
 *
 * À intégrer dans chaque app SaaS du catalogue Etudia.
 * Détecte ?ref=CODE, stocke en cookie 30j, et enregistre le clic.
 *
 * Usage (dans le <head> de l'app) :
 * <script src="https://etudia.vercel.app/tracking/etudia-referral.js"
 *         data-app="etudiet"
 *         data-api="https://etudia.vercel.app"
 *         defer></script>
 *
 * Pour enregistrer une inscription (côté JS de l'app) :
 * window.etudiaTrackReferral('user-id-123')
 */
;(function () {
  var COOKIE_NAME = 'etudia_ref'
  var COOKIE_DAYS = 30

  // Récupérer la config depuis l'attribut du script
  var script = document.currentScript
  var appSlug = script ? script.getAttribute('data-app') : null
  var apiBase = script ? script.getAttribute('data-api') || '' : ''

  if (!appSlug) {
    console.warn('[Etudia] data-app manquant sur le script de tracking')
    return
  }

  // Lire le paramètre ?ref= de l'URL
  var params = new URLSearchParams(window.location.search)
  var refCode = params.get('ref')

  if (refCode) {
    // Stocker en cookie
    var expires = new Date()
    expires.setTime(expires.getTime() + COOKIE_DAYS * 24 * 60 * 60 * 1000)
    document.cookie =
      COOKIE_NAME +
      '=' +
      encodeURIComponent(refCode) +
      ';expires=' +
      expires.toUTCString() +
      ';path=/;SameSite=Lax'

    // Enregistrer le clic
    fetch(apiBase + '/api/track/click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        referralCode: refCode,
        applicationSlug: appSlug,
      }),
    }).catch(function () {
      // Silent fail
    })
  }

  // Fonction pour lire le cookie
  function getRefCode() {
    var match = document.cookie.match(
      new RegExp('(^| )' + COOKIE_NAME + '=([^;]+)')
    )
    return match ? decodeURIComponent(match[2]) : null
  }

  // Exposer la fonction pour tracker les inscriptions
  window.etudiaTrackReferral = function (userId) {
    var code = getRefCode()
    if (!code) return Promise.resolve(false)

    return fetch(apiBase + '/api/track/referral', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        referralCode: code,
        applicationSlug: appSlug,
        userId: userId,
      }),
    })
      .then(function (res) {
        return res.ok
      })
      .catch(function () {
        return false
      })
  }

  // Exposer le code référent
  window.etudiaGetRefCode = getRefCode
})()
