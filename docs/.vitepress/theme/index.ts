// docs/.vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import './docs.css' // Aquí pondremos tus variables CSS

export default {
  extends: DefaultTheme,
  //@ts-ignore
  async enhanceApp({ app }) {
    // @ts-ignore
    if (!import.meta.env.SSR) {
      try {
        // Importamos todo desde tu index.ts principal
        // Asegúrate que la ruta relativa apunte a tu src/index.ts
        const MelserUI = await import('../../../src/web.js')
        
        console.log('Melser UI Components Registered!',MelserUI);
      } catch (e) {
        console.error('Error loading Melser UI:', e);
      }
    }
  }
}