import { Card, CardContent } from './ui/card'
import { Target, Users, Zap } from 'lucide-react'
import { useLanguage } from './LanguageContext'

export function About() {
  const { t } = useLanguage()

  const values = [
    {
      title: t('about.value1.title'),
      description: t('about.value1.description'),
      icon: Zap
    },
    {
      title: t('about.value2.title'),
      description: t('about.value2.description'),
      icon: Target
    },
    {
      title: t('about.value3.title'),
      description: t('about.value3.description'),
      icon: Users
    }
  ]

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl mb-6 text-foreground">{t('about.title')}</h2>
            <p className="text-lg text-muted-foreground mb-6">
              {t('about.description1')}
            </p>
            <p className="text-muted-foreground mb-8">
              {t('about.description2')}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl mb-2 text-primary">{t('about.stat1.number')}</div>
                <div className="text-sm text-muted-foreground">{t('about.stat1.label')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2 text-primary">{t('about.stat2.number')}</div>
                <div className="text-sm text-muted-foreground">{t('about.stat2.label')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2 text-primary">{t('about.stat3.number')}</div>
                <div className="text-sm text-muted-foreground">{t('about.stat3.label')}</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card key={index} className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="mb-2 text-card-foreground">{value.title}</h3>
                        <p className="text-sm text-muted-foreground">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}