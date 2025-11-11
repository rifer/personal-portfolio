import { createClient } from '@/lib/supabase/client'

export async function uploadImage(file: File, bucket: string = 'portfolio-images'): Promise<string | null> {
  const supabase = createClient()

  // Generate unique filename
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
  const filePath = `${fileName}`

  // Upload file
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) {
    console.error('Upload error:', error)
    return null
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath)

  return publicUrl
}

export async function deleteImage(url: string, bucket: string = 'portfolio-images'): Promise<boolean> {
  const supabase = createClient()

  // Extract filename from URL
  const fileName = url.split('/').pop()
  if (!fileName) return false

  const { error } = await supabase.storage
    .from(bucket)
    .remove([fileName])

  if (error) {
    console.error('Delete error:', error)
    return false
  }

  return true
}
