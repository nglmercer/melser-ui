import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  title: 'Melser UI',
  // Shared properties
  vue: {
    template: {
      compilerOptions: {
        // Le dice a Vue que cualquier etiqueta que empiece con "me-" es un Custom Element
        isCustomElement: (tag) => tag.startsWith('me-') || tag.startsWith('base-') || tag.startsWith('melser-') || tag.startsWith('data-table-')
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

  // Internationalization
  locales: {
    root: {
      label: 'Español',
      lang: 'es-ES',
      description: 'Una colección de componentes web elegantes construidos con Lit',
      themeConfig: {
        nav: [
          { text: 'Guía', link: '/guide/getting-started' },
          { text: 'Componentes', link: '/components/overview' }
        ],
        sidebar: [
          // --- Sección de Guía ---
          {
            text: 'Introducción',
            collapsed: false,
            items: [
              { text: 'Empezar', link: '/guide/getting-started' },
              { text: 'Instalación', link: '/guide/installation' },
              { text: 'Alias @/', link: '/guide/aliases' },
              { text: 'Sistema de Temas', link: '/guide/theming' },
              { text: 'Formularios Dinámicos', link: '/guide/dynamic-forms' }
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
          },
          {
            text: 'Display de Datos',
            collapsed: true,
            items: [
              { text: 'DataTable', link: '/components/data-table' }
            ]
          }
        ],
        docFooter: {
          prev: 'Anterior',
          next: 'Siguiente'
        },
        outline: {
          label: 'En esta página',
          level: 'deep'
        },
        editLink: {
          pattern: 'https://github.com/nglmercer/melser-ui/edit/main/docs/:path',
          text: 'Editar esta página en GitHub'
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      description: 'Elegant Web Components built with Lit',
      themeConfig: {
        nav: [
            { text: 'Guide', link: '/en/guide/getting-started' },
            { text: 'Components', link: '/en/components/overview' }
        ],
        sidebar: [
             {
                text: 'Introduction',
                items: [
                    { text: 'Getting Started', link: '/en/guide/getting-started' },
                    { text: 'Installation', link: '/en/guide/installation' },
                    { text: '@ Aliases', link: '/en/guide/aliases' },
                    { text: 'Theming System', link: '/en/guide/theming' },
                    { text: 'Dynamic Forms', link: '/en/guide/dynamic-forms' }
                ]
             },
             {
                text: 'Components',
                items: [
                    { text: 'Overview', link: '/en/components/overview' }
                ]
             },
             {
                text: 'Text Input',
                collapsed: true,
                items: [
                  { text: 'MelserTextInput', link: '/en/components/text-input' },
                  { text: 'MelserTextarea', link: '/en/components/textarea' },
                  { text: 'MelserPasswordInput', link: '/en/components/password-input' },
                  { text: 'MelserNumberInput', link: '/en/components/number-input' }
                ]
              },
              {
                text: 'Selectors',
                collapsed: true,
                items: [
                  { text: 'MelserSelect', link: '/en/components/select' },
                  { text: 'MelserMultiSelect', link: '/en/components/multi-select' },
                  { text: 'MelserCombobox', link: '/en/components/combobox' },
                  { text: 'MelserRadioGroup', link: '/en/components/radio-group' }
                ]
              },
              {
                text: 'Checkboxes & Switches',
                collapsed: true,
                items: [
                  { text: 'MelserCheckbox', link: '/en/components/checkbox' },
                  { text: 'MelserSwitch', link: '/en/components/switch' }
                ]
              },
              {
                text: 'Specialized Input',
                collapsed: true,
                items: [
                  { text: 'MelserFileUpload', link: '/en/components/file-upload' },
                  { text: 'MelserDatePicker', link: '/en/components/date-picker' },
                  { text: 'MelserTimePicker', link: '/en/components/time-picker' },
                  { text: 'MelserColorPicker', link: '/en/components/color-picker' },
                  { text: 'MelserRating', link: '/en/components/rating' },
                  { text: 'MelserOtpInput', link: '/en/components/otp-input' },
                  { text: 'MelserTagsInput', link: '/en/components/tags-input' }
                ]
              },
              {
                text: 'Range Controls',
                collapsed: true,
                items: [
                  { text: 'MelserRange', link: '/en/components/range' },
                  { text: 'MelserDualRange', link: '/en/components/dual-range' }
                ]
              },
              {
                text: 'Data Display',
                collapsed: true,
                items: [
                  { text: 'DataTable', link: '/en/components/data-table' }
                ]
              }
        ],
        docFooter: { prev: 'Previous', next: 'Next' },
        outline: { label: 'On this page', level: 'deep' },
        editLink: {
          pattern: 'https://github.com/nglmercer/melser-ui/edit/main/docs/:path',
          text: 'Edit this page on GitHub'
        }
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      description: '使用 Lit 构建的优雅 Web 组件',
      themeConfig: {
        nav: [
            { text: '指南', link: '/zh/guide/getting-started' },
            { text: '组件', link: '/zh/components/overview' }
        ],
        sidebar: [
            {
                text: '介绍',
                items: [
                    { text: '开始使用', link: '/zh/guide/getting-started' },
                    { text: '安装', link: '/zh/guide/installation' },
                    { text: '@ 别名', link: '/zh/guide/aliases' },
                    { text: '主题系统', link: '/zh/guide/theming' },
                    { text: '动态表单', link: '/zh/guide/dynamic-forms' }
                ]
             },
             {
                text: '组件',
                items: [
                    { text: '概览', link: '/zh/components/overview' }
                ]
             },
             {
                text: '文本输入',
                collapsed: true,
                items: [
                  { text: 'MelserTextInput', link: '/zh/components/text-input' },
                  { text: 'MelserTextarea', link: '/zh/components/textarea' },
                  { text: 'MelserPasswordInput', link: '/zh/components/password-input' },
                  { text: 'MelserNumberInput', link: '/zh/components/number-input' }
                ]
              },
              {
                text: '选择器',
                collapsed: true,
                items: [
                  { text: 'MelserSelect', link: '/zh/components/select' },
                  { text: 'MelserMultiSelect', link: '/zh/components/multi-select' },
                  { text: 'MelserCombobox', link: '/zh/components/combobox' },
                  { text: 'MelserRadioGroup', link: '/zh/components/radio-group' }
                ]
              },
              {
                text: '复选框和开关',
                collapsed: true,
                items: [
                  { text: 'MelserCheckbox', link: '/zh/components/checkbox' },
                  { text: 'MelserSwitch', link: '/zh/components/switch' }
                ]
              },
              {
                text: '专用输入',
                collapsed: true,
                items: [
                  { text: 'MelserFileUpload', link: '/zh/components/file-upload' },
                  { text: 'MelserDatePicker', link: '/zh/components/date-picker' },
                  { text: 'MelserTimePicker', link: '/zh/components/time-picker' },
                  { text: 'MelserColorPicker', link: '/zh/components/color-picker' },
                  { text: 'MelserRating', link: '/zh/components/rating' },
                  { text: 'MelserOtpInput', link: '/zh/components/otp-input' },
                  { text: 'MelserTagsInput', link: '/zh/components/tags-input' }
                ]
              },
              {
                text: '范围控制',
                collapsed: true,
                items: [
                  { text: 'MelserRange', link: '/zh/components/range' },
                  { text: 'MelserDualRange', link: '/zh/components/dual-range' }
                ]
              },
              {
                text: '数据显示',
                collapsed: true,
                items: [
                  { text: 'DataTable', link: '/zh/components/data-table' }
                ]
              }
        ],
        docFooter: { prev: '上一页', next: '下一页' },
        outline: { label: '本页内容', level: 'deep' },
        editLink: {
          pattern: 'https://github.com/nglmercer/melser-ui/edit/main/docs/:path',
          text: '在 GitHub 上编辑此页'
        }
      }
    }
  },

  themeConfig: {
    logo: '/vite.svg',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/nglmercer/melser-ui' }
    ],
  },
  base: '/melser-ui/'
})