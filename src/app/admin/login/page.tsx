import { AdminLogin } from '@/components/admin/admin-login'

export const metadata = {
  title: 'Connexion Admin - Etudia',
  description: 'Admin Login',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <AdminLogin />
    </div>
  )
}
