import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getPartnerSession, unauthorized, internalError } from '@/lib/api-auth'

export async function GET(request: NextRequest) {
  try {
    const user = await getPartnerSession()
    if (!user) {
      return unauthorized()
    }

    const partner = await prisma.partner.findUnique({
      where: { id: user.id },
    })

    if (!partner) {
      return unauthorized()
    }

    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const skip = (page - 1) * limit

    const commissions = await prisma.commission.findMany({
      where: { partnerId: partner.id },
      orderBy: { month: 'desc' },
      skip,
      take: limit,
    })

    const total = await prisma.commission.count({
      where: { partnerId: partner.id },
    })

    const pendingAmount = await prisma.commission.aggregate({
      where: { partnerId: partner.id, status: 'pending' },
      _sum: { amount: true },
    })

    const paidAmount = await prisma.commission.aggregate({
      where: { partnerId: partner.id, status: 'paid' },
      _sum: { amount: true },
    })

    return NextResponse.json(
      {
        success: true,
        commissions: commissions.map((c) => ({
          id: c.id,
          amount: c.amount,
          month: c.month,
          status: c.status,
          createdAt: c.createdAt,
        })),
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
        totals: {
          pendingAmount: pendingAmount._sum.amount || 0,
          paidAmount: paidAmount._sum.amount || 0,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[GET /api/partner/commissions]', error)
    return internalError()
  }
}
