import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminSession, unauthorized, badRequest, internalError } from '@/lib/api-auth'
import { createAppSchema } from '@/lib/validations'
import { ZodError } from 'zod'

export async function GET(request: NextRequest) {
  try {
    const admin = await getAdminSession()
    if (!admin) {
      return unauthorized()
    }

    const apps = await prisma.application.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(
      {
        success: true,
        apps: apps.map((app) => ({
          id: app.id,
          name: app.name,
          slug: app.slug,
          description: app.description,
          category: app.category,
          price: app.price,
          commissionRate: app.commissionRate,
          status: app.status,
          siteUrl: app.siteUrl,
          logoUrl: app.logoUrl,
          createdAt: app.createdAt,
        })),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[GET /api/admin/apps]', error)
    return internalError()
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await getAdminSession()
    if (!admin) {
      return unauthorized()
    }

    const body = await request.json()
    const validated = createAppSchema.parse(body)

    const app = await prisma.application.create({
      data: {
        name: validated.name,
        slug: validated.slug,
        description: validated.description,
        category: validated.category,
        price: validated.price,
        commissionRate: validated.commissionRate,
        status: validated.status,
        siteUrl: validated.siteUrl || null,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Application créée',
        app: {
          id: app.id,
          name: app.name,
          slug: app.slug,
          description: app.description,
          category: app.category,
          price: app.price,
          commissionRate: app.commissionRate,
          status: app.status,
          siteUrl: app.siteUrl,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof ZodError) {
      return badRequest(error.issues[0]?.message || 'Validation error')
    }
    console.error('[POST /api/admin/apps]', error)
    return internalError()
  }
}
