'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import LogoutButton from './LogoutButton'

export default function AdminNav({ userEmail }: { userEmail: string }) {
  const pathname = usePathname()
  const [cvDropdownOpen, setCvDropdownOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/admin" className="text-xl font-bold hover:text-indigo-600">
                Admin Panel
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/admin"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive('/admin')
                    ? 'border-b-2 border-indigo-500 text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/admin/projects"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive('/admin/projects')
                    ? 'border-b-2 border-indigo-500 text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Projects
              </Link>
              <Link
                href="/admin/about"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive('/admin/about')
                    ? 'border-b-2 border-indigo-500 text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                About
              </Link>

              {/* CV Dropdown */}
              <div className="relative inline-flex items-center">
                <button
                  onClick={() => setCvDropdownOpen(!cvDropdownOpen)}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    pathname.startsWith('/admin/cv')
                      ? 'border-b-2 border-indigo-500 text-gray-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  CV
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {cvDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md py-1 z-50">
                    <Link
                      href="/admin/cv/education"
                      onClick={() => setCvDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Education
                    </Link>
                    <Link
                      href="/admin/cv/experience"
                      onClick={() => setCvDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Work History
                    </Link>
                    <Link
                      href="/admin/cv/languages"
                      onClick={() => setCvDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Languages
                    </Link>
                    <Link
                      href="/admin/cv/skills"
                      onClick={() => setCvDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Skills
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/admin/contact"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isActive('/admin/contact')
                    ? 'border-b-2 border-indigo-500 text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-700 dark:text-gray-300 mr-4">
              {userEmail}
            </span>
            <LogoutButton />
          </div>
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {cvDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setCvDropdownOpen(false)}
        />
      )}
    </nav>
  )
}
