import { useLanguage } from '../context/LanguageContext';
import { motion, useScroll, useTransform } from 'motion/react';
import { Check, Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { useRef } from 'react';
import { useDashboard } from '../context/DashboardContext';
const localImg = 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=1200';

export function EyebrowTransplant() {
  const { language, t } = useLanguage();
  const { state } = useDashboard();
  
  const treatment = state.treatments.find(t => t.id === '6') || state.treatments[0];
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <div className="min-h-screen" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <section ref={heroRef} className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 w-full h-full" style={{ y: backgroundY }}>
          <img
            src={treatment.image}
            alt={treatment.title[language]}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-secondary/80 mix-blend-multiply"></div>
        </motion.div>
        <div className="relative z-10 text-center text-white pt-24 px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 italic">{treatment.title[language]}</h1>
          <p className="text-xl max-w-2xl mx-auto text-white/80">{treatment.description?.[language]}</p>
        </div>
      </section>

      <section className="py-24 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <Eye className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-secondary mb-6 italic">{treatment.title[language]}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            {treatment.description?.[language]}
          </p>
        </div>
        <div className="bg-white/50 backdrop-blur-sm p-8 md:p-12 rounded-[3.5rem] border border-border shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 space-y-8 rtl:text-right">
               <h3 className="text-3xl font-bold text-secondary italic">{t('feature.title')}</h3>
               <div className="space-y-4">
                 {treatment.features?.map((item, i) => (
                   <div key={i} className="flex items-center gap-4 group rtl:flex-row-reverse">
                     <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                       <Check className="w-3 h-3 md:w-4 md:h-4 text-primary group-hover:text-white" />
                     </div>
                     <span className="font-semibold text-secondary text-lg">{item[language]}</span>
                   </div>
                 ))}
               </div>
               <Link to="/appointment" className="inline-flex items-center px-10 py-4 bg-primary text-white rounded-full font-bold hover:shadow-2xl hover:shadow-primary/30 transition-all group">
                 {t('service.journey.start')}
                 <ArrowRight className={`ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform ${language === 'ar' ? 'rotate-180' : ''}`} />
               </Link>
            </div>
            <div className="order-1 lg:order-2">
               <div className="relative">
                 <div className="absolute -inset-4 bg-primary/10 rounded-[4rem] blur-2xl -z-10"></div>
                 <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white aspect-square">
                    <img
                     src={localImg}
                     alt="Eyebrow Detail"
                     loading="lazy"
                     className="w-full h-full object-cover"
                   />
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Content Sections */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {[
            {
              title: { en: 'Why Eyebrow Transplants?', ar: 'لماذا زراعة الحواجب؟', fr: 'Pourquoi la greffe de sourcils ?', ru: 'Зачем нужна пересадка бровей?' },
              subtitle: { en: 'Restoring Expression', ar: 'استعادة التعبير', fr: 'Restaurer l\'Expression', ru: 'Восстановление Выразительности' },
              description: { 
                en: 'Eyebrows frame the face and are crucial for emotional expression. Over-plucking, trauma, genetics, or medical conditions can lead to thinning or absent eyebrows. An eyebrow transplant permanently restores density and shape, profoundly enhancing your facial symmetry and aesthetics.',
                ar: 'تحدد الحواجب الوجه وهي ضرورية للتعبير العاطفي. يمكن أن يؤدي الإفراط في النتف أو الصدمات أو العوامل الوراثية أو الحالات الطبية إلى ترقق الحاجبين أو غيابهما. زراعة الحواجب تعيد الكثافة والشكل بشكل دائم، مما يعزز بشكل عميق تماسك وجهك وجماله.',
                fr: 'Les sourcils encadrent le visage et sont cruciaux pour l\'expression émotionnelle. Une épilation excessive, un traumatisme ou la génétique peuvent entraîner un éclaircissement. Une greffe restaure définitivement la densité.',
                ru: 'Брови обрамляют лицо и имеют решающее значение для эмоциональной выразительности. Чрезмерное выщипывание, травмы, генетика или заболевания могут привести к истончению или отсутствию бровей.'
              }
            },
            {
              title: { en: 'Precision and Artistry', ar: 'الدقة والفن', fr: 'Précision et Art', ru: 'Точность и Мастерство' },
              subtitle: { en: 'Intricate Detail', ar: 'تفاصيل معقدة', fr: 'Détails Complexes', ru: 'Сложные Детали' },
              description: {
                en: 'Eyebrow restoration demands the highest level of microsurgical artistry. Our specialists extract single-hair follicles—typically from behind the ears where hair is finest—and implant them with exact precision, matching the flat angle and direction of natural eyebrow growth.',
                ar: 'تتطلب استعادة الحاجب أعلى مستوى من الفن المجهري الدقيق. يستخرج المتخصصون لدينا بصيلات الشعر الأحادية - عادة من خلف الأذنين حيث يكون الشعر أدق - ويزرعونها بدقة متناهية، بحيث تتطابق مع الزاوية المسطحة واتجاه نمو الحاجب الطبيعي.',
                fr: 'La restauration des sourcils exige le plus haut niveau de talent microchirurgical. Nos spécialistes extraient des follicules à cheveu unique et les implantent avec une précision exacte.',
                ru: 'Восстановление бровей требует высочайшего уровня микрохирургического мастерства. Наши специалисты извлекают отдельные волосяные фолликулы и имплантируют их с абсолютной точностью.'
              }
            },
            {
              title: { en: 'The Healing Process', ar: 'عملية الشفاء', fr: 'Le Processus de Guérison', ru: 'Процесс Заживления' },
              subtitle: { en: 'Fast Recovery', ar: 'شفاء سريع', fr: 'Récupération Rapide', ru: 'Быстрое Восстановление' },
              description: {
                en: 'The procedure takes only a few hours under local anesthesia. Recovery is remarkably quick; tiny crusts forming around the grafts usually fall off within a week. You can resume your normal daily activities almost immediately without any significant telltale signs of surgery.',
                ar: 'يستغرق الإجراء بضع ساعات فقط تحت التخدير الموضعي. التعافي سريع بشكل ملحوظ؛ عادة ما تسقط القشور الصغيرة المتكونة حول الطعوم في غضون أسبوع. يمكنك استئناف أنشطتك اليومية العادية على الفور تقريبًا دون أي علامات واضحة على الجراحة.',
                fr: 'La procédure ne prend que quelques heures sous anesthésie locale. La récupération est remarquablement rapide ; les minuscules croûtes tombent généralement en une semaine.',
                ru: 'Процедура занимает всего несколько часов под местной анестезией. Восстановление происходит на удивление быстро; крошечные корочки обычно опадают в течение недели.'
              }
            },
            {
              title: { en: 'Final Results and Shaping', ar: 'النتائج النهائية والتشكيل', fr: 'Résultats Finaux et Mise en Forme', ru: 'Окончательные Результаты и Формирование' },
              subtitle: { en: 'Natural Density', ar: 'كثافة طبيعية', fr: 'Densité Naturelle', ru: 'Естественная Густота' },
              description: {
                en: 'Over the course of 6 to 12 months, the transplanted hairs will grow fully, providing dense, natural eyebrows. Since the donor hair comes from the scalp, regular trimming is required to maintain the desired length, allowing you to style them effortlessly.',
                ar: 'على مدار 6 إلى 12 شهرًا، سينمو الشعر المزروع بالكامل، مما يوفر حواجب كثيفة وطبيعية. نظرًا لأن الشعر المانح يأتي من فروة الرأس، يلزم التشذيب المنتظم للحفاظ على الطول المطلوب، مما يتيح لك تصفيفها بسهولة.',
                fr: 'Au cours des 6 à 12 mois, les poils greffés pousseront complètement, offrant des sourcils denses. Une coupe régulière est nécessaire pour maintenir la longueur souhaitée.',
                ru: 'В течение 6-12 месяцев пересаженные волосы полностью вырастут, обеспечивая густые естественные брови. Регулярная стрижка необходима для поддержания желаемой длины.'
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
