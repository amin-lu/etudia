import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminSession, unauthorized, notFound, internalError, badRequest } from '@/lib/api-auth'
import { rejectApplicationSchema } from '@/lib/validations'
import { ZodError } from 'zod'
import { sendApplicationRejected } from '@/lib/emails'

export async function POST(
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
    const validated = rejectApplicationSchema.parse(body)

    const application = await prisma.partnerApplication.findUnique({
      where: { id },
    })

    if (!application) {
      return notFound()
    }

    await prisma.partnerApplication.update({
      where: { id },
      data: { status: 'rejected' },
    })

    // Send rejection email (non-blocking)
    sendApplicationRejected(application.email, application.name, validated.reason).catch(
      (err) => console.error('[EMAIL]', err)
    )

    return NextResponse.json(
      {
        success: true,
        message: 'Candidature rejetée',
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof ZodError) {
      return badRequest(error.issues[0]?.message || 'Validation error')
    }
    console.error('[POST /api/admin/applications/[id]/reject]', error)
    return internalError()
  }
}
