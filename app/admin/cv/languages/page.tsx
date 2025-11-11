'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Language {
  id: string
  name: string
  proficiency: string
  display_order: number
}

export default function LanguagesPage() {
  const [languages, setLanguages] = useState<Language[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingLanguage, setEditingLanguage] = useState<Language | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    proficiency: 'intermediate',
  })
  const supabase = createClient()

  const proficiencyLevels = [
    { value: 'native', label: 'Native' },
    { value: 'fluent', label: 'Fluent' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'beginner', label: 'Beginner' },
  ]

  useEffect(() => {
    fetchLanguages()
  }, [])

  const fetchLanguages = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('languages')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Error fetching languages:', error)
    } else {
      setLanguages(data || [])
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const languageData = {
      ...formData,
      display_order: editingLanguage ? editingLanguage.display_order : languages.length,
    }

    if (editingLanguage) {
      const { error } = await supabase
        .from('languages')
        .update(languageData)
        .eq('id', editingLanguage.id)

      if (error) {
        alert('Error updating language: ' + error.message)
      } else {
        alert('Language updated successfully!')
      }
    } else {
      const { error } = await supabase
        .from('languages')
        .insert([languageData])

      if (error) {
        alert('Error creating language: ' + error.message)
      } else {
        alert('Language created successfully!')
      }
    }

    setShowModal(false)
    resetForm()
    fetchLanguages()
  }

  const handleEdit = (lang: Language) => {
    setEditingLanguage(lang)
    setFormData({
      name: lang.name,
      proficiency: lang.proficiency,
    })
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this language?')) return

    const { error } = await supabase
      .from('languages')
      .delete()
      .eq('id', id)

    if (error) {
      alert('Error deleting language: ' + error.message)
    } else {
      alert('Language deleted successfully!')
      fetchLanguages()
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      proficiency: 'intermediate',
    })
    setEditingLanguage(null)
  }

  const openAddModal = () => {
    resetForm()
    setShowModal(true)
  }

  const getProficiencyColor = (proficiency: string) => {
    const colors: Record<string, string> = {
      native: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      fluent: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      advanced: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      beginner: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    }
    return colors[proficiency] || colors.intermediate
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Languages</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your language proficiencies
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Language
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : languages.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg p-6">
          <p className="text-gray-500 dark:text-gray-400">
            No languages yet. Click "Add Language" to add your first language.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {languages.map((lang) => (
            <div
              key={lang.id}
              className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium">{lang.name}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(lang)}
                    className="text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(lang.id)}
                    className="text-sm text-red-600 hover:text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getProficiencyColor(lang.proficiency)}`}>
                {lang.proficiency.charAt(0).toUpperCase() + lang.proficiency.slice(1)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {editingLanguage ? 'Edit Language' : 'Add Language'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Language *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Spanish"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Proficiency Level *
                  </label>
                  <select
                    required
                    value={formData.proficiency}
                    onChange={(e) => setFormData({ ...formData, proficiency: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                  >
                    {proficiencyLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false)
                      resetForm()
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                  >
                    {editingLanguage ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
