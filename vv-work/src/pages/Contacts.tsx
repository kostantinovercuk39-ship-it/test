import { useState, type FormEvent } from 'react';
import { submitApplication } from '../services/mockApi';

export const Contacts = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState(''); // <-- 1. Стан для тексту помилки валідації

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); // Скидаємо попередні помилки

    // 2. Логіка валідації
    if (!name.trim()) {
      setErrorMessage('Будь ласка, введіть ваше ім\'я');
      return;
    }

    if (!contact.trim()) {
      setErrorMessage('Будь ласка, введіть контакт (телефон або Telegram)');
      return;
    }

    // Приклад простої перевірки на валідність (якщо це схоже на email або має мінімальну довжину)
    if (contact.length < 3) {
      setErrorMessage('Контакт занадто короткий');
      return;
    }

    setStatus('submitting');
    submitApplication({ name, contact })
      .then(() => { 
        setStatus('success'); 
        setName(''); 
        setContact(''); 
      })
      .catch(() => setStatus('error'));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-white">Зв'язатися з нами</h1>
      <form onSubmit={handleSubmit} className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 md:p-8 space-y-4">
        <div>
          <label className="block text-slate-300 mb-1">Ім'я *</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2.5 focus:border-blue-500 focus:outline-none" 
          />
        </div>
        <div>
          <label className="block text-slate-300 mb-1">Телефон / Telegram *</label>
          <input 
            type="text" 
            value={contact} 
            onChange={(e) => setContact(e.target.value)} 
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2.5 focus:border-blue-500 focus:outline-none" 
          />
        </div>

        {/* 3. Виведення кастомної помилки валідації */}
        {errorMessage && <p className="text-red-400 text-sm font-medium">{errorMessage}</p>}

        <button 
          type="submit" 
          disabled={status === 'submitting'} 
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white py-3 rounded-xl font-bold transition-colors"
        >
          {status === 'submitting' ? 'Надсилання...' : 'Надіслати'}
        </button>

        {status === 'success' && <p className="text-green-400 text-center font-medium">Успішно відправлено!</p>}
        {status === 'error' && <p className="text-red-400 text-center font-medium">Помилка сервера. Спробуйте ще раз.</p>}
      </form>
    </div>
  );
};