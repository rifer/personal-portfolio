-- Migration to add Languages table
-- Run this in your Supabase SQL Editor: https://app.supabase.com/project/_/sql

-- Languages Table
CREATE TABLE IF NOT EXISTS languages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    proficiency VARCHAR(50) NOT NULL CHECK (proficiency IN ('native', 'fluent', 'advanced', 'intermediate', 'beginner')),
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_languages_display_order ON languages(display_order);

-- Add trigger to update updated_at automatically
CREATE TRIGGER update_languages_updated_at BEFORE UPDATE ON languages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;

-- Public read access for languages (anyone can view)
CREATE POLICY "Public read access for languages" ON languages
    FOR SELECT USING (true);

-- Authenticated users can perform all operations (for admin access)
CREATE POLICY "Authenticated users can insert languages" ON languages
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update languages" ON languages
    FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete languages" ON languages
    FOR DELETE TO authenticated USING (true);
