import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Calendar, User, ArrowRight, Shield, Bell, ChevronRight, Share2 } from 'lucide-react';
import { useState, useRef, useMemo } from 'react';
import { useDashboard } from '../context/DashboardContext';
const artBg = 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200';

export function Articles() {
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

  const [selectedCategory, setSelectedCategory] = useState<'all' | 'dental' | 'hair'>('all');

  const filteredArticles = useMemo(() => {
    return selectedCategory === 'all' 
      ? state.blogs 
      : state.blogs.filter(blog => (blog.category.en === 'Dental' && selectedCategory === 'dental') || (blog.category.en === 'Hair' && selectedCategory === 'hair'));
  }, [selectedCategory, state.blogs]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Premium Hero Section with Parallax */}
      <section ref={heroRef} className="relative h-[45vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ y: backgroundY }}
        >
          <img
            src={artBg}
            alt={t('nav.articles')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-secondary/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </motion.div>

        <motion.div 
          style={{ y: textY, opacity }}
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-20"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl lg:text-8xl font-bold tracking-tighter mb-4"
          >
            {t('nav.articles')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto px-4"
          >
            {t('articles.hero.subtitle')}
          </motion.p>
        </motion.div>
      </section>

      {/* Premium Category Filter */}
      <section className="sticky top-20 z-40 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="bg-white/80 backdrop-blur-2xl p-2 rounded-[2rem] border border-border/40 shadow-xl flex gap-2 rtl:flex-row-reverse">
              {['all', 'dental', 'hair'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category as 'all' | 'dental' | 'hair')}
                  type="button"
                  aria-pressed={selectedCategory === category}
                  className={`px-6 sm:px-8 py-2 sm:py-3 rounded-2xl transition-all font-bold text-xs sm:text-sm tracking-widest uppercase cursor-pointer ${
                    selectedCategory === category
                      ? 'bg-primary text-white shadow-2xl shadow-primary/40'
                      : 'text-muted-foreground hover:text-secondary'
                  }`}
                >
                  {category === 'all' 
                    ? t('articles.filter.all') 
                    : category === 'dental' 
                    ? t('articles.filter.dental') 
                    : t('articles.filter.hair')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10"
          >
            <AnimatePresence mode="popLayout">
              {filteredArticles.map((article) => (
                <motion.article
                  layout
                  variants={item}
                  key={article.id}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group bg-white rounded-[2.5rem] border border-border/40 overflow-hidden hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all duration-700 hover:-translate-y-2"
                >
                  <div className="aspect-[16/11] overflow-hidden relative">
                    <img
                      src={article.image}
                      alt={article.title[language]}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute top-6 right-6 rtl:right-auto rtl:left-6">
                      <div className="px-4 py-1 bg-white/90 backdrop-blur-md text-secondary rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                        {article.readTime[language]}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 lg:p-10 rtl:text-right">
                    <div className="flex items-center justify-between mb-6 rtl:flex-row-reverse">
                      <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${
                        article.category.en === 'Dental' ? 'text-primary' : 'text-secondary'
                      }`}>
                        {article.category[language]} {t('common.restoration')}
                      </span>
                      <Share2 className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                    </div>

                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-secondary mb-4 leading-tight group-hover:text-primary transition-colors line-clamp-2 italic">
                      {article.title[language]}
                    </h3>

                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 sm:mb-8 line-clamp-3">
                      {article.excerpt[language]}
                    </p>

                    <div className="pt-6 sm:pt-8 border-t border-muted flex items-center justify-between rtl:flex-row-reverse">
                      <div className="flex items-center gap-3 rtl:flex-row-reverse">
                        <div className="w-10 h-10 rounded-full bg-muted border-2 border-primary/20 flex items-center justify-center overflow-hidden">
                           <User className="w-5 h-5 text-primary" />
                        </div>
                        <div className="rtl:text-right">
                          <p className="text-xs font-bold text-secondary">{article.author[language]}</p>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{article.date[language]}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        aria-label={t('common.readMore') ?? 'Read more'}
                        className="w-12 h-12 rounded-2xl bg-muted group-hover:bg-primary group-hover:text-white transition-all flex items-center justify-center cursor-pointer"
                      >
                        <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform ${language === 'ar' ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Premium Newsletter Section */}
      <section className="py-24 relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-secondary p-12 md:p-20 rounded-[4rem] relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-[150px] -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center px-4 py-2 bg-white/5 rounded-full mb-8 rtl:flex-row-reverse"
              >
                <Bell className="w-4 h-4 text-primary mr-2 rtl:mr-0 rtl:ml-2" />
                <span className="text-xs font-bold uppercase tracking-widest text-primary">{t('articles.newsletter.badge')}</span>
              </motion.div>
              
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight italic">
                {t('articles.newsletter.title')}
              </h2>
              <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
                {t('articles.newsletter.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md rtl:flex-row-reverse">
                <label className="sr-only" htmlFor="articles_newsletter_email">
                  Email
                </label>
                <input
                  type="email"
                  id="articles_newsletter_email"
                  autoComplete="email"
                  placeholder="name@exclusive.com"
                  className="bg-transparent text-white px-8 py-4 outline-none flex-1 font-medium placeholder:text-white/20 rtl:text-right"
                />
                  <button type="button" className="px-12 py-4 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:scale-105 transition-all shadow-xl shadow-primary/20 cursor-pointer">
                     {t('articles.newsletter.cta')}
                  </button>
              </div>
              <p className="mt-6 text-white/30 text-[10px] uppercase font-bold tracking-[0.2em]">
                {t('articles.newsletter.footer')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
