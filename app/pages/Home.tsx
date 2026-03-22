import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowRight, Star, Play, Users, Award, Activity, CheckCircle, Shield, Building2, Paintbrush, Package, Calendar, User } from 'lucide-react';
import { LazyImage } from '../components/LazyImage';
import { LazyComponent } from '../components/LazyComponent';
import useEmblaCarousel from 'embla-carousel-react';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { useDashboard } from '../context/DashboardContext';
import { useDebounce } from '../hooks/usePerformance';
import { clinicService } from '../services/clinicService';

const ctaImage = 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200';
export function Home() {
  const { language, t } = useLanguage();
  const { state } = useDashboard();
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'start',
    direction: language === 'ar' ? 'rtl' : 'ltr'
  });

  // Re-initialize carousel when language changes for RTL support
  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi, language]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    clinicService.checkConnection()
      .then(data => {
        if (data.status === 'success') {
          setConnectionStatus('success');
          console.log('✅ Connected to Backend via Service:', data.message);
        }
      })
      .catch(err => {
        console.error('❌ Backend Connection Failed via Service:', err);
        setConnectionStatus('error');
      });
  }, []);

  return (
    <div className="min-h-screen bg-background" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Backend Connection Indicator (Floating) */}
      <AnimatePresence>
        {connectionStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed top-24 right-6 z-50 bg-green-500/10 backdrop-blur-md border border-green-500/20 px-4 py-2 rounded-full flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">
              Backend Connected
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Hero Section with Parallax */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] md:min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Parallax Background */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ y: backgroundY }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            key={state.hero.videoUrl}
            className="w-full h-full object-cover origin-center"
          >
            <source src={state.hero.videoUrl} type="video/mp4" />
          </video>
          {/* Luxury dark overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E1C4B]/80 via-[#1E1C4B]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
        </motion.div>

        {/* Hero Content */}
        <motion.div
          style={{ y: textY, opacity }}
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-20"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4 sm:mb-6 leading-tight drop-shadow-xl font-bold"
          >
            <span className="block">{state.hero.title[language]}</span>
            <span className="block text-primary mt-2">
              {state.hero.subheader[language]}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto font-light leading-relaxed px-2"
          >
            {state.hero.subtitle[language]}
          </motion.p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10 rtl:divide-x-reverse">
            {state.stats.map((stat, idx) => {
              const Icon = [Users, Award, Activity, CheckCircle][idx % 4];
              return (
                <motion.div 
                  key={stat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex flex-col items-center text-center ${idx > 0 && idx % 4 !== 0 ? 'pt-8 lg:pt-0' : ''}`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#3B3A5A] flex items-center justify-center mb-6 shadow-lg">
                    <Icon className="w-8 h-8 text-[#F97316]" />
                  </div>
                  <h3 className="text-4xl sm:text-5xl font-extrabold text-white mb-2 tracking-tight">
                    {stat.value}{stat.suffix}
                  </h3>
                  <p className="text-sm font-bold text-white/50 tracking-widest uppercase">
                    {stat.label[language]}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-secondary">
              Why Choose Us
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              World-class care, affordable excellence — all in one destination.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Award, title: 'Expert Specialists', desc: 'Board-certified doctors with international experience.' },
              { icon: Building2, title: 'Modern Facilities', desc: 'State-of-the-art equipment and technology.' },
              { icon: Paintbrush, title: 'Artistry & Precision', desc: 'Tailored aesthetic designs for your unique features.' },
              { icon: Package, title: 'All-Inclusive Packages', desc: 'Treatment, accommodation, and transfers included.' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-xl shadow-secondary/5 border border-border/40 hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-14 h-14 rounded-[1.25rem] bg-secondary flex items-center justify-center mb-6 shadow-md">
                  <feature.icon className="w-6 h-6 text-[#F97316]" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-secondary">
              Our Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
              Your journey to excellence, simplified into clear, professional steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {state.processSteps.map((step, idx) => {
              const Icon = ({ Calendar, User, Shield, Star, CheckCircle } as any)[step.iconName] || CheckCircle;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative group"
                >
                  <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-secondary/5 border border-border/40 hover:border-primary/20 transition-all duration-500 h-full">
                    <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute top-8 right-8 text-6xl font-black text-secondary/5 group-hover:text-primary/10 transition-colors">
                      {idx + 1}
                    </div>
                    <h3 className="text-xl font-bold text-secondary mb-3">{step.title[language]}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description[language]}</p>
                  </div>
                  {idx < state.processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border/40 z-0" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Featured Treatments */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-secondary">
              {state.sections['home.treatments']?.title[language]}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {state.sections['home.treatments']?.subtitle[language]}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {state.treatments.map((treatment, index) => (
              <motion.div
                key={treatment.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img
                    src={treatment.image}
                    alt={treatment.title[language]}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] uppercase tracking-widest font-bold rounded-full border border-white/20">
                      {treatment.category[language]}
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1C4B]/95 via-[#1E1C4B]/40 to-transparent flex items-end">
                  <div className="p-8 text-white w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-bold mb-2">{treatment.title[language]}</h3>
                    <p className="text-sm text-white/80 mb-6 line-clamp-2 font-light">{treatment.description?.[language] || 'Expert medical care tailored to your needs.'}</p>
                    <Link
                      to={treatment.link}
                      className="inline-flex items-center text-sm font-semibold text-primary hover:text-white transition-colors group/link"
                    >
                      {t('common.learnMore')}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results / Before & After Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-secondary tracking-tight">
                {state.sections['home.results']?.title[language]}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                {state.sections['home.results']?.subtitle[language]}
              </p>
            </div>
            <Link to="/doctors" className="hidden md:flex items-center text-[#F97316] font-bold hover:gap-3 transition-all duration-300">
              {t('home.results.cta') || 'View All Transformational Stories'} <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {state.results.map((result) => (
              <div key={result.id} className="space-y-6">
                <BeforeAfterSlider
                  beforeImage={result.beforeImage}
                  afterImage={result.afterImage}
                  label={result.label[language]}
                />
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mt-4">
                  <h4 className="text-lg font-bold text-secondary mb-3">"{result.title[language]}"</h4>
                  <p className="text-muted-foreground text-sm italic leading-relaxed mb-6">"{result.text[language]}"</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#F97316] uppercase tracking-wide">{result.category[language]}</span>
                    <span className="text-xs text-muted-foreground font-medium">{result.patient[language]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-secondary">
              {state.sections['home.testimonials']?.title[language]}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              {state.sections['home.testimonials']?.subtitle[language]}
            </p>
          </div>

          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex">
              {state.testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.33%] min-w-0 pl-3 sm:pl-6 first:pl-0">
                  <motion.div
                    className="h-full bg-card p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl shadow-secondary/5 border border-border/40 relative flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center mb-6 text-[#F97316]">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-current" />
                        ))}
                      </div>
                      <p className="text-secondary text-[15px] mb-8 italic font-medium leading-relaxed">"{testimonial.text[language]}"</p>
                    </div>

                    <div className="flex items-center pt-6 border-t border-gray-100 mt-auto">
                      <div className="w-14 h-14 rounded-full overflow-hidden bg-muted mr-4 border border-gray-200" style={{ marginLeft: language === 'ar' ? '1rem' : '0', marginRight: language === 'ar' ? '0' : '1rem' }}>
                        <LazyImage
                          src={testimonial.image}
                          alt={testimonial.name[language]}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-secondary text-base">{testimonial.name[language]}</p>
                        <p className="text-xs text-[#F97316] font-bold tracking-wide uppercase mt-1">{testimonial.treatment[language]}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-12 space-x-2">
            {state.testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${selectedIndex === index ? 'w-8 bg-primary' : 'bg-primary/20 hover:bg-primary/40'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-secondary to-secondary/90 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${ctaImage})` }}></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            {state.sections['home.cta']?.title?.[language] || t('home.cta.title')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 sm:mb-10">
            {state.sections['home.cta']?.subtitle?.[language] || t('home.cta.subtitle')}
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              to="/appointment"
              className="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-full hover:shadow-xl shadow-md transition-shadow"
            >
              {t('common.bookNow')}
              <ArrowRight className="ml-2 w-5 h-5 lg:mr-0 rtl:rotate-180" />
            </Link>
          </motion.div>
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
