import { useEffect, useState } from 'react';
import { loadMarkdown } from './utils/markdown-loader';

function App() {
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Detectar preferencia guardada o preferencia del sistema
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    
    setDarkMode(isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    const loadContent = async () => {
      const content = await loadMarkdown();
      setHtml(content);
      setLoading(false);
    };
    loadContent();
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.setAttribute('data-theme', newDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  const navStyle = {
    borderBottom: 'var(--border-color) 2px solid',
    padding: '0',
    background: 'var(--nav-bg)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 12px var(--shadow-color)',
  };

  const navContentStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: '700',
    margin: 0,
    background: 'linear-gradient(135deg, #001F3F 0%, #0066cc 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const toggleButtonStyle = {
    background: 'none',
    border: '2px solid var(--border-color)',
    borderRadius: '8px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'all 0.3s ease',
    color: 'var(--text-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const mainStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '60px 20px 40px',
    minHeight: 'calc(100vh - 280px)',
  };

  const contentStyle = {
    background: 'var(--bg-secondary)',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 16px var(--shadow-color)',
  };

  const loadingStyle = {
    textAlign: 'center',
    padding: '40px',
    color: 'var(--text-secondary)',
    fontSize: '18px',
  };

  const footerStyle = {
    borderTop: '2px solid var(--border-color)',
    padding: '40px 20px',
    textAlign: 'center',
    color: 'var(--text-secondary)',
    background: 'var(--bg-secondary)',
    marginTop: '60px',
  };

  const footerTextStyle = {
    margin: 0,
    fontSize: '14px',
    fontWeight: '500',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <nav style={navStyle}>
        <div style={navContentStyle}>
          <h1 style={titleStyle}>Mi Portafolio</h1>
          <button 
            onClick={toggleDarkMode}
            style={toggleButtonStyle}
            aria-label="Alternar modo oscuro"
            title={darkMode ? 'Modo claro' : 'Modo oscuro'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>

      <main style={mainStyle}>
        {loading ? (
          <div style={loadingStyle}>
            <p>Cargando contenido...</p>
          </div>
        ) : (
          <div style={contentStyle}>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        )}
      </main>

      <footer style={footerStyle}>
        <p style={footerTextStyle}>© 2024 Rodrigo Silva | Portafolio Personal</p>
      </footer>
    </div>
  );
}

export default App;
