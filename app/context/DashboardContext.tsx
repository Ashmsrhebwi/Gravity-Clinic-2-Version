import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { clinicService } from '../services/clinicService';
const image1 = 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200';
const image2 = 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200';
const image3 = 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=1200';
const image4 = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800';
const image5 = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800';
const image6 = 'https://images.unsplash.com/photo-1534643960519-11ad79bc19df?auto=format&fit=crop&q=80&w=800';
const image7 = 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800';
const image8 = 'https://images.unsplash.com/photo-1598256989800-fea5ce599b82?auto=format&fit=crop&q=80&w=1200';
const image9 = 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=1200';
const image10 = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800';

export type LanguageCode = 'en' | 'ar' | 'fr' | 'ru';

export type MultiLangText = Record<LanguageCode, string>;

export interface NavLink {
  id: string;
  label: MultiLangText;
  path?: string;
  items?: {
    label: MultiLangText;
    path: string;
  }[];
}

export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: MultiLangText;
}

export interface ProcessStep {
  id: string;
  title: MultiLangText;
  description: MultiLangText;
  iconName: string; // Lucide icon name
}

export interface SectionMetadata {
  title: MultiLangText;
  subtitle: MultiLangText;
}

export interface Branding {
  name: MultiLangText;
  logo: string;
}

export interface Hero {
  videoUrl: string;
  title: MultiLangText;
  subheader: MultiLangText;
  subtitle: MultiLangText;
  primaryBtn: MultiLangText;
  secondaryBtn: MultiLangText;
  showButtons: boolean;
}

export interface Treatment {
  id: string;
  title: MultiLangText;
  category: MultiLangText;
  image: string;
  link: string;
  description?: MultiLangText;
  beforeAfter?: string;
  features?: MultiLangText[];
  successRate?: number;
  duration?: MultiLangText;
}

export interface Testimonial {
  id: string;
  text: MultiLangText;
  name: MultiLangText;
  treatment: MultiLangText;
  rating: number;
  image: string;
}

export interface Result {
  id: string;
  beforeImage: string;
  afterImage: string;
  label: MultiLangText;
  title: MultiLangText;
  text: MultiLangText;
  category: MultiLangText;
  patient: MultiLangText;
}

export interface FAQ {
  id: string;
  question: MultiLangText;
  answer: MultiLangText;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: MultiLangText;
  image: string;
  rating: number;
  experience: string;
  patients: string;
  languages: MultiLangText[];
  bio: MultiLangText;
  specialties: MultiLangText[];
}

export interface Blog {
  id: string;
  title: MultiLangText;
  category: MultiLangText;
  date: MultiLangText;
  image: string;
  excerpt: MultiLangText;
  author: MultiLangText;
  readTime: MultiLangText;
}

export interface Location {
  id: string;
  city: MultiLangText;
  country: MultiLangText;
  address: MultiLangText;
  phone: string;
  email: string;
  hours: MultiLangText;
}

export interface WhatsApp {
  phoneNumber: string;
  message: MultiLangText;
  enabled: boolean;
}

export interface SEO {
  title: MultiLangText;
  description: MultiLangText;
  ogImage: string;
}

export interface Settings {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  buttonRadius: string;
}

export interface CMSUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
  avatar?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  iconName: string;
}

export interface DashboardState {
  branding: Branding;
  navLinks: NavLink[];
  hero: Hero;
  treatments: Treatment[];
  testimonials: Testimonial[];
  results: Result[];
  faqs: FAQ[];
  blogs: Blog[];
  doctors: Doctor[];
  locations: Location[];
  whatsapp: WhatsApp;
  seo: SEO;
  settings: Settings;
  users: CMSUser[];
  stats: Stat[];
  processSteps: ProcessStep[];
  sections: {
    [key: string]: SectionMetadata;
  };
  socialLinks: SocialLink[];
}

interface DashboardContextType {
  state: DashboardState;
  updateBranding: (branding: Partial<Branding>) => void;
  updateHero: (hero: Partial<Hero>) => void;
  updateWhatsApp: (whatsapp: Partial<WhatsApp>) => void;
  updateSEO: (seo: Partial<SEO>) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  addNavLink: (link: NavLink) => void;
  updateNavLink: (id: string, link: Partial<NavLink>) => void;
  deleteNavLink: (id: string) => void;
  addTreatment: (treatment: Treatment) => void;
  updateTreatment: (id: string, treatment: Partial<Treatment>) => void;
  deleteTreatment: (id: string) => void;
  addTestimonial: (testimonial: Testimonial) => void;
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  addFAQ: (faq: FAQ) => void;
  updateFAQ: (id: string, faq: Partial<FAQ>) => void;
  deleteFAQ: (id: string) => void;
  addResult: (result: Result) => void;
  updateResult: (id: string, result: Partial<Result>) => void;
  deleteResult: (id: string) => void;
  addBlog: (blog: Blog) => void;
  updateBlog: (id: string, blog: Partial<Blog>) => void;
  deleteBlog: (id: string) => void;
  addLocation: (location: Location) => void;
  updateLocation: (id: string, location: Partial<Location>) => void;
  deleteLocation: (id: string) => void;
  addUser: (user: CMSUser) => void;
  updateUser: (id: string, user: Partial<CMSUser>) => void;
  deleteUser: (id: string) => void;
  updateGeneric: (type: 'treatment' | 'testimonial' | 'result' | 'stat' | 'processStep' | 'socialLink' | 'doctor' | 'blog' | 'faq' | 'location', id: string, data: any) => void;
  addGeneric: (type: 'treatment' | 'testimonial' | 'result' | 'stat' | 'processStep' | 'socialLink' | 'doctor' | 'blog' | 'faq' | 'location', data: any) => void;
  deleteGeneric: (type: 'treatment' | 'testimonial' | 'result' | 'stat' | 'processStep' | 'socialLink' | 'doctor' | 'blog' | 'faq' | 'location', id: string) => void;
  updateSection: (sectionKey: string, metadata: Partial<SectionMetadata>) => void;
}

// --- Initial Data (Mocked from existing UI) ---

const initialState: DashboardState = {
  branding: {
    name: { en: 'Gravity Clinic', ar: 'جرافيتي كلينيك', fr: 'Clinique Gravity', ru: 'Клиника Гравити' },
    logo: '/logo.png',
  },
  navLinks: [
    { 
      id: '1', 
      label: { en: 'Home', ar: 'الرئيسية', fr: 'Accueil', ru: 'Главная' }, 
      path: '/' 
    },
    { 
      id: '2', 
      label: { en: 'Dental', ar: 'الأسنان', fr: 'Dentaire', ru: 'Стоматология' }, 
      items: [
        { path: '/dental', label: { en: 'Dental Implant', ar: 'زراعة الأسنان', fr: 'Implant Dentaire', ru: 'Имплантация Зубов' } },
        { path: '/hollywood-smile', label: { en: 'Hollywood Smile', ar: 'ابتسامة هوليوود', fr: 'Sourire Hollywood', ru: 'Голливудская Улыбка' } },
      ] 
    },
    { 
      id: '3', 
      label: { en: 'Hair Transplant', ar: 'زراعة الشعر', fr: 'Greffe de Cheveux', ru: 'Пересадка Волос' }, 
      items: [
        { path: '/hair/male', label: { en: 'Male Hair Transplant', ar: 'زراعة الشعر للرجال', fr: 'Greffe Homme', ru: 'Пересадка Волос у Мужчин' } },
        { path: '/hair/female', label: { en: 'Female Hair Transplant', ar: 'زراعة الشعر للنساء', fr: 'Greffe Femme', ru: 'Пересадка Волос у Женщин' } },
        { path: '/hair/beard', label: { en: 'Beard Transplant', ar: 'زراعة اللحية والشارب', fr: 'Greffe Barbe & Moustache', ru: 'Пересадка Бороды и Усов' } },
        { path: '/hair/eyebrow', label: { en: 'Eyebrow Transplant', ar: 'زراعة الحواجب', fr: 'Greffe Sourcils', ru: 'Пересадка Бровей' } },
      ] 
    },
    { 
      id: '4', 
      label: { en: 'About Us', ar: 'من نحن', fr: 'À Propos', ru: 'О Нас' }, 
      items: [
        { path: '/appointment', label: { en: 'Appointment', ar: 'موعد', fr: 'Rendez-vous', ru: 'Запись на Прием' } },
        { path: '/blog', label: { en: 'Blog', ar: 'المدونة', fr: 'Blog', ru: 'Блог' } },
        { path: '/contact', label: { en: 'Contact Us', ar: 'اتصل بنا', fr: 'Contactez-nous', ru: 'Связаться с Нами' } },
      ] 
    },
  ],
  hero: {
    videoUrl: '/hero-background.mp4',
    title: {
      en: 'Transform Your Life with Premium Medical Care',
      ar: 'حوّل حياتك مع رعاية طبية متميزة',
      fr: 'Transformez Votre Vie avec des Soins Médicaux Premium',
      ru: 'Преобразите Свою Жизнь с Премиальной Медициной'
    },
    subheader: {
      en: 'Expert Medical Care',
      ar: 'الرعاية الطبية المتخصصة',
      fr: 'Soins Médicaux d\'Expert',
      ru: 'Экспертная Медицинская Помощь'
    },
    subtitle: {
      en: 'Experience world-class medical care with our expert team.',
      ar: 'اكتشف الرعاية الطبية العالمية مع فريق الخبراء لدينا.',
      fr: 'Découvrez des soins médicaux de classe mondiale avec notre équipe d\'experts.',
      ru: 'Откройте для себя медицинскую помощь мирового класса с нашей командой экспертов.'
    },
    primaryBtn: {
      en: 'Book Now',
      ar: 'احجز الآن',
      fr: 'Réserver',
      ru: 'Записаться'
    },
    secondaryBtn: {
      en: 'Learn More',
      ar: 'اعرف المزيد',
      fr: 'En Savoir Plus',
      ru: 'Подробнее'
    },
    showButtons: false,
  },
  treatments: [
    {
      id: '1',
      title: { en: 'Dental Implants', ar: 'زراعة الأسنان', fr: 'Dentaire', ru: 'Стоматология' },
      category: { en: 'Dental', ar: 'الأسنان', fr: 'Dentaire', ru: 'Стоматология' },
      image: image1,
      link: '/dental',
      description: { en: 'Permanent solution for missing teeth with medical-grade implants.', ar: 'حل دائم للأسنان المفقودة بزراعات عالية الجودة.', fr: 'Solution permanente pour les dents manquantes avec des implants de qualité médicale.', ru: 'Постоянное решение при отсутствии зубов с использованием медицинских имплантатов.' },
      successRate: 99.8,
      duration: { en: '2-3 Appointments', ar: '2-3 مواعيد', fr: '2-3 Rendez-vous', ru: '2-3 Приема' },
      features: [
        { en: 'Lifetime Warranty', ar: 'ضمان مدى الحياة', fr: 'Garantie à vie', ru: 'Пожизненная гарантия' },
        { en: 'Digital Planning', ar: 'تخطيط رقمي', fr: 'Planification numérique', ru: 'Цифровое планирование' }
      ]
    },
    {
      id: '2',
      title: { en: 'Hollywood Smile', ar: 'ابتسامة هوليوود', fr: 'Sourire Hollywoodien', ru: 'Голливудская улыбка' },
      category: { en: 'Dental', ar: 'الأسنان', fr: 'Dentaire', ru: 'Стоматология' },
      image: image2,
      link: '/hollywood-smile',
      description: { en: 'Achieve a perfect, radiant smile with custom porcelain veneers.', ar: 'احصل على ابتسامة مثالية ومشرقة مع قشور البورسلين المخصصة.', fr: 'Obtenez un sourire parfait et éclatant avec des facettes en porcelaine personnalisées.', ru: 'Получите идеальную лучезарную улыбку с помощью индивидуальных фарфоровых виниров.' },
      successRate: 100,
      duration: { en: '2-4 Days', ar: '2-4 أيام', fr: '2-4 Jours', ru: '2-4 Дня' },
    },
    {
      id: '3',
      title: { en: 'Male Hair Transplant', ar: 'زراعة الشعر للرجال', fr: 'Greffe de Cheveux pour Hommes', ru: 'Пересадка Волос для Мужчин' },
      category: { en: 'Hair', ar: 'الشعر', fr: 'Cheveux', ru: 'Волосы' },
      image: image3,
      link: '/male-hair-transplant',
      description: {
        en: 'Advanced hair restoration using FUE technique.',
        ar: 'استعادة الشعر المتقدمة باستخدام تقنية FUE.',
        fr: 'Restauration capillaire avancée utilisant la technique FUE.',
        ru: 'Пересадка волос методом FUE.'
      },
      features: [
        { en: 'Natural Density', ar: 'كثافة طبيعية', fr: 'Densité naturelle', ru: 'Естественная густота' },
        { en: 'No Scarring', ar: 'بدون ندبات', fr: 'Sans cicatrices', ru: 'Без шрамов' },
        { en: 'FUE Technique', ar: 'تقنية FUE', fr: 'Technique FUE', ru: 'Метод FUE' }
      ],
      successRate: 98,
      duration: { en: '6-8 Hours (One Day)', ar: '6-8 ساعات (يوم واحد)', fr: '6-8 Heures (Un jour)', ru: '6-8 Часов (Один день)' },
    },
    {
      id: '4',
      title: { en: 'Female Hair Transplant', ar: 'زراعة الشعر للنساء', fr: 'Greffe de Cheveux Femme', ru: 'Пересадка Волос у Женщин' },
      category: { en: 'Hair', ar: 'الشعر', fr: 'Cheveux', ru: 'Волосы' },
      image: image9,
      link: '/female-hair-transplant',
      description: {
        en: 'Specialized hair restoration tailored for female hair loss patterns.',
        ar: 'استعادة الشعر المتخصصة المصممة لأنماط تساقط الشعر عند النساء.',
        fr: 'Restauration capillaire spécialisée adaptée aux modèles de perte de cheveux féminine.',
        ru: 'Специализированное восстановление волос, адаптированное к женским типам выпадения.'
      },
      successRate: 97,
      duration: { en: '6-8 Hours', ar: '6-8 ساعات', fr: '6-8 Heures', ru: '6-8 Часов' }
    },
    {
      id: '5',
      title: { en: 'Beard & Moustache', ar: 'زراعة اللحية والشارب', fr: 'Greffe de Barbe', ru: 'Пересадка Бороды' },
      category: { en: 'Hair', ar: 'الشعر', fr: 'Cheveux', ru: 'Волосы' },
      image: '/images/hair-transplant.jpg',
      link: '/beard-transplant',
      description: {
        en: 'Achieve a fuller, natural-looking beard and moustache.',
        ar: 'احصل على لحية وشارب أكثر كثافة وطبيعية.',
        fr: 'Obtenez une barbe et une moustache plus pleines et d\'apparence naturelle.',
        ru: 'Добейтесь более густой, естественно выглядящей бороды и усов.'
      },
      successRate: 99,
      duration: { en: '4-6 Hours', ar: '4-6 ساعات', fr: '4-6 Heures', ru: '4-6 Часов' }
    },
    {
      id: '6',
      title: { en: 'Eyebrow Transplant', ar: 'زراعة الحواجب', fr: 'Greffe de Sourcils', ru: 'Пересадка Бровей' },
      category: { en: 'Hair', ar: 'الشعر', fr: 'Cheveux', ru: 'Волосы' },
      image: image9,
      link: '/eyebrow-transplant',
      description: {
        en: 'Permanent solution for thin or over-plucked eyebrows.',
        ar: 'حل دائم للحواجب الرقيقة أو المفرطة النتف.',
        fr: 'Solution permanente pour les sourcils fins ou trop épilés.',
        ru: 'Постоянное решение для тонких или чрезмерно выщипанных бровей.'
      },
      successRate: 99,
      duration: { en: '2-4 Hours', ar: '2-4 ساعات', fr: '2-4 Heures', ru: '2-4 Часов' }
    }
  ],
  testimonials: [
    {
      id: '1',
      text: {
        en: 'Amazing experience! The staff was professional and results exceeded expectations.',
        ar: 'تجربة رائعة! كان الطاقم محترفاً والنتائج فاقت توقعاتي.',
        fr: 'Expérience incroyable! Le personnel était professionnel et les résultats ont dépassé mes attentes.',
        ru: 'Потрясающий опыт! Персонал был профессиональным, а результаты превзошли ожидания.'
      },
      name: { en: 'Ahmed Ali', ar: 'أحمد علي', fr: 'Ahmed Ali', ru: 'Ахмед Али' },
      treatment: { en: 'Dental Implants', ar: 'زراعة الأسنان', fr: 'Implants Dentaires', ru: 'Зубные Имплантаты' },
      rating: 5,
      image: image4,
    },
    {
      id: '2',
      text: {
        en: 'Best decision I ever made. Doctors were caring and clinic was spotless.',
        ar: 'أفضل قرار اتخذته. كان الأطباء مهتمين والعيادة كانت نظيفة جداً.',
        fr: 'La meilleure décision que j\'aie jamais prise. Les médecins étaient attentionnés et la clinique était impeccable.',
        ru: 'Лучшее решение, которое я когда-либо принимал. Врачи были заботливыми, а клиника - безупречной.'
      },
      name: { en: 'Fatima Hassan', ar: 'فاطمة حسن', fr: 'Fatima Hassan', ru: 'Фатима Хассан' },
      treatment: { en: 'Veneers', ar: 'قشور الأسنان', fr: 'Facettes', ru: 'Виниры' },
      rating: 5,
      image: image5,
    },
    {
      id: '3',
      text: {
        en: 'The DHI technique they used was incredible. My hair looks naturally dense and recovery was so fast!',
        ar: 'كانت تقنية DHI التي استخدموها مذهلة. يبدو شعري كثيفاً بشكل طبيعي وكان التعافي سريعاً جداً!',
        fr: 'La technique DHI qu\'ils ont utilisée était incroyable. Mes cheveux ont l\'air naturellement denses!',
        ru: 'Техника DHI, которую они использовали, была невероятной. Мои волосы выглядят естественно густыми!'
      },
      name: { en: 'Omar Tariq', ar: 'عمر طارق', fr: 'Omar Tariq', ru: 'Омар Тарик' },
      treatment: { en: 'Hair Transplant FUE', ar: 'زراعة الشعر FUE', fr: 'Greffe de Cheveux FUE', ru: 'Пересадка Волос FUE' },
      rating: 5,
      image: image3,
    }
  ],
  results: [
    {
      id: '1',
      beforeImage: image6,
      afterImage: image7,
      label: { en: 'Digital Smile Design', ar: 'تصميم الابتسامة الرقمي', fr: 'Conception Numérique de Sourire', ru: 'Цифровой Дизайн Улыбки' },
      title: { en: 'Life-changing Smile', ar: 'ابتسامة تغير الحياة', fr: 'Un Sourire qui Change la Vie', ru: 'Улыбка, Меняющая Жизнь' },
      text: {
        en: 'I was always self-conscious about my smile. The team used digital design to show my future smile before we started.',
        ar: 'كنت دائماً أشعر بالخجل من ابتسامتي. استخدم الفريق التصميم الرقمي ليروني ابتسامتي المستقبلية قبل أن نبدأ.',
        fr: 'J\'étais toujours gêné par mon sourire. L\'équipe a utilisé la conception numérique pour me montrer mon futur sourire avant de commencer.',
        ru: 'Я всегда стеснялась своей улыбки. Команда использовала цифровой дизайн, чтобы показать мою будущую улыбку.'
      },
      category: { en: 'Cosmetic Dentistry', ar: 'تجميل الأسنان', fr: 'Dentisterie Esthétique', ru: 'Эстетическая Стоматология' },
      patient: { en: 'Sarah M.', ar: 'سارة م.', fr: 'Sarah M.', ru: 'Сара М.' },
    }
  ],
  faqs: [
    {
      id: '1',
      question: { en: 'How long do I need to stay for treatment?', ar: 'كم من الوقت أحتاج للبقاء من أجل العلاج؟', fr: 'Combien de temps dois-je rester pour le traitement?', ru: 'Как долго мне нужно оставаться для лечения?' },
      answer: { 
        en: 'Treatment duration varies. Dental procedures typically require 3-7 days, while hair transplants need 2-3 days.', 
        ar: 'تختلف مدة العلاج. تتطلب إجراءات الأسنان عادةً من 3 إلى 7 أيام، بينما تحتاج عمليات زراعة الشعر إلى يومين إلى 3 أيام.',
        fr: 'La durée du traitement varie. Les procédures dentaires nécessitent généralement 3 à 7 jours, tandis que les greffes de cheveux ont besoin de 2 à 3 jours.',
        ru: 'Продолжительность лечения варьируется. Стоматологические процедуры обычно требуют 3-7 дней, в то время как пересадка волос занимает 2-3 дня.'
      },
    },
    {
      id: '2',
      question: { en: 'Do you provide airport transfers and accommodation?', ar: 'هل توفرون خدمة النقل من المطار والإقامة؟', fr: 'Proposez-vous des transferts aéroport et l\'hébergement?', ru: 'Предоставляете ли вы трансфер из аэропорта и проживание?' },
      answer: { 
        en: 'Yes! We offer all-inclusive packages that include airport pickup, hotel accommodation, and transportation.', 
        ar: 'نعم! نحن نقدم باقات شاملة تتضمن الاستقبال من المطار، والإقامة في الفندق، والمواصلات.',
        fr: 'Oui! Nous proposons des forfaits tout compris qui incluent la prise en charge à l\'aéroport, l\'hébergement à l\'hôtel et le transport.',
        ru: 'Да! Мы предлагаем пакеты "все включено", которые включают встречу в аэропорту, проживание в отеле и транспорт.'
      },
    },
  ],
  blogs: [
    {
      id: '1',
      category: { en: 'Dental', ar: 'الأسنان', fr: 'Dentaire', ru: 'Стоматология' },
      title: { 
        en: 'Modern Dental Implants: Restoring Your Natural Smile', 
        ar: 'زراعة الأسنان الحديثة: استعادة ابتسامتك الطبيعية', 
        fr: 'Implants Dentaires Modernes : Restaurer Votre Sourire Naturel', 
        ru: 'Современные Зубные Имплантаты: Восстановление Вашей Природной Улыбки' 
      },
      excerpt: { 
        en: 'Everything you need to know about dental implants, from procedure to recovery.', 
        ar: 'كل ما تحتاج لمعرفته حول زراعة الأسنان، من العملية إلى الشفاء.', 
        fr: 'Tout ce que vous devez savoir sur les implants dentaires, de la procédure à la récupération.', 
        ru: 'Все, что вам нужно знать о зубных имплантатах, от процедуры до восстановления.' 
      },
      image: image8,
      author: { en: 'Dr. Sarah Williams', ar: 'د. سارة ويليامز', fr: 'Dr Sarah Williams', ru: 'Д-р Сара Уильямс' },
      date: { en: 'March 10, 2026', ar: '10 مارس 2026', fr: '10 mars 2026', ru: '10 марта 2026 г.' },
      readTime: { en: '5 min read', ar: '5 دقائق قراءة', fr: '5 min de lecture', ru: '5 мин чтения' },
    },
    {
      id: '2',
      category: { en: 'Hair', ar: 'الشعر', fr: 'Cheveux', ru: 'Волосы' },
      title: { 
        en: 'Hair Transplant: Procedure and Recovery Expectations', 
        ar: 'زراعة الشعر: الإجراء وتوقعات التعافي', 
        fr: 'Greffe de Cheveux : Procédure et Attentes de Récupération', 
        ru: 'Пересадка Волос: Процедура и Ожидания по Восстановлению' 
      },
      excerpt: { 
        en: 'Compare FUE and DHI techniques to determine the best method for your needs.', 
        ar: 'قارن بين تقنيتي FUE و DHI لتحديد الطريقة الأفضل لاحتياجاتك.', 
        fr: 'Comparez les techniques FUE et DHI pour déterminer la meilleure méthode selon vos besoins.', 
        ru: 'Сравните методы FUE и DHI, чтобы определить лучший для ваших нужд.' 
      },
      image: image9,
      author: { en: 'Dr. Ahmed Hassan', ar: 'د. أحمد حسن', fr: 'Dr Ahmed Hassan', ru: 'Д-р Ахмед Хассан' },
      date: { en: 'March 12, 2026', ar: '12 مارس 2026', fr: '12 mars 2026', ru: '12 марта 2026 г.' },
      readTime: { en: '7 min read', ar: '7 دقائق قراءة', fr: '7 min de lecture', ru: '7 мин чтения' },
    }
  ],
  doctors: [
    {
      id: '1',
      name: 'Dr. Sarah Williams',
      specialty: { en: 'Cosmetic Dentist', ar: 'طبيبة تجميل الأسنان', fr: 'Dentiste Cosmétique', ru: 'Косметический Стоматолог' },
      image: image10,
      rating: 4.9,
      experience: '15+',
      patients: '5000+',
      languages: [
        { en: 'English', ar: 'الإنجليزية', fr: 'Anglais', ru: 'Английский' },
        { en: 'French', ar: 'الفرنسية', fr: 'Français', ru: 'Французский' },
        { en: 'Spanish', ar: 'الإسبانية', fr: 'Espagnol', ru: 'Испанский' }
      ],
      bio: { 
        en: 'Passionate about creating perfect smiles through advanced cosmetic dentistry.', 
        ar: 'شغوفة بابتكار بايتسامات مثالية من خلال طب الأسنان التجميلي المتقدم.', 
        fr: 'Passionnée par la création de sourires parfaits grâce à la dentisterie cosmétique avancée.', 
        ru: 'Увлечена созданием идеальных улыбок с помощью передовой косметической стоматологии.' 
      },
      specialties: [
        { en: 'Dental Implants', ar: 'زراعة الأسنان', fr: 'Implants Dentaires', ru: 'Зубные Имплантаты' },
        { en: 'Veneers', ar: 'قشور الأسنان', fr: 'Facettes', ru: 'Виниры' },
        { en: 'Smile Makeover', ar: 'تجميل الابتسامة', fr: 'Relooking du Sourire', ru: 'Преображение Улыбки' }
      ],
    },
    {
      id: '2',
      name: 'Dr. Ahmed Hassan',
      specialty: { en: 'Hair Transplant Surgeon', ar: 'جراح زراعة الشعر', fr: 'Chirurgien de Greffe de Cheveux', ru: 'Хирург по Пересадке Волос' },
      image: image1,
      rating: 5.0,
      experience: '18+',
      patients: '8000+',
      languages: [
        { en: 'English', ar: 'الإنجليزية', fr: 'Anglais', ru: 'Английский' },
        { en: 'Arabic', ar: 'العربية', fr: 'Arabe', ru: 'Арабский' },
        { en: 'Turkish', ar: 'التركية', fr: 'Turc', ru: 'Турецкий' }
      ],
      bio: { 
        en: 'Expert in high-density hair restoration with natural results.', 
        ar: 'خبير في استعادة الشعر عالي الكثافة مع نتائج طبيعية.', 
        fr: 'Expert en restauration capillaire haute densité avec des résultats naturels.', 
        ru: 'Эксперт в высокоплотном восстановлении волос с естественными результатами.' 
      },
      specialties: [
        { en: 'FUE', ar: 'FUE', fr: 'FUE', ru: 'FUE' },
        { en: 'DHI', ar: 'DHI', fr: 'DHI', ru: 'DHI' },
        { en: 'Sapphire FUE', ar: 'FUE السفير', fr: 'Sapphire FUE', ru: 'Сапфировая FUE' }
      ],
    }
  ],
  locations: [
    {
      id: '1',
      city: { en: 'Istanbul', ar: 'اسطنبول', fr: 'Istanbul', ru: 'Стамбул' },
      country: { en: 'Turkey', ar: 'تركيا', fr: 'Turquie', ru: 'Турция' },
      address: { en: 'Gürsel mahallesi 28 nisan caddesi no.6 D.3 Kağıthane İstanbul', ar: 'حي جورسيل شارع 28 نيسان رقم 6 هـ.3 كاغيت خانة إسطنبول', fr: 'Gürsel mahallesi 28 nisan caddesi no.6 D.3 Kağıthane İstanbul', ru: 'Гюрсель махаллеси, проспект 28 апреля, №6, кв.3, Кягытхане, Стамбул' },
      phone: '+90 505 660 63 56',
      email: 'info@gravity-clinic.com',
      hours: { en: 'Mon-Sat: 9:00 AM - 6:00 PM', ar: 'الإثنين-السبت: 9:00 صباحاً - 6:00 مساءً', fr: 'Lun-Sam: 9h00 - 18h00', ru: 'Пн-Сб: 9:00 - 18:00' },
    }
  ],
  whatsapp: {
    phoneNumber: '+90 212 555 0123',
    message: { en: 'I need dental consultation', ar: 'أحتاج إلى استشارة طبية', fr: 'J\'ai besoin d\'une consultation dentaire', ru: 'Мне нужна консультация стоматолога' },
    enabled: true,
  },
  seo: {
    title: { en: 'Gravity Clinic Global', ar: 'عيادة جرافيتي العالمية', fr: 'Gravity Clinic Global', ru: 'Gravity Clinic Global' },
    description: {
      en: 'World-class medical tourism in Istanbul. Precision, Artistry, and Innovation.',
      ar: 'سياحة طبية عالمية في اسطنبول. الدقة والفن والابتكار.',
      fr: 'Tourisme médical de classe mondiale à Istanbul. Précision, talent artistique et innovation.',
      ru: 'Медицинский туризм мирового класса в Стамбуле. Точность, мастерство и инновации.'
    },
    ogImage: '/logo.png',
  },
  settings: {
    primaryColor: '#F97316',
    secondaryColor: '#1A1842',
    fontFamily: 'Inter',
    buttonRadius: '1rem',
  },
  users: [
    { id: '1', name: 'Dr. Alex Rivera', email: 'alex@gravity.clinic', role: 'admin', avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&h=200&fit=crop' },
    { id: '2', name: 'Sarah Johnson', email: 'sarah@gravity.clinic', role: 'editor' },
  ],
  stats: [
    { id: '1', value: 15, suffix: '+', label: { en: 'Years Excellence', ar: 'سنوات من التميز', fr: 'Années d\'Excellence', ru: 'Лет Опыта' } },
    { id: '2', value: 10, suffix: 'k', label: { en: 'Happy Patients', ar: 'مريض سعيد', fr: 'Patients Heureux', ru: 'Счастливых Пациентов' } },
    { id: '3', value: 25, suffix: '', label: { en: 'Expert Doctors', ar: 'أطباء خبراء', fr: 'Médecins Experts', ru: 'Экспертных Врачей' } },
    { id: '4', value: 99, suffix: '%', label: { en: 'Success Rate', ar: 'نسبة النجاح', fr: 'Taux de Réussite', ru: 'Успешность' } },
  ],
  processSteps: [
    { 
      id: '1', 
      title: { en: 'Consultation', ar: 'استشارة', fr: 'Consultation', ru: 'Консультация' }, 
      description: { en: 'Free online assessment', ar: 'تقييم مجاني عبر الإنترنت', fr: 'Évaluation gratuite en ligne', ru: 'Бесплатная онлайн-оценка' }, 
      iconName: 'Calendar' 
    },
    { 
      id: '2', 
      title: { en: 'Travel Plan', ar: 'خطة سفر', fr: 'Plan de Voyage', ru: 'План Поездки' }, 
      description: { en: 'VIP airport transfer', ar: 'نقل VIP من المطار', fr: 'Transfert aéroport VIP', ru: 'VIP трансфер из аэропорта' }, 
      iconName: 'User' 
    },
    { 
      id: '3', 
      title: { en: 'Treatment', ar: 'علاج', fr: 'Traitement', ru: 'Лечение' }, 
      description: { en: 'Modern facilities', ar: 'مرافق حديثة', fr: 'Installations modernes', ru: 'Современные технологии' }, 
      iconName: 'Shield' 
    },
    { 
      id: '4', 
      title: { en: 'Aftercare', ar: 'رعاية لاحقة', fr: 'Suivi', ru: 'Послеоперационный уход' }, 
      description: { en: 'Lifelong support', ar: 'دعم مدى الحياة', fr: 'Soutien à vie', ru: 'Пожизненная поддержка' }, 
      iconName: 'Star' 
    },
  ],
  sections: {
    'home.treatments': { 
      title: { en: 'Our Signature Treatments', ar: 'علاجاتنا المميزة', fr: 'Nos Traitements Signature', ru: 'Наши Фирменные Процедуры' }, 
      subtitle: { en: 'Discover our most sought-after procedures, trusted by patients from 50+ countries', ar: 'اكتشف الإجراءات الأكثر طلباً لدينا، والتي يثق بها المرضى من أكثر من 50 دولة', fr: 'Découvrez nos procédures les plus recherchées, approuvées par des patients de plus de 50 pays', ru: 'Откройте для себя наши самые востребованные процедуры, которым доверяют пациенты из 50+ стран' } 
    },
    'home.results': { 
      title: { en: 'Real Results, Real Stories', ar: 'نتائج حقيقية، قصص حقيقية', fr: 'Résultats Réels, Histoires Réelles', ru: 'Реальные Результаты, Реальные Истории' }, 
      subtitle: { en: 'Experience the transformation of our patients. We take pride in delivering natural, high-quality results that change lives.', ar: 'اختبر تحول مرضانا. نحن نفخر بتقديم نتائج طبيعية وعالية الجودة تغير الحياة.', fr: 'Découvrez la transformation de nos patients. Nous sommes fiers de fournir des résultats naturels et de haute qualité qui changent des vies.', ru: 'Почувствуйте преображение наших пациентов. Мы гордимся тем, что достигаем естественных, высококачественных результатов, которые меняют жизнь.' } 
    },
    'home.testimonials': { 
      title: { en: 'What Our Patients Say', ar: 'ماذا يقول مرضانا', fr: 'Ce Que Disent Nos Patients', ru: 'Что Говорят Наши Пациенты' }, 
      subtitle: { en: 'Thousands of patients trust us every year', ar: 'يثق بنا الآلاف من المرضى كل عام', fr: 'Des milliers de patients nous font confiance chaque année', ru: 'Тысячи пациентов доверяют нам каждый год' } 
    },
  },
  socialLinks: [
    { platform: 'Facebook', url: '#', iconName: 'Facebook' },
    { platform: 'Instagram', url: 'https://instagram.com/gravityclinic', iconName: 'Instagram' },
    { platform: 'Twitter', url: '#', iconName: 'Twitter' },
    { platform: 'Youtube', url: '#', iconName: 'Youtube' },
  ],
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DashboardState>(initialState);

  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        const [settings, navLinks, treatments, testimonials, faqs, locations, stats, processSteps, socialLinks] = await Promise.all([
          clinicService.getSettings(),
          clinicService.getNavLinks(),
          clinicService.getTreatments(),
          clinicService.getTestimonials(),
          clinicService.getFaqs(),
          clinicService.getLocations(),
          clinicService.getStats(),
          clinicService.getProcessSteps(),
          clinicService.getSocialLinks()
        ]);


        setState(prev => ({
          ...prev,
          branding: settings.branding || prev.branding,
          seo: settings.seo || prev.seo,
          hero: { ...prev.hero, ...(settings.hero || {}) },
          settings: { ...prev.settings, ...(settings.ui_settings || {}) },
          whatsapp: { ...prev.whatsapp, ...(settings.whatsapp || {}) },
          navLinks: navLinks.map((link: any) => ({
            id: link.id.toString(),
            label: link.label,
            path: link.path,
            items: link.children?.map((child: any) => ({
              label: child.label,
              path: child.path,
            }))
          })),
          treatments: treatments.map((t: any) => ({
            ...t,
            id: t.id.toString(),
            successRate: t.success_rate, // Transform snake_case to camelCase
          })),
          testimonials: testimonials.map((t: any) => ({
            ...t,
            id: t.id.toString(),
          })),
          faqs: faqs.map((f: any) => ({
            ...f,
            id: f.id.toString(),
          })),
          locations: locations.map((l: any) => ({
            ...l,
            id: l.id.toString(),
          })),
          sections: settings.sections || prev.sections,

          stats: stats.map((s: any) => ({
            ...s,
            id: s.id.toString(),
          })),
          processSteps: processSteps.map((p: any) => ({
            ...p,
            id: p.id.toString(),
            iconName: p.icon_name,
          })),
          socialLinks: socialLinks.map((s: any) => ({
            ...s,
            id: s.id.toString(),
          }))
        }));
        
        console.log('✨ Public content (Treatments, Testimonials, FAQs) synchronized with Laravel');
      } catch (error) {
        console.error('❌ Failed to fetch public content:', error);
      }
    };

    fetchPublicData();
  }, []);

  const updateBranding = (branding: Partial<Branding>) => {
    setState(prev => {
      const newState = { ...prev, branding: { ...prev.branding, ...branding } };
      clinicService.updateSettingsBatch([{ key: 'branding', value: newState.branding }]).catch(console.error);
      return newState;
    });
  };

  const updateHero = (hero: Partial<Hero>) => {
    setState(prev => {
      const newState = { ...prev, hero: { ...prev.hero, ...hero } };
      clinicService.updateSettingsBatch([{ key: 'hero', value: newState.hero }]).catch(console.error);
      return newState;
    });
  };

  const updateWhatsApp = (whatsapp: Partial<WhatsApp>) => {
    setState(prev => {
      const newState = { ...prev, whatsapp: { ...prev.whatsapp, ...whatsapp } };
      clinicService.updateSettingsBatch([{ key: 'whatsapp', value: newState.whatsapp }]).catch(console.error);
      return newState;
    });
  };

  const updateSEO = (seo: Partial<SEO>) => {
    setState(prev => {
      const newState = { ...prev, seo: { ...prev.seo, ...seo } };
      clinicService.updateSettingsBatch([{ key: 'seo', value: newState.seo }]).catch(console.error);
      return newState;
    });
  };

  const updateSettings = (settings: Partial<Settings>) => {
    setState(prev => {
      const newState = { ...prev, settings: { ...prev.settings, ...settings } };
      clinicService.updateSettingsBatch([{ key: 'ui_settings', value: newState.settings }]).catch(console.error);
      return newState;
    });
  };

  const addNavLink = (link: NavLink) => {
    setState(prev => {
      const newState = { ...prev, navLinks: [...prev.navLinks, link] };
      clinicService.syncNavLinks(newState.navLinks).catch(console.error);
      return newState;
    });
  };

  const updateNavLink = (id: string, link: Partial<NavLink>) => {
    setState(prev => {
      const newState = {
        ...prev,
        navLinks: prev.navLinks.map(l => l.id === id ? { ...l, ...link } : l)
      };
      clinicService.syncNavLinks(newState.navLinks).catch(console.error);
      return newState;
    });
  };

  const deleteNavLink = (id: string) => {
    setState(prev => {
      const newState = {
        ...prev,
        navLinks: prev.navLinks.filter(l => l.id !== id)
      };
      clinicService.syncNavLinks(newState.navLinks).catch(console.error);
      return newState;
    });
  };

  const addTreatment = (treatment: Treatment) => {
    setState(prev => ({ ...prev, treatments: [...prev.treatments, treatment] }));
  };

  const updateTreatment = (id: string, treatment: Partial<Treatment>) => {
    setState(prev => ({
      ...prev,
      treatments: prev.treatments.map(t => t.id === id ? { ...t, ...treatment } : t)
    }));
  };

  const deleteTreatment = (id: string) => {
    setState(prev => ({
      ...prev,
      treatments: prev.treatments.filter(t => t.id !== id)
    }));
  };

  const addTestimonial = (testimonial: Testimonial) => {
    setState(prev => ({ ...prev, testimonials: [...prev.testimonials, testimonial] }));
  };

  const updateTestimonial = (id: string, testimonial: Partial<Testimonial>) => {
    setState(prev => ({
      ...prev,
      testimonials: prev.testimonials.map(t => t.id === id ? { ...t, ...testimonial } : t)
    }));
  };

  const deleteTestimonial = (id: string) => {
    setState(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter(t => t.id !== id)
    }));
  };

  const addFAQ = (faq: FAQ) => {
    setState(prev => ({ ...prev, faqs: [...prev.faqs, faq] }));
  };

  const updateFAQ = (id: string, faq: Partial<FAQ>) => {
    setState(prev => ({
      ...prev,
      faqs: prev.faqs.map(f => f.id === id ? { ...f, ...faq } : f)
    }));
  };

  const deleteFAQ = (id: string) => {
    setState(prev => ({
      ...prev,
      faqs: prev.faqs.filter(f => f.id !== id)
    }));
  };

  const addResult = (result: Result) => {
    setState(prev => ({ ...prev, results: [...prev.results, result] }));
  };

  const updateResult = (id: string, result: Partial<Result>) => {
    setState(prev => ({
      ...prev,
      results: prev.results.map(r => r.id === id ? { ...r, ...result } : r)
    }));
  };

  const deleteResult = (id: string) => {
    setState(prev => ({
      ...prev,
      results: prev.results.filter(r => r.id !== id)
    }));
  };

  const addBlog = (blog: Blog) => {
    setState(prev => ({ ...prev, blogs: [...prev.blogs, blog] }));
  };

  const updateBlog = (id: string, blog: Partial<Blog>) => {
    setState(prev => ({
      ...prev,
      blogs: prev.blogs.map(b => b.id === id ? { ...b, ...blog } : b)
    }));
  };

  const deleteBlog = (id: string) => {
    setState(prev => ({
      ...prev,
      blogs: prev.blogs.filter(b => b.id !== id)
    }));
  };

  const addLocation = (location: Location) => {
    setState(prev => ({ ...prev, locations: [...prev.locations, location] }));
  };

  const updateLocation = (id: string, location: Partial<Location>) => {
    setState(prev => ({
      ...prev,
      locations: prev.locations.map(l => l.id === id ? { ...l, ...location } : l)
    }));
  };

  const deleteLocation = (id: string) => {
    setState(prev => ({
      ...prev,
      locations: prev.locations.filter(l => l.id !== id)
    }));
  };

  const addUser = (user: CMSUser) => {
    setState(prev => ({ ...prev, users: [...prev.users, user] }));
  };

  const updateUser = (id: string, user: Partial<CMSUser>) => {
    setState(prev => ({
      ...prev,
      users: prev.users.map(u => u.id === id ? { ...u, ...user } : u)
    }));
  };

  const deleteUser = (id: string) => {
    setState(prev => ({
      ...prev,
      users: prev.users.filter(u => u.id !== id)
    }));
  };

  const addGeneric = (type: 'treatment' | 'testimonial' | 'result' | 'stat' | 'processStep' | 'socialLink' | 'doctor' | 'blog' | 'faq' | 'location', data: any) => {
    const key = (type === 'processStep' ? 'processSteps' : type === 'socialLink' ? 'socialLinks' : `${type}s`) as keyof DashboardState;
    
    // API Call for Batch 2 types
    if (type === 'stat') {
      clinicService.createStat(data).then((res: any) => {
        setState(prev => ({ ...prev, stats: [...prev.stats, { ...res.data, id: res.data.id.toString() }] }));
      }).catch(console.error);
    } else if (type === 'processStep') {
      const payload = { ...data, icon_name: data.iconName };
      clinicService.createProcessStep(payload).then((res: any) => {
        setState(prev => ({ ...prev, processSteps: [...prev.processSteps, { ...res.data, id: res.data.id.toString(), iconName: res.data.icon_name }] }));
      }).catch(console.error);
    } else if (type === 'socialLink') {
      clinicService.createSocialLink(data).then((res: any) => {
        setState(prev => ({ ...prev, socialLinks: [...prev.socialLinks, { ...res.data, id: res.data.id.toString() }] }));
      }).catch(console.error);
    } else if (type === 'faq') {
      clinicService.createFaq(data).then((res: any) => {
        setState(prev => ({ ...prev, faqs: [...prev.faqs, { ...res.data, id: res.data.id.toString() }] }));
      }).catch(console.error);
    } else if (type === 'testimonial') {
      clinicService.createTestimonial(data).then((res: any) => {
        setState(prev => ({ ...prev, testimonials: [...prev.testimonials, { ...res.data, id: res.data.id.toString() }] }));
      }).catch(console.error);
    } else if (type === 'location') {
      clinicService.createLocation(data).then((res: any) => {
        setState(prev => ({ ...prev, locations: [...prev.locations, { ...res.data, id: res.data.id.toString() }] }));
      }).catch(console.error);
    } else {
      // Mock for other types (Batch 4+)
      setState(prev => ({ ...prev, [key]: [...((prev[key] as any[]) || []), { id: Math.random().toString(36).substring(2, 11), ...data }] }));
    }

  };

  const updateGeneric = (type: 'treatment' | 'testimonial' | 'result' | 'stat' | 'processStep' | 'socialLink' | 'doctor' | 'blog' | 'faq' | 'location', id: string, data: any) => {
    const key = (type === 'processStep' ? 'processSteps' : type === 'socialLink' ? 'socialLinks' : `${type}s`) as keyof DashboardState;
    
    // API Call for Batch 2 types
    if (type === 'stat') {
      clinicService.updateStat(parseInt(id), data).catch(console.error);
    } else if (type === 'processStep') {
      const payload = { ...data, icon_name: data.iconName };
      clinicService.updateProcessStep(parseInt(id), payload).catch(console.error);
    } else if (type === 'socialLink') {
      clinicService.updateSocialLink(parseInt(id), data).catch(console.error);
    } else if (type === 'faq') {
      clinicService.updateFaq(parseInt(id), data).catch(console.error);
    } else if (type === 'testimonial') {
      clinicService.updateTestimonial(parseInt(id), data).catch(console.error);
    } else if (type === 'location') {
      clinicService.updateLocation(parseInt(id), data).catch(console.error);
    }


    setState(prev => ({
      ...prev,
      [key]: ((prev[key] as any[]) || []).map(item => item.id === id ? { ...item, ...data } : item)
    }));
  };

  const deleteGeneric = (type: 'treatment' | 'testimonial' | 'result' | 'stat' | 'processStep' | 'socialLink' | 'doctor' | 'blog' | 'faq' | 'location', id: string) => {
    const key = (type === 'processStep' ? 'processSteps' : type === 'socialLink' ? 'socialLinks' : `${type}s`) as keyof DashboardState;
    
    // API Call for Batch 2 types
    if (type === 'stat') {
      clinicService.deleteStat(parseInt(id)).catch(console.error);
    } else if (type === 'processStep') {
      clinicService.deleteProcessStep(parseInt(id)).catch(console.error);
    } else if (type === 'socialLink') {
      clinicService.deleteSocialLink(parseInt(id)).catch(console.error);
    } else if (type === 'faq') {
      clinicService.deleteFaq(parseInt(id)).catch(console.error);
    } else if (type === 'testimonial') {
      clinicService.deleteTestimonial(parseInt(id)).catch(console.error);
    } else if (type === 'location') {
      clinicService.deleteLocation(parseInt(id)).catch(console.error);
    }


    setState(prev => ({
      ...prev,
      [key]: ((prev[key] as any[]) || []).filter(item => (item.id !== id && item.platform !== id))
    }));
  };

  const updateSection = (sectionKey: string, metadata: Partial<SectionMetadata>) => {
    setState(prev => {
      const newState = {
        ...prev,
        sections: {
          ...prev.sections,
          [sectionKey]: { ...prev.sections[sectionKey], ...metadata }
        }
      };
      clinicService.updateSettingsBatch([{ key: 'sections', value: newState.sections }]).catch(console.error);
      return newState;
    });
  };

  return (
    <DashboardContext.Provider value={{
      state,
      updateBranding,
      updateHero,
      updateWhatsApp,
      updateSEO,
      updateSettings,
      addNavLink,
      updateNavLink,
      deleteNavLink,
      addTreatment,
      updateTreatment,
      deleteTreatment,
      addTestimonial,
      updateTestimonial,
      deleteTestimonial,
      addFAQ,
      updateFAQ,
      deleteFAQ,
      addResult,
      updateResult,
      deleteResult,
      addBlog,
      updateBlog,
      deleteBlog,
      addLocation,
      updateLocation,
      deleteLocation,
      addUser,
      updateUser,
      deleteUser,
      updateGeneric,
      addGeneric,
      deleteGeneric,
      updateSection
    }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
