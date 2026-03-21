import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminSession, unauthorized, internalError } from '@/lib/api-auth'

export async function GET(request: NextRequest) {
  try {
    const admin = await getAdminSession()
    if (!admin) {
      return unauthorized()
    }

    const partners = await prisma.partner.findMany({
      include: {
        referrals: { select: { id: true } },
        commissions: { select: { amount: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(
      {
        success: true,
        partners: partners.map((p) => ({
          id: p.id,
          name: p.name,
          email: p.email,
          platform: p.platform,
          followers: p.followers,
          thematic: p.thematic,
          status: p.status,
          referralCode: p.referralCode,
          commissionRate: p.commissionRate,
          referralCount: p.referrals.length,
          totalCommissions: p.commissions.reduce((sum, c) => sum + c.amount, 0),
          createdAt: p.createdAt,
        })),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[GET /api/admin/partners]', error)
    return internalError()
  }
}
