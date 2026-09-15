import type { Job, ApplicationFormData } from '../types';

const MOCK_JOBS: Job[] = [
  { id: '1', title: 'Монтажник металоконструкцій', category: 'Будівництво', salary: '€2200 - €2600 / міс', location: 'Варшава, Польща', description: 'Монтаж промислових металоконструкцій, читання креслень, досвід від 1 року. Житло надається.', partnerSlug: 'tech-corp' },
  { id: '2', title: 'Оператор автоматичної лінії', category: 'Виробництво', salary: '€1900 - €2300 / міс', location: 'Катовіце, Польща', description: 'Контроль роботи лінії пакування, базове обслуговування верстатів, навчання на місці.', partnerSlug: 'tech-corp' },
  { id: '3', title: 'Водій навантажувача (карщик)', category: 'Логістика', salary: '€2100 - €2500 / міс', location: 'Вроцлав, Польща', description: 'Робота на сучасному складі логістичного хабу. Наявність сертифіката UDT обов’язкова.', partnerSlug: 'tech-corp' },
  { id: '4', title: 'Frontend Developer (React)', category: 'ІТ', salary: '€3000 - €4200 / міс', location: 'Вроцлав (Гібрид)', description: 'Розробка та підтримка корпоративних веб-сервісів на React та TypeScript.', partnerSlug: 'tech-corp' },
  { id: '5', title: 'Водій-міжнародник категорії CE', category: 'Водії', salary: '€2500 - €3200 / міс', location: 'Маршрути по ЄС', description: 'Рейси Західною Європою, автопарк стандарту Euro-6, офіційний трудовий договір.', partnerSlug: 'tech-corp' },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchJobsByPartner = async (slug: string): Promise<Job[]> => {
  await delay(600);
  // Тимчасово вимкнуто для дебагу, щоб не заплутувати при завантаженні:
  // if (Math.random() < 0.1) throw new Error('Не вдалося завантажити вакансії. Спробуйте оновити сторінку.');
  return MOCK_JOBS.filter((job) => job.partnerSlug === slug);
};

export const submitApplication = async (data: ApplicationFormData): Promise<{ success: boolean }> => {
  await delay(700);
  if (!data.name || !data.contact) throw new Error('Будь ласка, заповніть обов’язкові поля.');
  return { success: true };
};