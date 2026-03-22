import { useLanguage } from '../context/LanguageContext';
import { motion, useScroll, useTransform } from 'motion/react';
import { Check, ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router';
import { useRef } from 'react';
import { useDashboard } from '../context/DashboardContext';
const localImg = 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=1200';

export function FemaleHairTransplant() {
  const { language, t } = useLanguage();
  const { state } = useDashboard();
  
  const treatment = state.treatments.find(t => t.id === '4') || state.treatments[0];
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
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
          <div className="absolute inset-0 bg-secondary/60 mix-blend-multiply"></div>
        </motion.div>
        <motion.div style={{ opacity }} className="relative z-10 text-center text-white pt-24">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 italic">{treatment.title[language]}</h1>
          <p className="text-xl max-w-2xl mx-auto text-white/90">{treatment.description?.[language]}</p>
        </motion.div>
      </section>

      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div className="order-2 lg:order-1 relative">
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
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl font-bold mb-6 italic text-secondary">{treatment.title[language]}</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {treatment.description?.[language]}
            </p>
            <ul className="space-y-4 mb-10">
              {treatment.features?.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-primary" />
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
        </div>
      </section>

      {/* Detailed Content Sections */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {[
            {
              title: { en: 'Female Hair Loss Types', ar: 'أنواع تساقط الشعر عند النساء', fr: 'Types de Perte de Cheveux Féminine', ru: 'Типы Выпадения Волос у Женщин' },
              subtitle: { en: 'Accurate Diagnosis', ar: 'تشخيص دقيق', fr: 'Diagnostic Précis', ru: 'Точный Диагноз' },
              description: { 
                en: 'Female hair loss often presents differently than in men, commonly involving diffuse thinning over the entire scalp rather than a receding hairline. We conduct comprehensive consultations to accurately diagnose the type of hair loss to prescribe the most effective intervention.',
                ar: 'غالبًا ما يظهر تساقط الشعر عند النساء بشكل مختلف عن الرجال، حيث يشتمل عادةً على ترقق منتشر على جميع أنحاء فروة الرأس بدلاً من تراجع خط الشعر. نجري استشارات شاملة لتشخيص نوع تساقط الشعر بدقة لوصف التدخل الأكثر فاعلية.',
                fr: 'La perte de cheveux féminine se présente souvent différemment de la calvitie masculine. Nous menons des consultations complètes pour diagnostiquer avec précision le type de perte de cheveux.',
                ru: 'Выпадение волос у женщин часто проявляется иначе, чем у мужчин. Мы проводим комплексные консультации для точной диагностики типа выпадения волос, чтобы назначить наиболее эффективное вмешательство.'
              }
            },
            {
              title: { en: 'Specialized Techniques for Women', ar: 'تقنيات متخصصة للنساء', fr: 'Techniques Spécialisées pour les Femmes', ru: 'Специализированные Технологии для Женщин' },
              subtitle: { en: 'No-Shave Implantation', ar: 'زراعة بدون حلاقة', fr: 'Implantation Sans Rasage', ru: 'Имплантация Без Бритья' },
              description: {
                en: 'Understanding the aesthetic concerns, we employ specialized completely no-shave DHI techniques for women. This allows us to implant follicles safely and densely without disturbing the surrounding existing long hair, protecting your current appearance.',
                ar: 'إدراكًا منا للمشكلات الجمالية، نستخدم تقنيات DHI المتخصصة بدون حلاقة تمامًا للنساء. يتيح لنا هذا زراعة البصيلات بأمان وبكثافة دون التأثير على الشعر الطويل الموجود المحيط، مما يحمي مظهرك الحالي.',
                fr: 'Comprenant les préoccupations esthétiques, nous utilisons des techniques DHI spécialisées sans rasage complet pour les femmes. Cela nous permet d\'implanter des follicules en toute sécurité.',
                ru: 'Понимая эстетические проблемы, мы используем специализированные методы DHI без бритья для женщин. Это позволяет нам безопасно имплантировать фолликулы, не нарушая окружающие длинные волосы.'
              }
            },
            {
              title: { en: 'What to Expect During the Procedure', ar: 'ماذا تتوقع أثناء الإجراء', fr: 'À Quoi S\'attendre Pendant la Procédure', ru: 'Чего Ожидать Во Время Процедуры' },
              subtitle: { en: 'Comfort & Privacy', ar: 'الراحة والخصوصية', fr: 'Confort et Intimité', ru: 'Комфорт и Конфиденциальность' },
              description: {
                en: 'The entire process is managed with the utmost care for your privacy and comfort. Operations take place in our VIP suites under local anesthesia. The delicate nature of female implantation ensures there is minimal discomfort and highly artistic distribution of grafts.',
                ar: 'تدار العملية برمتها بأقصى درجات الاهتمام لخصوصيتك وراحتك. تتم العمليات في أجنحة كبار الشخصيات لدينا تحت التخدير الموضعي. تضمن الطبيعة الدقيقة لزراعة شعر الإناث أن يكون هناك الحد الأدنى من الانزعاج والتوزيع الفني العالي للطعوم.',
                fr: 'L\'ensemble du processus est géré avec le plus grand soin pour votre intimité et votre confort. Les opérations se déroulent dans nos suites VIP sous anesthésie locale.',
                ru: 'Весь процесс контролируется с максимальной заботой о вашей конфиденциальности и комфорте. Операции проходят в наших VIP-апартаментах под местной анестезией.'
              }
            },
            {
              title: { en: 'Long-term Maintenance & Density', ar: 'المحافظة على الكثافة على المدى الطويل', fr: 'Entretien à Long Terme et Densité', ru: 'Долгосрочное Сохранение Плотности' },
              subtitle: { en: 'Sustained Beauty', ar: 'جمال مستدام', fr: 'Beauté Durable', ru: 'Продолжительная Красота' },
              description: {
                en: 'Results gradually manifest over the following months, enriching your hair\'s overall volume. We complement transplant treatments with nutrient-rich PRP therapies and specially formulated female hair care regiments, securing vibrant, thick hair for life.',
                ar: 'تبرز النتائج تدريجياً خلال الأشهر التالية، مما يثري الحجم الكلي لشعرك. نُكمل علاجات الزراعة بعلاجات البلازما الغنية بالصفائح الدموية الغنية بالمغذيات وأنظمة العناية بالشعر للإناث المصممة خصيصًا، مما يضمن الحصول على شعر كثيف وحيوي مدى الحياة.',
                fr: 'Les résultats se manifestent progressivement au cours des mois suivants, enrichissant le volume global de vos cheveux. Nous complétons les traitements de greffe avec des thérapies PRP riches en nutriments.',
                ru: 'Результаты постепенно проявляются в течение последующих месяцев, увеличивая общий объем ваших волос. Мы дополняем процедуры по пересадке терапией PRP, обеспечивая яркие, густые волосы.'
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
