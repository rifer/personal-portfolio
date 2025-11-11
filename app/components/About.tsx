import Image from 'next/image'

interface AboutProps {
  about: any
}

export default function About({ about }: AboutProps) {
  if (!about) return null

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            About Me
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {about.profile_image_url && (
            <div className="flex justify-center">
              <div className="relative w-64 h-64 rounded-2xl overflow-hidden ring-4 ring-indigo-600/20">
                <img
                  src={about.profile_image_url}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          <div className={about.profile_image_url ? '' : 'md:col-span-2'}>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {about.bio}
              </p>
            </div>

            {about.skills && about.skills.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Core Competencies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {about.skills.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-full text-sm font-medium text-indigo-700 dark:text-indigo-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
