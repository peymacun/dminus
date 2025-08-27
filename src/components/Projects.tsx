import { Card, CardContent } from './ui/card'
import { useLanguage } from './LanguageContext'

export function Projects() {
  const { t } = useLanguage()

  const projects = [
    {
      title: t('projects.project1.title'),
      description: t('projects.project1.description')
    },
    {
      title: t('projects.project2.title'),
      description: t('projects.project2.description')
    },
    {
      title: t('projects.project3.title'),
      description: t('projects.project3.description')
    },
    {
      title: t('projects.project4.title'),
      description: t('projects.project4.description')
    },
    {
      title: t('projects.project5.title'),
      description: t('projects.project5.description')
    },
    {
      title: t('projects.project6.title'),
      description: t('projects.project6.description')
    }
  ]

  return (
    <section id="projects" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl mb-4 text-foreground">{t('projects.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:ring-1 hover:ring-primary/20 group"
            >
              <CardContent className="p-6">
                <h3 className="mb-4 text-card-foreground group-hover:text-primary transition-colors duration-300">{project.title}</h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}