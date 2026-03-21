import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminSession, unauthorized, internalError } from '@/lib/api-auth'

export async function GET(request: NextRequest) {
  try {
    const admin = await getAdminSession()
    if (!admin) {
      return unauthorized()
    }

    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')

    const payouts = await prisma.payoutRequest.findMany({
      where: status ? { status } : {},
      include: {
        partner: {
          select: {
            id: true,
            name: true,
            email: true,
            paymentInfo: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(
      {
        success: true,
        payouts: payouts.map((p) => ({
          id: p.id,
          partnerId: p.partner.id,
          partnerName: p.partner.name,
          partnerEmail: p.partner.email,
          paymentInfo: p.partner.paymentInfo,
          amount: p.amount,
          status: p.status,
          createdAt: p.createdAt,
          paidAt: p.paidAt,
        })),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[GET /api/admin/payouts]', error)
    return internalError()
  }
}
