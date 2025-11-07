export default function AboutPage() {
  return (
    <div className="px-4 py-6 sm:px-0">
      <h1 className="text-3xl font-bold mb-8">About</h1>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Manage your about section content here.
          </p>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p className="mb-2">You'll need to set up the database schema first. See the README for instructions on:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Creating the about table in Supabase</li>
              <li>Setting up fields for bio, skills, experience, education, etc.</li>
              <li>Configuring Row Level Security (RLS) policies</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
