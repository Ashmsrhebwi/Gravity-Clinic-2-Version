import { useLanguage } from '../context/LanguageContext';
import { motion, useScroll, useTransform } from 'motion/react';
import { Check, ArrowRight, User } from 'lucide-react';
import { Link } from 'react-router';
import { useRef } from 'react';
import { useDashboard } from '../context/DashboardContext';
const localImg = 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=1200';

export function MaleHairTransplant() {
  const { language, t } = useLanguage();
  const { state } = useDashboard();
  
  const treatment = state.treatments.find(t => t.id === '3') || state.treatments[0];
  
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
      <section ref={heroRef} className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 w-full h-full" style={{ y: backgroundY }}>
          <img
            src={treatment.image}
            alt={treatment.title[language]}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-secondary/70 mix-blend-multiply"></div>
        </motion.div>
        <motion.div style={{ y: textY, opacity }} className="relative z-10 text-center text-white pt-24">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">{treatment.title[language]}</h1>
          <p className="text-xl max-w-2xl mx-auto text-white/80">{treatment.description?.[language]}</p>
        </motion.div>
      </section>

      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 italic text-secondary">{treatment.title[language]}</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {treatment.description?.[language]}
            </p>
            <ul className="space-y-4 mb-10">
              {treatment.features?.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-semibold text-secondary">{feature[language]}</span>
                </li>
              ))}
            </ul>
             <Link
              to="/appointment"
              className="inline-flex items-center px-10 py-4 bg-primary text-white font-bold rounded-full hover:shadow-2xl hover:shadow-primary/30 transition-all group"
            >
              {t('service.journey.restoration')}
              <ArrowRight className={`ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform ${language === 'ar' ? 'rotate-180' : ''}`} />
            </Link>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/10 rounded-[4rem] blur-3xl -z-10"></div>
            <div className="rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white relative">
               <img
                src={localImg}
                alt="Results"
                loading="lazy"
                className="w-full h-full object-cover aspect-[4/5]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Content Sections */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {[
            {
              title: { en: 'Understanding Male Pattern Baldness', ar: 'فهم صلع النمط الذكوري', fr: 'Comprendre la calvitie masculine', ru: 'Понимание облысения по мужскому типу' },
              subtitle: { en: 'The Root Cause', ar: 'السبب الجذري', fr: 'La Cause Profonde', ru: 'Коренная Причина' },
              description: { 
                en: 'Male pattern baldness affects millions of men worldwide, typically caused by genetics and hormonal changes. Understanding the root cause is the first step in our specialized approach, allowing us to formulate a personalized hair restoration strategy that perfectly matches your natural growth pattern.',
                ar: 'يؤثر صلع النمط الذكوري على ملايين الرجال حول العالم، والذي ينتج عادة عن عوامل جينية وتغيرات هرمونية. إن فهم السبب الجذري هو الخطوة الأولى في نهجنا المتخصص، مما يتيح لنا صياغة استراتيجية مخصصة لاستعادة الشعر تتطابق تمامًا مع نمط النمو الطبيعي لديك.',
                fr: 'La calvitie masculine touche des millions d\'hommes dans le monde, généralement causée par des facteurs génétiques et des changements hormonaux. Comprendre la cause profonde est la première étape de notre approche spécialisée.',
                ru: 'Облысение по мужскому типу поражает миллионы мужчин во всем мире, обычно оно вызвано генетическими и гормональными изменениями. Понимание первопричины - это первый шаг в нашем специализированном подходе.'
              }
            },
            {
              title: { en: 'Targeted Solutions for Men', ar: 'حلول موجهة للرجال', fr: 'Solutions ciblées pour hommes', ru: 'Целенаправленные решения для мужчин' },
              subtitle: { en: 'Custom Design', ar: 'تصميم مخصص', fr: 'Conception Personnalisée', ru: 'Индивидуальный Дизайн' },
              description: {
                en: 'Our advanced transplantation techniques are specifically tailored for male hair characteristics. We focus on natural hairline recreation and maximizing density in thinning areas, ensuring that the results seamlessly blend with your existing hair for an undetectable finish.',
                ar: 'تقنيات الزراعة المتقدمة لدينا مصممة خصيصًا لخصائص شعر الذكور. نحن نركز على إعادة إنشاء خط الشعر الطبيعي وزيادة الكثافة في المناطق الرقيقة، مما يضمن اندماج النتائج بسلاسة مع شعرك الحالي للحصول على لمسة نهائية لا يمكن اكتشافها.',
                fr: 'Nos techniques de transplantation avancées sont spécialement adaptées aux caractéristiques capillaires masculines. Nous nous concentrons sur la recréation de la ligne de croissance naturelle et la maximisation de la densité.',
                ru: 'Наши передовые методы трансплантации специально адаптированы к характеристикам мужских волос. Мы уделяем особое внимание воссозданию естественной линии роста волос и максимальной густоте в редеющих участках.'
              }
            },
            {
              title: { en: 'The Procedure Process', ar: 'عملية الإجراء', fr: 'Le Processus de l\'Intervention', ru: 'Процесс Процедуры' },
              subtitle: { en: 'Step-by-Step', ar: 'خطوة بخطوة', fr: 'Étape par Étape', ru: 'Шаг за Шагом' },
              description: {
                en: 'The procedure is performed under local anesthesia, ensuring complete comfort. Using FUE or DHI methods, individual follicles are meticulously extracted and implanted at precise angles and depths. You can relax, watch a movie, or sleep while our team works.',
                ar: 'يتم الإجراء تحت التخدير الموضعي، مما يضمن الراحة التامة. باستخدام طرق FUE أو DHI، يتم استخراج البصيلات الفردية بدقة وزرعها بزوايا وأعماق دقيقة. يمكنك الاسترخاء أو مشاهدة فيلم أو النوم بينما يعمل فريقنا.',
                fr: 'L\'intervention est réalisée sous anesthésie locale, assurant un confort total. En utilisant les méthodes FUE ou DHI, les follicules individuels sont méticuleusement extraits et implantés à des angles et profondeurs précis.',
                ru: 'Процедура проводится под местной анестезией, обеспечивая полный комфорт. С помощью методов FUE или DHI отдельные фолликулы тщательно извлекаются и имплантируются под точными углами и на точную глубину.'
              }
            },
            {
              title: { en: 'Expected Results & Recovery', ar: 'النتائج المتوقعة والتعافي', fr: 'Résultats Attendus et Récupération', ru: 'Ожидаемые Результаты и Восстановление' },
              subtitle: { en: 'Long-term Outlook', ar: 'نظرة طويلة الأمد', fr: 'Perspectives à Long Terme', ru: 'Долгосрочная Перспектива' },
              description: {
                en: 'Recovery is swift, with most patients returning to normal activities within a few days. Initial growth is visible within 3-4 months, and full, natural-looking results are achieved within a year. We provide comprehensive aftercare to safeguard your investment.',
                ar: 'التعافي سريع، ويعود معظم المرضى إلى أنشطتهم الطبيعية في غضون أيام قليلة. يظهر النمو الأولي في غضون 3-4 أشهر، ويتم تحقيق نتائج كاملة طبيعية المظهر في غضون عام. نحن نقدم رعاية لاحقة شاملة لحماية استثمارك.',
                fr: 'La récupération est rapide, la plupart des patients reprenant leurs activités normales en quelques jours. La croissance initiale est visible dans les 3-4 mois, et des résultats complets et naturels sont obtenus en un an.',
                ru: 'Восстановление проходит быстро, большинство пациентов возвращаются к нормальной жизни в течение нескольких дней. Первоначальный рост заметен в течение 3-4 месяцев, а полные, естественно выглядящие результаты достигаются в течение года.'
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
          className="flex items-center justify-center w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/30"
        >
          {t('common.bookNow')}
        </Link>
      </div>
    </div>
  );
}
