import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminSession, unauthorized, notFound, internalError } from '@/lib/api-auth'
import { hash } from 'bcryptjs'
import { randomBytes } from 'crypto'
import { sendApplicationAccepted } from '@/lib/emails'

function generateReferralCode(): string {
  return randomBytes(3).toString('hex').toUpperCase()
}

function generateTempPassword(): string {
  return randomBytes(4).toString('hex')
}

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

    const application = await prisma.partnerApplication.findUnique({
      where: { id },
    })

    if (!application) {
      return notFound()
    }

    const referralCode = generateReferralCode()
    const tempPassword = generateTempPassword()
    const passwordHash = await hash(tempPassword, 10)

    const partner = await prisma.partner.create({
      data: {
        name: application.name,
        email: application.email,
        passwordHash,
        referralCode,
        platform: application.platform,
        profileUrl: application.profileUrl,
        followers: parseInt(application.followers) || 0,
        thematic: application.thematic,
        commissionRate: 0.4,
        status: 'active',
      },
    })

    await prisma.partnerApplication.update({
      where: { id },
      data: { status: 'accepted' },
    })

    // Send welcome email (non-blocking)
    sendApplicationAccepted(partner.email, partner.name, tempPassword, referralCode).catch(
      (err) => console.error('[EMAIL]', err)
    )

    return NextResponse.json(
      {
        success: true,
        message: 'Candidature acceptée',
        email: partner.email,
        tempPassword,
        referralCode,
        partnerId: partner.id,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[POST /api/admin/applications/[id]/accept]', error)
    return internalError()
  }
}
