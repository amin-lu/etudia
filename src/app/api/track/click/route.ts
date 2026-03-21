import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { trackClickSchema } from '@/lib/validations'
import { badRequest, internalError, notFound } from '@/lib/api-auth'
import { ZodError } from 'zod'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = trackClickSchema.parse(body)

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

    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || ''
    const userAgent = request.headers.get('user-agent') || ''

    await prisma.linkClick.create({
      data: {
        partnerId: partner.id,
        applicationId: application.id,
        ip,
        userAgent,
      },
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    if (error instanceof ZodError) {
      return badRequest(error.issues[0]?.message || 'Validation error')
    }
    console.error('[POST /api/track/click]', error)
    return internalError()
  }
}
