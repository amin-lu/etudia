import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminSession, unauthorized, internalError } from '@/lib/api-auth'

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
    const admin = await getAdminSession()
    if (!admin) {
      return unauthorized()
    }

    const activePartnersCount = await prisma.partner.count({
      where: { status: 'active' },
    })

    const totalReferrals = await prisma.referral.count()

    const totalCommissions = await prisma.commission.aggregate({
      _sum: { amount: true },
    })

    const now = new Date()
    const currentMonth = startOfMonth(now)
    const currentMonthEnd = endOfMonth(now)

    const monthlyData = []
    for (let i = 5; i >= 0; i--) {
      const monthStart = startOfMonth(subMonths(now, i))
      const monthEnd = endOfMonth(subMonths(now, i))

      const monthlyRevenue = await prisma.commission.aggregate({
        where: {
          month: { gte: monthStart, lte: monthEnd },
        },
        _sum: { amount: true },
      })

      monthlyData.push({
        month: monthStart.toISOString().slice(0, 7),
        revenue: monthlyRevenue._sum.amount || 0,
      })
    }

    const topPartners = await prisma.partner.findMany({
      where: {
        commissions: {
          some: {
            month: { gte: currentMonth, lte: currentMonthEnd },
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        commissions: {
          where: {
            month: { gte: currentMonth, lte: currentMonthEnd },
          },
          select: { amount: true },
        },
      },
      orderBy: {
        commissions: {
          _count: 'desc',
        },
      },
      take: 5,
    })

    const currentMRR = monthlyData[monthlyData.length - 1]?.revenue || 0

    return NextResponse.json(
      {
        success: true,
        stats: {
          activePartnersCount,
          totalReferrals,
          totalCommissions: totalCommissions._sum.amount || 0,
          currentMRR,
        },
        monthlyData,
        topPartners: topPartners.map((p) => ({
          id: p.id,
          name: p.name,
          email: p.email,
          monthlyCommission: p.commissions.reduce((sum, c) => sum + c.amount, 0),
        })),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[GET /api/admin/dashboard]', error)
    return internalError()
  }
}
