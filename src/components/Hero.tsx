import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from './LanguageContext'

export function Hero() {
  const { t } = useLanguage()
  
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6 text-foreground">
          {t('hero.title')}
          <br />
          <span className="text-primary">{t('hero.title.highlight')}</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          {t('hero.subtitle')}
        </p>
        
        <Button 
          onClick={scrollToContact}
          className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 group px-8 py-3"
        >
          {t('hero.cta')}
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Button>
      </div>
    </section>
  )
}