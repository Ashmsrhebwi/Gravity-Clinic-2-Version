import { api } from '../lib/api';

/**
 * Gravity Clinic API Service
 * 
 * Specialized functions to interact with the Laravel backend.
 * These functions decouple UI components from the underlying API client.
 */

export interface ConnectionTestResponse {
  status: string;
  message: string;
  timestamp: string;
}

export const clinicService = {
  /**
   * System Connectivity Check
   */
  checkConnection: () => 
    api.get<ConnectionTestResponse>('/test-connection'),

  /**
   * Public Website Data
   */
  getSettings: () => 
    api.get<any>('/public/settings'),

  getNavLinks: () => 
    api.get<any[]>('/public/nav-links'),

  getStats: () => 
    api.get<any[]>('/public/stats'),

  getProcessSteps: () => 
    api.get<any[]>('/public/process-steps'),

  getSocialLinks: () => 
    api.get<any[]>('/public/social-links'),

  getTreatments: () => 
    api.get<any[]>('/public/treatments'),

  getTestimonials: () => 
    api.get<any[]>('/public/testimonials'),

  getFaqs: () => 
    api.get<any[]>('/public/faqs'),

  getLocations: () => 
    api.get<any[]>('/public/locations'),

  submitLead: (data: any) => 
    api.post('/public/leads', data),

  /**
   * Authentication
   */
  login: (credentials: { email: string; password: string }) => 
    api.post('/login', credentials),

  verifyOtp: (data: { email: string; code: string }) => 
    api.post('/verify-otp', data),

  logout: () => 
    api.post('/logout', {}),

  forgotPassword: (data: { email: string }) => 
    api.post('/forgot-password', data),

  resetPassword: (data: any) => 
    api.post('/reset-password', data),

  getUser: () => 
    api.get<any>('/me'),

  /**
   * Admin API Methods
   */
  uploadMedia: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/admin/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  updateSettingsBatch: (settings: { key: string; value: any }[]) => 
    api.post('/admin/settings/batch', { settings }),

  syncNavLinks: (links: any[]) => 
    api.post('/admin/nav-links/sync', { links }),

  // Stats
  createStat: (data: any) => api.post('/admin/stats', data),
  updateStat: (id: number, data: any) => api.put(`/admin/stats/${id}`, data),
  deleteStat: (id: number) => api.delete(`/admin/stats/${id}`),

  // Process Steps
  createProcessStep: (data: any) => api.post('/admin/process-steps', data),
  updateProcessStep: (id: number, data: any) => api.put(`/admin/process-steps/${id}`, data),
  deleteProcessStep: (id: number) => api.delete(`/admin/process-steps/${id}`),

  // Social Links
  createSocialLink: (data: any) => api.post('/admin/social-links', data),
  updateSocialLink: (id: number, data: any) => api.put(`/admin/social-links/${id}`, data),
  deleteSocialLink: (id: number) => api.delete(`/admin/social-links/${id}`),

  // FAQs
  createFaq: (data: any) => api.post('/admin/faqs', data),
  updateFaq: (id: number, data: any) => api.put(`/admin/faqs/${id}`, data),
  deleteFaq: (id: number) => api.delete(`/admin/faqs/${id}`),

  // Testimonials
  createTestimonial: (data: any) => api.post('/admin/testimonials', data),
  updateTestimonial: (id: number, data: any) => api.put(`/admin/testimonials/${id}`, data),
  deleteTestimonial: (id: number) => api.delete(`/admin/testimonials/${id}`),

  // Locations
  createLocation: (data: any) => api.post('/admin/locations', data),
  updateLocation: (id: number, data: any) => api.put(`/admin/locations/${id}`, data),
  deleteLocation: (id: number) => api.delete(`/admin/locations/${id}`),
};

