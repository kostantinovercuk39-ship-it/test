import { Link } from 'react-router-dom';

export const PartnerPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-12 text-center">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Потрібні працівники?
        </h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          VVWork допоможе вам оперативно закрити вакансії будь-якої складності кваліфікованими та перевіреними кадрами для вашого бізнесу в Європі.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-2">
          <h3 className="text-lg font-bold text-blue-400">Швидкий підбір</h3>
          <p className="text-slate-400 text-sm">
            Формуємо пули кандидатів під ваші вимоги у стислі терміни.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-2">
          <h3 className="text-lg font-bold text-blue-400">Перевірені кадри</h3>
          <p className="text-slate-400 text-sm">
            Проводимо попередній відбір та перевірку релевантного досвіду спеціалістів.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-2">
          <h3 className="text-lg font-bold text-blue-400">Супровід</h3>
          <p className="text-slate-400 text-sm">
            Допомагаємо на всіх етапах комунікації та оформлення кандидатів.
          </p>
        </div>
      </div>

      <div className="pt-6">
        <Link
          to="/contacts"
          className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-blue-500/20"
        >
          Знайти працівника
        </Link>
      </div>
    </div>
  );
};