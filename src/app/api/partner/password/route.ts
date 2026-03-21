import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getPartnerSession, unauthorized, badRequest, internalError } from '@/lib/api-auth'
import { changePasswordSchema } from '@/lib/validations'
import { compare, hash } from 'bcryptjs'
import { ZodError } from 'zod'

export async function PUT(request: NextRequest) {
  try {
    const user = await getPartnerSession()
    if (!user) {
      return unauthorized()
    }

    const body = await request.json()
    const validated = changePasswordSchema.parse(body)

    const partner = await prisma.partner.findUnique({
      where: { id: user.id },
    })

    if (!partner) {
      return unauthorized()
    }

    const isPasswordValid = await compare(validated.currentPassword, partner.passwordHash)
    if (!isPasswordValid) {
      return badRequest('Mot de passe actuel incorrect')
    }

    const passwordHash = await hash(validated.newPassword, 10)

    await prisma.partner.update({
      where: { id: partner.id },
      data: { passwordHash },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Mot de passe changé avec succès',
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof ZodError) {
      return badRequest(error.issues[0]?.message || 'Validation error')
    }
    console.error('[PUT /api/partner/password]', error)
    return internalError()
  }
}
