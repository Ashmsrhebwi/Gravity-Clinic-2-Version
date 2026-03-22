import { useLanguage } from '../context/LanguageContext';
import { motion, useScroll, useTransform } from 'motion/react';
import { Button } from '../components/ui/button';
import { useRef } from 'react';
import { Check, Timer, Shield, Star } from 'lucide-react';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { useDashboard } from '../context/DashboardContext';
const imgBefore = 'https://images.unsplash.com/photo-1534643960519-11ad79bc19df?auto=format&fit=crop&q=80&w=800';
const imgAfter = 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800';
import { Link } from 'react-router';

export function HollywoodSmile() {
  const { language, t } = useLanguage();
  const { state } = useDashboard();
  
  const treatment = state.treatments.find(t => t.id === '1') || state.treatments[0];
  
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
      {/* Premium Hero Section */}
      <section ref={heroRef} className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ y: backgroundY }}
        >
          <img
            src={treatment.image}
            alt={treatment.title[language]}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-secondary/80 mix-blend-multiply"></div>
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
            {treatment.title[language]}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto"
          >
            {treatment.description?.[language]}
          </motion.p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rtl:text-right"
            >
              <h2 className="text-4xl font-bold text-secondary mb-6 italic">{treatment.title[language]}</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {treatment.description?.[language]}
              </p>
              <div className="space-y-4">
                {treatment.features?.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 rtl:flex-row-reverse">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="font-medium text-secondary">{item[language]}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="relative">
              <BeforeAfterSlider 
                beforeImage={imgBefore}
                afterImage={imgAfter}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Timer, 
                title: { en: 'Speed', ar: 'سرعة', fr: 'Vitesse', ru: 'Скорость' }, 
                desc: { en: 'Results in record time.', ar: 'نتائج في وقت قياسي.', fr: 'Résultats en temps record.', ru: 'Результаты в рекордно короткие сроки.' } 
              },
              { 
                icon: Shield, 
                title: { en: 'Quality', ar: 'جودة', fr: 'Qualité', ru: 'Качество' }, 
                desc: { en: 'High-quality materials.', ar: 'مواد عالية الجودة.', fr: 'Matériaux de haute qualité.', ru: 'Высококачественные материалы.' } 
              },
              { 
                icon: Star, 
                title: { en: 'Artistry', ar: 'فن', fr: 'Artistique', ru: 'Мастерство' }, 
                desc: { en: 'Each tooth is hand-crafted for natural brilliance.', ar: 'مظهر فني طبيعي.', fr: 'Look artistique naturel.', ru: 'Естественный художественный вид.' } 
              }
            ].map((benefit, i) => (
              <div key={i} className="bg-card p-10 rounded-3xl border border-border/50 text-center shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
                  <benefit.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{benefit.title[language]}</h3>
                <p className="text-muted-foreground">{benefit.desc[language]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 italic">{t('hollywood.cta.title')}</h2>
          <Button asChild size="lg" className="rounded-full px-12 h-14 text-lg font-bold">
            <Link to="/appointment">{t('common.bookNow')}</Link>
          </Button>
        </div>
      </section>

      {/* Detailed Content Sections */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {[
            {
              title: { en: 'What is a Hollywood Smile?', ar: 'ما هي ابتسامة هوليوود؟', fr: 'Qu\'est-ce qu\'un Hollywood Smile ?', ru: 'Что такое Голливудская Улыбка?' },
              subtitle: { en: 'Total Transformation', ar: 'تحول كامل', fr: 'Transformation Totale', ru: 'Полное Преображение' },
              description: { 
                en: 'A Hollywood Smile is a total cosmetic makeover of your smile. It involves a combination of cosmetic dentistry procedures tailored specifically for you, aiming to achieve the perfect shape, color, and alignment for a flawless, brilliant smile.',
                ar: 'ابتسامة هوليوود هي تحول تجميلي كامل لابتسامتك. يتضمن مزيجًا من إجراءات طب الأسنان التجميلي المصممة خصيصًا لك، بهدف تحقيق الشكل واللون والمحاذاة المثالية للحصول على ابتسامة خالية من العيوب ورائعة.',
                fr: 'Un Hollywood Smile est un relooking cosmétique total de votre sourire. Il implique une combinaison de procédures de dentisterie cosmétique.',
                ru: 'Голливудская улыбка - это полное косметическое преображение вашей улыбки. Это сочетание процедур косметической стоматологии, разработанных специально для вас.'
              }
            },
            {
              title: { en: 'Customizing Your Smile', ar: 'تخصيص ابتسامتك', fr: 'Personnalisation de votre sourire', ru: 'Индивидуализация Вашей Улыбки' },
              subtitle: { en: 'Personalized Design', ar: 'تصميم شخصي', fr: 'Conception Personnalisée', ru: 'Индивидуальный Дизайн' },
              description: {
                en: 'Every face is unique, and so is every perfect smile. We meticulously analyze your facial symmetry, lip shape, and natural tooth alignment. Using advanced digital imaging, we customize the veneers or crowns to harmonize naturally with your specific features.',
                ar: 'كل وجه فريد من نوعه، وكذلك كل ابتسامة مثالية. نحن نحلل بدقة تناسق وجهك وشكل شفتيك ومحاذاة الأسنان الطبيعية. باستخدام التصوير الرقمي المتقدم، نقوم بتخصيص القشور أو التيجان لتنسجم بشكل طبيعي مع ميزاتك المحددة.',
                fr: 'Chaque visage est unique, tout comme chaque sourire parfait. Nous analysons méticuleusement la symétrie de votre visage, la forme de vos lèvres et l\'alignement naturel de vos dents.',
                ru: 'Каждое лицо уникально, как и каждая идеальная улыбка. Мы тщательно анализируем симметрию вашего лица, форму губ и естественное расположение зубов.'
              }
            },
            {
              title: { en: 'Materials and Technology', ar: 'المواد والتكنولوجيا', fr: 'Matériaux et Technologie', ru: 'Материалы и Технологии' },
              subtitle: { en: 'Premium Quality', ar: 'جودة متميزة', fr: 'Qualité Premium', ru: 'Премиальное Качество' },
              description: {
                en: 'We utilize only the highest grade materials, such as E-max or Zirconia. These premium materials are chosen for their exceptional durability and their ability to mimic the natural translucency and strength of real teeth, ensuring your smile lasts for decades.',
                ar: 'نحن نستخدم فقط المواد عالية الجودة، مثل E-max أو الزركونيا. يتم اختيار هذه المواد الممتازة لمتانتها الاستثنائية وقدرتها على محاكاة الشفافية والقوة الطبيعية للأسنان الحقيقية، مما يضمن بقاء ابتسامتك لعقود.',
                fr: 'Nous utilisons uniquement des matériaux de la plus haute qualité, tels que l\'E-max ou la zircone. Ces matériaux offrent une durabilité exceptionnelle et imitent la translucidité naturelle des vraies dents.',
                ru: 'Мы используем только материалы высочайшего качества, такие как E-max или цирконий. Они обладают исключительной долговечностью и имитируют естественную прозрачность и прочность настоящих зубов.'
              }
            },
            {
              title: { en: 'Smile Maintenance and Aftercare', ar: 'صيانة الابتسامة والعناية اللاحقة', fr: 'Entretien du sourire et suivi', ru: 'Поддержание Улыбки и Последующий Уход' },
              subtitle: { en: 'Long-term Brilliance', ar: 'تألق طويل الأمد', fr: 'Éclat à Long Terme', ru: 'Долгосрочный Блеск' },
              description: {
                en: 'A Hollywood Smile requires regular but straightforward maintenance. We provide a detailed aftercare guide, including proper brushing techniques and recommended periodic check-ups to safeguard the longevity and stunning appearance of your dental investment.',
                ar: 'تتطلب ابتسامة هوليوود صيانة منتظمة ولكن مباشرة. نحن نقدم دليلاً مفصلاً للعناية اللاحقة، بما في ذلك تقنيات تنظيف الأسنان المناسبة والفحوصات الدورية الموصى بها لحماية طول عمر استثمارك في طب الأسنان ومظهره المذهل.',
                fr: 'Un Hollywood Smile nécessite un entretien régulier mais simple. Nous fournissons un guide détaillé de soins post-opératoires.',
                ru: 'Голливудская улыбка требует регулярного, но простого ухода. Мы предоставляем подробное руководство по последующему уходу для защиты ваших инвестиций.'
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
