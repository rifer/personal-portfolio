'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Experience {
  id: string
  company: string
  position: string
  description?: string
  start_date: string
  end_date?: string
  display_order: number
}

export default function ExperiencePage() {
  const [experience, setExperience] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    description: '',
    start_date: '',
    end_date: '',
  })
  const supabase = createClient()

  useEffect(() => {
    fetchExperience()
  }, [])

  const fetchExperience = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('experience')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Error fetching experience:', error)
    } else {
      setExperience(data || [])
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const experienceData = {
      ...formData,
      end_date: formData.end_date || null,
      display_order: editingExperience ? editingExperience.display_order : experience.length,
    }

    if (editingExperience) {
      const { error } = await supabase
        .from('experience')
        .update(experienceData)
        .eq('id', editingExperience.id)

      if (error) {
        alert('Error updating experience: ' + error.message)
      } else {
        alert('Experience updated successfully!')
      }
    } else {
      const { error } = await supabase
        .from('experience')
        .insert([experienceData])

      if (error) {
        alert('Error creating experience: ' + error.message)
      } else {
        alert('Experience created successfully!')
      }
    }

    setShowModal(false)
    resetForm()
    fetchExperience()
  }

  const handleEdit = (exp: Experience) => {
    setEditingExperience(exp)
    setFormData({
      company: exp.company,
      position: exp.position,
      description: exp.description || '',
      start_date: exp.start_date || '',
      end_date: exp.end_date || '',
    })
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience entry?')) return

    const { error } = await supabase
      .from('experience')
      .delete()
      .eq('id', id)

    if (error) {
      alert('Error deleting experience: ' + error.message)
    } else {
      alert('Experience deleted successfully!')
      fetchExperience()
    }
  }

  const resetForm = () => {
    setFormData({
      company: '',
      position: '',
      description: '',
      start_date: '',
      end_date: '',
    })
    setEditingExperience(null)
  }

  const openAddModal = () => {
    resetForm()
    setShowModal(true)
  }

  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Work History</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your professional experience
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Experience
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : experience.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg p-6">
          <p className="text-gray-500 dark:text-gray-400">
            No experience entries yet. Click "Add Experience" to add your first position.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {experience.map((exp) => (
            <div
              key={exp.id}
              className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg"
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium">{exp.position}</h3>
                    <p className="text-md text-indigo-600 dark:text-indigo-400">
                      {exp.company}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                      {formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : 'Present'}
                    </p>
                    {exp.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 whitespace-pre-line">
                        {exp.description}
                      </p>
                    )}
                  </div>
                  <div className="ml-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(exp)}
                      className="text-sm text-indigo-600 hover:text-indigo-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
                      className="text-sm text-red-600 hover:text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {editingExperience ? 'Edit Experience' : 'Add Experience'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Company *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Google"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Position *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Senior Software Engineer"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.start_date}
                      onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                    />
                    <p className="text-xs text-gray-500 mt-1">Leave empty if current position</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Describe your responsibilities, achievements, and key projects..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                  />
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
                    {editingExperience ? 'Update' : 'Create'}
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
