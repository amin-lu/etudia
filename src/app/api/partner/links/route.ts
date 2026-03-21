import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getPartnerSession, unauthorized, internalError } from '@/lib/api-auth'

export async function GET(request: NextRequest) {
  try {
    const user = await getPartnerSession()
    if (!user) {
      return unauthorized()
    }

    const partner = await prisma.partner.findUnique({
      where: { id: user.id },
    })

    if (!partner) {
      return unauthorized()
    }

    const applications = await prisma.application.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        category: true,
        price: true,
        commissionRate: true,
      },
    })

    const linksData = await Promise.all(
      applications.map(async (app) => {
        const clicks = await prisma.linkClick.count({
          where: {
            partnerId: partner.id,
            applicationId: app.id,
          },
        })

        const conversions = await prisma.referral.count({
          where: {
            partnerId: partner.id,
            applicationId: app.id,
          },
        })

        const conversionRate = clicks > 0 ? (conversions / clicks) * 100 : 0

        return {
          applicationName: app.name,
          applicationSlug: app.slug,
          category: app.category,
          price: app.price,
          commissionRate: app.commissionRate,
          referralLink: `${process.env.NEXT_PUBLIC_APP_URL || 'https://etudia.com'}/ref/${partner.referralCode}/${app.slug}`,
          clicks,
          conversions,
          conversionRate: conversionRate.toFixed(2),
        }
      })
    )

    return NextResponse.json(
      {
        success: true,
        links: linksData,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[GET /api/partner/links]', error)
    return internalError()
  }
}
