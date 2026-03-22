import { useLanguage } from '../context/LanguageContext';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Star, Award, Clock, Languages, Shield, UserCheck, GraduationCap, Globe, X } from 'lucide-react';
import { Link } from 'react-router';
import { useRef, useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useDashboard } from '../context/DashboardContext';
const docBg = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800';

export function Doctors() {
  const { language, t } = useLanguage();
  const { state } = useDashboard();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [activeDoctorId, setActiveDoctorId] = useState<string | null>(null);

  const toggleDoctor = (doctorId: string) => {
    setActiveDoctorId((current) => (current === doctorId ? null : doctorId));
  };

  return (
    <div className="min-h-screen bg-background" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Premium Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-[45vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ y: backgroundY }}
        >
          <img
            src={docBg}
            alt={t('doctors.title')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1E1C4B]/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1E1C4B]/20 to-[#1E1C4B]/40"></div>
        </motion.div>

        <motion.div 
          style={{ y: textY, opacity }}
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-8 border border-white/20 rtl:flex-row-reverse"
          >
            <Shield className="w-4 h-4 mr-2 text-primary rtl:mr-0 rtl:ml-2" />
            <span className="text-sm font-medium tracking-wide">{t('doctors.hero.badge')}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl mb-6 font-bold tracking-tight drop-shadow-2xl"
          >
            {t('doctors.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto px-4"
          >
            {t('doctors.subtitle')}
          </motion.p>
        </motion.div>
      </section>

      {/* Specialist Grid */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {state.doctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setActiveDoctorId(doctor.id)}
                onMouseLeave={() => setActiveDoctorId(null)}
              >
                <Card
                  className="group relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-border/40 rounded-[2rem] focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                >
                  {/* Doctor Image & Profile Hook */}
                  <div
                    className="relative aspect-[4/5] overflow-hidden"
                    role="button"
                    tabIndex={0}
                    aria-label={`${doctor.name} — ${doctor.specialty[language]}`}
                    aria-expanded={activeDoctorId === doctor.id}
                    onClick={() => toggleDoctor(doctor.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleDoctor(doctor.id);
                      }
                    }}
                    onFocus={() => setActiveDoctorId(doctor.id)}
                  >
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[0.2] transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                  />
                  <div className="absolute bottom-6 left-6 right-6 rtl:text-right">
                    <div className="flex items-center justify-between text-white/90 mb-2 rtl:flex-row-reverse">
                       <span className="text-xs font-bold uppercase tracking-widest text-primary">{doctor.specialty[language]}</span>
                       <div className="flex items-center bg-white/10 backdrop-blur-md px-2 py-1 rounded-lg">
                         <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1 rtl:mr-0 rtl:ml-1" />
                         <span className="text-xs font-bold">{doctor.rating}</span>
                       </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 leading-tight">{doctor.name}</h3>
                    
                    <div className="flex items-center gap-4 text-white/80 text-sm rtl:flex-row-reverse">
                      <div className="flex items-center">
                        <Award className="w-4 h-4 mr-1.5 text-primary rtl:mr-0 rtl:ml-1.5" />
                        <span>{doctor.experience} {t('common.years')}</span>
                      </div>
                      <div className="flex items-center">
                        <UserCheck className="w-4 h-4 mr-1.5 text-primary rtl:mr-0 rtl:ml-1.5" />
                        <span>{doctor.patients} {t('common.patients')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Reveal Profile Details */}
                  <AnimatePresence>
                    {activeDoctorId === doctor.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute inset-0 bg-secondary/95 backdrop-blur-xl p-8 flex flex-col justify-between text-white"
                      >
                        <button
                          type="button"
                          className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
                          aria-label={t('common.close') ?? 'Close'}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDoctorId(null);
                          }}
                        >
                          <X className="h-5 w-5" />
                        </button>
                        <div className="rtl:text-right">
                          <div className="flex items-center mb-6 rtl:flex-row-reverse">
                            <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mr-4 rtl:mr-0 rtl:ml-4">
                              <GraduationCap className="text-primary w-6 h-6" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">{t('common.education')}</p>
                               <p className="text-sm font-medium">{t('doctors.education.badge')}</p>
                            </div>
                          </div>
                          <p className="text-white/80 text-sm leading-relaxed mb-8 italic">
                            "{doctor.bio[language]}"
                          </p>
                          <div className="space-y-4">
                            <div>
                               <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{t('doctors.specialties.header')}</p>
                              <div className="flex flex-wrap gap-2 rtl:flex-row-reverse">
                                {doctor.specialties.map((spec, i) => (
                                  <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium">
                                    {spec[language]}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{t('common.languages')}</p>
                              <div className="flex items-center gap-3 rtl:flex-row-reverse">
                                <Globe className="w-4 h-4 text-white/60" />
                                <div className="flex gap-2 rtl:flex-row-reverse">
                                  {doctor.languages.map((lang, i) => (
                                    <span key={i} className="text-xs font-medium text-white/80">{lang[language]}</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Button asChild className="w-full h-11 rounded-2xl font-bold cursor-pointer">
                          <Link to="/appointment">{t('common.viewProfile')}</Link>
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Doctors Section */}
      <section className="py-20 bg-[#F7F8FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4 text-secondary italic">{t('feature.title')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: t('doctors.why.title1'),
                desc: t('doctors.why.desc1'),
              },
              {
                icon: Star,
                title: t('doctors.why.title2'),
                desc: t('doctors.why.desc2'),
              },
              {
                icon: Languages,
                title: t('doctors.why.title3'),
                desc: t('doctors.why.desc3'),
              },
            ].map((item, idx) => (
              <Card
                key={idx}
                className="bg-card p-8 rounded-2xl shadow-lg text-center border border-border/40"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-secondary">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-secondary to-secondary/90 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 italic">{t('home.cta.title')}</h2>
          <p className="text-xl text-white/80 mb-10">{t('home.cta.subtitle')}</p>
          <Button asChild size="lg" className="rounded-full px-10 cursor-pointer h-14 text-lg">
            <Link to="/appointment">{t('common.bookNow')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
