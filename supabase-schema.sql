-- Portfolio Database Schema for Supabase
-- Run this in your Supabase SQL Editor: https://app.supabase.com/project/_/sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    long_description TEXT,
    image_url TEXT,
    demo_url TEXT,
    github_url TEXT,
    technologies TEXT[], -- Array of technology names
    featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- About Table (single row for about information)
CREATE TABLE IF NOT EXISTS about (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bio TEXT,
    headline VARCHAR(255),
    profile_image_url TEXT,
    resume_url TEXT,
    skills TEXT[], -- Array of skills
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Experience Table
CREATE TABLE IF NOT EXISTS experience (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE, -- NULL if current position
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Education Table
CREATE TABLE IF NOT EXISTS education (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution VARCHAR(255) NOT NULL,
    degree VARCHAR(255) NOT NULL,
    field_of_study VARCHAR(255),
    start_date DATE,
    end_date DATE,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Contact Table (single row for contact information)
CREATE TABLE IF NOT EXISTS contact (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255),
    phone VARCHAR(50),
    location VARCHAR(255),
    github_url TEXT,
    linkedin_url TEXT,
    twitter_url TEXT,
    website_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Languages Table
CREATE TABLE IF NOT EXISTS languages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    proficiency VARCHAR(50) NOT NULL CHECK (proficiency IN ('native', 'fluent', 'advanced', 'intermediate', 'beginner')),
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON projects(display_order);
CREATE INDEX IF NOT EXISTS idx_experience_display_order ON experience(display_order);
CREATE INDEX IF NOT EXISTS idx_education_display_order ON education(display_order);
CREATE INDEX IF NOT EXISTS idx_languages_display_order ON languages(display_order);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers to update updated_at automatically
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_about_updated_at BEFORE UPDATE ON about
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experience_updated_at BEFORE UPDATE ON experience
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_education_updated_at BEFORE UPDATE ON education
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_updated_at BEFORE UPDATE ON contact
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_languages_updated_at BEFORE UPDATE ON languages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE about ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact ENABLE ROW LEVEL SECURITY;
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables (anyone can view portfolio content)
CREATE POLICY "Public read access for projects" ON projects
    FOR SELECT USING (true);

CREATE POLICY "Public read access for about" ON about
    FOR SELECT USING (true);

CREATE POLICY "Public read access for experience" ON experience
    FOR SELECT USING (true);

CREATE POLICY "Public read access for education" ON education
    FOR SELECT USING (true);

CREATE POLICY "Public read access for contact" ON contact
    FOR SELECT USING (true);

CREATE POLICY "Public read access for languages" ON languages
    FOR SELECT USING (true);

-- Authenticated users can perform all operations (for admin access)
CREATE POLICY "Authenticated users can insert projects" ON projects
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects" ON projects
    FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete projects" ON projects
    FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert about" ON about
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update about" ON about
    FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete about" ON about
    FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert experience" ON experience
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update experience" ON experience
    FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete experience" ON experience
    FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert education" ON education
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update education" ON education
    FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete education" ON education
    FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert contact" ON contact
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update contact" ON contact
    FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete contact" ON contact
    FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert languages" ON languages
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update languages" ON languages
    FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete languages" ON languages
    FOR DELETE TO authenticated USING (true);

-- Insert initial empty rows for singleton tables (about and contact)
INSERT INTO about (bio, headline) VALUES ('Your bio goes here', 'Your headline')
ON CONFLICT DO NOTHING;

INSERT INTO contact (email) VALUES ('your@email.com')
ON CONFLICT DO NOTHING;
