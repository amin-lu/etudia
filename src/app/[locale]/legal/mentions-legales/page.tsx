import { Metadata } from 'next'

export const generateMetadata = (): Metadata => {
  return {
    title: 'Mentions Légales | Etudia',
    description: 'Mentions légales et informations légales Etudia',
  }
}

export default function MentionsPage() {
  return (
    <article>
      <h1 className="text-4xl font-bold text-foreground mb-8">Mentions Légales</h1>
      <p className="text-foreground/70 mb-8">Dernière mise à jour : Mars 2026</p>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">1. Éditeur du Site</h2>
        <div className="text-foreground/80 space-y-2">
          <p><strong>Raison sociale :</strong> Etudia SAS</p>
          <p><strong>SIRET :</strong> [À remplir avec le numéro réel]</p>
          <p><strong>Adresse du siège social :</strong> [À remplir avec l'adresse réelle]</p>
          <p><strong>Email :</strong> hello@etudia.io</p>
          <p><strong>Téléphone :</strong> [À remplir si applicable]</p>
          <p><strong>Représentant :</strong> [Nom du responsable]</p>
          <p><strong>Statut :</strong> Société par Actions Simplifiée (SAS)</p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">2. Hébergeur du Site</h2>
        <div className="text-foreground/80 space-y-2">
          <p><strong>Nom :</strong> Vercel Inc.</p>
          <p><strong>Adresse :</strong> 340 S Lemon Ave, Walnut, CA 91789, USA</p>
          <p><strong>Site :</strong> vercel.com</p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">3. Directeur de la Publication</h2>
        <p className="text-foreground/80">
          Le directeur de la publication est [Nom du responsable], qui exerce la responsabilité éditoriale du site.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">4. Propriété Intellectuelle</h2>
        <p className="text-foreground/80 mb-4">
          L'ensemble du contenu du site (textes, images, logos, vidéos, code source) est la propriété exclusive d'Etudia SAS ou de ses partenaires, protégé par les droits d'auteur et les lois applicables.
        </p>
        <p className="text-foreground/80">
          Toute reproduction, distribution ou modification sans autorisation préalable est interdite. Les utilisateurs ne peuvent accéder et imprimer le contenu que pour leur usage personnel et non-commercial.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">5. Responsabilité</h2>
        <p className="text-foreground/80 mb-4">
          Etudia s'efforce de fournir des informations exactes et à jour. Cependant :
        </p>
        <ul className="list-disc list-inside text-foreground/80 space-y-2 mb-4">
          <li>L'Entreprise ne garantit pas l'absence d'erreurs, d'omissions ou d'inexactitudes</li>
          <li>L'accès au site n'est pas garanti sans interruption</li>
          <li>L'Entreprise ne peut être tenue responsable des dommages directs ou indirects découlant de l'accès ou de l'utilisation du site</li>
          <li>L'Entreprise n'est pas responsable du contenu des sites externes auxquels des liens sont fournis</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">6. Liens Externes</h2>
        <p className="text-foreground/80">
          Le site peut contenir des liens vers des sites externes. Etudia n'exerce aucun contrôle sur ces sites et ne peut être tenue responsable de leur contenu, de leur disponibilité ou de leurs pratiques en matière de confidentialité.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">7. Conditions d'Utilisation</h2>
        <p className="text-foreground/80 mb-4">
          L'utilisation du site est soumise aux présentes mentions légales ainsi qu'aux conditions générales d'utilisation et à la politique de confidentialité disponibles sur le site.
        </p>
        <p className="text-foreground/80">
          L'utilisateur accepte ces conditions en accédant au site. Le refus d'accepter ces conditions entraîne l'interdiction d'accès au site.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">8. Paiements et Transactions</h2>
        <p className="text-foreground/80 mb-4">
          Les paiements sur le site sont traités par Stripe, prestataire de paiement certifié. Les informations de paiement sont chiffrées et sécurisées. Etudia ne stocke jamais vos informations de carte bancaire.
        </p>
        <p className="text-foreground/80">
          En effectuant une transaction, vous acceptez les conditions de paiement spécifiées à ce moment-là.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">9. Propriété des Données</h2>
        <p className="text-foreground/80">
          Les données collectées par Etudia sont utilisées conformément à la politique de confidentialité. Pour toute question concernant vos données, veuillez consulter la politique de confidentialité.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">10. Limitation de Responsabilité</h2>
        <p className="text-foreground/80">
          ETUDIA N'OFFRE AUCUNE GARANTIE EXPRESS OU IMPLICITE. LE SITE EST FOURNI "TEL QUEL". ETUDIA NE PEUT ÊTRE TENUE RESPONSABLE POUR LES DOMMAGES INDIRECTS, ACCESSOIRES, SPÉCIAUX, PUNITIFS OU CONSÉCUTIFS DÉCOULANT DE L'UTILISATION DU SITE.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">11. Droit Applicable et Juridiction</h2>
        <p className="text-foreground/80">
          Ces mentions légales et l'utilisation du site sont régies par le droit français. Tout litige sera soumis aux juridictions compétentes de Paris.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">12. Signalement de Contenu Illégal</h2>
        <p className="text-foreground/80">
          Si vous découvrez du contenu illégal ou inapproprié sur le site, veuillez le signaler immédiatement à hello@etudia.io. Nous examinerons votre signalement et prendrons les mesures appropriées.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">13. Modification des Mentions</h2>
        <p className="text-foreground/80">
          Etudia se réserve le droit de modifier ces mentions légales à tout moment. Les modifications seront publiées sur cette page avec une nouvelle date de mise à jour.
        </p>
      </section>
    </article>
  )
}
