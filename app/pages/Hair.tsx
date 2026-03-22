import { useLanguage } from '../context/LanguageContext';
import { motion, useScroll, useTransform } from 'motion/react';
import { Check, ArrowRight, Star, Award, Clock, Phone, Calendar, UserCheck } from 'lucide-react';
import { Link } from 'react-router';
import { useRef, useMemo } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
const heroImg = 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=1200';
export function Hair() {
  const { language, t } = useLanguage();
  const { state } = useDashboard();
  
  const hairTreatments = useMemo(() => 
    state.treatments.filter(t => t.category.en === 'Hair' || t.category.ar === 'الشعر'), 
  [state.treatments]);
  
  const testimonial = useMemo(() => 
    state.testimonials.find(t => t.treatment.en.toLowerCase().includes('hair')) || state.testimonials[0], 
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
            src={heroImg}
            alt="Hair Restoration"
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
            {state.sections['hair.hero']?.title?.[language] || state.navLinks.find(l => l.id === '3')?.label[language]}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto"
          >
            {state.sections['hair.hero']?.subtitle?.[language] || t('hair.subtitle')}
          </motion.p>
        </motion.div>
      </section>

      {/* Treatments Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {hairTreatments.map((treatment, index) => (
              <motion.div
                key={treatment.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow border border-border/50"
              >
                {/* Interactive Before/After Slider */}
                <div className="p-4 relative">
                  <BeforeAfterSlider 
                    beforeImage={treatment.image} 
                    afterImage={treatment.beforeAfter || treatment.image} 
                  />
                  <div className={`absolute top-6 ${language === 'ar' ? 'left-6' : 'right-6'} bg-primary text-white z-10 px-3 py-1 rounded-full text-sm flex items-center shadow-lg pointer-events-none`}>
                    <Star className={`w-4 h-4 fill-white ${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                    {treatment.successRate}%
                  </div>
                </div>

                {/* Treatment Info */}
                <div className="p-8">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4 rtl:space-x-reverse">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                          <UserCheck className="w-5 h-5" />
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
                          <div className="text-muted-foreground text-sm italic">{t('hair.features.fallback')}</div>
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
                          <Star className={`w-4 h-4 text-primary ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                          {t('common.successRate')}
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{t('common.successfulResults')}</span>
                            <span className="font-bold text-secondary">{treatment.successRate}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: `${treatment.successRate}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="bg-primary h-full rounded-full" 
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-4 bg-primary/5 rounded-2xl border border-primary/10">
                        <Clock className={`w-5 h-5 text-primary ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">{t('common.procedure')}</p>
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

      {/* Why Choose Us for Hair */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 font-bold text-secondary">{state.sections['hair.features']?.title?.[language] || t('feature.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: { en: 'Expert Surgeons', ar: 'جراحون خبراء', fr: 'Chirurgiens experts', ru: 'Экспертные хирурги' }, 
                desc: { en: 'Highly experienced surgeons specializing in hair restoration.', ar: 'جراحون ذوو خبرة عالية متخصصون في ترميم الشعر.', fr: 'Chirurgiens hautement expérimentés spécialisés dans la restauration capillaire.', ru: 'Высококвалифицированные хирурги, специализирующиеся на восстановлении волос.' } 
              },
              { 
                title: { en: 'Advanced Tech', ar: 'تقنيات متقدمة', fr: 'Technologie avancée', ru: 'Передовые технологии' }, 
                desc: { en: 'Using the latest FUE & DHI technologies for natural results.', ar: 'استخدام أحدث تقنيات FUE و DHI لنتائج طبيعية.', fr: 'Utilisation des dernières technologies FUE et DHI pour des résultats naturels.', ru: 'Использование новейших технологий FUE и DHI для естественных результатов.' } 
              },
              { 
                title: { en: 'Lifetime Warranty', ar: 'ضمان مدى الحياة', fr: 'Garantie à vie', ru: 'Пожизненная гарантия' }, 
                desc: { en: 'We provide a lifetime growth guarantee for all our hair transplants.', ar: 'نحن نقدم ضمان نمو مدى الحياة لجميع عمليات زراعة الشعر لدينا.', fr: 'Nous offrons une garantie de croissance à vie pour toutes nos greffes de cheveux.', ru: 'Мы предоставляме пожизненную гарантию роста для всех наших процедур по пересадке волос.' } 
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-card p-8 rounded-2xl shadow-lg text-center border border-border/50"
              >
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl mb-3 font-bold text-secondary">{item.title[language]}</h3>
                <p className="text-muted-foreground">{item.desc[language]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Testimonial */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-secondary">{state.sections['home.testimonials']?.title?.[language] || t('testimonials.title')}</h2>
          <p className="text-lg text-muted-foreground mb-12">{state.sections['home.testimonials']?.subtitle?.[language] || t('testimonials.subtitle')}</p>
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
            <p className="font-semibold text-secondary">{testimonial.name[language]}</p>
            <p className="text-sm text-muted-foreground">{testimonial.treatment[language]}</p>
          </div>
        </div>
      </section>

      {/* Detailed Content Sections */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {[
            {
              title: { en: 'Why Choose Our Hair Transplant Center?', ar: 'لماذا تختار مركز زراعة الشعر لدينا؟', fr: 'Pourquoi choisir notre centre de greffe de cheveux ?', ru: 'Почему стоит выбрать наш центр трансплантации волос?' },
              subtitle: { en: 'Pioneering Expertise', ar: 'خبرة رائدة', fr: 'Expertise Pionnière', ru: 'Новаторский Опыт' },
              description: { 
                en: 'Gravity Clinic stands at the forefront of natural hair restoration. Our highly qualified surgeons have performed thousands of successful transplant procedures, restoring confidence and maintaining the most natural-looking results through meticulous hairline design.',
                ar: 'تقف عيادة جرافيتي في طليعة ترميم الشعر الطبيعي. أجرى جراحونا المؤهلون تأهيلا عاليا الآلاف من عمليات زراعة الشعر الناجحة، واستعادوا الثقة وحافظوا على النتائج الأكثر طبيعية من خلال تصميم دقيق لخط الشعر.',
                fr: 'Gravity Clinic est à l\'avant-garde de la restauration capillaire naturelle. Nos chirurgiens hautement qualifiés ont réalisé des milliers d\'interventions de greffe réussies, restaurant la confiance et maintenant les résultats les plus naturels.',
                ru: 'Клиника Gravity находится в авангарде естественного восстановления волос. Наши высококвалифицированные хирурги провели тысячи успешных операций по пересадке волос, восстанавливая уверенность в себе и добиваясь наиболее естественных результатов.'
              }
            },
            {
              title: { en: 'Advanced Surgical Methodologies', ar: 'منهجيات جراحية متقدمة', fr: 'Méthodologies Chirurgicales Avancées', ru: 'Передовые Хирургические Методологии' },
              subtitle: { en: 'FUE & DHI Excellence', ar: 'امتياز FUE و DHI', fr: 'Excellence FUE & DHI', ru: 'Превосходство FUE и DHI' },
              description: {
                en: 'We utilize revolutionary FUE (Follicular Unit Extraction) and DHI (Direct Hair Implantation) techniques. These methods guarantee high graft survival rates, zero linear scarring, and reduced recovery times, ensuring an unparalleled and optimal growth yield.',
                ar: 'نحن نستخدم تقنيات FUE الثورية و DHI المتقدمة. تضمن هذه الطرق معدلات بقاء عالية للطعوم، وعدم وجود ندبات خطية، وتقليل أوقات التعافي، مما يضمن في النهاية إنتاجية نمو لا مثيل لها ومثالية.',
                fr: 'Nous utilisons des techniques révolutionnaires FUE et DHI. Ces méthodes garantissent des taux de survie élevés des greffons, aucune cicatrice linéaire et des temps de récupération réduits, assurant un rendement de croissance inégalé.',
                ru: 'Мы используем революционные методы FUE и DHI. Эти методы гарантируют высокую приживаемость трансплантатов, отсутствие линейных рубцов и сокращение времени восстановления, обеспечивая в конечном итоге беспрецедентный рост.'
              }
            },
            {
              title: { en: 'A Comfortable, Patient-Centric Experience', ar: 'تجربة مريحة تركز على المريض', fr: 'Une expérience confortable centrée sur le patient', ru: 'Комфортный Опыт, Ориентированный на Пациента' },
              subtitle: { en: 'VIP Service', ar: 'خدمة كبار الشخصيات', fr: 'Service VIP', ru: 'VIP Обслуживание' },
              description: {
                en: 'From the moment you arrive, you are treated like a true VIP. We offer painless local anesthesia mechanisms while providing you with luxury suites during the procedure to relax, watch movies, or catch up on sleep while we craft your new look.',
                ar: 'منذ لحظة وصولك، يتم التعامل معك وكأنك شخصية مهمة حقًا. نحن نقدم آليات تخدير موضعي غير مؤلمة مع تزويدك بأجنحة فاخرة أثناء الإجراء للاسترخاء أو مشاهدة الأفلام أو تعويض النوم أثناء صياغة مظهرك الجديد.',
                fr: 'Dès votre arrivée, vous êtes traité comme un véritable VIP. Nous proposons des mécanismes d\'anesthésie locale indolores tout en vous offrant des suites de luxe pendant l\'intervention pour vous détendre ou regarder des films.',
                ru: 'С момента вашего прибытия с вами обращаются как с настоящим VIP-персоной. Мы предлагаем безболезненные механизмы местной анестезии, предоставляя вам роскошные апартаменты во время процедуры, чтобы вы могли расслабиться.'
              }
            },
            {
              title: { en: 'Lifetime Growth Guarantee & Aftercare', ar: 'ضمان نمو مدى الحياة وعناية لاحقة', fr: 'Garantie de croissance à vie et suivi', ru: 'Пожизненная Гарантия Роста и Последующий Уход' },
              subtitle: { en: 'Long-term Results', ar: 'نتائج طويلة الأمد', fr: 'Résultats à Long Terme', ru: 'Долгосрочные Результаты' },
              description: {
                en: 'Your transformation is a journey we take together. We provide comprehensive PRP (Platelet-Rich Plasma) sessions, specialized medical shampoo regimens, and 24/7 global support. We confidently offer a growth guarantee reflecting our commitment to your results.',
                ar: 'تحولك هو رحلة نأخذها معًا. نحن نقدم جلسات PRP الشاملة (البلازما الغنية بالصفائح الدموية)، وأنظمة الشامبو الطبي المتخصصة، ودعمًا عالميًا على مدار الساعة طوال أيام الأسبوع. نحن نقدم بثقة ضمان نمو يعكس التزامنا القوي بنتائجك.',
                fr: 'Votre transformation est un voyage que nous entreprenons ensemble. Nous fournissons des séances complètes de PRP, des régimes de shampooings médicaux spécialisés et un soutien mondial 24/7. Nous offrons avec confiance une garantie de croissance.',
                ru: 'Ваша трансформация - это путешествие, которое мы совершаем вместе. Мы предоставляем комплексные сеансы PRP, специализированные режимы лечения с использованием медицинских шампуней и круглосуточную глобальную поддержку.'
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
