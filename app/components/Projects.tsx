'use client'

import { useMemo } from 'react'
import MarkdownRenderer from './MarkdownRenderer'

interface Project {
  id: string
  title: string
  description: string
  long_description?: string
  image_url?: string
  demo_url?: string
  github_url?: string
  technologies?: string[]
  featured: boolean
}

interface ProjectsProps {
  projects: Project[]
}

export default function Projects({ projects }: ProjectsProps) {
  // Determine featured project: use marked featured, or randomly select one
  const { featuredProject, otherProjects } = useMemo(() => {
    if (projects.length === 0) {
      return { featuredProject: null, otherProjects: [] }
    }

    const explicitlyFeatured = projects.filter(p => p.featured)

    if (explicitlyFeatured.length > 0) {
      // Use the first explicitly featured project
      const featured = explicitlyFeatured[0]
      const others = projects.filter(p => p.id !== featured.id)
      return { featuredProject: featured, otherProjects: others }
    } else {
      // Randomly select one project to feature
      const randomIndex = Math.floor(Math.random() * projects.length)
      const featured = projects[randomIndex]
      const others = projects.filter(p => p.id !== featured.id)
      return { featuredProject: featured, otherProjects: others }
    }
  }, [projects])

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Featured Work
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Building products that make an impact
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No projects yet. Add some through the admin panel!
            </p>
          </div>
        ) : (
          <>
            {/* Featured Project - Large Card */}
            {featuredProject && (
              <div className="mb-16">
                <FeaturedProjectCard project={featuredProject} />
              </div>
            )}

            {/* Other Projects - Regular Grid */}
            {otherProjects.length > 0 && (
              <>
                <h3 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white">
                  More Projects
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  )
}

function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Image Section */}
        {project.image_url && (
          <div className="relative h-64 md:h-auto overflow-hidden bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 right-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              ⭐ Featured
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {project.title}
          </h3>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {project.description}
          </p>

          {project.long_description && (
            <div className="mb-6">
              <MarkdownRenderer content={project.long_description} />
            </div>
          )}

          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-lg text-sm font-medium text-indigo-700 dark:text-indigo-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-4">
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                View Live Demo
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:border-indigo-600 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
              >
                View Code
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {project.image_url && (
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-500/10 to-purple-500/10">
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {project.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {project.description}
        </p>

        {project.long_description && (
          <div className="mb-4">
            <MarkdownRenderer
              content={project.long_description}
            />
          </div>
        )}

        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-medium text-gray-700 dark:text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-4">
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-medium"
            >
              Live Demo →
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:underline text-sm font-medium"
            >
              View Code →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
