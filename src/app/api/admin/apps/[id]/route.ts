import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminSession, unauthorized, notFound, badRequest, internalError } from '@/lib/api-auth'
import { updateAppSchema } from '@/lib/validations'
import { ZodError } from 'zod'

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
    const validated = updateAppSchema.parse(body)

    const app = await prisma.application.findUnique({
      where: { id },
    })

    if (!app) {
      return notFound()
    }

    const updated = await prisma.application.update({
      where: { id },
      data: {
        name: validated.name ?? app.name,
        slug: validated.slug ?? app.slug,
        description: validated.description ?? app.description,
        category: validated.category ?? app.category,
        price: validated.price ?? app.price,
        commissionRate: validated.commissionRate ?? app.commissionRate,
        status: validated.status ?? app.status,
        siteUrl: validated.siteUrl ?? app.siteUrl,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Application mise à jour',
        app: {
          id: updated.id,
          name: updated.name,
          slug: updated.slug,
          description: updated.description,
          category: updated.category,
          price: updated.price,
          commissionRate: updated.commissionRate,
          status: updated.status,
          siteUrl: updated.siteUrl,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof ZodError) {
      return badRequest(error.issues[0]?.message || 'Validation error')
    }
    console.error('[PUT /api/admin/apps/[id]]', error)
    return internalError()
  }
}
