export type Category = 
  | 'Будівництво'
  | 'Виробництво'
  | 'Логістика'
  | 'Готельно-ресторанна сфера'
  | 'ІТ'
  | 'Водії'
  | 'Інші';

export interface Job {
  id: string;
  title: string;
  category: Category;
  salary: string;
  location: string;
  description: string;
  partnerSlug: string;
}

export interface ApplicationFormData {
  name: string;
  contact: string;
  message?: string;
}