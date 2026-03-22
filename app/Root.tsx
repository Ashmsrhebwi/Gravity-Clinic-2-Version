import { Outlet, useLocation } from 'react-router';
import { Navigation } from './components/Navigation';
import { Footer } from './components/layout/Footer';
import { useLanguage, Language } from './context/LanguageContext';
import { Mail, Phone, Facebook, Instagram, Twitter, Youtube, MessageCircle, ChevronUp, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { m, useScroll, useSpring, AnimatePresence, LazyMotion, domAnimation } from 'motion/react';

import { useDashboard } from './context/DashboardContext';

export function Root() {
  const { t, language } = useLanguage();
  const { state } = useDashboard();
  const location = useLocation();

  const isAuthPage = ['/login', '/otp', '/forgot-password'].includes(location.pathname);

  // Set document direction for RTL languages
  useEffect(() => {
    if (language === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [language]);

  // Synchronize CSS Variables and SEO with Dashboard Settings
  useEffect(() => {
    const root = document.documentElement;
    const { settings, seo } = state;
    const currentLang = language as Language;

    if (settings.primaryColor) root.style.setProperty('--primary', settings.primaryColor);
    if (settings.secondaryColor) root.style.setProperty('--secondary', settings.secondaryColor);
    if (settings.buttonRadius) root.style.setProperty('--radius', settings.buttonRadius);
    
    // Font Family Sync
    if (settings.fontFamily) {
        root.style.setProperty('--font-family', settings.fontFamily);
        document.body.style.fontFamily = settings.fontFamily;
    }

    // Update Document Title (SEO)
    if (seo.title && (seo.title as any)[currentLang]) {
      document.title = (seo.title as any)[currentLang];
    }
    
    // Update Meta Description
    if (seo.description && (seo.description as any)[currentLang]) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', (seo.description as any)[currentLang]);
    }
  }, [state.settings, state.seo, language]);

  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setShowScrollTop(latest > 400);
    });
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen flex flex-col bg-background text-foreground" style={{ fontFamily: state.settings.fontFamily }}>
        <m.div
          className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[100]"
          style={{ scaleX, backgroundColor: state.settings.primaryColor }}
          aria-hidden="true"
        />
        {!isAuthPage && <Navigation />}

        <main className="flex-1">
          <Outlet />
        </main>

        {!isAuthPage && (
          <>
            {/* Floating Actions */}
            <div className="fixed right-4 bottom-24 sm:right-8 sm:bottom-8 z-[60] flex flex-col gap-4">
              <AnimatePresence>
                {showScrollTop && (
                  <m.button
                    type="button"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    onClick={scrollToTop}
                    className="p-3 sm:p-4 bg-white/80 backdrop-blur-md text-secondary rounded-2xl shadow-2xl border border-secondary/10 hover:bg-white transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label={t('common.scrollToTop')}
                  >
                    <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-y-1" />
                  </m.button>
                )}
              </AnimatePresence>

              {state.whatsapp.enabled && (
                <m.a
                  href={`https://wa.me/${state.whatsapp.phoneNumber.replace(/\s+/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-3 sm:p-4 bg-[#25D366] text-white rounded-2xl shadow-2xl shadow-[#25D366]/30 hover:scale-110 active:scale-95 transition-all group relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label={t('common.whatsapp')}
                >
                  <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
                  <span className="absolute right-full mr-3 sm:mr-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-secondary text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {t('common.whatsapp')}
                  </span>
                </m.a>
              )}
            </div>
            <Footer />
          </>
        )}
      </div>
    </LazyMotion>
  );
}