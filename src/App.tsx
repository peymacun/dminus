import { useEffect } from 'react'
import { LanguageProvider } from './components/LanguageContext'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Solutions } from './components/Solutions'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  useEffect(() => {
    // Apply dark theme by default
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <Hero />
          <Solutions />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}