import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminSession, unauthorized, internalError } from '@/lib/api-auth'

export async function GET(request: NextRequest) {
  try {
    const admin = await getAdminSession()
    if (!admin) {
      return unauthorized()
    }

    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')

    const applications = await prisma.partnerApplication.findMany({
      where: status ? { status } : {},
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(
      {
        success: true,
        applications: applications.map((app) => ({
          id: app.id,
          name: app.name,
          email: app.email,
          platform: app.platform,
          profileUrl: app.profileUrl,
          followers: app.followers,
          thematic: app.thematic,
          message: app.message,
          status: app.status,
          createdAt: app.createdAt,
        })),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[GET /api/admin/applications]', error)
    return internalError()
  }
}
