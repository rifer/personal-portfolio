'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface ContactData {
  id: string
  email?: string
  phone?: string
  location?: string
  github_url?: string
  linkedin_url?: string
  twitter_url?: string
  website_url?: string
}

export default function ContactPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [contactId, setContactId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    location: '',
    github_url: '',
    linkedin_url: '',
    twitter_url: '',
    website_url: '',
  })
  const supabase = createClient()

  useEffect(() => {
    fetchContact()
  }, [])

  const fetchContact = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('contact')
      .select('*')
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching contact:', error)
    } else if (data) {
      setContactId(data.id)
      setFormData({
        email: data.email || '',
        phone: data.phone || '',
        location: data.location || '',
        github_url: data.github_url || '',
        linkedin_url: data.linkedin_url || '',
        twitter_url: data.twitter_url || '',
        website_url: data.website_url || '',
      })
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    if (contactId) {
      const { error } = await supabase
        .from('contact')
        .update(formData)
        .eq('id', contactId)

      if (error) {
        alert('Error updating contact: ' + error.message)
      } else {
        alert('Contact information updated successfully!')
      }
    } else {
      const { data, error } = await supabase
        .from('contact')
        .insert([formData])
        .select()
        .single()

      if (error) {
        alert('Error creating contact: ' + error.message)
      } else {
        setContactId(data.id)
        alert('Contact information created successfully!')
      }
    }

    setSaving(false)
    fetchContact()
  }

  if (loading) {
    return <div className="px-4 py-6">Loading...</div>
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <h1 className="text-3xl font-bold mb-8">Contact Information</h1>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Location
              </label>
              <input
                type="text"
                placeholder="San Francisco, CA"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
              />
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-medium mb-4">Social Media Links</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    GitHub
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/username"
                    value={formData.github_url}
                    onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    value={formData.linkedin_url}
                    onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Twitter / X
                  </label>
                  <input
                    type="url"
                    placeholder="https://twitter.com/username"
                    value={formData.twitter_url}
                    onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Personal Website
                  </label>
                  <input
                    type="url"
                    placeholder="https://yourwebsite.com"
                    value={formData.website_url}
                    onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
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
