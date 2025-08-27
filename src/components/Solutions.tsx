import { Card, CardContent } from './ui/card'
import { Monitor, HeadphonesIcon, GraduationCap } from 'lucide-react'
import { useLanguage } from './LanguageContext'

export function Solutions() {
  const { t } = useLanguage()

  const solutions = [
    {
      title: t('solutions.itconsulting.title'),
      description: t('solutions.itconsulting.description'),
      icon: Monitor
    },
    {
      title: t('solutions.itsupport.title'),
      description: t('solutions.itsupport.description'),
      icon: HeadphonesIcon
    },
    {
      title: t('solutions.training.title'),
      description: t('solutions.training.description'),
      icon: GraduationCap
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl mb-4 text-foreground">{t('solutions.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('solutions.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon
            return (
              <Card 
                key={index} 
                className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg mr-3 group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-card-foreground">{solution.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground">
                    {solution.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}