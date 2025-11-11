'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import ImageUpload from '@/app/components/ImageUpload'
import MarkdownEditor from '@/app/components/MarkdownEditor'

interface AboutData {
  id: string
  bio?: string
  headline?: string
  profile_image_url?: string
  resume_url?: string
  skills?: string[]
}

export default function AboutPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [aboutId, setAboutId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    headline: '',
    bio: '',
    profile_image_url: '',
    resume_url: '',
    skills: '',
  })
  const supabase = createClient()

  useEffect(() => {
    fetchAbout()
  }, [])

  const fetchAbout = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('about')
      .select('*')
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching about:', error)
    } else if (data) {
      setAboutId(data.id)
      setFormData({
        headline: data.headline || '',
        bio: data.bio || '',
        profile_image_url: data.profile_image_url || '',
        resume_url: data.resume_url || '',
        skills: data.skills?.join(', ') || '',
      })
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const aboutData = {
      ...formData,
      skills: formData.skills ? formData.skills.split(',').map(s => s.trim()) : [],
    }

    if (aboutId) {
      const { error } = await supabase
        .from('about')
        .update(aboutData)
        .eq('id', aboutId)

      if (error) {
        alert('Error updating about: ' + error.message)
      } else {
        alert('About section updated successfully!')
      }
    } else {
      const { data, error } = await supabase
        .from('about')
        .insert([aboutData])
        .select()
        .single()

      if (error) {
        alert('Error creating about: ' + error.message)
      } else {
        setAboutId(data.id)
        alert('About section created successfully!')
      }
    }

    setSaving(false)
    fetchAbout()
  }

  if (loading) {
    return <div className="px-4 py-6">Loading...</div>
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <h1 className="text-3xl font-bold mb-8">About</h1>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Headline
              </label>
              <input
                type="text"
                placeholder="e.g., Full-Stack Developer & Designer"
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                A short tagline that describes what you do
              </p>
            </div>

            <div>
              <MarkdownEditor
                label="Bio"
                value={formData.bio}
                onChange={(value) => setFormData({ ...formData, bio: value })}
                placeholder="Tell your story with markdown formatting..."
                rows={10}
              />
            </div>

            <div>
              <ImageUpload
                currentImage={formData.profile_image_url}
                onImageUploaded={(url) => setFormData({ ...formData, profile_image_url: url })}
                label="Profile Image"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Or paste URL manually:
              </p>
              <input
                type="url"
                placeholder="https://example.com/profile.jpg"
                value={formData.profile_image_url}
                onChange={(e) => setFormData({ ...formData, profile_image_url: e.target.value })}
                className="w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Resume/CV URL
              </label>
              <input
                type="url"
                placeholder="https://example.com/resume.pdf"
                value={formData.resume_url}
                onChange={(e) => setFormData({ ...formData, resume_url: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Link to your downloadable resume or CV
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Skills (comma-separated)
              </label>
              <textarea
                rows={3}
                placeholder="JavaScript, React, Node.js, Python, SQL"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
              />
              {formData.skills && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.skills.split(',').map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
