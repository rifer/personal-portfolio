export default function Home() {
  return (
    <main className="min-h-screen p-8 sm:p-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Welcome to My Portfolio</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">About Me</h2>
          <p className="text-lg mb-4">
            This is your personal portfolio website. Use the admin panel to add and manage your content.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Projects</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Your projects will appear here once you add them through the admin panel.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Add your contact information through the admin panel.
          </p>
        </section>
      </div>
    </main>
  );
}
