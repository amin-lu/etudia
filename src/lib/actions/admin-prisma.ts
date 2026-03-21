'use server'

import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { revalidatePath } from 'next/cache'

function generateReferralCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

function generateTempPassword(): string {
  return Math.random().toString(36).slice(-12)
}

export async function getAdminDashboardStats() {
  try {
    const [activePartners, totalReferrals, totalCommissions, currentMrr] = await Promise.all([
      prisma.partner.count({ where: { status: 'active' } }),
      prisma.referral.count(),
      prisma.commission.aggregate({ _sum: { amount: true } }),
      prisma.commission.aggregate({ _sum: { amount: true }, where: { status: 'validated' } }),
    ])

    return {
      activePartners,
      totalReferrals,
      totalCommissions: totalCommissions._sum.amount ?? 0,
      currentMrr: currentMrr._sum.amount ?? 0,
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return {
      activePartners: 0,
      totalReferrals: 0,
      totalCommissions: 0,
      currentMrr: 0,
    }
  }
}

export async function getRecentApplications(limit: number = 5) {
  try {
    return await prisma.partnerApplication.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
    })
  } catch (error) {
    console.error('Error fetching recent applications:', error)
    return []
  }
}

export async function getTopPartners(limit: number = 5) {
  try {
    const partners = await prisma.partner.findMany({
      where: { status: 'active' },
      take: limit,
      orderBy: {
        referrals: {
          _count: 'desc',
        },
      },
      include: {
        _count: {
          select: { referrals: true },
        },
      },
    })

    const enriched = await Promise.all(
      partners.map(async (p) => {
        const commissions = await prisma.commission.aggregate({
          where: { partnerId: p.id },
          _sum: { amount: true },
        })
        return {
          ...p,
          totalReferrals: p._count.referrals,
          totalCommissions: commissions._sum.amount ?? 0,
        }
      })
    )

    return enriched
  } catch (error) {
    console.error('Error fetching top partners:', error)
    return []
  }
}

export async function getApplications(filters?: { status?: string }) {
  try {
    return await prisma.partnerApplication.findMany({
      where: filters?.status ? { status: filters.status } : undefined,
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    console.error('Error fetching applications:', error)
    return []
  }
}

export async function acceptApplication(id: string) {
  try {
    const app = await prisma.partnerApplication.findUnique({ where: { id } })
    if (!app) throw new Error('Application not found')

    const tempPassword = generateTempPassword()
    const passwordHash = await hash(tempPassword, 10)
    let referralCode = generateReferralCode()

    let codeExists = await prisma.partner.findUnique({
      where: { referralCode },
    })

    while (codeExists) {
      referralCode = generateReferralCode()
      codeExists = await prisma.partner.findUnique({
        where: { referralCode },
      })
    }

    await Promise.all([
      prisma.partner.create({
        data: {
          name: app.name,
          email: app.email,
          passwordHash,
          referralCode,
          platform: app.platform,
          profileUrl: app.profileUrl,
          followers: parseInt(app.followers) || 0,
          thematic: app.thematic,
        },
      }),
      prisma.partnerApplication.update({
        where: { id },
        data: { status: 'accepted' },
      }),
    ])

    revalidatePath('/admin/candidatures')
    revalidatePath('/admin/partenaires')

    return { email: app.email, tempPassword, referralCode }
  } catch (error) {
    console.error('Error accepting application:', error)
    throw error
  }
}

export async function rejectApplication(id: string, reason?: string) {
  try {
    await prisma.partnerApplication.update({
      where: { id },
      data: { status: 'rejected' },
    })

    revalidatePath('/admin/candidatures')
  } catch (error) {
    console.error('Error rejecting application:', error)
    throw error
  }
}

export async function getPartners(filters?: { search?: string }) {
  try {
    const partners = await prisma.partner.findMany({
      where: filters?.search
        ? {
            OR: [
              { name: { contains: filters.search, mode: 'insensitive' } },
              { email: { contains: filters.search, mode: 'insensitive' } },
            ],
          }
        : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { referrals: true },
        },
      },
    })

    const enriched = await Promise.all(
      partners.map(async (p) => {
        const commissions = await prisma.commission.aggregate({
          where: { partnerId: p.id },
          _sum: { amount: true },
        })
        return {
          ...p,
          totalReferrals: p._count.referrals,
          totalCommissions: commissions._sum.amount ?? 0,
        }
      })
    )

    return enriched
  } catch (error) {
    console.error('Error fetching partners:', error)
    return []
  }
}

export async function getPartnerById(id: string) {
  try {
    const partner = await prisma.partner.findUnique({
      where: { id },
      include: {
        referrals: {
          orderBy: { createdAt: 'desc' },
          include: { application: true },
        },
        commissions: {
          orderBy: { month: 'desc' },
        },
      },
    })

    if (!partner) throw new Error('Partner not found')

    const totalCommissions = await prisma.commission.aggregate({
      where: { partnerId: id },
      _sum: { amount: true },
    })

    return {
      ...partner,
      totalCommissions: totalCommissions._sum.amount ?? 0,
    }
  } catch (error) {
    console.error('Error fetching partner:', error)
    throw error
  }
}

export async function updatePartnerCommission(id: string, rate: number) {
  try {
    await prisma.partner.update({
      where: { id },
      data: { commissionRate: rate },
    })

    revalidatePath('/admin/partenaires')
    revalidatePath(`/admin/partenaires/${id}`)
  } catch (error) {
    console.error('Error updating partner commission:', error)
    throw error
  }
}

export async function togglePartnerStatus(id: string) {
  try {
    const partner = await prisma.partner.findUnique({ where: { id } })
    if (!partner) throw new Error('Partner not found')

    const newStatus = partner.status === 'active' ? 'suspended' : 'active'

    await prisma.partner.update({
      where: { id },
      data: { status: newStatus },
    })

    revalidatePath('/admin/partenaires')
    revalidatePath(`/admin/partenaires/${id}`)

    return newStatus
  } catch (error) {
    console.error('Error toggling partner status:', error)
    throw error
  }
}

export async function getPayoutRequests(filters?: { status?: string }) {
  try {
    const payouts = await prisma.payoutRequest.findMany({
      where: filters?.status ? { status: filters.status } : undefined,
      include: { partner: true },
      orderBy: { createdAt: 'desc' },
    })

    return payouts
  } catch (error) {
    console.error('Error fetching payout requests:', error)
    return []
  }
}

export async function updatePayoutStatus(id: string, status: string) {
  try {
    const data: any = { status }
    if (status === 'paid') {
      data.paidAt = new Date()
    }

    await prisma.payoutRequest.update({
      where: { id },
      data,
    })

    revalidatePath('/admin/paiements')
  } catch (error) {
    console.error('Error updating payout status:', error)
    throw error
  }
}

export async function getApps() {
  try {
    return await prisma.application.findMany({
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    console.error('Error fetching applications:', error)
    return []
  }
}

export async function createApp(data: {
  name: string
  slug: string
  description: string
  category: string
  price: number
  commissionRate: number
  status: string
  siteUrl?: string
}) {
  try {
    await prisma.application.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        category: data.category,
        price: data.price,
        commissionRate: data.commissionRate,
        status: data.status,
        siteUrl: data.siteUrl,
      },
    })

    revalidatePath('/admin/applications')
  } catch (error) {
    console.error('Error creating application:', error)
    throw error
  }
}

export async function updateApp(
  id: string,
  data: {
    name?: string
    slug?: string
    description?: string
    category?: string
    price?: number
    commissionRate?: number
    status?: string
    siteUrl?: string
  }
) {
  try {
    await prisma.application.update({
      where: { id },
      data,
    })

    revalidatePath('/admin/applications')
  } catch (error) {
    console.error('Error updating application:', error)
    throw error
  }
}

export async function deleteApp(id: string) {
  try {
    await prisma.application.delete({
      where: { id },
    })

    revalidatePath('/admin/applications')
  } catch (error) {
    console.error('Error deleting application:', error)
    throw error
  }
}
