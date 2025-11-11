interface ExperienceItem {
  id: string
  company: string
  position: string
  description?: string
  start_date: string
  end_date?: string
}

interface EducationItem {
  id: string
  institution: string
  degree: string
  field_of_study?: string
  start_date?: string
  end_date?: string
  description?: string
}

interface ExperienceProps {
  experience: ExperienceItem[]
  education: EducationItem[]
}

export default function Experience({ experience, education }: ExperienceProps) {
  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center">
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Experience & Education
          </span>
        </h2>

        {/* Experience Timeline */}
        {experience.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white">
              Professional Experience
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-600 to-purple-600"></div>

              <div className="space-y-12">
                {experience.map((exp, index) => (
                  <div key={exp.id} className="relative pl-8 md:pl-20">
                    {/* Timeline dot */}
                    <div className="absolute left-0 md:left-8 -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full ring-4 ring-white dark:ring-gray-900"></div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                      <div className="flex flex-wrap justify-between items-start mb-2">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                          {exp.position}
                        </h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : 'Present'}
                        </span>
                      </div>
                      <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-3">
                        {exp.company}
                      </p>
                      {exp.description && (
                        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white">
              Education
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-600 to-purple-600"></div>

              <div className="space-y-12">
                {education.map((edu) => (
                  <div key={edu.id} className="relative pl-8 md:pl-20">
                    {/* Timeline dot */}
                    <div className="absolute left-0 md:left-8 -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full ring-4 ring-white dark:ring-gray-900"></div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                      <div className="flex flex-wrap justify-between items-start mb-2">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                          {edu.degree}
                        </h4>
                        {(edu.start_date || edu.end_date) && (
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(edu.start_date)} - {edu.end_date ? formatDate(edu.end_date) : 'Present'}
                          </span>
                        )}
                      </div>
                      <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-1">
                        {edu.institution}
                      </p>
                      {edu.field_of_study && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                          {edu.field_of_study}
                        </p>
                      )}
                      {edu.description && (
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
