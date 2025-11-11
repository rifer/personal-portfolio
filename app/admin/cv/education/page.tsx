'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Education {
  id: string
  institution: string
  degree: string
  field_of_study?: string
  start_date?: string
  end_date?: string
  description?: string
  display_order: number
}

export default function EducationPage() {
  const [education, setEducation] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingEducation, setEditingEducation] = useState<Education | null>(null)
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    field_of_study: '',
    start_date: '',
    end_date: '',
    description: '',
  })
  const supabase = createClient()

  useEffect(() => {
    fetchEducation()
  }, [])

  const fetchEducation = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('education')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Error fetching education:', error)
    } else {
      setEducation(data || [])
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const educationData = {
      ...formData,
      start_date: formData.start_date || null,
      end_date: formData.end_date || null,
      display_order: editingEducation ? editingEducation.display_order : education.length,
    }

    if (editingEducation) {
      const { error } = await supabase
        .from('education')
        .update(educationData)
        .eq('id', editingEducation.id)

      if (error) {
        alert('Error updating education: ' + error.message)
      } else {
        alert('Education updated successfully!')
      }
    } else {
      const { error } = await supabase
        .from('education')
        .insert([educationData])

      if (error) {
        alert('Error creating education: ' + error.message)
      } else {
        alert('Education created successfully!')
      }
    }

    setShowModal(false)
    resetForm()
    fetchEducation()
  }

  const handleEdit = (edu: Education) => {
    setEditingEducation(edu)
    setFormData({
      institution: edu.institution,
      degree: edu.degree,
      field_of_study: edu.field_of_study || '',
      start_date: edu.start_date || '',
      end_date: edu.end_date || '',
      description: edu.description || '',
    })
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this education entry?')) return

    const { error } = await supabase
      .from('education')
      .delete()
      .eq('id', id)

    if (error) {
      alert('Error deleting education: ' + error.message)
    } else {
      alert('Education deleted successfully!')
      fetchEducation()
    }
  }

  const resetForm = () => {
    setFormData({
      institution: '',
      degree: '',
      field_of_study: '',
      start_date: '',
      end_date: '',
      description: '',
    })
    setEditingEducation(null)
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
          <h1 className="text-3xl font-bold">Education</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your educational background
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Education
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : education.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg p-6">
          <p className="text-gray-500 dark:text-gray-400">
            No education entries yet. Click "Add Education" to add your first entry.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg"
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium">{edu.degree}</h3>
                    <p className="text-md text-indigo-600 dark:text-indigo-400">
                      {edu.institution}
                    </p>
                    {edu.field_of_study && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {edu.field_of_study}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                      {formatDate(edu.start_date)} - {edu.end_date ? formatDate(edu.end_date) : 'Present'}
                    </p>
                    {edu.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        {edu.description}
                      </p>
                    )}
                  </div>
                  <div className="ml-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(edu)}
                      className="text-sm text-indigo-600 hover:text-indigo-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(edu.id)}
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
                {editingEducation ? 'Edit Education' : 'Add Education'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Institution *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Stanford University"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Degree *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Bachelor of Science"
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Field of Study
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Computer Science"
                    value={formData.field_of_study}
                    onChange={(e) => setFormData({ ...formData, field_of_study: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
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
                    <p className="text-xs text-gray-500 mt-1">Leave empty if currently enrolled</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Achievements, coursework, honors, etc."
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
                    {editingEducation ? 'Update' : 'Create'}
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
