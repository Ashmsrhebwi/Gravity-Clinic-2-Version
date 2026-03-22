import React from 'react';
import { useDashboard, SocialLink } from '../../context/DashboardContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Globe, 
  Save, 
  Plus, 
  Trash2, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,
  Github,
  Linkedin,
  Link as LinkIcon
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { 
  DashboardCard, 
  DashboardInput, 
  DashboardButton, 
  SectionHeader,
  StatusBadge 
} from './UI';

const iconMap: Record<string, any> = {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Github,
  Linkedin
};

export function SocialManager() {
  const { state, addGeneric, updateGeneric, deleteGeneric } = useDashboard();
  const { t } = useLanguage();

  const handleUpdate = (id: string, field: keyof SocialLink, value: string) => {
    updateGeneric('socialLink', id, { [field]: value });
  };

  const handleAdd = () => {
    addGeneric('socialLink', { platform: 'New Platform', url: '#', iconName: 'Instagram' });
    toast.success(t('dashboard.add'));
  };

  const handleDelete = (id: string) => {
    deleteGeneric('socialLink', id);
    toast.error(t('dashboard.delete'));
  };

  const handleSave = () => {
    toast.success(t('dashboard.save'));
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      <div className="flex justify-between items-end">
        <SectionHeader 
          title={t('dashboard.nav.social')} 
          description={t('dashboard.nav.social')} // Using same key as label for now if distinct desc not avail
        />
        <DashboardButton onClick={handleAdd} icon={Plus} variant="primary">
          {t('dashboard.add')}
        </DashboardButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {state.socialLinks.map((link, index) => {
          const Icon = iconMap[link.iconName] || LinkIcon;
          const id = (link as any).id || link.platform; // Fallback to platform if no ID exists yet for initial ones

          return (
            <DashboardCard key={index} className="!rounded-[2.5rem]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary text-lg">{link.platform}</h3>
                    <StatusBadge variant="success">{t('dashboard.system.online')}</StatusBadge>
                  </div>
                </div>
                <button 
                  onClick={() => handleDelete(id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary/40 uppercase tracking-widest px-1">{t('dashboard.nav.label')}</label>
                  <DashboardInput
                    value={link.platform}
                    onChange={(e) => handleUpdate(id, 'platform', e.target.value)}
                    placeholder="e.g. Instagram"
                    className="!py-3 !rounded-xl"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-secondary/40 uppercase tracking-widest px-1">{t('dashboard.social.icon')}</label>
                    <DashboardInput
                      value={link.iconName}
                      onChange={(e) => handleUpdate(id, 'iconName', e.target.value)}
                      placeholder="e.g. Instagram"
                      className="!py-3 !rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-secondary/40 uppercase tracking-widest px-1">{t('dashboard.social.url')}</label>
                    <DashboardInput
                      value={link.url}
                      onChange={(e) => handleUpdate(id, 'url', e.target.value)}
                      icon={LinkIcon}
                      placeholder="https://..."
                      className="!py-3 !rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </DashboardCard>
          );
        })}
      </div>

      <div className="fixed bottom-10 right-10 z-50">
        <DashboardButton 
          onClick={handleSave}
          icon={Save}
          size="lg"
          className="shadow-2xl shadow-primary/40 !py-4 !px-8"
        >
          {t('dashboard.save')}
        </DashboardButton>
      </div>
    </div>
  );
}
