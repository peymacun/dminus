import { Separator } from './ui/separator'
import { useLanguage } from './LanguageContext'

export function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl mb-4 text-card-foreground">Dminus</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a 
                href="mailto:contact@dminus.co" 
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                contact@dminus.co
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-card-foreground">{t('footer.quicklinks')}</h4>
            <div className="space-y-2">
              <button
                onClick={() => scrollToSection('home')}
                className="block text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {t('nav.home')}
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {t('nav.about')}
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="block text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {t('nav.projects')}
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {t('nav.contact')}
              </button>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="mb-4 text-card-foreground">{t('footer.services')}</h4>
            <div className="space-y-2">
              <div className="text-muted-foreground">{t('solutions.solarvision.title')}</div>
              <div className="text-muted-foreground">{t('solutions.agrovision.title')}</div>
              <div className="text-muted-foreground">{t('solutions.itconsulting.title')}</div>
              <a 
                href="https://blog.dminus.co" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {t('nav.blog')}
              </a>
            </div>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="text-sm text-muted-foreground">
            © {currentYear} Dminus. {t('footer.copyright')}
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="https://dminus.co/impressum" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              {t('footer.impressum')}
            </a>
            <a 
              href="https://dminus.co/datenschutz" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              {t('footer.datenschutz')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}