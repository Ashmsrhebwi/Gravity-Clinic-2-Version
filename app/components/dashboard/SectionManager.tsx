import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useDashboard, LanguageCode } from '../../context/DashboardContext';
import { SectionHeader, DashboardInput, DashboardButton, LanguageTabs } from './UI';
import { Save, Layout } from 'lucide-react';
import { toast } from 'sonner';

export const SectionManager: React.FC = () => {
  const { t, language } = useLanguage();
  const { state, updateSection } = useDashboard();
  const [activeTab, setActiveTab] = useState(Object.keys(state.sections)[0]);
  const [editLang, setEditLang] = useState<LanguageCode>(language as LanguageCode);

  const section = state.sections[activeTab];

  const handleUpdate = (field: 'title' | 'subtitle', value: string) => {
    const updatedValue = { ...section[field], [editLang]: value };
    updateSection(activeTab, { [field]: updatedValue });
    toast.success(t('dashboard.saved'));
  };

  return (
    <div className="space-y-6">
      <SectionHeader 
        title={t('dashboard.sections')} 
        description={t('dashboard.sections.desc')}
      />

      <div className="flex flex-wrap gap-2 pb-2 border-b border-white/5">
        {Object.keys(state.sections).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              activeTab === key 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {key.split('.').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}
          </button>
        ))}
      </div>

      {section && (
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Layout className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{activeTab}</h3>
                <p className="text-sm text-white/40">{t('dashboard.sections.manage')}</p>
              </div>
            </div>
            <LanguageTabs activeLang={editLang} onLangChange={(lang: LanguageCode) => setEditLang(lang)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60">{t('dashboard.sections.title')}</label>
              <DashboardInput
                value={section.title[editLang] || ''}
                onChange={(e) => handleUpdate('title', e.target.value)}
                placeholder="Enter title"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60">{t('dashboard.sections.subtitle')}</label>
              <DashboardInput
                value={section.subtitle[editLang] || ''}
                onChange={(e) => handleUpdate('subtitle', e.target.value)}
                placeholder="Enter subtitle"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex justify-end">
            <DashboardButton 
              variant="primary" 
              onClick={() => toast.success(t('dashboard.saved'))}
              icon={Save}
            >
              {t('dashboard.save')}
            </DashboardButton>
          </div>
        </div>
      )}
    </div>
  );
};
