interface Language {
  id: string
  name: string
  proficiency: string
}

interface SkillsProps {
  skills: string[]
  languages: Language[]
}

export default function Skills({ skills, languages }: SkillsProps) {
  const getProficiencyWidth = (proficiency: string) => {
    const widths: Record<string, string> = {
      native: 'w-full',
      fluent: 'w-5/6',
      advanced: 'w-4/5',
      intermediate: 'w-3/5',
      beginner: 'w-2/5',
    }
    return widths[proficiency] || 'w-1/2'
  }

  const getProficiencyColor = (proficiency: string) => {
    const colors: Record<string, string> = {
      native: 'from-purple-600 to-pink-600',
      fluent: 'from-indigo-600 to-purple-600',
      advanced: 'from-blue-600 to-indigo-600',
      intermediate: 'from-cyan-600 to-blue-600',
      beginner: 'from-gray-600 to-cyan-600',
    }
    return colors[proficiency] || 'from-gray-600 to-blue-600'
  }

  if (skills.length === 0 && languages.length === 0) return null

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center">
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Skills & Languages
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Technical Skills */}
          {skills.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                Technical Skills
              </h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {skill}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full group-hover:animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                Languages
              </h3>
              <div className="space-y-4">
                {languages.map((language) => (
                  <div key={language.id} className="group">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {language.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                        {language.proficiency}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${getProficiencyColor(language.proficiency)} ${getProficiencyWidth(language.proficiency)} rounded-full transition-all duration-500 group-hover:animate-pulse`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
