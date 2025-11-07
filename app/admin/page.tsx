import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <div className="px-4 py-6 sm:px-0">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/projects"
          className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium truncate">Projects</dt>
                  <dd className="text-sm text-gray-500 dark:text-gray-400">
                    Manage your portfolio projects
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/about"
          className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium truncate">About</dt>
                  <dd className="text-sm text-gray-500 dark:text-gray-400">
                    Update your bio and information
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/contact"
          className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium truncate">Contact</dt>
                  <dd className="text-sm text-gray-500 dark:text-gray-400">
                    Manage contact information
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-400 mb-2">
          Getting Started
        </h3>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          Welcome to your portfolio admin panel! Start by adding your projects, updating your about section, and setting your contact information.
        </p>
      </div>
    </div>
  )
}
