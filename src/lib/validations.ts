import { z } from 'zod'

export const applySchema = z.object({
  name: z.string().min(2, 'Nom requis'),
  email: z.string().email('Email invalide'),
  platform: z.string().min(1, 'Plateforme requise'),
  profileUrl: z.string().url('URL invalide'),
  followers: z.string().min(1, 'Nombre d\'abonnés requis'),
  thematic: z.string().min(1, 'Thématique requise'),
  message: z.string().optional(),
})

export const trackClickSchema = z.object({
  referralCode: z.string().min(1),
  applicationSlug: z.string().min(1),
})

export const trackReferralSchema = z.object({
  referralCode: z.string().min(1),
  applicationSlug: z.string().min(1),
  userId: z.string().min(1),
})

export const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  platform: z.string().optional(),
  profileUrl: z.string().url().optional(),
  thematic: z.string().optional(),
  paymentInfo: z.object({
    type: z.enum(['paypal', 'bank']),
    details: z.record(z.string(), z.string()),
  }).optional(),
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  confirmPassword: z.string().min(1),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
})

export const createAppSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  price: z.number().min(0),
  commissionRate: z.number().min(0.1).max(0.6),
  status: z.enum(['online', 'coming_soon', 'building']),
  siteUrl: z.string().url().optional(),
})

export const updateAppSchema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  price: z.number().min(0).optional(),
  commissionRate: z.number().min(0.1).max(0.6).optional(),
  status: z.enum(['online', 'coming_soon', 'building']).optional(),
  siteUrl: z.string().url().optional(),
})

export const updatePartnerSchema = z.object({
  commissionRate: z.number().min(0.1).max(0.6).optional(),
  status: z.enum(['active', 'suspended']).optional(),
})

export const updatePayoutSchema = z.object({
  status: z.enum(['processing', 'paid']),
})

export const rejectApplicationSchema = z.object({
  reason: z.string().optional(),
})
