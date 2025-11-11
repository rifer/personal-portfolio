import { createClient } from '@/lib/supabase/server'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Navigation from './components/Navigation'

// Disable caching so content updates appear immediately
export const dynamic = 'force-dynamic'

export default async function Home() {
  const supabase = await createClient()

  // Fetch all data in parallel
  const [aboutData, projectsData, experienceData, educationData, contactData, languagesData] = await Promise.all([
    supabase.from('about').select('*').limit(1).single(),
    supabase.from('projects').select('*').order('display_order', { ascending: true }),
    supabase.from('experience').select('*').order('display_order', { ascending: true }),
    supabase.from('education').select('*').order('display_order', { ascending: true }),
    supabase.from('contact').select('*').limit(1).single(),
    supabase.from('languages').select('*').order('display_order', { ascending: true }),
  ])

  const about = aboutData.data
  const projects = projectsData.data || []
  const experience = experienceData.data || []
  const education = educationData.data || []
  const contact = contactData.data
  const languages = languagesData.data || []

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <Hero about={about} contact={contact} />
        <About about={about} />
        <Projects projects={projects} />
        <Experience experience={experience} education={education} />
        <Skills skills={about?.skills || []} languages={languages} />
        <Contact contact={contact} />
      </main>
    </>
  )
}
