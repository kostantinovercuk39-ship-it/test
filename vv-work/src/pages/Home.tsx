import { useState, useMemo } from 'react';
import { useDebounce } from '../hooks/useDebounce';

interface Job {
  id: number;
  title: string;
  category: string;
  salary: string;
  location: string;
  description: string;
}

const JOBS_DATA: Job[] = [
  { id: 1, title: 'Монтажник металоконструкцій', category: 'Будівництво', salary: '€2200 – €2600 / міс', location: 'Варшава, Польща', description: 'Монтаж промислових металоконструкцій, читання креслень, досвід від 1 року. Житло надається.' },
  { id: 2, title: 'Оператор автоматичної лінії', category: 'Виробництво', salary: '€1900 – €2300 / міс', location: 'Катовіце, Польща', description: 'Контроль роботи лінії пакування, базове обслуговування верстатів, навчання на місці.' },
  { id: 3, title: 'Водій навантажувача (карщик)', category: 'Логістика', salary: '€2100 – €2500 / міс', location: 'Вроцлав, Польща', description: 'Робота на сучасному складі логістичного хабу. Наявність сертифіката UDT обов’язкова.' },
  { id: 4, title: 'Frontend Developer (React)', category: 'IT', salary: '€3000 – €4200 / міс', location: 'Вроцлав (Гібрид)', description: 'Розробка та підтримка корпоративних веб-сервісів на React та TypeScript.' },
  { id: 5, title: 'Електрик промислового обладнання', category: 'Будівництво', salary: '€2300 – €2700 / міс', location: 'Краків, Польща', description: 'Монтаж кабельних трас, підключення розподільчих щитів, читання схем.' },
  { id: 6, title: 'Комплектувальник замовлень', category: 'Логістика', salary: '€1800 – €2200 / міс', location: 'Познань, Польща', description: 'Збір замовлень за допомогою сканера, пакування товарів для відправки.' },
  { id: 7, title: 'Зварювальник MIG/MAG (135/136)', category: 'Виробництво', salary: '€2400 – €2900 / міс', location: 'Гданськ, Польща', description: 'Зварювання сталевих конструкцій, контроль якості швів.' },
  { id: 8, title: 'QA Engineer (Manual / Automation)', category: 'IT', salary: '€2500 – €3500 / міс', location: 'Варшава (Віддалено)', description: 'Тестування функціоналу платформ, складання тест-планів, базовий автотестинг.' },
  { id: 9, title: 'Арматурник-бетоняр', category: 'Будівництво', salary: '€2200 – €2600 / міс', location: 'Лодзь, Польща', description: "В'язання арматури, заливка та вібрування бетонних сумішей на монолітних об'єктах." },
  { id: 10, title: 'Пакувальник готової продукції', category: 'Виробництво', salary: '€1750 – €2100 / міс', location: 'Бидгощ, Польща', description: 'Сортування та фасування продукції на конвеєрі, маркування коробок.' },
  { id: 11, title: 'Водій-експедитор (кат. C+E)', category: 'Логістика', salary: '€2600 – €3200 / міс', location: 'Варшава, Польща', description: 'Міжнародні перевезення по країнах ЄС, оформлення супровідних документів.' },
  { id: 12, title: 'Node.js Backend Developer', category: 'IT', salary: '€3500 – €4800 / міс', location: 'Краків (Віддалено)', description: 'Проєктування REST API, робота з PostgreSQL, оптимізація мікросервісів.' },
];

const CATEGORIES = ['Будівництво', 'Виробництво', 'Логістика', 'IT'];

export const Home = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(10);
  const [isLoading] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 300);

  const handleCategoryToggle = (cat: string) => {
    setVisibleCount(10);
    if (cat === 'Усі') {
      setSelectedCategories([]);
      return;
    }

    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setVisibleCount(10);
  };

  const filteredJobs = useMemo(() => {
    return JOBS_DATA.filter((job) => {
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(job.category);
      const matchesSearch =
        job.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        job.location.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        job.description.toLowerCase().includes(debouncedSearch.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategories, debouncedSearch]);

  const displayedJobs = filteredJobs.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Твій міст до <span className="text-blue-500">перевірених вакансій у Європі.</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            Актуальні пропозиції від перевірених роботодавців із гарантією стабільності та прозорих умов.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900/80 p-4 rounded-2xl border border-slate-800 shadow-lg">
          <input
            type="text"
            placeholder="Пошук за посадою, містом або описом..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full md:w-80 bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-2.5 focus:border-blue-500 focus:outline-none placeholder-slate-500"
          />

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <button
              type="button"
              onClick={() => handleCategoryToggle('Усі')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                selectedCategories.length === 0
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Усі
            </button>
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategories.includes(cat);
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryToggle(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-4 animate-pulse"
              >
                <div className="flex justify-between items-start">
                  <div className="h-6 bg-slate-700 rounded-md w-2/3"></div>
                  <div className="h-6 bg-slate-800 rounded-full w-20"></div>
                </div>
                <div className="h-4 bg-slate-800 rounded w-1/2"></div>
                <div className="space-y-2">
                  <div className="h-3.5 bg-slate-800 rounded w-full"></div>
                  <div className="h-3.5 bg-slate-800 rounded w-4/5"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedJobs.length > 0 ? (
              displayedJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 transition-all rounded-2xl p-6 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h2 className="text-xl font-bold text-white">{job.title}</h2>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-950/80 text-blue-400 border border-blue-900/60 shrink-0">
                        {job.category}
                      </span>
                    </div>
                    <p className="text-emerald-400 font-semibold text-sm mb-3">
                      {job.salary} • <span className="text-slate-300 font-normal">{job.location}</span>
                    </p>
                    <p className="text-slate-400 text-sm leading-relaxed">{job.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-slate-400">
                Вакансій за вказаними фільтрами не знайдено.
              </div>
            )}
          </div>
        )}

        {filteredJobs.length > 0 && (
          <div className="flex flex-col items-center gap-3 pt-4">
            <p className="text-sm text-slate-400">
              Показано {displayedJobs.length} із {filteredJobs.length} вакансій
            </p>
            {visibleCount < filteredJobs.length && (
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 10)}
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium px-6 py-2.5 rounded-xl transition-colors shadow-sm"
              >
                Показати ще
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};