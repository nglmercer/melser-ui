import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  title: 'Melser UI',
  description: 'Una colección de componentes web elegantes construidos con Lit',
  lang: 'es-ES',
  vue: {
    template: {
      compilerOptions: {
        // Le dice a Vue que cualquier etiqueta que empiece con "me-" es un Custom Element
        isCustomElement: (tag) => tag.startsWith('me-') || tag.startsWith('base-')
      }
    }
  },
  // Integración de la configuración de Vite (Alias) dentro de VitePress
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../src', import.meta.url)),
        '@/components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@/core': fileURLToPath(new URL('../src/core', import.meta.url)),
        '@/styles': fileURLToPath(new URL('../src/styles', import.meta.url)),
        '@/types': fileURLToPath(new URL('../src/types', import.meta.url)),
        '@/utils': fileURLToPath(new URL('../src/utils', import.meta.url))
      }
    }
  },

  themeConfig: {
    logo: '/vite.svg',

    nav: [
      { text: 'Guía', link: '/guide/getting-started' },
      { text: 'Componentes', link: '/components/overview' }
    ],

    // CAMBIO IMPORTANTE: Usar un Array [] en lugar de un Objeto {}
    // para que se muestre todo junto siempre.
    sidebar: [
      // --- Sección de Guía ---
      {
        text: 'Introducción',
        collapsed: false,
        items: [
          { text: 'Empezar', link: '/guide/getting-started' },
          { text: 'Instalación', link: '/guide/installation' },
          { text: 'Alias @/', link: '/guide/aliases' },
          { text: 'Sistema de Temas', link: '/guide/theming' }
        ]
      },
      // --- Sección de Componentes ---
      {
        text: 'Visión General',
        collapsed: false,
        items: [
          { text: 'Lista de Componentes', link: '/components/overview' }
        ]
      },
      {
        text: 'Entrada de Texto',
        collapsed: true,
        items: [
          { text: 'MelserTextInput', link: '/components/text-input' },
          { text: 'MelserTextarea', link: '/components/textarea' },
          { text: 'MelserPasswordInput', link: '/components/password-input' },
          { text: 'MelserNumberInput', link: '/components/number-input' }
        ]
      },
      {
        text: 'Selectores',
        collapsed: true,
        items: [
          { text: 'MelserSelect', link: '/components/select' },
          { text: 'MelserMultiSelect', link: '/components/multi-select' },
          { text: 'MelserCombobox', link: '/components/combobox' },
          { text: 'MelserRadioGroup', link: '/components/radio-group' }
        ]
      },
      {
        text: 'Casillas y Switches',
        collapsed: true,
        items: [
          { text: 'MelserCheckbox', link: '/components/checkbox' },
          { text: 'MelserSwitch', link: '/components/switch' }
        ]
      },
      {
        text: 'Entrada Especializada',
        collapsed: true,
        items: [
          { text: 'MelserFileUpload', link: '/components/file-upload' },
          { text: 'MelserDatePicker', link: '/components/date-picker' },
          { text: 'MelserTimePicker', link: '/components/time-picker' },
          { text: 'MelserColorPicker', link: '/components/color-picker' },
          { text: 'MelserRating', link: '/components/rating' },
          { text: 'MelserOtpInput', link: '/components/otp-input' },
          { text: 'MelserTagsInput', link: '/components/tags-input' }
        ]
      },
      {
        text: 'Controles de Rango',
        collapsed: true,
        items: [
          { text: 'MelserRange', link: '/components/range' },
          { text: 'MelserDualRange', link: '/components/dual-range' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/nglmercer/me-ui' }
    ],

    editLink: {
      pattern: 'https://github.com/nglmercer/me-ui/edit/main/docs/:path',
      text: 'Editar esta página en GitHub'
    },

    docFooter: {
      prev: 'Anterior',
      next: 'Siguiente'
    },

    outline: {
      label: 'En esta página',
      level: 'deep'
    }
  },
  base: '/me-ui/'
})