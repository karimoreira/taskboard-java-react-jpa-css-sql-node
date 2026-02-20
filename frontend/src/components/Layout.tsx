import { Link, useLocation } from 'react-router-dom';
import { FiTrello } from 'react-icons/fi';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar__inner">
          <Link to="/" className="navbar__brand">
            <FiTrello />
            <span className="brand-text">TaskBoard</span>
          </Link>
          <div className="navbar__links">
            <Link
              to="/"
              className={`navbar__link ${isHome ? 'navbar__link--active' : ''}`}
            >
              Board
            </Link>
          </div>
        </div>
      </nav>
      <main className="main-content">{children}</main>
    </div>
  );
}

export default Layout;
