'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function SkillsPage() {
  const [skills, setSkills] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
  })
  const [aboutId, setAboutId] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('about')
      .select('*')
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching skills:', error)
    } else if (data) {
      setAboutId(data.id)
      setSkills(data.skills || [])
    }
    setLoading(false)
  }

  const saveSkills = async (updatedSkills: string[]) => {
    if (!aboutId) {
      alert('No about record found. Please create one in the About section first.')
      return
    }

    const { error } = await supabase
      .from('about')
      .update({ skills: updatedSkills })
      .eq('id', aboutId)

    if (error) {
      alert('Error updating skills: ' + error.message)
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let updatedSkills: string[]
    if (editingIndex !== null) {
      // Edit existing skill
      updatedSkills = [...skills]
      updatedSkills[editingIndex] = formData.name
    } else {
      // Add new skill
      updatedSkills = [...skills, formData.name]
    }

    const success = await saveSkills(updatedSkills)
    if (success) {
      setSkills(updatedSkills)
      alert(editingIndex !== null ? 'Skill updated successfully!' : 'Skill added successfully!')
      setShowModal(false)
      resetForm()
    }
  }

  const handleEdit = (index: number) => {
    setEditingIndex(index)
    setFormData({
      name: skills[index],
    })
    setShowModal(true)
  }

  const handleDelete = async (index: number) => {
    if (!confirm('Are you sure you want to delete this skill?')) return

    const updatedSkills = skills.filter((_, i) => i !== index)
    const success = await saveSkills(updatedSkills)
    if (success) {
      setSkills(updatedSkills)
      alert('Skill deleted successfully!')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
    })
    setEditingIndex(null)
  }

  const openAddModal = () => {
    resetForm()
    setShowModal(true)
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Skills</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your core competencies and skills
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Skill
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : !aboutId ? (
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg p-6">
          <p className="text-gray-500 dark:text-gray-400">
            No about record found. Please create one in the About section first.
          </p>
        </div>
      ) : skills.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg p-6">
          <p className="text-gray-500 dark:text-gray-400">
            No skills yet. Click "Add Skill" to add your first skill.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg p-4"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium flex-1">{skill}</h3>
                <div className="flex gap-2 ml-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-sm text-red-600 hover:text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
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
                {editingIndex !== null ? 'Edit Skill' : 'Add Skill'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Skill Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., React, Product Management, UI/UX Design"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    {editingIndex !== null ? 'Update' : 'Create'}
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
