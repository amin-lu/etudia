import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getPartnerSession, unauthorized, badRequest, internalError } from '@/lib/api-auth'
import { updateProfileSchema } from '@/lib/validations'
import { ZodError } from 'zod'

export async function PUT(request: NextRequest) {
  try {
    const user = await getPartnerSession()
    if (!user) {
      return unauthorized()
    }

    const body = await request.json()
    const validated = updateProfileSchema.parse(body)

    const partner = await prisma.partner.findUnique({
      where: { id: user.id },
    })

    if (!partner) {
      return unauthorized()
    }

    const updated = await prisma.partner.update({
      where: { id: partner.id },
      data: {
        name: validated.name || partner.name,
        platform: validated.platform || partner.platform,
        profileUrl: validated.profileUrl || partner.profileUrl,
        thematic: validated.thematic || partner.thematic,
        paymentInfo: validated.paymentInfo
          ? JSON.parse(JSON.stringify(validated.paymentInfo))
          : partner.paymentInfo,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Profil mis à jour',
        partner: {
          id: updated.id,
          name: updated.name,
          email: updated.email,
          platform: updated.platform,
          profileUrl: updated.profileUrl,
          thematic: updated.thematic,
          followers: updated.followers,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof ZodError) {
      return badRequest(error.issues[0]?.message || 'Validation error')
    }
    console.error('[PUT /api/partner/profile]', error)
    return internalError()
  }
}
