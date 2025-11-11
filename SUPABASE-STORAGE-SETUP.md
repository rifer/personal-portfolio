# Supabase Storage Setup Guide

This guide will help you set up Supabase Storage for image uploads in your portfolio.

## Step 1: Create Storage Bucket

1. Go to your Supabase project: https://app.supabase.com
2. Click on **Storage** in the left sidebar
3. Click the **New bucket** button
4. Configure the bucket:
   - **Name**: `portfolio-images`
   - **Public bucket**: ✅ **Check this box** (this makes images publicly accessible)
   - Click **Create bucket**

## Step 2: Configure Bucket Policies (Optional but Recommended)

For better security, set up policies so only authenticated users can upload:

1. Click on your `portfolio-images` bucket
2. Go to the **Policies** tab
3. Click **New policy**
4. Create an **INSERT** policy:
   ```
   Policy name: Allow authenticated uploads
   Target roles: authenticated
   USING expression: true
   WITH CHECK expression: true
   ```
5. Create a **DELETE** policy (for cleanup):
   ```
   Policy name: Allow authenticated deletes
   Target roles: authenticated
   USING expression: true
   ```

The bucket is already set to public, so anyone can view the images (which is what you want for your portfolio).

## Step 3: Test the Upload

1. Go to your admin panel: http://localhost:3000/admin
2. Navigate to **Projects** or **About**
3. Click **Choose Image** in the image upload section
4. Select an image file (max 5MB)
5. The image will upload automatically!

## Troubleshooting

### Upload fails with "Storage bucket not found"
- Make sure the bucket name is exactly `portfolio-images`
- Check that you created the bucket in the correct Supabase project

### Upload fails with "Permission denied"
- Make sure the bucket is set to **Public**
- Check that RLS policies are configured correctly
- Make sure you're logged in to the admin panel

### Image doesn't display
- Check that the image URL is correct in the browser console
- Make sure the bucket is public
- Try accessing the image URL directly in your browser

## File Size and Type Limits

The upload component enforces these limits:
- **Max file size**: 5MB
- **Allowed types**: JPG, PNG, GIF, WebP

You can modify these limits in:
- `app/components/ImageUpload.tsx` (client-side validation)

## Storage Pricing

Supabase Free Tier includes:
- **1 GB** of storage
- **2 GB** of bandwidth per month

For most portfolios with 10-20 projects, this should be more than enough!

## Alternative: Using External URLs

You can still paste image URLs manually if you prefer to host images elsewhere:
- Cloudinary
- Imgur
- GitHub
- Any public CDN

Just paste the URL in the "Or paste URL manually" field.

## Need Help?

Check the Supabase Storage documentation: https://supabase.com/docs/guides/storage
