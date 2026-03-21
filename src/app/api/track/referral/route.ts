import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { trackReferralSchema } from '@/lib/validations'
import { badRequest, internalError, notFound } from '@/lib/api-auth'
import { ZodError } from 'zod'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = trackReferralSchema.parse(body)

    const partner = await prisma.partner.findUnique({
      where: { referralCode: validated.referralCode },
    })

    if (!partner) {
      return notFound()
    }

    const application = await prisma.application.findUnique({
      where: { slug: validated.applicationSlug },
    })

    if (!application) {
      return notFound()
    }

    await prisma.referral.create({
      data: {
        partnerId: partner.id,
        applicationId: application.id,
        userId: validated.userId,
        status: 'active',
      },
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    if (error instanceof ZodError) {
      return badRequest(error.issues[0]?.message || 'Validation error')
    }
    console.error('[POST /api/track/referral]', error)
    return internalError()
  }
}
