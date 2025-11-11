'use client'

import { useState } from 'react'
import { uploadImage } from '@/lib/storage'

interface ImageUploadProps {
  currentImage?: string
  onImageUploaded: (url: string) => void
  label?: string
}

export default function ImageUpload({ currentImage, onImageUploaded, label = "Upload Image" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(currentImage || '')

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB')
      return
    }

    setUploading(true)

    // Show preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Upload to Supabase
    const publicUrl = await uploadImage(file)

    if (publicUrl) {
      onImageUploaded(publicUrl)
      setPreviewUrl(publicUrl)
    } else {
      alert('Failed to upload image. Please try again.')
      setPreviewUrl(currentImage || '')
    }

    setUploading(false)
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
      </label>

      {previewUrl && (
        <div className="mb-3">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
          />
        </div>
      )}

      <div className="flex items-center gap-3">
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading}
            className="hidden"
          />
          <span className={`inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium ${
            uploading
              ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed opacity-50'
              : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer'
          }`}>
            {uploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Choose Image
              </>
            )}
          </span>
        </label>

        <span className="text-sm text-gray-500 dark:text-gray-400">
          Max 5MB (JPG, PNG, GIF, WebP)
        </span>
      </div>
    </div>
  )
}
