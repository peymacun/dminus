'use client'

import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Mail, Phone, MapPin, Send, AlertCircle, CheckCircle } from 'lucide-react'
import { useLanguage } from './LanguageContext'
import { useForm, ValidationError } from '@formspree/react'   // ✨ Formspree

export function Contact() {
  const { t } = useLanguage()

  // -- mevcut state yapını koruyoruz
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // ✨ Formspree hook
  const [fsState, fsHandleSubmit] = useForm('mjkekglj')

  // Formspree state'ini senin eskisiyle eşliyoruz (UI bozulmasın diye)
  useEffect(() => {
    setIsSubmitting(fsState.submitting)
    if (fsState.succeeded) {
      setSubmitStatus('success')
      // başarıdan sonra alanları temizle
      setFormData({ name: '', email: '', company: '', service: '', message: '' })
      setErrors({})
    } else if (fsState.errors && fsState.errors.length > 0) {
      setSubmitStatus('error')
    }
  }, [fsState.submitting, fsState.succeeded, fsState.errors])

  // kendi validation'ını aynen tutuyoruz
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // ✨ Artık kendi API'ne fetch yok; validation'dan sonra Formspree'ye gönderiyoruz
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('idle')
    if (!validateForm()) return
    // Formspree handleSubmit'e event'i veriyoruz
    fsHandleSubmit(e)
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  return (
    <section id="contact" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl mb-4 text-foreground">{t('contact.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-foreground mb-6">{t('contact.info.title')}</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t('contact.info.email')}</p>
                    <a href="mailto:contact@dminus.co" className="text-foreground hover:text-primary transition-colors duration-200">
                      contact@dminus.co
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t('contact.info.phone')}</p>
                    <a href="tel:+4915234784383" className="text-foreground hover:text-primary transition-colors duration-200">
                      +49 1523 4784383
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t('contact.info.location')}</p>
                    <p className="text-foreground">Frankfurt, Germany</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-foreground mb-4">{t('contact.hours.title')}</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>{t('contact.hours.weekdays')}</p>
                <p>{t('contact.hours.saturday')}</p>
                <p>{t('contact.hours.sunday')}</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">{t('contact.form.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50 rounded-lg flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <p className="text-green-800 dark:text-green-200">{t('contact.form.success')}</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-lg flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  <p className="text-red-800 dark:text-red-200">{t('contact.form.error')}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('contact.form.name')} *</Label>
                    <Input
                      id="name"
                      name="name"   // <-- Formspree için gerekli
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={`bg-input-background border-border ${errors.name ? 'border-red-500' : ''}`}
                      required
                    />
                    <ValidationError prefix="Name" field="name" errors={fsState.errors} />
                    {errors.name && <p className="text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{t('contact.form.email')} *</Label>
                    <Input
                      id="email"
                      name="email"  // <-- Formspree için gerekli
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={`bg-input-background border-border ${errors.email ? 'border-red-500' : ''}`}
                      required
                    />
                    <ValidationError prefix="Email" field="email" errors={fsState.errors} />
                    {errors.email && <p className="text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">{t('contact.form.company')}</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    className="bg-input-background border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">{t('contact.form.service')}</Label>
                  <Select onValueChange={(value) => handleChange('service', value)}>
                    <SelectTrigger className="bg-input-background border-border">
                      <SelectValue placeholder={t('contact.form.service.placeholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="itconsulting">{t('contact.form.service.itconsulting')}</SelectItem>
                      <SelectItem value="itsupport">{t('contact.form.service.itsupport')}</SelectItem>
                      <SelectItem value="training">{t('contact.form.service.training')}</SelectItem>
                      <SelectItem value="other">{t('contact.form.service.other')}</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* Select değeri submit edilsin diye */}
                  <input type="hidden" name="service" value={formData.service} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t('contact.form.message')} *</Label>
                  <Textarea
                    id="message"
                    name="message" // <-- Formspree için gerekli
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className={`bg-input-background border-border ${errors.message ? 'border-red-500' : ''}`}
                    placeholder={t('contact.form.message.placeholder')}
                    required
                  />
                  <ValidationError prefix="Message" field="message" errors={fsState.errors} />
                  {errors.message && <p className="text-sm text-red-600 dark:text-red-400">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 group disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : t('contact.form.submit')}
                  <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
