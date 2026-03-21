import { Metadata } from 'next'

export const generateMetadata = (): Metadata => {
  return {
    title: 'Politique de Confidentialité | Etudia',
    description: 'Politique de confidentialité et protection des données personnelles Etudia',
  }
}

export default function PrivacyPage() {
  return (
    <article>
      <h1 className="text-4xl font-bold text-foreground mb-8">Politique de Confidentialité</h1>
      <p className="text-foreground/70 mb-8">Dernière mise à jour : Mars 2026</p>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">1. Responsable du Traitement</h2>
        <p className="text-foreground/80">
          Etudia SAS, avec adresse au siège social, est responsable du traitement de vos données personnelles. Pour toute question concernant la protection de vos données, contactez-nous à hello@etudia.io
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">2. Données Collectées</h2>
        <p className="text-foreground/80 mb-4">Nous collectons les données personnelles suivantes :</p>
        <ul className="list-disc list-inside text-foreground/80 space-y-2">
          <li><strong>Pour les candidatures partenaires :</strong> nom, email, lien profil, nombre d'abonnés, thématique, message (optionnel)</li>
          <li><strong>Pour les abonnements produits :</strong> email, nom, informations de paiement (traité par Stripe)</li>
          <li><strong>Pour les idées de produits :</strong> nom, email, détails de l'idée</li>
          <li><strong>Données de navigation :</strong> adresse IP, type de navigateur, pages visitées, durée de visite</li>
          <li><strong>Cookies :</strong> identifiants de session, préférences de langue</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">3. Base Légale du Traitement</h2>
        <p className="text-foreground/80 mb-4">Nous traitons vos données sur la base de :</p>
        <ul className="list-disc list-inside text-foreground/80 space-y-2">
          <li><strong>Contrat :</strong> exécution du partenariat ou de votre abonnement</li>
          <li><strong>Consentement :</strong> à votre demande, notamment pour la newsletter</li>
          <li><strong>Obligation légale :</strong> conformité fiscale et comptable</li>
          <li><strong>Intérêt légitime :</strong> amélioration de nos services et sécurité</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">4. Utilisation des Données</h2>
        <p className="text-foreground/80 mb-4">Vos données sont utilisées pour :</p>
        <ul className="list-disc list-inside text-foreground/80 space-y-2">
          <li>Traiter votre candidature de partenariat</li>
          <li>Gérer votre compte et accès à la plateforme</li>
          <li>Traiter vos paiements et commissions</li>
          <li>Vous envoyer des communications importantes (notifications de paiement, etc.)</li>
          <li>Analyser l'usage de nos services pour amélioration continue</li>
          <li>Prévenir les fraudes et abus</li>
          <li>Respecter nos obligations légales</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">5. Cookies</h2>
        <p className="text-foreground/80 mb-4">
          Nous utilisons des cookies essentiels pour le fonctionnement du site (authentification, préférences de langue) et des cookies analytiques pour comprendre votre utilisation (Google Analytics, Sentry).
        </p>
        <p className="text-foreground/80">
          Vous pouvez configurer vos préférences de cookies ou les refuser via les paramètres de votre navigateur. Refuser les cookies analytiques n'affectera pas le fonctionnement du site.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">6. Partage des Données</h2>
        <p className="text-foreground/80 mb-4">
          Vos données ne sont jamais vendues. Elles sont partagées uniquement avec :
        </p>
        <ul className="list-disc list-inside text-foreground/80 space-y-2">
          <li><strong>Prestataires techniques :</strong> Supabase (base de données), Vercel (hébergement), Stripe (paiements)</li>
          <li><strong>Prestataires marketing :</strong> Sentry (monitoring), Google Analytics (analytics)</li>
          <li><strong>Services email :</strong> Resend (envoi d'emails)</li>
          <li><strong>Autorités légales :</strong> si légalement obligatoire</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">7. Durée de Conservation</h2>
        <p className="text-foreground/80 mb-4">
          Vos données sont conservées aussi longtemps que nécessaire pour :
        </p>
        <ul className="list-disc list-inside text-foreground/80 space-y-2">
          <li>Candidatures rejetées : 1 an</li>
          <li>Partenaires actifs : durée du partenariat + 3 ans (obligations comptables)</li>
          <li>Logs et données analytiques : 1 an maximum</li>
          <li>Données de paiement : 6 ans (obligation légale)</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">8. Vos Droits</h2>
        <p className="text-foreground/80 mb-4">
          En vertu du RGPD, vous disposez des droits suivants :
        </p>
        <ul className="list-disc list-inside text-foreground/80 space-y-2">
          <li><strong>Droit d'accès :</strong> demander une copie de vos données</li>
          <li><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
          <li><strong>Droit à l'oubli :</strong> demander la suppression de vos données</li>
          <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format portable</li>
          <li><strong>Droit d'opposition :</strong> refuser le traitement de vos données pour certains usages</li>
          <li><strong>Droit à la limitation :</strong> limiter le traitement de vos données</li>
        </ul>
        <p className="text-foreground/80 mt-4">
          Pour exercer ces droits, contactez-nous à hello@etudia.io avec une preuve d'identité.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">9. Sécurité</h2>
        <p className="text-foreground/80">
          Nous avons mis en place des mesures de sécurité appropriées pour protéger vos données contre la perte, l'accès non autorisé ou la modification (chiffrement SSL, authentification sécurisée, contrôle d'accès). Cependant, aucune transmission internet n'est garantie 100% sécurisée.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">10. Contact DPO</h2>
        <p className="text-foreground/80">
          Pour toute demande concernant vos données personnelles ou si vous souhaitez signaler un problème, contactez-nous à hello@etudia.io. Vous pouvez également adresser une plainte à la CNIL (Commission Nationale de l'Informatique et des Libertés).
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">11. Modifications</h2>
        <p className="text-foreground/80">
          Nous pouvons mettre à jour cette politique à tout moment. Les modifications seront publiées sur cette page avec une nouvelle date de mise à jour.
        </p>
      </section>
    </article>
  )
}
