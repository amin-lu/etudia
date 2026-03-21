import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getPartnerSession, unauthorized, badRequest, internalError } from '@/lib/api-auth'

const MINIMUM_PAYOUT = 50 // 50€ minimum

export async function POST(request: NextRequest) {
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

    const pendingAmount = await prisma.commission.aggregate({
      where: { partnerId: partner.id, status: 'pending' },
      _sum: { amount: true },
    })

    const amount = pendingAmount._sum.amount || 0

    if (amount < MINIMUM_PAYOUT) {
      return badRequest(
        `Montant minimum requis: ${MINIMUM_PAYOUT}€ (vous avez ${amount.toFixed(2)}€)`
      )
    }

    const payout = await prisma.payoutRequest.create({
      data: {
        partnerId: partner.id,
        amount,
        status: 'pending',
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Demande de paiement créée',
        payoutId: payout.id,
        amount,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[POST /api/partner/payout]', error)
    return internalError()
  }
}
