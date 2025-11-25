// Importar estilos globales
import './styles/theme.css';

import './index';

if (typeof window !== 'undefined') {
    const applyThemeToComponents = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    console.log(`Applied ${theme}`);
  };


  const htmlElement = document.documentElement;
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const isDark = htmlElement.classList.contains('dark');
        applyThemeToComponents(isDark ? 'dark' : 'light');
      }
    });
  });

  observer.observe(htmlElement, { attributes: true });
  const detectInitialTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 
                        (document.documentElement.classList.contains('dark') ? 'dark' : 'light') ||
                        (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    applyThemeToComponents(currentTheme);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', detectInitialTheme);
  } else {
    detectInitialTheme();
  }
}
