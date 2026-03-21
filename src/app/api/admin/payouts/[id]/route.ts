import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminSession, unauthorized, notFound, badRequest, internalError } from '@/lib/api-auth'
import { updatePayoutSchema } from '@/lib/validations'
import { ZodError } from 'zod'
import { sendPaymentConfirmation } from '@/lib/emails'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminSession()
    if (!admin) {
      return unauthorized()
    }

    const { id } = await params

    const body = await request.json()
    const validated = updatePayoutSchema.parse(body)

    const payout = await prisma.payoutRequest.findUnique({
      where: { id },
    })

    if (!payout) {
      return notFound()
    }

    const updated = await prisma.payoutRequest.update({
      where: { id },
      data: {
        status: validated.status,
        paidAt: validated.status === 'paid' ? new Date() : payout.paidAt,
      },
    })

    // Send payment confirmation email when marked as paid
    if (validated.status === 'paid') {
      const partner = await prisma.partner.findUnique({ where: { id: payout.partnerId } })
      if (partner) {
        const paymentInfo = partner.paymentInfo as { type?: string } | null
        const paymentMethod = paymentInfo?.type === 'paypal' ? 'PayPal' : 'virement bancaire'
        sendPaymentConfirmation(
          partner.email,
          partner.name,
          updated.amount,
          paymentMethod
        ).catch((err) => console.error('[EMAIL]', err))
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Demande de paiement mise à jour',
        payout: {
          id: updated.id,
          amount: updated.amount,
          status: updated.status,
          paidAt: updated.paidAt,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof ZodError) {
      return badRequest(error.issues[0]?.message || 'Validation error')
    }
    console.error('[PUT /api/admin/payouts/[id]]', error)
    return internalError()
  }
}
