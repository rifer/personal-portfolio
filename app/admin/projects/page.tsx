export default function ProjectsPage() {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Projects</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Add New Project
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <p className="text-gray-500 dark:text-gray-400">
            No projects yet. Click "Add New Project" to create your first portfolio project.
          </p>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <p className="mb-2">You'll need to set up the database schema first. See the README for instructions on:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Creating the projects table in Supabase</li>
              <li>Setting up the necessary columns (title, description, image_url, etc.)</li>
              <li>Configuring Row Level Security (RLS) policies</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
