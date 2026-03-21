import { Metadata } from 'next'
import { useTranslations } from 'next-intl'

export const generateMetadata = (): Metadata => {
  return {
    title: 'Conditions Générales d\'Utilisation | Etudia',
    description: 'Conditions générales d\'utilisation du programme d\'affiliation Etudia',
  }
}

export default function CGUPage() {
  return (
    <article>
      <h1 className="text-4xl font-bold text-foreground mb-8">Conditions Générales d'Utilisation</h1>
      <p className="text-foreground/70 mb-8">Dernière mise à jour : Mars 2026</p>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">1. Objet</h2>
        <p className="text-foreground/80 mb-4">
          Les présentes conditions générales régissent la relation entre Etudia SAS (ci-après "l'Entreprise") et les créateurs de contenu (ci-après "les Partenaires") souhaitant promouvoir les applications développées par l'Entreprise.
        </p>
        <p className="text-foreground/80">
          En acceptant ces conditions, le Partenaire s'engage à promouvoir les produits de l'Entreprise auprès de sa communauté selon les modalités définies ci-après.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">2. Inscription et Acceptation</h2>
        <p className="text-foreground/80 mb-4">
          L'inscription au programme de partenariat se fait en ligne via le formulaire disponible sur le site etudia.io. Pour être accepté, le Partenaire doit :
        </p>
        <ul className="list-disc list-inside text-foreground/80 space-y-2 mb-4">
          <li>Être majeur et résider dans un pays autorisé</li>
          <li>Disposer d'une audience active et engagée</li>
          <li>Posséder une présence publique vérifiable (chaîne YouTube, compte Instagram, etc.)</li>
          <li>Accepter les présentes conditions générales</li>
        </ul>
        <p className="text-foreground/80">
          L'Entreprise se réserve le droit de refuser une candidature sans obligation de justification.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">3. Obligations du Partenaire</h2>
        <p className="text-foreground/80 mb-4">Le Partenaire s'engage à :</p>
        <ul className="list-disc list-inside text-foreground/80 space-y-2">
          <li>Promouvoir les produits de manière honnête et transparente auprès de sa communauté</li>
          <li>Divulguer clairement que le lien utilisé est un lien affilié</li>
          <li>Ne pas faire de fausses affirmations ou promesses concernant les produits</li>
          <li>Respecter les directives de l'Entreprise concernant le marketing</li>
          <li>Ne pas utiliser des méthodes déloyales pour générer des conversions (spam, clickbait excessif, etc.)</li>
          <li>Signaler toute violation des conditions générales</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">4. Commissions et Paiements</h2>
        <p className="text-foreground/80 mb-4">
          Le Partenaire percevra une commission sur chaque abonnement généré via son lien affilié unique. Le taux de commission varie entre 30% et 50% du prix d'abonnement mensuel, selon les modalités communiquées pour chaque produit.
        </p>
        <p className="text-foreground/80 mb-4">
          <strong>Conditions de paiement :</strong>
        </p>
        <ul className="list-disc list-inside text-foreground/80 space-y-2 mb-4">
          <li>Les commissions sont versées mensuellement, uniquement si le montant cumulé dépasse 50€</li>
          <li>Les paiements s'effectuent par virement bancaire ou PayPal, selon le choix du Partenaire</li>
          <li>Les paiements sont traités dans les 30 jours suivant la fin du mois de facturation</li>
          <li>Les commissions perdent droit à paiement si l'utilisateur se désabonne avant 30 jours</li>
        </ul>
        <p className="text-foreground/80">
          L'Entreprise se réserve le droit de suspendre les paiements en cas de violation des présentes conditions.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">5. Propriété Intellectuelle</h2>
        <p className="text-foreground/80 mb-4">
          Tous les matériaux marketing, visuels et contenus fournis par l'Entreprise restent la propriété exclusive de l'Entreprise. Le Partenaire obtient une licence limitée, non-exclusive et révocable pour utiliser ces matériaux uniquement aux fins de promotion dans le cadre de ce partenariat.
        </p>
        <p className="text-foreground/80">
          Le Partenaire n'a pas le droit de modifier, de reproduire ou de distribuer ces matériaux en dehors du cadre spécifié.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">6. Résiliation</h2>
        <p className="text-foreground/80 mb-4">
          Chaque partie peut résilier ce partenariat à tout moment, sans préavis et sans justification. Après résiliation, le Partenaire n'aura plus accès à ses liens affiliés et ne pourra plus percevoir de nouvelles commissions.
        </p>
        <p className="text-foreground/80">
          Les commissions déjà gagnées resteront dues selon les modalités de paiement énoncées ci-dessus.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">7. Responsabilité</h2>
        <p className="text-foreground/80 mb-4">
          L'Entreprise ne sera pas responsable des dommages indirects ou consécutifs découlant de l'utilisation de ce service. La responsabilité totale de l'Entreprise ne dépassera pas les commissions versées au cours des 12 mois précédents.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">8. Droit Applicable</h2>
        <p className="text-foreground/80">
          Ces conditions sont régies par le droit français. En cas de litige, les tribunaux compétents sont ceux de Paris.
        </p>
      </section>
    </article>
  )
}
