import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'motion/react';
import { Save, RefreshCcw, Video, Type, MousePointer2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { 
  DashboardCard, 
  DashboardInput, 
  DashboardButton, 
  SectionHeader,
  LanguageTabs
} from './UI';
import { LanguageCode } from '../../context/DashboardContext';

export function HeroManager() {
  const { state, updateHero } = useDashboard();
  const { t } = useLanguage();
  const [hero, setHero] = useState(state.hero);
  const [isSaving, setIsSaving] = useState(false);
  const [activeLang, setActiveLang] = useState<LanguageCode>('en');

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 800));
    updateHero(hero);
    setIsSaving(false);
    toast.success(t('dashboard.hero.updated'));
  };

  const handleReset = () => {
    setHero(state.hero);
    toast.info(t('dashboard.discarded'));
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <SectionHeader 
          title={t('dashboard.hero.title')} 
          description={t('dashboard.hero.desc')}
        />
        <div className="mb-10">
          <LanguageTabs activeLang={activeLang} onLangChange={setActiveLang} />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        <div className="xl:col-span-7 space-y-8">
          <DashboardCard>
            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-8">
                <DashboardInput
                  label={t('dashboard.hero.video_url')}
                  value={hero.videoUrl}
                  onChange={(e) => setHero({ ...hero, videoUrl: e.target.value })}
                  placeholder="Direct link to .mp4 file"
                  icon={Video}
                />

                <div className="h-px bg-secondary/5" />

                <DashboardInput
                  label={`${t('dashboard.hero.title_label')} (${activeLang.toUpperCase()})`}
                  value={hero.title[activeLang]}
                  onChange={(e) => setHero({ 
                    ...hero, 
                    title: { ...hero.title, [activeLang]: e.target.value } 
                  })}
                  placeholder="Main headline"
                  icon={Type}
                />

                <DashboardInput
                  label={`${t('dashboard.hero.subheader_label')} (${activeLang.toUpperCase()})`}
                  value={hero.subheader[activeLang]}
                  onChange={(e) => setHero({ 
                    ...hero, 
                    subheader: { ...hero.subheader, [activeLang]: e.target.value } 
                  })}
                  placeholder="Small text above title"
                  icon={Type}
                />

                <DashboardInput
                  label={`${t('dashboard.hero.subtitle_label')} (${activeLang.toUpperCase()})`}
                  value={hero.subtitle[activeLang]}
                  onChange={(e) => setHero({ 
                    ...hero, 
                    subtitle: { ...hero.subtitle, [activeLang]: e.target.value } 
                  })}
                  placeholder="Description text below title"
                  icon={Type}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DashboardInput
                    label={`${t('dashboard.hero.primary_btn')} (${activeLang.toUpperCase()})`}
                    value={hero.primaryBtn[activeLang]}
                    onChange={(e) => setHero({ 
                      ...hero, 
                      primaryBtn: { ...hero.primaryBtn, [activeLang]: e.target.value } 
                    })}
                    icon={MousePointer2}
                  />
                  <DashboardInput
                    label={`${t('dashboard.hero.secondary_btn')} (${activeLang.toUpperCase()})`}
                    value={hero.secondaryBtn[activeLang]}
                    onChange={(e) => setHero({ 
                      ...hero, 
                      secondaryBtn: { ...hero.secondaryBtn, [activeLang]: e.target.value } 
                    })}
                    icon={MousePointer2}
                  />
                </div>

                <div className="flex items-center justify-between p-6 bg-secondary/5 rounded-3xl border border-secondary/5">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${hero.showButtons ? 'bg-primary/20 text-primary' : 'bg-secondary/10 text-secondary/40'}`}>
                      {hero.showButtons ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-bold text-secondary">{t('dashboard.hero.display_btns')}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{t('dashboard.hero.display_btns_hint')}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setHero({ ...hero, showButtons: !hero.showButtons })}
                    className={`w-14 h-8 rounded-full transition-all relative ${hero.showButtons ? 'bg-primary' : 'bg-secondary/20'}`}
                  >
                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${hero.showButtons ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <DashboardButton
                  onClick={handleSave}
                  loading={isSaving}
                  className="flex-1"
                  icon={Save}
                  size="lg"
                >
                  {t('dashboard.hero.publish')}
                </DashboardButton>
                <DashboardButton
                  onClick={handleReset}
                  variant="outline"
                  icon={RefreshCcw}
                  size="lg"
                  className="sm:w-20 sm:!px-0"
                />
              </div>
            </div>
          </DashboardCard>
        </div>

        {/* Preview aspect */}
        <div className="xl:col-span-5 h-full">
          <DashboardCard variant="dark" className="sticky top-8 overflow-hidden !p-0 border-none aspect-video flex flex-col h-[400px]">
            <div className="relative flex-1 bg-black">
              <video 
                key={hero.videoUrl} 
                autoPlay 
                muted 
                loop 
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              >
                <source src={hero.videoUrl} type="video/mp4" />
              </video>
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-8 space-y-4">
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2">{hero.subheader[activeLang]}</p>
                <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-lg">{hero.title[activeLang]}</h3>
                <p className="text-sm text-white/80 font-medium max-w-[280px]">{hero.subtitle[activeLang]}</p>
                {hero.showButtons && (
                  <div className="flex gap-4 pt-4">
                    <div className="px-4 py-2 bg-primary text-white text-[10px] font-bold rounded-lg shadow-lg shadow-primary/20">
                      {hero.primaryBtn[activeLang]}
                    </div>
                    <div className="px-4 py-2 bg-white/10 text-white text-[10px] font-bold rounded-lg backdrop-blur-md">
                      {hero.secondaryBtn[activeLang]}
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-secondary to-transparent" />
            </div>
            <div className="p-6 bg-secondary/80 backdrop-blur-md border-t border-white/5">
               <h4 className="font-bold text-sm mb-1 italic">{t('dashboard.hero.preview_label')}</h4>
               <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">{t('dashboard.hero.preview_hint')}</p>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
