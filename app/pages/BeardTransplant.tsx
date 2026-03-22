import { useLanguage } from '../context/LanguageContext';
import { motion, useScroll, useTransform } from 'motion/react';
import { Check, Scissors } from 'lucide-react';
import { Link } from 'react-router';
import { useRef } from 'react';
import { useDashboard } from '../context/DashboardContext';

export function BeardTransplant() {
  const { language, t } = useLanguage();
  const { state } = useDashboard();
  
  const treatment = state.treatments.find(t => t.id === '5') || state.treatments[0];
  
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
        <div className="relative z-10 text-center text-white pt-24">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 italic">{treatment.title[language]}</h1>
          <p className="text-xl max-w-2xl mx-auto text-white/80">{treatment.description?.[language]}</p>
        </div>
      </section>

      <section className="py-24 px-4 max-w-5xl mx-auto text-center">
        <div className="mb-16">
          <Scissors className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-8 text-secondary italic">{treatment.title[language]}</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {treatment.description?.[language]}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left rtl:text-right">
           <div className="bg-card p-10 rounded-3xl border border-border shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-secondary">{t('common.features')}</h3>
              <ul className="space-y-4">
                {treatment.features?.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="text-primary w-5 h-5" /> 
                    <span className="font-semibold text-secondary">{feature[language]}</span>
                  </li>
                ))}
              </ul>
           </div>
           <div className="bg-secondary text-white p-10 rounded-3xl shadow-xl flex flex-col justify-between group">
              <p className="text-lg italic opacity-80 leading-relaxed">
                {t('beard.testimonial.text')}
              </p>
              <Link to="/appointment" className="mt-8 px-8 py-4 bg-primary text-white rounded-full font-bold text-center hover:shadow-2xl hover:shadow-primary/30 transition-all">
                {t('service.journey.start')}
              </Link>
           </div>
        </div>
      </section>

      {/* Detailed Content Sections */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {[
            {
              title: { en: 'Beard Transplant Overview', ar: 'نظرة عامة على زراعة اللحية', fr: 'Aperçu de la greffe de barbe', ru: 'Обзор пересадки бороды' },
              subtitle: { en: 'Defining Masculinity', ar: 'تحديد الرجولة', fr: 'Définir la masculinité', ru: 'Определение Мужественности' },
              description: { 
                en: 'A full, well-defined beard is often considered a symbol of masculinity and confidence. Our beard transplant procedures are designed to address patchiness, scarring, or a complete lack of facial hair, providing you with the robust, natural-looking beard you desire.',
                ar: 'غالبًا ما تُعتبر اللحية الكاملة المحددة جيدًا رمزًا للرجولة والثقة. تم تصميم إجراءات زراعة اللحية لدينا لمعالجة الترقق أو التندب أو النقص الكامل في شعر الوجه، مما يمنحك اللحية القوية ذات المظهر الطبيعي التي تريدها.',
                fr: 'Une barbe pleine et bien définie est souvent considérée comme un symbole de masculinité et de confiance. Nos procédures de greffe de barbe sont conçues pour traiter les zones clairsemées.',
                ru: 'Густая, четко очерченная борода часто считается символом мужественности и уверенности в себе. Наши процедуры по пересадке бороды предназначены для устранения неравномерности роста.'
              }
            },
            {
              title: { en: 'FUE for Facial Hair', ar: 'تقنية FUE لشعر الوجه', fr: 'FUE pour les poils du visage', ru: 'FUE для Волос на Лице' },
              subtitle: { en: 'Precision Extraction', ar: 'استخراج دقيق', fr: 'Extraction Précise', ru: 'Точное Извлечение' },
              description: {
                en: 'By utilizing the advanced FUE method, we extract healthy follicles from the donor area (usually the back of the head) and meticulously implant them into the beard region. This technique ensures no linear scarring and a virtually painless experience.',
                ar: 'باستخدام طريقة FUE المتقدمة، نقوم باستخراج البصيلات السليمة من المنطقة المانحة (عادةً مؤخرة الرأس) وزرعها بدقة في منطقة اللحية. تضمن هذه التقنية عدم وجود ندبات خطية وتجربة غير مؤلمة تقريبًا.',
                fr: 'En utilisant la méthode FUE avancée, nous extrayons des follicules sains de la zone donneuse et les implantons méticuleusement dans la région de la barbe. Cette technique garantit l\'absence de cicatrices.',
                ru: 'Используя передовой метод FUE, мы извлекаем здоровые фолликулы из донорской зоны и тщательно имплантируем их в область бороды. Этот метод гарантирует отсутствие линейных рубцов.'
              }
            },
            {
              title: { en: 'The Art of Beard Design', ar: 'فن تصميم اللحية', fr: 'L\'art de la création de barbe', ru: 'Искусство Дизайна Бороды' },
              subtitle: { en: 'Aesthetic Mastery', ar: 'إتقان جمالي', fr: 'Maîtrise Esthétique', ru: 'Эстетическое Мастерство' },
              description: {
                en: 'Beard transplantation is highly artistic. Our surgeons carefully consider your facial symmetry, jawline, and personal preferences to design a beard that perfectly complements your features. Each follicle is implanted at the correct angle and direction to mimic natural facial hair growth.',
                ar: 'زراعة اللحية فنية للغاية. يدرس جراحونا بعناية تناسق وجهك وخط الفك وتفضيلاتك الشخصية لتصميم لحية تكمل ميزاتك تمامًا. تُزرع كل بصيلة بالزاوية والاتجاه الصحيحين لمحاكاة نمو شعر الوجه الطبيعي.',
                fr: 'La greffe de barbe est très artistique. Nos chirurgiens examinent attentivement la symétrie de votre visage, la ligne de votre mâchoire et vos préférences personnelles pour concevoir une barbe parfaite.',
                ru: 'Пересадка бороды требует высокой художественности. Наши хирурги тщательно учитывают симметрию вашего лица, линию подбородка и личные предпочтения, чтобы создать бороду, которая идеально дополнит ваши черты.'
              }
            },
            {
              title: { en: 'Recovery and Lifelong Growth', ar: 'التعافي والنمو مدى الحياة', fr: 'Récupération et Croissance à Vie', ru: 'Восстановление и Пожизненный Рост' },
              subtitle: { en: 'Permanent Results', ar: 'نتائج دائمة', fr: 'Résultats Permanents', ru: 'Постоянные Результаты' },
              description: {
                en: 'The recovery period is minimal, with redness subsiding within a week. The transplanted hairs will naturally shed after a few weeks, paving the way for permanent, robust growth starting around the third month. The final result is a dense, completely natural beard.',
                ar: 'فترة التعافي ضئيلة، حيث يختفي الاحمرار في غضون أسبوع. سيتساقط الشعر المزروع طبيعيًا بعد بضعة أسابيع، مما يمهد الطريق لنمو قوي ودائم يبدأ في حوالي الشهر الثالث. النتيجة النهائية هي لحية كثيفة وطبيعية تمامًا.',
                fr: 'La période de récupération est minime, les rougeurs s\'estompant en une semaine. Les poils greffés tomberont naturellement après quelques semaines, ouvrant la voie à une croissance permanente et robuste.',
                ru: 'Период восстановления минимален, покраснение спадает в течение недели. Пересаженные волосы естественным образом выпадут через несколько недель, уступая место постоянному, сильному росту.'
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
