import { auth } from '@/lib/auth'

export async function getPartnerSession() {
  const session = await auth()
  if (!session?.user || session.user.role !== 'partner') return null
  return session.user
}

export async function getAdminSession() {
  const session = await auth()
  if (!session?.user || session.user.role !== 'admin') return null
  return session.user
}

export function unauthorized() {
  return Response.json({ error: 'Non autorisé' }, { status: 401 })
}

export function badRequest(message: string) {
  return Response.json({ error: message }, { status: 400 })
}

export function notFound() {
  return Response.json({ error: 'Non trouvé' }, { status: 404 })
}

export function internalError(message: string = 'Erreur interne') {
  return Response.json({ error: message }, { status: 500 })
}
