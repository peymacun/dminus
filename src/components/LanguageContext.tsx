'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

type LanguageContextType = {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  EN: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.blog': 'Blog',
    
    // Hero
    'hero.title': 'Technical Excellence',
    'hero.title.highlight': 'Delivered',
    'hero.subtitle': 'We bridge proven expertise with modern engineering across energy, agriculture, and technology sectors.',
    'hero.cta': 'Request Quote',
    
    // Solutions
    'solutions.title': 'Our Solutions',
    'solutions.subtitle': 'Comprehensive IT services and solutions tailored for modern business needs',
    'solutions.itconsulting.title': 'IT Consulting',
    'solutions.itconsulting.description': 'Strategic technology consulting and custom software development for enterprise digital transformation.',
    'solutions.itsupport.title': 'IT Support',
    'solutions.itsupport.description': 'Comprehensive technical support services including system maintenance, troubleshooting, and infrastructure management for businesses of all sizes.',
    'solutions.training.title': 'IT & Security Training',
    'solutions.training.description': 'Professional training programs in information technology and cybersecurity for companies, schools, and educational institutions to enhance digital literacy and security awareness.',
    
    // About
    'about.title': 'About Dminus',
    'about.description1': 'Founded on the principle that exceptional engineering requires both deep technical knowledge and practical experience, Dminus delivers comprehensive solutions across renewable energy, agricultural technology, and enterprise software development.',
    'about.description2': 'Our team combines rigorous engineering methodology with agile development practices, ensuring solutions that are robust, scalable, and delivered on time while maintaining the highest standards of technical excellence.',
    'about.value1.title': 'Innovation First',
    'about.value1.description': 'We leverage cutting-edge technologies including AI, machine learning, and IoT to create solutions that push the boundaries of what\'s possible.',
    'about.value2.title': 'Precision Engineering',
    'about.value2.description': 'Every project is executed with meticulous attention to detail, ensuring reliability and performance that exceeds industry standards.',
    'about.value3.title': 'Client Partnership',
    'about.value3.description': 'We work closely with our clients to understand their unique challenges and deliver tailored solutions that drive measurable results.',
    'about.stat1.number': '50+',
    'about.stat1.label': 'Projects Delivered',
    'about.stat2.number': '15+',
    'about.stat2.label': 'Industry Partners',
    'about.stat3.number': '99%',
    'about.stat3.label': 'Client Satisfaction',
    
    // Projects
    'projects.title': 'Featured Projects',
    'projects.subtitle': 'Showcasing our technical capabilities across diverse industries',
    'projects.project1.title': 'Solar Panel Defect Detection System',
    'projects.project1.description': 'Automated computer vision system for identifying micro-cracks and performance issues in solar installations, reducing inspection time by 85%.',
    'projects.project2.title': 'Precision Agriculture Analytics Platform',
    'projects.project2.description': 'Real-time crop monitoring system using satellite imagery and IoT sensors, optimizing irrigation and fertilization schedules.',
    'projects.project3.title': 'Enterprise Resource Planning Suite',
    'projects.project3.description': 'Custom ERP solution for manufacturing companies, integrating inventory management, production planning, and quality control.',
    'projects.project4.title': 'Energy Grid Optimization Tool',
    'projects.project4.description': 'Machine learning-powered system for predicting energy demand and optimizing renewable energy distribution across smart grids.',
    'projects.project5.title': 'Automated Greenhouse Control System',
    'projects.project5.description': 'IoT-based climate control system that automatically adjusts temperature, humidity, and lighting based on plant growth stages.',
    'projects.project6.title': 'Supply Chain Analytics Dashboard',
    'projects.project6.description': 'Real-time monitoring and predictive analytics platform for global supply chain optimization and risk management.',
    
    // Contact
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Ready to discuss your next project? Let\'s build something exceptional together.',
    'contact.info.title': 'Contact Information',
    'contact.info.email': 'Email',
    'contact.info.phone': 'Phone',
    'contact.info.location': 'Location',
    'contact.hours.title': 'Business Hours',
    'contact.hours.weekdays': 'Monday - Friday: 9:00 AM - 6:00 PM',
    'contact.hours.saturday': 'Saturday: 10:00 AM - 2:00 PM',
    'contact.hours.sunday': 'Sunday: Closed',
    'contact.form.title': 'Send us a message',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email Address',
    'contact.form.company': 'Company',
    'contact.form.service': 'Service Interest',
    'contact.form.service.placeholder': 'Select a service',
    'contact.form.service.itconsulting': 'IT Consulting',
    'contact.form.service.itsupport': 'IT Support',
    'contact.form.service.training': 'IT & Security Training',
    'contact.form.service.other': 'Other',
    'contact.form.message': 'Message',
    'contact.form.message.placeholder': 'Tell us about your project requirements...',
    'contact.form.submit': 'Send Message',
    'contact.form.success': 'Thank you! Your message has been sent successfully.',
    'contact.form.error': 'There was an error sending your message. Please try again.',
    
    // Footer
    'footer.description': 'Delivering technical excellence across renewable energy, agriculture, and enterprise technology solutions.',
    'footer.quicklinks': 'Quick Links',
    'footer.services': 'Services',
    'footer.copyright': 'All rights reserved.',
    'footer.impressum': 'Impressum',
    'footer.datenschutz': 'Privacy Policy'
  },
  
  TR: {
    // Navigation
    'nav.home': 'Ana Sayfa',
    'nav.about': 'Hakkımızda',
    'nav.projects': 'Projeler',
    'nav.contact': 'İletişim',
    'nav.blog': 'Blog',
    
    // Hero
    'hero.title': 'Teknik Mükemmellik',
    'hero.title.highlight': 'Teslim Edildi',
    'hero.subtitle': 'Kanıtlanmış uzmanlığı enerji, tarım ve teknoloji sektörlerinde modern mühendislikle birleştiriyoruz.',
    'hero.cta': 'Teklif İste',
    
    // Solutions
    'solutions.title': 'Çözümlerimiz',
    'solutions.subtitle': 'Modern iş ihtiyaçlarına özel kapsamlı IT hizmetleri ve çözümleri',
    'solutions.itconsulting.title': 'IT Danışmanlık',
    'solutions.itconsulting.description': 'Kurumsal dijital dönüşüm için stratejik teknoloji danışmanlığı ve özel yazılım geliştirme.',
    'solutions.itsupport.title': 'IT Destek',
    'solutions.itsupport.description': 'Her büyüklükteki işletme için sistem bakımı, sorun giderme ve altyapı yönetimi dahil kapsamlı teknik destek hizmetleri.',
    'solutions.training.title': 'IT ve Güvenlik Eğitimleri',
    'solutions.training.description': 'Şirketler, okullar ve eğitim kurumları için dijital okuryazarlık ve güvenlik farkındalığını artırmaya yönelik bilgi teknolojileri ve siber güvenlik alanında profesyonel eğitim programları.',
    
    // About
    'about.title': 'Dminus Hakkında',
    'about.description1': 'İstisnai mühendisliğin hem derin teknik bilgi hem de pratik deneyim gerektirdiği ilkesi üzerine kurulan Dminus, yenilenebilir enerji, tarım teknolojisi ve kurumsal yazılım geliştirme alanlarında kapsamlı çözümler sunmaktadır.',
    'about.description2': 'Ekibimiz titiz mühendislik metodolojisini çevik geliştirme uygulamalarıyla birleştiriyoruz, en yüksek teknik mükemmellik standartlarını korurken sağlam, ölçeklenebilir ve zamanında teslim edilen çözümler sağlıyoruz.',
    'about.value1.title': 'İnovasyon Öncelikli',
    'about.value1.description': 'Mümkün olanın sınırlarını zorlayan çözümler yaratmak için AI, makine öğrenmesi ve IoT dahil son teknolojileri kullanıyoruz.',
    'about.value2.title': 'Hassas Mühendislik',
    'about.value2.description': 'Her proje, endüstri standartlarını aşan güvenilirlik ve performansı garanti eden titiz detay odaklılığıyla yürütülür.',
    'about.value3.title': 'Müşteri Ortaklığı',
    'about.value3.description': 'Müşterilerimizin benzersiz zorluklarını anlamak ve ölçülebilir sonuçlar sağlayan özel çözümler sunmak için yakın çalışıyoruz.',
    'about.stat1.number': '50+',
    'about.stat1.label': 'Teslim Edilen Proje',
    'about.stat2.number': '15+',
    'about.stat2.label': 'Sektör Ortağı',
    'about.stat3.number': '%99',
    'about.stat3.label': 'Müşteri Memnuniyeti',
    
    // Projects
    'projects.title': 'Öne Çıkan Projeler',
    'projects.subtitle': 'Çeşitli endüstrilerdeki teknik yeteneklerimizi sergiliyoruz',
    'projects.project1.title': 'Güneş Paneli Kusur Tespit Sistemi',
    'projects.project1.description': 'Güneş enerjisi kurulumlarında mikro çatlaklar ve performans sorunlarını tanımlayan otomatik bilgisayar görüş sistemi, inceleme süresini %85 azaltıyor.',
    'projects.project2.title': 'Hassas Tarım Analitik Platformu',
    'projects.project2.description': 'Uydu görüntüleri ve IoT sensörleri kullanarak gerçek zamanlı mahsul izleme sistemi, sulama ve gübreleme programlarını optimize ediyor.',
    'projects.project3.title': 'Kurumsal Kaynak Planlama Paketi',
    'projects.project3.description': 'İmalat şirketleri için özel ERP çözümü, envanter yönetimi, üretim planlaması ve kalite kontrolünü entegre ediyor.',
    'projects.project4.title': 'Enerji Şebekesi Optimizasyon Aracı',
    'projects.project4.description': 'Enerji talebini tahmin eden ve akıllı şebekelerde yenilenebilir enerji dağıtımını optimize eden makine öğrenmesi destekli sistem.',
    'projects.project5.title': 'Otomatik Sera Kontrol Sistemi',
    'projects.project5.description': 'Bitki büyüme aşamalarına göre sıcaklık, nem ve aydınlatmayı otomatik olarak ayarlayan IoT tabanlı iklim kontrol sistemi.',
    'projects.project6.title': 'Tedarik Zinciri Analitik Panosu',
    'projects.project6.description': 'Küresel tedarik zinciri optimizasyonu ve risk yönetimi için gerçek zamanlı izleme ve tahmine dayalı analitik platformu.',
    
    // Contact
    'contact.title': 'İletişime Geçin',
    'contact.subtitle': 'Bir sonraki projenizi tartışmaya hazır mısınız? Birlikte istisnai bir şey inşa edelim.',
    'contact.info.title': 'İletişim Bilgileri',
    'contact.info.email': 'E-posta',
    'contact.info.phone': 'Telefon',
    'contact.info.location': 'Konum',
    'contact.hours.title': 'Çalışma Saatleri',
    'contact.hours.weekdays': 'Pazartesi - Cuma: 09:00 - 18:00',
    'contact.hours.saturday': 'Cumartesi: 10:00 - 14:00',
    'contact.hours.sunday': 'Pazar: Kapalı',
    'contact.form.title': 'Bize mesaj gönderin',
    'contact.form.name': 'Ad Soyad',
    'contact.form.email': 'E-posta Adresi',
    'contact.form.company': 'Şirket',
    'contact.form.service': 'Hizmet İlgi Alanı',
    'contact.form.service.placeholder': 'Bir hizmet seçin',
    'contact.form.service.itconsulting': 'IT Danışmanlık',
    'contact.form.service.itsupport': 'IT Destek',
    'contact.form.service.training': 'IT ve Güvenlik Eğitimleri',
    'contact.form.service.other': 'Diğer',
    'contact.form.message': 'Mesaj',
    'contact.form.message.placeholder': 'Proje gereksinimleriniz hakkında bize bilgi verin...',
    'contact.form.submit': 'Mesaj Gönder',
    'contact.form.success': 'Teşekkürler! Mesajınız başarıyla gönderildi.',
    'contact.form.error': 'Mesajınız gönderilirken bir hata oluştu. Lütfen tekrar deneyin.',
    
    // Footer
    'footer.description': 'Yenilenebilir enerji, tarım ve kurumsal teknoloji çözümlerinde teknik mükemmellik sunuyoruz.',
    'footer.quicklinks': 'Hızlı Linkler',
    'footer.services': 'Hizmetler',
    'footer.copyright': 'Tüm hakları saklıdır.',
    'footer.impressum': 'Künye',
    'footer.datenschutz': 'Gizlilik Politikası'
  },
  
  DE: {
    // Navigation
    'nav.home': 'Start',
    'nav.about': 'Über uns',
    'nav.projects': 'Projekte',
    'nav.contact': 'Kontakt',
    'nav.blog': 'Blog',
    
    // Hero
    'hero.title': 'Technische Exzellenz',
    'hero.title.highlight': 'Geliefert',
    'hero.subtitle': 'Wir verbinden bewährte Expertise mit moderner Technik in den Bereichen Energie, Landwirtschaft und Technologie.',
    'hero.cta': 'Angebot anfordern',
    
    // Solutions
    'solutions.title': 'Unsere Lösungen',
    'solutions.subtitle': 'Umfassende IT-Services und Lösungen für moderne Geschäftsanforderungen',
    'solutions.itconsulting.title': 'IT-Beratung',
    'solutions.itconsulting.description': 'Strategische Technologieberatung und maßgeschneiderte Softwareentwicklung für die digitale Transformation von Unternehmen.',
    'solutions.itsupport.title': 'IT-Support',
    'solutions.itsupport.description': 'Umfassende technische Support-Services einschließlich Systemwartung, Fehlerbehebung und Infrastrukturverwaltung für Unternehmen jeder Größe.',
    'solutions.training.title': 'IT- und Sicherheitsschulungen',
    'solutions.training.description': 'Professionelle Schulungsprogramme in Informationstechnologie und Cybersicherheit für Unternehmen, Schulen und Bildungseinrichtungen zur Förderung digitaler Kompetenz und Sicherheitsbewusstsein.',
    
    // About
    'about.title': 'Über Dminus',
    'about.description1': 'Gegründet auf dem Prinzip, dass außergewöhnliche Technik sowohl tiefes technisches Wissen als auch praktische Erfahrung erfordert, liefert Dminus umfassende Lösungen in den Bereichen erneuerbare Energien, Agrartechnologie und Unternehmenssoftwareentwicklung.',
    'about.description2': 'Unser Team kombiniert rigorose Ingenieursmethodik mit agilen Entwicklungspraktiken und stellt sicher, dass unsere Lösungen robust, skalierbar und termingerecht geliefert werden, während wir höchste Standards technischer Exzellenz beibehalten.',
    'about.value1.title': 'Innovation Zuerst',
    'about.value1.description': 'Wir nutzen modernste Technologien einschließlich KI, maschinellem Lernen und IoT, um Lösungen zu schaffen, die die Grenzen des Möglichen erweitern.',
    'about.value2.title': 'Präzisions-Engineering',
    'about.value2.description': 'Jedes Projekt wird mit akribischer Aufmerksamkeit für Details durchgeführt, um Zuverlässigkeit und Leistung zu gewährleisten, die Industriestandards übertreffen.',
    'about.value3.title': 'Kunden-Partnerschaft',
    'about.value3.description': 'Wir arbeiten eng mit unseren Kunden zusammen, um ihre einzigartigen Herausforderungen zu verstehen und maßgeschneiderte Lösungen zu liefern, die messbare Ergebnisse erzielen.',
    'about.stat1.number': '50+',
    'about.stat1.label': 'Gelieferte Projekte',
    'about.stat2.number': '15+',
    'about.stat2.label': 'Branchenpartner',
    'about.stat3.number': '99%',
    'about.stat3.label': 'Kundenzufriedenheit',
    
    // Projects
    'projects.title': 'Ausgewählte Projekte',
    'projects.subtitle': 'Präsentation unserer technischen Fähigkeiten in verschiedenen Branchen',
    'projects.project1.title': 'Solarmodul-Fehlererkennung System',
    'projects.project1.description': 'Automatisiertes Computer-Vision-System zur Identifizierung von Mikrorissen und Leistungsproblemen in Solaranlagen, reduziert Inspektionszeit um 85%.',
    'projects.project2.title': 'Präzisionslandwirtschaft Analytik-Plattform',
    'projects.project2.description': 'Echtzeit-Ernteüberwachungssystem mit Satellitenbildern und IoT-Sensoren, optimiert Bewässerungs- und Düngepläne.',
    'projects.project3.title': 'Enterprise Resource Planning Suite',
    'projects.project3.description': 'Maßgeschneiderte ERP-Lösung für Fertigungsunternehmen, integriert Lagerverwaltung, Produktionsplanung und Qualitätskontrolle.',
    'projects.project4.title': 'Energienetz-Optimierung Tool',
    'projects.project4.description': 'Machine Learning-basiertes System zur Vorhersage des Energiebedarfs und Optimierung der Verteilung erneuerbarer Energien in intelligenten Netzen.',
    'projects.project5.title': 'Automatisiertes Gewächshaus-Kontrollsystem',
    'projects.project5.description': 'IoT-basiertes Klimakontrollsystem, das Temperatur, Luftfeuchtigkeit und Beleuchtung automatisch je nach Pflanzenwachstumsstadium anpasst.',
    'projects.project6.title': 'Lieferketten-Analytik Dashboard',
    'projects.project6.description': 'Echtzeit-Überwachung und prädiktive Analytik-Plattform für globale Lieferkettenoptimierung und Risikomanagement.',
    
    // Contact
    'contact.title': 'Kontakt aufnehmen',
    'contact.subtitle': 'Bereit, Ihr nächstes Projekt zu besprechen? Lassen Sie uns gemeinsam etwas Außergewöhnliches schaffen.',
    'contact.info.title': 'Kontaktinformationen',
    'contact.info.email': 'E-Mail',
    'contact.info.phone': 'Telefon',
    'contact.info.location': 'Standort',
    'contact.hours.title': 'Geschäftszeiten',
    'contact.hours.weekdays': 'Montag - Freitag: 09:00 - 18:00',
    'contact.hours.saturday': 'Samstag: 10:00 - 14:00',
    'contact.hours.sunday': 'Sonntag: Geschlossen',
    'contact.form.title': 'Senden Sie uns eine Nachricht',
    'contact.form.name': 'Vollständiger Name',
    'contact.form.email': 'E-Mail-Adresse',
    'contact.form.company': 'Unternehmen',
    'contact.form.service': 'Service-Interesse',
    'contact.form.service.placeholder': 'Wählen Sie einen Service',
    'contact.form.service.itconsulting': 'IT-Beratung',
    'contact.form.service.itsupport': 'IT-Support',
    'contact.form.service.training': 'IT- und Sicherheitsschulungen',
    'contact.form.service.other': 'Andere',
    'contact.form.message': 'Nachricht',
    'contact.form.message.placeholder': 'Erzählen Sie uns von Ihren Projektanforderungen...',
    'contact.form.submit': 'Nachricht senden',
    'contact.form.success': 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.',
    'contact.form.error': 'Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
    
    // Footer
    'footer.description': 'Technische Exzellenz in erneuerbaren Energien, Landwirtschaft und Unternehmenstechnologielösungen.',
    'footer.quicklinks': 'Schnelllinks',
    'footer.services': 'Dienstleistungen',
    'footer.copyright': 'Alle Rechte vorbehalten.',
    'footer.impressum': 'Impressum',
    'footer.datenschutz': 'Datenschutzerklärung'
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState('EN')

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}