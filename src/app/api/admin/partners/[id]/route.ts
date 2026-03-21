import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminSession, unauthorized, notFound, badRequest, internalError } from '@/lib/api-auth'
import { updatePartnerSchema } from '@/lib/validations'
import { ZodError } from 'zod'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminSession()
    if (!admin) {
      return unauthorized()
    }

    const { id } = await params

    const partner = await prisma.partner.findUnique({
      where: { id },
      include: {
        referrals: { include: { application: { select: { name: true, slug: true } } } },
        commissions: true,
        payoutRequests: true,
      },
    })

    if (!partner) {
      return notFound()
    }

    return NextResponse.json(
      {
        success: true,
        partner: {
          id: partner.id,
          name: partner.name,
          email: partner.email,
          platform: partner.platform,
          profileUrl: partner.profileUrl,
          followers: partner.followers,
          thematic: partner.thematic,
          status: partner.status,
          referralCode: partner.referralCode,
          commissionRate: partner.commissionRate,
          paymentInfo: partner.paymentInfo,
          createdAt: partner.createdAt,
          referrals: partner.referrals.map((r) => ({
            id: r.id,
            userId: r.userId,
            applicationName: r.application.name,
            applicationSlug: r.application.slug,
            status: r.status,
            createdAt: r.createdAt,
          })),
          commissions: partner.commissions.map((c) => ({
            id: c.id,
            amount: c.amount,
            month: c.month,
            status: c.status,
          })),
          payoutRequests: partner.payoutRequests.map((p) => ({
            id: p.id,
            amount: p.amount,
            status: p.status,
            createdAt: p.createdAt,
            paidAt: p.paidAt,
          })),
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[GET /api/admin/partners/[id]]', error)
    return internalError()
  }
}

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
    const validated = updatePartnerSchema.parse(body)

    const partner = await prisma.partner.findUnique({
      where: { id },
    })

    if (!partner) {
      return notFound()
    }

    const updated = await prisma.partner.update({
      where: { id },
      data: {
        commissionRate: validated.commissionRate ?? partner.commissionRate,
        status: validated.status ?? partner.status,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Partenaire mis à jour',
        partner: {
          id: updated.id,
          name: updated.name,
          email: updated.email,
          commissionRate: updated.commissionRate,
          status: updated.status,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof ZodError) {
      return badRequest(error.issues[0]?.message || 'Validation error')
    }
    console.error('[PUT /api/admin/partners/[id]]', error)
    return internalError()
  }
}
