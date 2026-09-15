import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const modalText =
    "Ваші дані використовуються виключно для надання послуг платформи: зв'язку між шукачами та роботодавцями, надсилання сповіщень про нові вакансії/відгуки та покращення роботи сервісу. З повагою, компанія VV Work.";

  return (
    <footer className="relative bg-slate-900 text-slate-300 py-8 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-6">
        {/* Логотип та авторські права */}
        <div>
          <h3 className="text-xl font-bold text-white">VV Work</h3>
          <p className="text-sm text-slate-400">© 2026 VV Work. Усі права захищено.</p>
        </div>

        {/* Контактні дані */}
        <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-slate-300">
          <a
            href="https://t.me/VV_work"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Telegram: <span className="text-sky-400">@VV_work</span>
          </a>
          <span className="hidden sm:inline text-slate-600">•</span>
          <a href="tel:+420775504887" className="hover:text-white transition-colors">
            Тел.: <span className="text-slate-200">+420 775 504 887</span>
          </a>
          <span className="hidden sm:inline text-slate-600">•</span>
          <a href="mailto:vv_work@gmail.com" className="hover:text-white transition-colors">
            Email: <span className="text-slate-200">vv_work@gmail.com</span>
          </a>
        </div>

        {/* Об'єднане посилання */}
        <div>
          <button
            onClick={() => setIsOpen(true)}
            className="text-sm text-slate-400 hover:text-white transition-colors underline decoration-dashed underline-offset-4 cursor-pointer"
          >
            Політика конфіденційності/Умови використання
          </button>
        </div>
      </div>

      {/* Вспливаючий плавний блок (Bottom Drawer) */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 text-slate-200 p-6 shadow-2xl z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center relative pt-2 pb-1">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-0 right-0 text-slate-400 hover:text-white bg-slate-700/50 hover:bg-slate-700 p-2 rounded-full transition-colors"
            aria-label="Закрити"
          >
            ✕
          </button>

          <h4 className="text-lg font-semibold text-white mb-3">
            Політика конфіденційності/Умови використання
          </h4>
          
          <p className="text-sm leading-relaxed text-slate-300">
            {modalText}
          </p>
        </div>
      </div>
    </footer>
  );
};