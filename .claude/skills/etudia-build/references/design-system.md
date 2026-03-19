# Design System — Etudia

## Palette Dark Mode (défaut)

| Token               | Hex       | Tailwind     |
|---------------------|-----------|--------------|
| Background          | #09090B   | zinc-950     |
| Cards               | #18181B   | zinc-900     |
| Elevated            | #27272A   | zinc-800     |
| Border              | #3F3F46   | zinc-700     |
| Text primary        | #FAFAFA   | zinc-50      |
| Text secondary      | #A1A1AA   | zinc-400     |
| Accent              | #6366F1   | indigo-500   |
| Accent hover        | #818CF8   | indigo-400   |
| Accent muted        | #312E81   | indigo-900   |
| Success             | #22C55E   | green-500    |
| Error               | #EF4444   | red-500      |

## Palette Light Mode

| Token               | Hex       | Tailwind     |
|---------------------|-----------|--------------|
| Background          | #FFFFFF   | white        |
| Cards               | #F4F4F5   | zinc-100     |
| Elevated            | #E4E4E7   | zinc-200     |
| Border              | #D4D4D8   | zinc-300     |
| Text primary        | #09090B   | zinc-950     |
| Text secondary      | #71717A   | zinc-500     |
| Accent              | #4F46E5   | indigo-600   |
| Accent hover        | #6366F1   | indigo-500   |
| Accent muted        | #E0E7FF   | indigo-100   |

## Typography

```
Titres (h1-h3) : Instrument Sans via next/font/google, font-semibold
Body           : Inter via next/font/google, font-normal
Code/mono      : JetBrains Mono via next/font/google

h1 : text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight
h2 : text-3xl md:text-4xl font-semibold tracking-tight
h3 : text-xl md:text-2xl font-semibold
Body : text-base leading-relaxed
Small : text-sm text-zinc-400 dark:text-zinc-400
```

## Spacing & Radius

- Border radius : `rounded-xl` partout (cards, inputs, buttons, modals)
- Shadows : aucune en dark, `shadow-sm` en light uniquement
- Card padding : `p-6`
- Section padding : `py-20 md:py-28`
- Container : `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

## Framer Motion — Specs exactes

```tsx
// Fade in + slide up au scroll — réutiliser partout
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" }
};

// Stagger pour les grilles de cards
export const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true }
};

// Hover sur les cards
export const hoverScale = {
  whileHover: { scale: 1.02 },
  transition: { type: "spring", stiffness: 300 }
};

// Compteur animé (métriques)
// Utiliser framer-motion useMotionValue + useTransform + animate
// Animation de 0 à valeur cible en 2 secondes, ease out
```

## Navigation Mobile

```
- Header fixe : logo à gauche, bouton hamburger (Menu icon lucide) à droite
- Au clic : drawer slide-in depuis la droite via framer-motion AnimatePresence
- Overlay semi-transparent bg-black/50, clic dessus ferme le drawer
- Drawer contient : liens de nav verticaux + toggle langue + toggle thème en bas
- Fermeture auto au clic sur un lien
- Breakpoint : drawer < lg, nav horizontale >= lg
```

## Composants UI réutilisables

Créer dans `src/components/ui/` :

| Composant          | Props clés                                      |
|--------------------|--------------------------------------------------|
| Button             | variant (primary/secondary/ghost), size, loading  |
| Card               | className, children                               |
| Badge              | variant (niche colors), children                  |
| Input              | label, error, ...props                            |
| Textarea           | label, error, maxLength (avec compteur), ...props |
| Select             | label, options, error                             |
| Modal              | open, onClose, title, children                    |
| Accordion          | items: {title, content}[]                         |
| Skeleton           | className (prend la forme du contenu)             |
| EmptyState         | icon, title, description, action?                 |
| AnimatedCounter    | target, duration, prefix?, suffix?                |

## Formulations design

- Boutons primaires : fond indigo-500, texte white, hover indigo-400
- Boutons secondaires : fond transparent, bordure zinc-700, texte zinc-50
- Boutons ghost : pas de fond ni bordure, texte zinc-400, hover text-zinc-50
- Inputs : fond zinc-900, bordure zinc-700, focus:ring-2 ring-indigo-500
- Cards : fond zinc-900, bordure zinc-800, hover:border-zinc-700
