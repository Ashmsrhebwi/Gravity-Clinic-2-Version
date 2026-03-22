import { useLanguage } from '../../context/LanguageContext';
import { useDashboard } from '../../context/DashboardContext';
import { Link } from 'react-router';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Github,
  Linkedin
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Github,
  Linkedin
};

export function Footer() {
  const { language, t } = useLanguage();
  const { state } = useDashboard();

  return (
    <footer className="bg-secondary text-white pt-24 pb-12 overflow-hidden relative" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 mb-20">
          {/* Brand Column */}
          <div className="space-y-8">
            <div className="bg-white/10 p-4 rounded-3xl inline-block backdrop-blur-md border border-white/10">
              <img src={state.branding.logo} alt={state.branding.name[language]} className="h-12 w-auto brightness-0 invert" />
            </div>
            <p className="text-white/70 leading-relaxed text-lg">
              {state.seo.description[language]}
            </p>
            {/* Social Links removed from here */}
          </div>

          {/* Treatment Links (Dynamic) */}
          <div>
            <h3 className="text-xl font-bold mb-8 flex items-center">
              <ShieldCheck className={`w-5 h-5 text-primary ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
              {t('footer.expertise')}
            </h3>
            <ul className="space-y-4">
              {state.treatments.map((treatment) => (
                <li key={treatment.id}>
                  <Link to={treatment.link} className="text-white/60 hover:text-primary hover:translate-x-2 rtl:hover:-translate-x-2 transition-all duration-300 inline-block font-medium">
                    {treatment.title[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-xl font-bold mb-8">{t('footer.navigation')}</h3>
            <ul className="space-y-4 text-white/60">
              {state.navLinks.map((link) => (
                <li key={link.id}>
                  <div className="space-y-2">
                    <span className="text-white/40 text-[10px] font-black uppercase tracking-widest block mb-2">{link.label[language]}</span>
                    {link.path ? (
                      <Link to={link.path} className="hover:text-primary transition-colors text-sm font-medium">
                        {t('common.viewPage') || 'Explore'}
                      </Link>
                    ) : (
                      <ul className={`space-y-2 border-white/5 ${language === 'ar' ? 'pr-4 border-r' : 'pl-4 border-l'}`}>
                        {link.items?.map((item, idx) => (
                          <li key={idx}>
                            <Link to={item.path} className="hover:text-primary transition-colors text-sm font-medium">
                              {item.label[language]}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="bg-white/5 p-6 sm:p-8 rounded-[2rem] border border-white/5 backdrop-blur-3xl">
            <h3 className="text-lg font-bold mb-8 text-white">{t('footer.contact')}</h3>
            <ul className="space-y-6">
              {[
                { icon: Phone, label: t('footer.whatsapp'), value: state.whatsapp.phoneNumber },
                { icon: MapPin, label: t('footer.istanbul'), value: t('footer.address') },
                { icon: Clock, label: t('footer.hours'), value: state.locations[0]?.hours[language] || '09:00 - 19:00' }
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 group">
                  <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/30 uppercase font-black tracking-widest mb-0.5">{item.label}</p>
                    <p className="font-bold text-sm text-white/90 group-hover:text-white transition-colors">{item.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <p className="text-white/40 text-sm tracking-wide text-center md:text-left">
              {t('footer.copyright')}
            </p>
            <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
              <a href="#" className="hover:text-primary transition-colors">{t('footer.privacy')}</a>
              <a href="#" className="hover:text-primary transition-colors">{t('footer.terms')}</a>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            {state.socialLinks.map((link, i) => {
              const Icon = iconMap[link.iconName] || Instagram;
              return (
                <a 
                  key={i} 
                  href={link.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300 border border-white/5 hover:border-transparent"
                  title={link.platform}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
