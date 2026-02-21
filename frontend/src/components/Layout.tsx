import { Link, useLocation } from 'react-router-dom';
import { FiLayout, FiGithub } from 'react-icons/fi';

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
            <div className="navbar__logo">
              <FiLayout />
            </div>
            <span className="brand-text">TaskBoard</span>
          </Link>
          <div className="navbar__right">
            <div className="navbar__links">
              <Link
                to="/"
                className={`navbar__link ${isHome ? 'navbar__link--active' : ''}`}
              >
                <FiLayout size={14} />
                Board
              </Link>
            </div>
            <a
              href="https://github.com/karimoreira/taskboard-java-react-jpa-css-sql-node"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__icon-btn"
              title="Ver no GitHub"
            >
              <FiGithub size={16} />
            </a>
            <div className="navbar__avatar">K</div>
          </div>
        </div>
      </nav>
      <main className="main-content">{children}</main>
    </div>
  );
}

export default Layout;
