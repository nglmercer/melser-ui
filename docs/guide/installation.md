---
title: Instalación
---

# Instalación

Esta guía cubre todas las formas de instalar y configurar Melser UI en tu proyecto.

## Requisitos Previos

- Node.js 16+ 
- Un proyecto moderno que soporte ES modules
- Navegador con soporte para Custom Elements y Shadow DOM

## Métodos de Instalación

### NPM

```bash
# Instalar la librería completa
npm install melser-ui

# O instalar componentes individuales
npm install melser-ui components
```

### Yarn

```bash
yarn add melser-ui
```

### CDN

También puedes usar Melser UI directamente desde un CDN:

```html
<!-- Usar ESM.sh -->
<script type="module">
  import 'https://esm.sh/melser-ui';
</script>

<!-- O usar Skypack -->
<script type="module">
  import 'https://cdn.skypack.dev/melser-ui';
</script>
```

## Configuración del Proyecto

### Vite

Si usas Vite, asegúrate de que tu `vite.config.ts` esté configurado correctamente:

```typescript
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'es2019', // Necesario para Custom Elements
  },
  optimizeDeps: {
    include: ['melser-ui'],
  },
});
```

### Webpack

Para Webpack 5:

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
```

## Importación de Componentes

### Importación Completa

```typescript
// Importa todos los componentes
import 'melser-ui';

// O importar tipos
import type { MelserComponent } from 'melser-ui/types';
```

### Importación Individual

```typescript
// Importar componentes específicos
import 'melser-ui/components/melser-checkbox.js';
import 'melser-ui/components/base-input.js';

// Esto es más eficiente si solo usas algunos componentes
```

### Importación con Bundle

```typescript
// Agrupar importaciones para mejor tree-shaking
import {
  MelserCheckbox,
  MelserTextInput,
  MelserButton
} from 'melser-ui/components';

// Registrar manualmente si es necesario
import { registerComponents } from 'melser-ui/utils/registration';

registerComponents({
  'melser-checkbox': MelserCheckbox,
  'base-input': MelserTextInput
});
```

## Configuración de TypeScript

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "moduleResolution": "bundler",
    "types": ["vite/client"]
  }
}
```

### Declaración de Tipos

```typescript
// src/global.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    'melser-checkbox': any;
    'base-input': any;
    // Agregar otros componentes aquí
  }
}
```

## Ejemplo de Proyecto Completo

### package.json

```json
{
  "name": "mi-proyecto-melser",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "melser-ui": "^1.0.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "typescript": "^5.0.0"
  }
}
```

### index.html

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi App con Melser UI</title>
</head>
<body>
  <div id="app">
    <melser-checkbox id="accept" label="Acepto los términos"></melser-checkbox>
    <button  id="submit" variant="primary">Enviar</button >
  </div>
  
  <script type="module">
    import 'melser-ui';
    
    const submitBtn = document.getElementById('submit');
    const checkbox = document.getElementById('accept');
    
    submitBtn?.addEventListener('click', () => {
      if (checkbox?.checked) {
        alert('¡Formulario enviado!');
      } else {
        alert('Por favor acepta los términos');
      }
    });
  </script>
</body>
</html>
```

## Resolución de Problemas

### Error: "Custom element with name '...' has already been used"

```javascript
// Asegúrate de no registrar el mismo componente múltiples veces
// Importa los componentes una sola vez en tu aplicación
```

### Componentes no se renderizan

```javascript
// Verifica que los componentes estén importados correctamente
import 'melser-ui/components/melser-checkbox.js';

// Y que el custom element esté disponible
console.log(customElements.get('melser-checkbox')); // Debe existir
```

### Estilos no se aplican

```css
/* Asegúrate de incluir los estilos base */
@import 'melser-ui/styles/theme.css';

/* O importa estilos específicos */
@import 'melser-ui/styles/components/checkbox.css';
```

## Verificación de la Instalación

Para verificar que todo esté funcionando:

```javascript
// En la consola del navegador
console.log('Melser UI loaded:', !!window.customElements.get('melser-checkbox'));
```

Si todo está correcto, deberías ver `true` en la consola.
