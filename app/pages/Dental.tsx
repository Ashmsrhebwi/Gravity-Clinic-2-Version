import { useLanguage } from '../context/LanguageContext';
import { motion, useScroll, useTransform } from 'motion/react';
import { Check, ArrowRight, Award, Clock, Star, Phone, Calendar } from 'lucide-react';
import { Link } from 'react-router';
import { useState, useRef, useMemo } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
const dentBg = 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200';
const ctaImg = 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800';
export function Dental() {
  const { language, t } = useLanguage();
  const { state } = useDashboard();
  
  const dentalTreatments = useMemo(() => 
    state.treatments.filter(t => t.category.en === 'Dental' || t.category.ar === 'الأسنان'), 
  [state.treatments]);
  
  const testimonial = useMemo(() => 
    state.testimonials.find(t => t.treatment.en.toLowerCase().includes('dental')) || state.testimonials[0], 
  [state.testimonials]);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Premium Hero Section with Parallax */}
      <section ref={heroRef} className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ y: backgroundY }}
        >
          <img
            src={dentBg}
            alt="Dental Clinic"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-secondary/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-secondary/40"></div>
        </motion.div>

        <motion.div 
          style={{ y: textY, opacity }}
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-24"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl mb-6 font-bold tracking-tight drop-shadow-2xl"
          >
            {state.sections['dental.hero']?.title?.[language] || state.navLinks.find(l => l.id === '2')?.label[language]}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto"
          >
            {state.sections['dental.hero']?.subtitle?.[language] || t('dental.subtitle')}
          </motion.p>
        </motion.div>
      </section>

      {/* Treatments Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {dentalTreatments.map((treatment, index) => (
              <motion.div
                key={treatment.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow border border-border/50"
              >
                {/* Interactive Before/After Slider */}
                <div className="p-4">
                  <BeforeAfterSlider 
                    beforeImage={treatment.image} 
                    afterImage={treatment.beforeAfter || treatment.image} 
                  />
                </div>

                {/* Treatment Info */}
                <div className="p-8">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4 rtl:space-x-reverse">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                          <Star className="w-5 h-5 fill-current" />
                        </div>
                        <h3 className="text-3xl font-bold text-secondary tracking-tight">
                          {treatment.title[language]}
                        </h3>
                      </div>
                      
                      <p className="text-muted-foreground text-lg mb-8 leading-relaxed max-w-xl">
                        {treatment.description?.[language]}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {treatment.features?.map((feature, fIndex) => (
                          <motion.div
                            key={fIndex}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * fIndex }}
                            className="flex items-center space-x-3 rtl:space-x-reverse group"
                          >
                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors">
                              <Check className="w-3 h-3 text-primary group-hover:text-white transition-colors" />
                            </div>
                            <span className="text-secondary font-medium">{feature[language]}</span>
                          </motion.div>
                        )) || (
                          <div className="text-muted-foreground text-sm italic">{t('dental.features.fallback')}</div>
                        )}
                      </div>

                      <div className="flex items-center gap-4">
                        <Link
                          to="/appointment"
                          className="px-8 py-3 bg-primary text-white font-bold rounded-full hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-95"
                        >
                          {t('common.bookNow')}
                        </Link>
                        <button
                          type="button"
                          className="px-8 py-3 bg-secondary/5 text-secondary font-bold rounded-full hover:bg-secondary/10 transition-all"
                        >
                          {t('common.viewDetails')}
                        </button>
                      </div>
                    </div>

                    <div className="w-full md:w-[350px] space-y-4">
                      <div className="bg-muted/30 p-6 rounded-2xl border border-border/50">
                        <h4 className="font-bold text-secondary mb-4 flex items-center">
                          <Award className={`w-4 h-4 text-primary ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                          {t('common.successRate')}
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{t('common.patientSatisfaction')}</span>
                            <span className="font-bold text-secondary">{treatment.successRate}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                            <div className="bg-primary h-full rounded-full" style={{ width: `${treatment.successRate}%` }} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-4 bg-primary/5 rounded-2xl border border-primary/10">
                        <Clock className={`w-5 h-5 text-primary ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">{t('common.duration')}</p>
                          <p className="text-sm font-bold text-secondary">{treatment.duration ? treatment.duration[language] : ''}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Testimonial Section */}
      <section className="py-24 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-secondary">{state.sections['home.testimonials']?.title[language]}</h2>
          <p className="text-lg text-muted-foreground mb-12">{state.sections['home.testimonials']?.subtitle[language]}</p>
          <div className="bg-card p-8 rounded-2xl shadow-lg border border-border/50">
            <div className="flex items-center justify-center mb-4">
              <div className="flex">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
            <p className="text-lg text-muted-foreground italic mb-4">
              "{testimonial.text[language]}"
            </p>
            <p className="font-semibold">{testimonial.name[language]}</p>
            <p className="text-sm text-muted-foreground">{testimonial.treatment[language]}</p>
          </div>
        </div>
      </section>

      {/* Detailed Content Sections */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {[
            {
              title: { en: 'Why Choose Our Dental Clinic?', ar: 'لماذا تختار عيادة الأسنان لدينا؟', fr: 'Pourquoi choisir notre clinique dentaire?', ru: 'Почему стоит выбрать нашу стоматологическую клинику?' },
              subtitle: { en: 'Unmatched Expertise', ar: 'خبرة لا مثيل لها', fr: 'Expertise Inégalée', ru: 'Непревзойденный опыт' },
              description: { 
                en: 'At Gravity Clinic, our dental experts leverage decades of combined experience to deliver exceptional care. We are committed to prioritizing your oral health and aesthetic goals with personalized treatment plans tailored specifically to your unique needs.',
                ar: 'في عيادة جرافيتي، يستفيد خبراء الأسنان لدينا من عقود من الخبرة المشتركة لتقديم رعاية استثنائية. نحن ملتزمون بإعطاء الأولوية لصحة فمك وأهدافك الجمالية من خلال خطط علاج شخصية مصممة خصيصًا لتلبية احتياجاتك الفريدة.',
                fr: 'À la Clinique Gravity, nos experts dentaires tirent parti de décennies d\'expérience combinée pour fournir des soins exceptionnels. Nous nous engageons à prioriser votre santé bucco-dentaire et vos objectifs esthétiques avec des plans de traitement personnalisés adaptés à vos besoins uniques.',
                ru: 'В клинике Gravity наши стоматологи используют свой многолетний общий опыт для предоставления исключительной помощи. Мы стремимся уделять приоритетное внимание здоровью вашей полости рта и эстетическим целям с помощью индивидуальных планов лечения, адаптированных конкретно к вашим уникальным потребностям.'
              }
            },
            {
              title: { en: 'State-of-the-Art Technology', ar: 'تكنولوجيا متطورة', fr: 'Technologie de Pointe', ru: 'Передовые Технологии' },
              subtitle: { en: 'Modern Innovations', ar: 'ابتكارات حديثة', fr: 'Innovations Modernes', ru: 'Современные Инновации' },
              description: {
                en: 'We embrace the latest advancements in dental technology, ensuring every procedure is minimally invasive, fast, and remarkably effective. Our facilities are equipped with 3D imaging, laser dentistry, and digital impression systems for precision and maximum comfort.',
                ar: 'نحن نتبنى أحدث التطورات في تكنولوجيا طب الأسنان، مما يضمن أن كل إجراء يكون طفيف التوغل وسريعًا وفعالًا بشكل ملحوظ. تم تجهيز مرافقنا بالتصوير ثلاثي الأبعاد وطب الأسنان بالليزر وأنظمة الانطباع الرقمي لضمان الدقة والراحة القصوى.',
                fr: 'Nous adoptons les dernières avancées technologiques en dentisterie, garantissant que chaque procédure est peu invasive, rapide et remarquablement efficace. Nos installations sont équipées d\'imagerie 3D, de dentisterie au laser et de systèmes d\'empreintes numériques.',
                ru: 'Мы используем последние достижения в области стоматологических технологий, гарантируя, что каждая процедура будет минимально инвазивной, быстрой и исключительно эффективной. Наши помещения оснащены системами 3D-визуализации, лазерной стоматологии и цифровых слепков.'
              }
            },
            {
              title: { en: 'A Comfortable Experience', ar: 'تجربة مريحة', fr: 'Une Expérience Confortable', ru: 'Комфортный Опыт' },
              subtitle: { en: 'Patient-First Approach', ar: 'نهج يضع المريض أولاً', fr: 'Approche Centrée sur le Patient', ru: 'Подход, Ориентированный на Пациента' },
              description: {
                en: 'Your comfort is our top priority. From our tranquil waiting areas to our highly trained support staff, everything is designed to make your visit anxiety-free and pleasant. We offer conscious sedation options for patients who experience dental phobias.',
                ar: 'راحتك هي أولويتنا القصوى. من مناطق الانتظار الهادئة لدينا إلى موظفي الدعم المدربين تدريباً عالياً، تم تصميم كل شيء لجعل زيارتك خالية من القلق وممتعة. نحن نقدم خيارات التهدئة الواعية للمرضى الذين يعانون من رهاب الأسنان.',
                fr: 'Votre confort est notre priorité absolue. De nos salles d\'attente tranquilles à notre personnel de soutien hautement qualifié, tout est conçu pour rendre votre visite agréable et sans anxiété. Nous proposons des options de sédation consciente pour les patients.',
                ru: 'Ваш комфорт - наш главный приоритет. От спокойных залов ожидания до высококвалифицированного обслуживающего персонала - все продумано так, чтобы ваш визит прошел без беспокойства и был приятным. Мы предлагаем различные варианты седации.'
              }
            },
            {
              title: { en: 'Comprehensive Lifetime Care', ar: 'رعاية شاملة مدى الحياة', fr: 'Soins Globaux à Vie', ru: 'Комплексный Пожизненный Уход' },
              subtitle: { en: 'Long-term Results', ar: 'نتائج طويلة الأمد', fr: 'Résultats à Long Terme', ru: 'Долгосрочные Результаты' },
              description: {
                en: 'Our commitment doesn\'t end when you leave the chair. We provide comprehensive aftercare instructions, follow-up consultations, and lifestyle advice to ensure that your new smile remains bright, functional, and healthy for years to come.',
                ar: 'التزامنا لا ينتهي عندما تترك الكرسي. نحن نقدم تعليمات شاملة للرعاية اللاحقة، واستشارات متابعة، ونصائح حول أسلوب الحياة لضمان بقاء ابتسامتك الجديدة مشرقة وعملية وصحية لسنوات قادمة.',
                fr: 'Notre engagement ne s\'arrête pas lorsque vous quittez le fauteuil. Nous fournissons des instructions complètes de suivi, des consultations de suivi et des conseils de style de vie pour garantir que votre nouveau sourire reste éclatant et sain pendant des années.',
                ru: 'Наши обязательства не заканчиваются, когда вы встаете с кресла. Мы предоставляем исчерпывающие инструкции по последующему уходу, последующие консультации и советы по образу жизни, чтобы ваша новая улыбка оставалась яркой, функциональной и здоровой на долгие годы.'
              }
            }
          ].map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-card p-8 md:p-10 rounded-3xl shadow-sm border border-border/50 hover:shadow-md transition-all"
            >
              {section.subtitle && (
                <h3 className="text-primary font-bold tracking-wider uppercase mb-3 text-sm">
                  {section.subtitle[language]}
                </h3>
              )}
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-secondary">
                {section.title[language]}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {section.description[language]}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-secondary to-secondary/90 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${ctaImg})` }}></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{state.sections['home.cta']?.title?.[language] || t('home.cta.title')}</h2>
          <p className="text-xl text-white/80 mb-10">{state.sections['home.cta']?.subtitle?.[language] || t('home.cta.subtitle')}</p>
          <Link
            to="/appointment"
            className="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-full hover:shadow-xl hover:shadow-primary/20 transform hover:-translate-y-1 transition-all"
          >
            {t('common.bookNow')}
            <ArrowRight className="ml-2 w-5 h-5 rtl:rotate-180" />
          </Link>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-md border-t border-border z-40">
        <Link
          to="/appointment"
          className="flex items-center justify-center w-full py-3 bg-primary text-white rounded-xl font-semibold shadow-lg shadow-primary/30"
        >
          {t('common.bookNow')}
        </Link>
      </div>
    </div>
  );
}
