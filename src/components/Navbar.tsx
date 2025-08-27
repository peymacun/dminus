'use client'

import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from './LanguageContext'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
      
      // Active section detection
      const sections = ['home', 'about', 'projects', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleLanguageSelect = (lang: string) => {
    setLanguage(lang)
    setIsLanguageOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsLanguageOpen(false)
    }
  }

  return (
    <>
      <a 
        href="#home" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded"
      >
        Skip to content
      </a>
      
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-sm' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('home')}
              className="text-xl text-foreground hover:text-primary transition-colors duration-200"
            >
              Dminus
            </button>
            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { key: 'home', label: t('nav.home') },
                { key: 'about', label: t('nav.about') },
                { key: 'projects', label: t('nav.projects') },
                { key: 'contact', label: t('nav.contact') }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => scrollToSection(key)}
                  className={`text-foreground hover:text-primary transition-colors duration-200 relative ${
                    activeSection === key ? 'text-primary' : ''
                  }`}
                  aria-current={activeSection === key ? 'page' : undefined}
                >
                  {label}
                  {activeSection === key && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </button>
              ))}
              
              <a
                href="https://blog.dminus.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors duration-200"
              >
                {t('nav.blog')}
              </a>
              
              {/* Language Switcher */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  onKeyDown={handleKeyDown}
                  className="flex items-center space-x-1 text-foreground hover:text-primary"
                >
                  <span className="uppercase">{language}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                    isLanguageOpen ? 'rotate-180' : ''
                  }`} />
                </Button>
                
                {isLanguageOpen && (
                  <div className="absolute top-full right-0 mt-2 py-2 w-20 bg-card border border-border rounded-md shadow-lg z-50">
                    {['EN', 'TR', 'DE'].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => handleLanguageSelect(lang)}
                        className={`block w-full px-3 py-2 text-left text-sm transition-colors duration-200 ${
                          language === lang
                            ? 'bg-primary text-primary-foreground'
                            : 'text-card-foreground hover:bg-accent hover:text-accent-foreground'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Mobile menu would go here */}
          </div>
        </div>
      </nav>
    </>
  )
}