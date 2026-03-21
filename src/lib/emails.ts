import { Resend } from 'resend'

let _resend: Resend | null = null
function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY || '')
  }
  return _resend
}

const FROM_EMAIL = 'Etudia <noreply@etudia.com>'
const BRAND_COLOR = '#6366f1' // indigo-500

function baseUrl(): string {
  return process.env.NEXTAUTH_URL || 'https://etudia.vercel.app'
}

// ──────────────────────────────────────────────
// Layout HTML commun
// ──────────────────────────────────────────────
function emailLayout(title: string, content: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 20px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;">
<!-- Header -->
<tr><td style="background:${BRAND_COLOR};padding:28px 32px;text-align:center;">
<h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.5px;">etudia</h1>
</td></tr>
<!-- Content -->
<tr><td style="padding:32px;">
${content}
</td></tr>
<!-- Footer -->
<tr><td style="padding:20px 32px;background:#fafafa;border-top:1px solid #e4e4e7;text-align:center;">
<p style="margin:0;color:#a1a1aa;font-size:12px;">© ${new Date().getFullYear()} Etudia. Tous droits réservés.</p>
<p style="margin:4px 0 0;color:#a1a1aa;font-size:12px;">
<a href="${baseUrl()}" style="color:#6366f1;text-decoration:none;">etudia.vercel.app</a>
</p>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`
}

function button(text: string, url: string): string {
  return `<table cellpadding="0" cellspacing="0" style="margin:24px 0;">
<tr><td style="background:${BRAND_COLOR};border-radius:8px;padding:12px 28px;">
<a href="${url}" style="color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;display:inline-block;">${text}</a>
</td></tr></table>`
}

function paragraph(text: string): string {
  return `<p style="margin:0 0 16px;color:#27272a;font-size:15px;line-height:1.6;">${text}</p>`
}

function highlight(text: string): string {
  return `<div style="background:#f4f4f5;border-radius:8px;padding:16px 20px;margin:16px 0;">
<p style="margin:0;color:#27272a;font-size:14px;font-family:monospace;">${text}</p>
</div>`
}

// ──────────────────────────────────────────────
// 1. Candidature acceptée
// ──────────────────────────────────────────────
export async function sendApplicationAccepted(
  to: string,
  name: string,
  tempPassword: string,
  referralCode: string
): Promise<boolean> {
  const loginUrl = `${baseUrl()}/fr/partenaire/connexion`

  const html = emailLayout('Candidature acceptée !', `
    <h2 style="margin:0 0 16px;color:#18181b;font-size:20px;font-weight:700;">Félicitations ${name} ! 🎉</h2>
    ${paragraph('Ta candidature a été acceptée ! Tu fais maintenant partie des ambassadeurs Etudia.')}
    ${paragraph('Voici tes identifiants pour accéder à ton espace ambassadeur :')}
    ${highlight(`📧 Email : ${to}<br>🔑 Mot de passe temporaire : ${tempPassword}<br>🔗 Code affilié : ${referralCode}`)}
    ${paragraph('⚠️ <strong>Pense à changer ton mot de passe</strong> après ta première connexion.')}
    ${button('Accéder à mon espace', loginUrl)}
    ${paragraph('À bientôt dans l\'aventure Etudia !')}
  `)

  return sendEmail(to, 'Candidature acceptée — Bienvenue chez Etudia !', html)
}

// ──────────────────────────────────────────────
// 2. Candidature refusée
// ──────────────────────────────────────────────
export async function sendApplicationRejected(
  to: string,
  name: string,
  reason?: string
): Promise<boolean> {
  const html = emailLayout('Candidature — Réponse', `
    <h2 style="margin:0 0 16px;color:#18181b;font-size:20px;font-weight:700;">Bonjour ${name},</h2>
    ${paragraph('Merci pour ta candidature chez Etudia. Nous l\'avons examinée avec attention.')}
    ${paragraph('Malheureusement, nous ne pouvons pas l\'accepter pour le moment.')}
    ${reason ? paragraph(`<strong>Raison :</strong> ${reason}`) : ''}
    ${paragraph('Cela ne veut pas dire que c\'est définitif ! Tu peux re-postuler dans le futur, notamment si ta communauté grandit ou si de nouvelles thématiques s\'ouvrent.')}
    ${button('Voir nos produits', `${baseUrl()}/fr`)}
    ${paragraph('Merci pour ton intérêt et à bientôt !')}
  `)

  return sendEmail(to, 'Candidature Etudia — Notre réponse', html)
}

// ──────────────────────────────────────────────
// 3. Confirmation de paiement
// ──────────────────────────────────────────────
export async function sendPaymentConfirmation(
  to: string,
  name: string,
  amount: number,
  paymentMethod: string
): Promise<boolean> {
  const formattedAmount = amount.toFixed(2).replace('.', ',') + '€'

  const html = emailLayout('Paiement envoyé', `
    <h2 style="margin:0 0 16px;color:#18181b;font-size:20px;font-weight:700;">Paiement envoyé ! 💸</h2>
    ${paragraph(`Bonjour ${name},`)}
    ${paragraph(`Ton paiement de <strong>${formattedAmount}</strong> a été envoyé sur ton compte ${paymentMethod}.`)}
    ${highlight(`💰 Montant : ${formattedAmount}<br>📅 Date : ${new Date().toLocaleDateString('fr-FR')}<br>💳 Méthode : ${paymentMethod}`)}
    ${paragraph('Le virement peut prendre 1 à 3 jours ouvrés pour apparaître sur ton compte.')}
    ${button('Voir mes revenus', `${baseUrl()}/fr/partenaire/revenus`)}
    ${paragraph('Continue comme ça ! 🚀')}
  `)

  return sendEmail(to, `Paiement de ${formattedAmount} envoyé — Etudia`, html)
}

// ──────────────────────────────────────────────
// 4. Récap mensuel
// ──────────────────────────────────────────────
export async function sendMonthlyRecap(
  to: string,
  name: string,
  month: string,
  newReferrals: number,
  commissionAmount: number
): Promise<boolean> {
  const formattedAmount = commissionAmount.toFixed(2).replace('.', ',') + '€'

  const html = emailLayout(`Récap ${month}`, `
    <h2 style="margin:0 0 16px;color:#18181b;font-size:20px;font-weight:700;">Ton récap du mois de ${month} 📊</h2>
    ${paragraph(`Bonjour ${name},`)}
    ${paragraph('Voici ton résumé pour ce mois :')}
    ${highlight(`👥 Nouvelles inscriptions : <strong>${newReferrals}</strong><br>💰 Commissions générées : <strong>${formattedAmount}</strong>`)}
    ${newReferrals > 0
      ? paragraph('Beau travail ! Continue à partager tes liens pour augmenter tes revenus.')
      : paragraph('Ce mois a été calme, mais chaque effort compte. N\'hésite pas à partager tes liens !')}
    ${button('Voir mon dashboard', `${baseUrl()}/fr/partenaire/dashboard`)}
  `)

  return sendEmail(to, `Récap ${month} — Etudia`, html)
}

// ──────────────────────────────────────────────
// 5. Reset de mot de passe
// ──────────────────────────────────────────────
export async function sendPasswordReset(
  to: string,
  name: string,
  resetToken: string
): Promise<boolean> {
  const resetUrl = `${baseUrl()}/fr/partenaire/reset-password?token=${resetToken}`

  const html = emailLayout('Réinitialisation du mot de passe', `
    <h2 style="margin:0 0 16px;color:#18181b;font-size:20px;font-weight:700;">Réinitialisation du mot de passe</h2>
    ${paragraph(`Bonjour ${name},`)}
    ${paragraph('Tu as demandé à réinitialiser ton mot de passe. Clique sur le bouton ci-dessous :')}
    ${button('Réinitialiser mon mot de passe', resetUrl)}
    ${paragraph('⏰ Ce lien expire dans <strong>1 heure</strong>.')}
    ${paragraph('Si tu n\'as pas fait cette demande, ignore cet email. Ton mot de passe ne sera pas modifié.')}
  `)

  return sendEmail(to, 'Réinitialise ton mot de passe — Etudia', html)
}

// ──────────────────────────────────────────────
// 6. Confirmation de candidature (accusé de réception)
// ──────────────────────────────────────────────
export async function sendApplicationReceived(
  to: string,
  name: string
): Promise<boolean> {
  const html = emailLayout('Candidature reçue', `
    <h2 style="margin:0 0 16px;color:#18181b;font-size:20px;font-weight:700;">Candidature reçue ! 📬</h2>
    ${paragraph(`Bonjour ${name},`)}
    ${paragraph('Merci pour ta candidature chez Etudia ! Nous l\'avons bien reçue.')}
    ${paragraph('Notre équipe va l\'examiner et te répondre <strong>sous 48h</strong>.')}
    ${paragraph('En attendant, tu peux :')}
    <ul style="color:#27272a;font-size:15px;line-height:1.8;margin:0 0 16px;padding-left:20px;">
      <li>Découvrir nos applications</li>
      <li>En apprendre plus sur notre programme ambassadeur</li>
    </ul>
    ${button('Voir nos applications', `${baseUrl()}/fr`)}
    ${paragraph('À très vite !')}
  `)

  return sendEmail(to, 'Candidature reçue — Etudia', html)
}

// ──────────────────────────────────────────────
// Envoi générique
// ──────────────────────────────────────────────
async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  // Skip in development if no API key
  if (!process.env.RESEND_API_KEY) {
    console.log(`[EMAIL SKIP] To: ${to} | Subject: ${subject}`)
    return true
  }

  try {
    const { error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    })

    if (error) {
      console.error('[EMAIL ERROR]', error)
      return false
    }

    return true
  } catch (err) {
    console.error('[EMAIL ERROR]', err)
    return false
  }
}
