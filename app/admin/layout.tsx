import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import LogoutButton from './LogoutButton'
import Link from 'next/link'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold">Admin Panel</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/admin"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/projects"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium"
                >
                  Projects
                </Link>
                <Link
                  href="/admin/about"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium"
                >
                  About
                </Link>
                <Link
                  href="/admin/contact"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium"
                >
                  Contact
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-700 dark:text-gray-300 mr-4">
                {user.email}
              </span>
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
