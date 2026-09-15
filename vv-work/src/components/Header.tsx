import { Link, NavLink } from 'react-router-dom';

export const Header = () => {
  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    `transition-colors hover:text-blue-400 ${isActive ? 'text-blue-400 font-semibold' : 'text-slate-300'}`;

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-500 tracking-wider">
          VV<span className="text-white">Work</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/" className={linkStyle}>
            Головна
          </NavLink>
          <NavLink to="/partners/employer" className={linkStyle}>
            Роботодавець
          </NavLink>
          <NavLink to="/contacts" className={linkStyle}>
            Контакти
          </NavLink>
        </nav>

        <Link
          to="/contacts"
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
        >
          Знайти працівника
        </Link>
      </div>
    </header>
  );
};