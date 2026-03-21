import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { hash } from 'bcryptjs'

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error('DATABASE_URL is not set in .env')
}
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding database...')

  // ── Applications SaaS ──────────────────────────
  const etudiet = await prisma.application.upsert({
    where: { slug: 'etudiet' },
    update: {},
    create: {
      name: 'ETUDIET',
      slug: 'etudiet',
      description: 'Plateforme de révision structurée pour les étudiants en BTS Diététique et Nutrition.',
      descriptionEn: 'Structured revision platform for BTS Dietetics and Nutrition students.',
      category: 'Éducation',
      categoryEn: 'Education',
      price: 12.90,
      commissionRate: 0.40,
      status: 'online',
      siteUrl: 'https://etudiete.vercel.app',
    },
  })

  const bacsuccess = await prisma.application.upsert({
    where: { slug: 'bacsuccess' },
    update: {},
    create: {
      name: 'BacSuccess',
      slug: 'bacsuccess',
      description: 'Préparation au baccalauréat malien — toutes séries, quiz et flashcards.',
      descriptionEn: 'Malian baccalaureate preparation — all series, quizzes and flashcards.',
      category: 'Éducation',
      categoryEn: 'Education',
      price: 0,
      commissionRate: 0.40,
      status: 'online',
      siteUrl: 'https://bacsuccess.vercel.app',
    },
  })

  console.log('✅ Applications créées:', { etudiet: etudiet.id, bacsuccess: bacsuccess.id })

  // ── Admin par défaut ──────────────────────────
  const adminPassword = await hash('admin-etudia-2025', 12)
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@etudia.com' },
    update: {},
    create: {
      email: 'admin@etudia.com',
      passwordHash: adminPassword,
      name: 'Admin Etudia',
    },
  })

  console.log('✅ Admin créé:', admin.email)
  console.log('   ⚠️  Mot de passe par défaut: admin-etudia-2025 — CHANGE-LE après le premier login !')

  console.log('\n🎉 Seed terminé avec succès !')
}

main()
  .catch((e) => {
    console.error('❌ Erreur seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
