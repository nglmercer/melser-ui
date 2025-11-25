// Importar estilos globales
import './styles/theme.css';

// Importar todos los componentes desde el punto de entrada principal
import './index';

// Los componentes ya están registrados automáticamente a través de los imports en index.ts

// Sistema de sincronización de temas para componentes
if (typeof window !== 'undefined') {
  // Función para aplicar tema a los componentes
    const applyThemeToComponents = (theme) => {
    // 1. Establecer en el root (HTML) siempre
    document.documentElement.setAttribute('data-theme', theme);
    console.log(`Applied ${theme} theme to Melser UI components`);
  };

  // Escuchar cambios de tema
  document.addEventListener('theme-changed', (event) => {
    const { theme } = event.detail;
    applyThemeToComponents(theme);
  });

  // Detectar tema inicial
  const detectInitialTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 
                        (document.documentElement.classList.contains('dark') ? 'dark' : 'light') ||
                        (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    applyThemeToComponents(currentTheme);
  };

  // Aplicar tema cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', detectInitialTheme);
  } else {
    detectInitialTheme();
  }

  // Exponer función globalmente para pruebas
  window.applyMelserTheme = applyThemeToComponents;
}
