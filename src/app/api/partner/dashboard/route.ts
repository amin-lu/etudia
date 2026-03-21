import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getPartnerSession, unauthorized, internalError } from '@/lib/api-auth'

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999)
}

function subMonths(date: Date, months: number): Date {
  return new Date(date.getFullYear(), date.getMonth() - months, 1)
}

export async function GET(request: NextRequest) {
  try {
    const user = await getPartnerSession()
    if (!user) {
      return unauthorized()
    }

    const partner = await prisma.partner.findUnique({
      where: { id: user.id },
      include: {
        referrals: true,
        commissions: true,
      },
    })

    if (!partner) {
      return unauthorized()
    }

    const now = new Date()
    const currentMonth = startOfMonth(now)
    const currentMonthEnd = endOfMonth(now)

    const thisMonthReferrals = partner.referrals.filter(
      (r) => r.createdAt >= currentMonth && r.createdAt <= currentMonthEnd
    )

    const thisMonthCommissions = partner.commissions.filter(
      (c) => c.month >= currentMonth && c.month <= currentMonthEnd
    )

    const monthlyData = []
    for (let i = 5; i >= 0; i--) {
      const monthStart = startOfMonth(subMonths(now, i))
      const monthEnd = endOfMonth(subMonths(now, i))

      const referralsCount = partner.referrals.filter(
        (r) => r.createdAt >= monthStart && r.createdAt <= monthEnd
      ).length

      const commissionsAmount = partner.commissions
        .filter((c) => c.month >= monthStart && c.month <= monthEnd)
        .reduce((sum, c) => sum + c.amount, 0)

      monthlyData.push({
        month: monthStart.toISOString().slice(0, 7),
        referrals: referralsCount,
        commissions: commissionsAmount,
      })
    }

    const recentReferrals = await prisma.referral.findMany({
      where: { partnerId: partner.id },
      include: { application: { select: { name: true, slug: true } } },
      orderBy: { createdAt: 'desc' },
      take: 10,
    })

    return NextResponse.json(
      {
        success: true,
        stats: {
          registrationsThisMonth: thisMonthReferrals.length,
          totalRegistrations: partner.referrals.length,
          commissionThisMonth: thisMonthCommissions.reduce((sum, c) => sum + c.amount, 0),
          totalCommissions: partner.commissions.reduce((sum, c) => sum + c.amount, 0),
        },
        monthlyData,
        recentReferrals: recentReferrals.map((r) => ({
          id: r.id,
          applicationName: r.application.name,
          applicationSlug: r.application.slug,
          status: r.status,
          createdAt: r.createdAt,
        })),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[GET /api/partner/dashboard]', error)
    return internalError()
  }
}
