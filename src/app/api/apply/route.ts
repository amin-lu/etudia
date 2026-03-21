import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { applySchema } from '@/lib/validations'
import { badRequest, internalError } from '@/lib/api-auth'
import { ZodError } from 'zod'
import { sendApplicationReceived } from '@/lib/emails'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = applySchema.parse(body)

    const application = await prisma.partnerApplication.create({
      data: {
        name: validated.name,
        email: validated.email,
        platform: validated.platform,
        profileUrl: validated.profileUrl,
        followers: validated.followers,
        thematic: validated.thematic,
        message: validated.message || null,
        status: 'pending',
      },
    })

    // Send confirmation email (non-blocking)
    sendApplicationReceived(validated.email, validated.name).catch(
      (err) => console.error('[EMAIL]', err)
    )

    return NextResponse.json(
      {
        success: true,
        message: 'Candidature envoyée',
        id: application.id,
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof ZodError) {
      return badRequest(error.issues[0]?.message || 'Validation error')
    }
    console.error('[POST /api/apply]', error)
    return internalError()
  }
}
