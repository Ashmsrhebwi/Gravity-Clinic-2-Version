import React, { useState } from 'react';
import { useDashboard, DashboardState } from '../../context/DashboardContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  ExternalLink,
  Save,
  X,
  Type,
  Info,
  Link as LinkIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { 
  DashboardCard, 
  DashboardInput, 
  DashboardButton, 
  StatusBadge,
  LanguageTabs
} from './UI';

interface GenericManagerProps {
  type: keyof Pick<DashboardState, 'testimonials' | 'faqs' | 'locations' | 'blogs' | 'stats' | 'processSteps' | 'results' | 'treatments' | 'doctors' | 'socialLinks'>;
  title: string;
  description: string;
}

export function GenericManager({ type, title, description }: GenericManagerProps) {
  const { state, addGeneric, updateGeneric, deleteGeneric } = useDashboard();
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [editTab, setEditTab] = useState<'en' | 'ar' | 'fr' | 'ru'>(language as any);

  // Map plural type to singular for context methods
  const singularType = type === 'processSteps' 
    ? 'processStep' 
    : type === 'socialLinks' 
      ? 'socialLink' 
      : type.endsWith('s') 
        ? type.slice(0, -1) 
        : type;

  // Safe access to the correct array in state
  const items = (state[type] as any[]) || [];

  const filteredItems = items.filter(item => {
    const searchStr = searchTerm.toLowerCase();
    // Check various common fields for search
    const val = item.name || 
                (typeof item.question === 'string' ? item.question : (item.question?.[language] || '')) || 
                (typeof item.title === 'string' ? item.title : (item.title?.[language] || '')) || 
                (typeof item.label === 'string' ? item.label : (item.label?.[language] || '')) || '';
    
    return val.toLowerCase().includes(searchStr);
  });

  const handleAdd = () => {
    const id = Math.random().toString(36).substr(2, 9);
    const defaultData: any = { id };

    // Set type-specific defaults
    if (type === 'testimonials') {
      defaultData.name = 'New Patient';
      defaultData.text = { en: '', ar: '', fr: '', ru: '' };
      defaultData.treatment = { en: '', ar: '', fr: '', ru: '' };
    } else if (type === 'faqs') {
      defaultData.question = { en: '', ar: '', fr: '', ru: '' };
      defaultData.answer = { en: '', ar: '', fr: '', ru: '' };
    } else if (type === 'stats') {
      defaultData.label = { en: '', ar: '', fr: '', ru: '' };
      defaultData.value = '0';
      defaultData.suffix = '+';
    } else if (type === 'processSteps') {
      defaultData.title = { en: '', ar: '', fr: '', ru: '' };
      defaultData.description = { en: '', ar: '', fr: '', ru: '' };
      defaultData.step = items.length + 1;
      defaultData.icon = 'Check';
    } else if (type === 'locations') {
      defaultData.title = { en: '', ar: '', fr: '', ru: '' };
      defaultData.address = { en: '', ar: '', fr: '', ru: '' };
      defaultData.phone = '';
      defaultData.email = '';
    } else if (type === 'blogs') {
      defaultData.title = { en: '', ar: '', fr: '', ru: '' };
      defaultData.excerpt = { en: '', ar: '', fr: '', ru: '' };
      defaultData.date = new Date().toISOString().split('T')[0];
      defaultData.author = 'Admin';
      defaultData.image = '';
    }

    addGeneric(singularType as any, defaultData);
    toast.success(t('dashboard.generic.new'));
    setEditingId(id);
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setErrors({});
    setEditTab(language as any);
  };

  const closeModal = () => {
    setEditingId(null);
    setErrors({});
  };

  const handleDelete = (id: string) => {
    if (confirm(t('dashboard.delete') + '?')) {
      deleteGeneric(singularType as any, id);
      toast.error(t('dashboard.delete'));
    }
  };

  const currentEditingItem = items.find(i => i.id === editingId);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-secondary tracking-tight">{title}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">{description}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <input 
              type="text"
              placeholder={t('dashboard.generic.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-3 bg-secondary/5 border-none rounded-2xl w-64 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
          </div>
          <DashboardButton onClick={handleAdd} icon={Plus} variant="primary">
            {t('dashboard.add')}
          </DashboardButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => {
            const itemTitle = item.name || 
                           (item.question && (typeof item.question === 'string' ? item.question : (item.question[language] || item.question['en']))) || 
                           (item.title && (typeof item.title === 'string' ? item.title : (item.title[language] || item.title['en']))) || 
                           (item.label && (typeof item.label === 'string' ? item.label : (item.label[language] || item.label['en']))) || 
                           `${title} #${index + 1}`;

            return (
              <motion.div
                key={item.id || index}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <DashboardCard className="group h-full flex flex-col !rounded-[2.5rem]">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-2">
                      <Type className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEdit(item.id)}
                        className="p-2 hover:bg-primary/10 text-primary rounded-xl transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 hover:bg-red-50 text-red-500 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-bold text-secondary text-lg mb-2 line-clamp-1">{itemTitle}</h3>
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-secondary/5">
                    <StatusBadge variant="info">{t('dashboard.system.online')}</StatusBadge>
                    <button 
                      onClick={() => handleEdit(item.id)}
                      className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all"
                    >
                      {t('dashboard.generic.open_form')}
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </DashboardCard>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredItems.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <div className="w-20 h-20 bg-secondary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-muted-foreground">
              <Search className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-secondary mb-2">{t('dashboard.generic.not_found')}</h3>
            <p className="text-muted-foreground">{t('dashboard.generic.start_adding')}</p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingId && currentEditingItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-secondary/40 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-8 border-b border-secondary/5 flex items-center justify-between bg-white sticky top-0 z-10">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-2xl font-bold text-secondary">{t('dashboard.edit')}</h2>
                    <StatusBadge variant="info">{type}</StatusBadge>
                  </div>
                  <p className="text-sm text-muted-foreground">{t('dashboard.generic.editing')} {editTab.toUpperCase()}</p>
                </div>
                <button 
                  onClick={closeModal}
                  className="p-3 hover:bg-secondary/5 rounded-2xl transition-colors"
                >
                  <X className="w-6 h-6 text-secondary" />
                </button>
              </div>

              {/* Language Selector */}
              <div className="px-8 py-4 bg-secondary/[0.02] border-b border-secondary/5">
                <LanguageTabs activeLang={editTab} onLangChange={setEditTab} />
              </div>

              {/* Form Content */}
              <div className="p-8 overflow-y-auto space-y-8">
                {/* Dynamically render fields based on type */}
                {type === 'testimonials' && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-secondary uppercase tracking-widest px-1">Patient Name</label>
                       <DashboardInput
                        value={currentEditingItem.name}
                        onChange={(e) => updateGeneric(singularType as any, editingId, { name: e.target.value })}
                        icon={Type}
                        className={`!py-4 !rounded-2xl ${errors.name ? 'border-red-500/50 ring-2 ring-red-500/10' : ''}`}
                      />
                      {errors.name && <p className="text-[10px] text-red-500 font-bold px-1 mt-1">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-secondary uppercase tracking-widest px-1">Treatment ({editTab.toUpperCase()})</label>
                      <DashboardInput
                        value={currentEditingItem.treatment[editTab] || ''}
                        onChange={(e) => {
                          const newTreatment = { ...currentEditingItem.treatment, [editTab]: e.target.value };
                          updateGeneric(singularType as any, editingId, { treatment: newTreatment });
                        }}
                        icon={Info}
                        className="!py-4 !rounded-2xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-secondary uppercase tracking-widest px-1">Testimonial Text ({editTab.toUpperCase()})</label>
                      <textarea
                        value={currentEditingItem.text[editTab] || ''}
                        onChange={(e) => {
                          const newText = { ...currentEditingItem.text, [editTab]: e.target.value };
                          updateGeneric(singularType as any, editingId, { text: newText });
                        }}
                        className="w-full px-6 py-4 bg-secondary/5 border-none rounded-[2rem] focus:ring-2 focus:ring-primary/20 transition-all outline-none min-h-[150px] resize-none"
                      />
                    </div>
                  </div>
                )}

                {type === 'faqs' && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-secondary uppercase tracking-widest px-1">Question ({editTab.toUpperCase()})</label>
                      <DashboardInput
                        value={currentEditingItem.question[editTab] || ''}
                        onChange={(e) => {
                          const val = { ...currentEditingItem.question, [editTab]: e.target.value };
                          updateGeneric(singularType as any, editingId, { question: val });
                        }}
                        icon={Type}
                        className="!py-4 !rounded-2xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-secondary uppercase tracking-widest px-1">Answer ({editTab.toUpperCase()})</label>
                      <textarea
                        value={currentEditingItem.answer[editTab] || ''}
                        onChange={(e) => {
                          const val = { ...currentEditingItem.answer, [editTab]: e.target.value };
                          updateGeneric(singularType as any, editingId, { answer: val });
                        }}
                        className="w-full px-6 py-4 bg-secondary/5 border-none rounded-[2rem] focus:ring-2 focus:ring-primary/20 transition-all outline-none min-h-[150px] resize-none"
                      />
                    </div>
                  </div>
                )}

                {type === 'stats' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-secondary uppercase tracking-widest px-1">Value</label>
                        <DashboardInput
                          value={currentEditingItem.value}
                          onChange={(e) => updateGeneric(singularType as any, editingId, { value: e.target.value })}
                          icon={Type}
                          className="!py-4 !rounded-2xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-secondary uppercase tracking-widest px-1">Suffix</label>
                        <DashboardInput
                          value={currentEditingItem.suffix}
                          onChange={(e) => updateGeneric(singularType as any, editingId, { suffix: e.target.value })}
                          icon={Plus}
                          className="!py-4 !rounded-2xl"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-secondary uppercase tracking-widest px-1">Label ({editTab.toUpperCase()})</label>
                      <DashboardInput
                        value={currentEditingItem.label[editTab] || ''}
                        onChange={(e) => {
                          const val = { ...currentEditingItem.label, [editTab]: e.target.value };
                          updateGeneric(singularType as any, editingId, { label: val });
                        }}
                        icon={Info}
                        className="!py-4 !rounded-2xl"
                      />
                    </div>
                  </div>
                )}

                {type === 'processSteps' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-secondary uppercase tracking-widest px-1">Step Number</label>
                        <DashboardInput
                          type="number"
                          value={currentEditingItem.step}
                          onChange={(e) => updateGeneric(singularType as any, editingId, { step: parseInt(e.target.value) })}
                          icon={Type}
                          className="!py-4 !rounded-2xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-secondary uppercase tracking-widest px-1">Icon Name</label>
                        <DashboardInput
                          value={currentEditingItem.icon}
                          onChange={(e) => updateGeneric(singularType as any, editingId, { icon: e.target.value })}
                          icon={Info}
                          className="!py-4 !rounded-2xl"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-secondary uppercase tracking-widest px-1">Step Title ({editTab.toUpperCase()})</label>
                      <DashboardInput
                        value={currentEditingItem.title[editTab] || ''}
                        onChange={(e) => {
                          const val = { ...currentEditingItem.title, [editTab]: e.target.value };
                          updateGeneric(singularType as any, editingId, { title: val });
                        }}
                        icon={Type}
                        className="!py-4 !rounded-2xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-secondary uppercase tracking-widest px-1">Description ({editTab.toUpperCase()})</label>
                      <textarea
                        value={currentEditingItem.description[editTab] || ''}
                        onChange={(e) => {
                          const val = { ...currentEditingItem.description, [editTab]: e.target.value };
                          updateGeneric(singularType as any, editingId, { description: val });
                        }}
                        className="w-full px-6 py-4 bg-secondary/5 border-none rounded-[2rem] focus:ring-2 focus:ring-primary/20 transition-all outline-none min-h-[120px] resize-none"
                      />
                    </div>
                  </div>
                )}

                {type === 'locations' && (
                  <div className="space-y-6">
                     <div className="space-y-2">
                      <label className="text-sm font-bold text-secondary uppercase tracking-widest px-1">Location Title ({editTab.toUpperCase()})</label>
                      <DashboardInput
                        value={currentEditingItem.title?.[editTab] || ''}
                        onChange={(e) => {
                          const val = { ...currentEditingItem.title, [editTab]: e.target.value };
                          updateGeneric(singularType as any, editingId, { title: val });
                        }}
                        icon={Type}
                        className="!py-4 !rounded-2xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-secondary uppercase tracking-widest px-1">Address ({editTab.toUpperCase()})</label>
                      <DashboardInput
                        value={currentEditingItem.address?.[editTab] || ''}
                        onChange={(e) => {
                          const val = { ...currentEditingItem.address, [editTab]: e.target.value };
                          updateGeneric(singularType as any, editingId, { address: val });
                        }}
                        icon={Info}
                        className="!py-4 !rounded-2xl"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-secondary uppercase tracking-widest px-1">Phone</label>
                        <DashboardInput
                          value={currentEditingItem.phone}
                          onChange={(e) => updateGeneric(singularType as any, editingId, { phone: e.target.value })}
                          icon={Info}
                          className="!py-4 !rounded-2xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-secondary uppercase tracking-widest px-1">Email</label>
                        <DashboardInput
                          value={currentEditingItem.email}
                          onChange={(e) => updateGeneric(singularType as any, editingId, { email: e.target.value })}
                          icon={LinkIcon}
                          className="!py-4 !rounded-2xl"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Generic Item Support */}
                {type === 'blogs' && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-secondary uppercase tracking-widest px-1">Article Title ({editTab.toUpperCase()})</label>
                      <DashboardInput
                        value={currentEditingItem.title?.[editTab] || ''}
                        onChange={(e) => {
                          const val = { ...currentEditingItem.title, [editTab]: e.target.value };
                          updateGeneric(singularType as any, editingId, { title: val });
                        }}
                        icon={Type}
                        className="!py-4 !rounded-2xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-secondary uppercase tracking-widest px-1">Excerpt ({editTab.toUpperCase()})</label>
                      <textarea
                        value={currentEditingItem.excerpt?.[editTab] || ''}
                        onChange={(e) => {
                          const val = { ...currentEditingItem.excerpt, [editTab]: e.target.value };
                          updateGeneric(singularType as any, editingId, { excerpt: val });
                        }}
                        className="w-full px-6 py-4 bg-secondary/5 border-none rounded-[2rem] focus:ring-2 focus:ring-primary/20 transition-all outline-none min-h-[100px] resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-secondary uppercase tracking-widest px-1">Date</label>
                        <DashboardInput
                          value={currentEditingItem.date}
                          onChange={(e) => updateGeneric(singularType as any, editingId, { date: e.target.value })}
                          icon={Info}
                          className="!py-4 !rounded-2xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-secondary uppercase tracking-widest px-1">Author</label>
                        <DashboardInput
                          value={currentEditingItem.author}
                          onChange={(e) => updateGeneric(singularType as any, editingId, { author: e.target.value })}
                          icon={Type}
                          className="!py-4 !rounded-2xl"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-8 border-t border-secondary/5 bg-secondary/[0.01] flex justify-end">
                <DashboardButton 
                  onClick={() => {
                    // Simple validation
                    if (type === 'testimonials' && !currentEditingItem.name) {
                      setErrors({ name: t('auth.error.required') });
                      return;
                    }
                    if (type === 'stats' && !currentEditingItem.value) {
                      setErrors({ value: t('auth.error.required') });
                      return;
                    }
                    
                    toast.success(t('dashboard.save'));
                    closeModal();
                  }}
                  icon={Save}
                  variant="primary"
                  className="shadow-xl"
                >
                  {t('dashboard.save')}
                </DashboardButton>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
