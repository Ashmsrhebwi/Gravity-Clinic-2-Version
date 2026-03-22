import { Link, useLocation } from 'react-router';
import { useDashboard } from '../context/DashboardContext';
import { useLanguage, Language } from '../context/LanguageContext';
import { Menu, X, Globe, ChevronDown, Search, ArrowRight, Phone, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import React, { useState, useEffect, useId, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { createPortal } from 'react-dom';

const flags: Record<Language, string> = {
  en: '🇬🇧',
  fr: '🇫🇷',
  ru: '🇷🇺',
  ar: '🇸🇦',
};

const languageNames: Record<Language, string> = {
  en: 'English',
  fr: 'Français',
  ru: 'Русский',
  ar: 'العربية',
};

export function Navigation() {
  const { t, language, setLanguage } = useLanguage();
  const { state } = useDashboard();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const mobileMenuId = useId();
  const langMenuId = useId();
  const dropdownRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateDropdownPosition = useCallback((label: string) => {
    const button = dropdownRefs.current[label];
    if (button) {
      const rect = button.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom, // Fixed position is relative to viewport, don't add window.scrollY
        left: rect.left
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (activeDropdown) {
        updateDropdownPosition(activeDropdown);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeDropdown, updateDropdownPosition]);

  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (activeDropdown) {
        updateDropdownPosition(activeDropdown);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeDropdown, updateDropdownPosition]);

  // Body scroll lock for mobile menu and search
  useEffect(() => {
    if (mobileMenuOpen || isSearchOpen) {
      document.body.style.setProperty('overflow', 'hidden', 'important');
      document.documentElement.style.setProperty('overflow', 'hidden', 'important');
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [mobileMenuOpen, isSearchOpen]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  const handleDropdownClick = useCallback((link: any) => {
    return (e: React.MouseEvent) => {
      e.stopPropagation();
      const newDropdown = activeDropdown === link.label ? null : link.label;
      setActiveDropdown(newDropdown);
      if (newDropdown) {
        updateDropdownPosition(link.label);
      }
    };
  }, [activeDropdown, updateDropdownPosition]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // Add real search logic here if needed
    setIsSearchOpen(false);
  }, [searchTerm]);

  const navLinks = useMemo(() => 
    state.navLinks.map((link: any) => ({
      label: link.label[language],
      isDropdown: !!link.items,
      path: link.path,
      items: link.items?.map((item: any) => ({
        path: item.path,
        label: item.label[language]
      }))
    })), [state.navLinks, language]
  );

  return (
    <nav
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      aria-label={t('nav.main') ?? 'Main navigation'}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-secondary/5' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center flex-shrink-0 group relative z-[110] gap-3">
            <div className={`p-2 rounded-xl transition-all ${scrolled ? 'bg-primary/10' : 'bg-white/10'}`}>
              <img src={state.branding.logo} alt={state.branding.name[language]} className={`h-8 w-auto object-contain transition-all ${mobileMenuOpen ? 'brightness-0 invert' : ''}`} />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-black tracking-tighter italic leading-none ${scrolled || mobileMenuOpen ? 'text-secondary' : 'text-white'}`}>
                {state.branding.name[language].split(' ')[0]}
              </span>
              <span className={`text-[8px] font-black uppercase tracking-[0.2em] leading-none mt-1 ${scrolled || mobileMenuOpen ? 'text-secondary/40' : 'text-white/40'}`}>
                {state.branding.name[language].split(' ').slice(1).join(' ')}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link: any) => (
              <div key={link.label} className="relative px-1">
                {link.isDropdown ? (
                  <button
                    ref={(el) => { dropdownRefs.current[link.label] = el; }}
                    type="button"
                    className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-[13px] font-bold uppercase tracking-wider transition-all duration-300 ${
                      scrolled ? 'text-secondary hover:bg-secondary/5' : 'text-white hover:bg-white/10'
                    }`}
                    onClick={handleDropdownClick(link)}
                    aria-haspopup="true"
                    aria-expanded={activeDropdown === link.label}
                  >
                    <span>{link.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 opacity-50 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link
                    to={link.path || '#'}
                    className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-[13px] font-bold uppercase tracking-wider transition-all duration-300 ${
                      scrolled ? 'text-secondary hover:bg-secondary/5' : 'text-white hover:bg-white/10'
                    } ${location.pathname === link.path ? 'text-primary' : ''}`}
                  >
                    <span>{link.label}</span>
                  </Link>
                )}
                
                {/* Mega Menu / Dropdown */}
                {mounted && createPortal(
                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <div 
                        className="fixed inset-0 z-[9998] pointer-events-auto" 
                        onClick={() => setActiveDropdown(null)}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          style={{
                            position: 'fixed',
                            top: `${dropdownPosition.top}px`,
                            left: `${dropdownPosition.left}px`,
                            zIndex: 9999
                          }}
                          className="pt-4 pointer-events-auto"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="bg-white rounded-[2rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-border/40 p-6 min-w-[280px] backdrop-blur-3xl">
                            <div className="grid gap-2">
                              {link.items?.map((item: any) => (
                                <Link
                                  key={item.label}
                                  to={item.path}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveDropdown(null);
                                  }}
                                  className="flex items-center justify-between px-5 py-4 rounded-[1.25rem] transition-all hover:bg-primary/5 group/item"
                                >
                                  <span className="text-sm font-bold text-secondary group-hover/item:text-primary transition-colors">
                                    {item.label}
                                  </span>
                                  <ArrowRight className="w-4 h-4 text-primary opacity-0 -translate-x-4 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                                </Link>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>,
                  document.body
                )}
              </div>
            ))}

            <div className="flex items-center ml-4 space-x-4 border-l border-border/20 pl-6">
              {/* Search Toggle */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className={`p-2.5 rounded-xl transition-all ${
                  scrolled ? 'text-secondary hover:bg-secondary/5' : 'text-white hover:bg-white/10'
                }`}
                aria-label={t('nav.search') ?? 'Open search'}
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Language Selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all ${
                    scrolled ? 'text-secondary hover:bg-secondary/5' : 'text-white hover:bg-white/10'
                  }`}
                  aria-haspopup="listbox"
                  aria-expanded={langMenuOpen}
                  aria-controls={langMenuId}
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-xs font-black uppercase">{language}</span>
                </button>

                <AnimatePresence>
                  {langMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute right-0 mt-4 w-48 bg-white/90 backdrop-blur-2xl border border-border/40 rounded-[2rem] shadow-2xl py-3 overflow-hidden"
                      id={langMenuId}
                    >
                      {(Object.keys(flags) as Language[]).map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => {
                            setLanguage(lang);
                            setLangMenuOpen(false);
                          }}
                          className={`w-full px-6 py-3 text-left hover:bg-primary/5 flex items-center justify-between group ${
                            language === lang ? 'bg-primary/5 text-primary' : 'text-secondary font-bold'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{flags[lang]}</span>
                            <span className="text-xs uppercase tracking-widest">{languageNames[lang]}</span>
                          </div>
                          {language === lang && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA Button */}
              <Link
                to="/appointment"
                className="ml-2 px-8 py-3 bg-primary text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
              >
                {t('nav.booking')}
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-4">
             <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className={`p-2 rounded-xl relative z-[110] ${scrolled ? 'text-secondary' : 'text-white'}`}
              aria-label={t('nav.search') ?? 'Open search'}
            >
                <Search className="w-5 h-5" />
             </button>
             <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl transition-colors relative z-[110] ${
                scrolled ? 'text-secondary bg-secondary/5' : 'text-white bg-white/10'
              }`}
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-controls={mobileMenuId}
              aria-label={
                mobileMenuOpen
                  ? (t('nav.closeMenu') ?? 'Close navigation menu')
                  : (t('nav.openMenu') ?? 'Open navigation menu')
              }
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mounted && createPortal(
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed inset-0 z-[9999] bg-[#0F0E2C] flex flex-col pt-24 px-6 overflow-hidden md:px-12 pointer-events-auto"
            >
              {/* Close Button Inside Menu */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-8 right-8 p-4 text-white/50 hover:text-white transition-colors flex items-center gap-3 group px-4 py-2 hover:bg-white/5 rounded-2xl"
                aria-label={t('nav.close') ?? 'Close menu'}
              >
                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                  {language === 'ar' ? 'إغلاق' : (t('nav.close') ?? 'Close')}
                </span>
                <X className="w-6 h-6" />
              </button>

              <div className="flex-1 overflow-y-auto pb-12 custom-scrollbar">
                <div className="max-w-7xl mx-auto w-full space-y-10">
                  {navLinks.map((link: any) => (
                    <div key={link.label} className="space-y-4">
                      {link.isDropdown ? (
                        <>
                          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 px-2">
                            {link.label}
                          </div>
                          <div className="grid gap-2">
                            {link.items?.map((item: any) => (
                              <Link
                                key={item.label}
                                to={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-3xl font-bold text-white hover:text-primary transition-all flex items-center justify-between py-3 px-2 group"
                              >
                                <span>{item.label}</span>
                                <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                              </Link>
                            ))}
                          </div>
                        </>
                      ) : (
                        <Link
                          to={link.path || '#'}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-4xl font-black text-white hover:text-primary transition-all block px-2 tracking-tighter uppercase"
                        >
                          {link.label}
                        </Link>
                      )}
                    </div>
                  ))}

                  <div className="pt-10 border-t border-white/10 space-y-10">
                    <div className="grid grid-cols-2 gap-4">
                      {(Object.keys(flags) as Language[]).map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => {
                            setLanguage(lang);
                            setMobileMenuOpen(false);
                          }}
                          className={`px-6 py-5 rounded-[2rem] flex items-center justify-center gap-3 transition-all border font-bold uppercase tracking-widest text-xs ${
                            language === lang 
                              ? 'bg-primary border-primary text-white' 
                              : 'bg-white/5 border-white/10 text-white/60'
                          }`}
                        >
                          <span className="text-xl">{flags[lang]}</span>
                          <span>{lang}</span>
                        </button>
                      ))}
                    </div>
                    <Link
                      to="/appointment"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center w-full py-6 bg-primary text-white font-black uppercase tracking-[0.2em] rounded-[2rem] shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-transform"
                    >
                      {t('nav.booking')}
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Global Search Overlay */}
      {mounted && createPortal(
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[10000] bg-[#0F0E2C]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 pointer-events-auto"
            >
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute top-8 right-8 p-4 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="w-full max-w-3xl space-y-12">
                <div className="space-y-4 text-center">
                  <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">{t('nav.search.title')}</h2>
                  <p className="text-white/40 text-lg uppercase tracking-widest font-bold">{t('nav.search.subtitle')}</p>
                </div>
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-8 h-8 text-primary" />
                  <input
                    autoFocus
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t('nav.search.placeholder')}
                    className="w-full bg-white/5 border-b-2 border-white/10 py-10 pl-24 pr-10 text-3xl md:text-5xl text-white outline-none focus:border-primary transition-all placeholder:text-white/10 font-light"
                  />
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </nav>
  );
}

const iconMap: Record<string, any> = {
  Facebook: (props: any) => <Facebook {...props} />,
  Instagram: (props: any) => <Instagram {...props} />,
  Twitter: (props: any) => <Twitter {...props} />,
  Youtube: (props: any) => <Youtube {...props} />,
};
