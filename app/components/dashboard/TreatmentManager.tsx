import React, { useState } from 'react';
import { useDashboard, Treatment } from '../../context/DashboardContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit2, 
  Stethoscope, 
  Clock, 
  Image as ImageIcon,
  Filter,
  Save,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { 
  DashboardCard, 
  DashboardInput, 
  DashboardButton,
  SectionHeader,
  StatusBadge,
  LanguageTabs
} from './UI';
import { LanguageCode } from '../../context/DashboardContext';

export function TreatmentManager() {
  const { state, addTreatment, updateTreatment, deleteTreatment } = useDashboard();
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [activeLang, setActiveLang] = useState<LanguageCode>('en');
  const [editingTreatment, setEditingTreatment] = useState<Treatment | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredTreatments = state.treatments.filter(t => 
    ((t.title[activeLang] || t.title['en'] || '').toLowerCase().includes(search.toLowerCase()) || 
     (t.category[activeLang] || t.category['en'] || '').toLowerCase().includes(search.toLowerCase())) &&
    (filter === 'all' || t.category[activeLang] === filter || t.category['en'] === filter)
  );

  const categories = Array.from(new Set(state.treatments.map(t => t.category[activeLang] || t.category['en'] || '')));

  const handleAdd = () => {
    const id = Math.random().toString(36).substring(2, 11);
    const newTreatment: Treatment = {
      id,
      title: { en: 'New Treatment', ar: 'علاج جديد', fr: 'Nouveau traitement', ru: 'Новое лечение' },
      description: { en: '', ar: '', fr: '', ru: '' },
      category: { en: 'Dental', ar: 'طب الأسنان', fr: 'Dentaire', ru: 'Стоматология' },
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80',
      link: '#',
      successRate: 99,
      duration: { en: '1 session', ar: 'جلسة واحدة', fr: '1 séance', ru: '1 сеанс' },
      features: []
    };
    addTreatment(newTreatment);
    setEditingTreatment(newTreatment);
    toast.success(t('dashboard.treatments.draft_created'));
  };

  const handleDelete = (id: string) => {
    deleteTreatment(id);
    toast.success(t('dashboard.treatments.removed'));
  };

  const validate = () => {
    if (!editingTreatment) return false;
    const newErrors: Record<string, string> = {};
    if (!editingTreatment.title[activeLang]) newErrors.title = t('auth.error.required');
    if (!editingTreatment.category[activeLang]) newErrors.category = t('auth.error.required');
    if (editingTreatment.successRate !== undefined && (editingTreatment.successRate < 0 || editingTreatment.successRate > 100)) newErrors.successRate = 'Rate must be 0-100';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = () => {
    if (editingTreatment && validate()) {
      updateTreatment(editingTreatment.id, editingTreatment);
      setEditingTreatment(null);
      setErrors({});
      toast.success(t('dashboard.treatments.saved'));
    }
  };

  const closeModal = () => {
    setEditingTreatment(null);
    setErrors({});
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <SectionHeader 
          title={t('dashboard.treatments.title')} 
          description={t('dashboard.treatments.desc')}
          actions={
            <DashboardButton onClick={handleAdd} icon={Plus}>
              {t('dashboard.treatments.new')}
            </DashboardButton>
          }
        />
        <div className="mb-10">
          <LanguageTabs activeLang={activeLang} onLangChange={setActiveLang} />
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        <div className="w-full lg:flex-1">
          <DashboardInput 
            placeholder={t('dashboard.treatments.search_placeholder')} 
            icon={Search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 shrink-0">
          <button 
            onClick={() => setFilter('all')}
            className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${filter === 'all' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-secondary/60 hover:bg-secondary/5'}`}
          >
            {t('dashboard.treatments.all_services')}
          </button>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${filter === cat ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-secondary/60 hover:bg-secondary/5'}`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredTreatments.map((treatment) => (
            <motion.div
              layout
              key={treatment.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <DashboardCard padding="none" className="group overflow-hidden flex flex-col h-full bg-white hover:shadow-2xl transition-all">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={treatment.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4">
                    <StatusBadge variant="info">{treatment.category[activeLang]}</StatusBadge>
                  </div>
                  <div className="absolute bottom-4 left-6 right-6 text-white text-shadow-lg">
                    <h4 className="font-bold text-lg leading-tight">{treatment.title[activeLang]}</h4>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                   <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-bold">
                        <Stethoscope className="w-3.5 h-3.5 text-primary" />
                        <span>{treatment.successRate}% {t('dashboard.treatments.success')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-bold truncate">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        {treatment.duration?.[activeLang]}
                      </div>
                   </div>

                   <div className="flex gap-3">
                      <DashboardButton 
                        variant="outline" 
                        size="sm" 
                        icon={Edit2}
                        onClick={() => setEditingTreatment(treatment)}
                        className="flex-1 !rounded-xl"
                      >
                        {t('dashboard.edit')} {activeLang.toUpperCase()}
                      </DashboardButton>
                      <DashboardButton 
                        variant="ghost" 
                        size="sm" 
                        icon={Trash2}
                        onClick={() => handleDelete(treatment.id)}
                        className="!rounded-xl text-red-500 hover:bg-red-50"
                      />
                   </div>
                </div>
              </DashboardCard>
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.button
          onClick={handleAdd}
          className="border-4 border-dashed border-secondary/5 rounded-[2.5rem] flex flex-col items-center justify-center gap-6 group hover:border-primary/20 hover:bg-primary/[0.02] transition-all min-h-[400px]"
        >
          <div className="w-20 h-20 bg-secondary/5 rounded-3xl flex items-center justify-center group-hover:bg-primary/10 transition-all">
            <Plus className="w-10 h-10 text-secondary/20 group-hover:text-primary" />
          </div>
          <h4 className="font-bold text-secondary text-xl">{t('dashboard.treatments.add_treatment')}</h4>
        </motion.button>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingTreatment && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-secondary/80 backdrop-blur-sm pt-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-2xl"
            >
              <DashboardCard className="max-h-[85vh] overflow-y-auto relative">
                <div className="sticky top-0 bg-white z-10 pb-6 mb-6 border-b border-secondary/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-secondary">{t('dashboard.treatments.edit')}</h2>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-black">ID: {editingTreatment.id}</p>
                  </div>
                  <LanguageTabs activeLang={activeLang} onLangChange={setActiveLang} />
                </div>

                <div className="space-y-6">
                  <DashboardInput
                    label={t('dashboard.treatments.image_url')}
                    value={editingTreatment.image}
                    onChange={(e) => setEditingTreatment({ ...editingTreatment, image: e.target.value })}
                    icon={ImageIcon}
                  />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <DashboardInput
                          label={`${t('dashboard.treatments.title_label')} (${activeLang.toUpperCase()})`}
                          value={editingTreatment.title[activeLang]}
                          onChange={(e) => setEditingTreatment({ 
                            ...editingTreatment, 
                            title: { ...editingTreatment.title, [activeLang]: e.target.value } 
                          })}
                        />
                        {errors.title && <p className="text-[10px] text-red-500 font-bold px-1">{errors.title}</p>}
                      </div>
                      <div className="space-y-1">
                        <DashboardInput
                          label={`${t('dashboard.treatments.category_label')} (${activeLang.toUpperCase()})`}
                          value={editingTreatment.category[activeLang]}
                          onChange={(e) => setEditingTreatment({ 
                            ...editingTreatment, 
                            category: { ...editingTreatment.category, [activeLang]: e.target.value } 
                          })}
                        />
                        {errors.category && <p className="text-[10px] text-red-500 font-bold px-1">{errors.category}</p>}
                      </div>
                    </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <DashboardInput
                        label={t('dashboard.treatments.success_rate')}
                        type="number"
                        value={editingTreatment.successRate}
                        onChange={(e) => setEditingTreatment({ ...editingTreatment, successRate: parseInt(e.target.value) })}
                      />
                      {errors.successRate && <p className="text-[10px] text-red-500 font-bold px-1">{errors.successRate}</p>}
                    </div>
                    <DashboardInput
                      label={`${t('dashboard.treatments.duration_label')} (${activeLang.toUpperCase()})`}
                      value={editingTreatment.duration?.[activeLang] || ''}
                      onChange={(e) => setEditingTreatment({ 
                        ...editingTreatment, 
                        duration: { ...(editingTreatment.duration || { en: '', ar: '', fr: '', ru: '' }), [activeLang]: e.target.value } 
                      })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-secondary/60 ml-1">{t('dashboard.treatments.desc_label')} ({activeLang.toUpperCase()})</label>
                    <textarea
                      className="w-full bg-secondary/5 border-2 border-transparent focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 rounded-2xl p-6 text-secondary font-semibold outline-none transition-all min-h-[120px]"
                      value={editingTreatment.description?.[activeLang] || ''}
                      onChange={(e) => setEditingTreatment({ 
                        ...editingTreatment, 
                        description: { ...(editingTreatment.description || { en: '', ar: '', fr: '', ru: '' }), [activeLang]: e.target.value } 
                      })}
                    />
                  </div>
                </div>

                <div className="mt-10 flex gap-4">
                  <DashboardButton onClick={handleUpdate} className="flex-1" icon={Save}>
                    {t('dashboard.save')}
                  </DashboardButton>
                  <DashboardButton variant="outline" onClick={closeModal} icon={X}>
                    {t('dashboard.cancel')}
                  </DashboardButton>
                </div>
              </DashboardCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
