# Melser UI

Una librería de componentes web moderna, ligera y altamente personalizable construida con **Lit**, **TypeScript** y **Vite**. Diseñada para ser fácil de usar, accesible y compatible con validadores de esquemas como **Zod**.

## Características

- 🚀 **Web Components Nativos**: Funcionan en cualquier framework (React, Vue, Angular, Svelte, Vanilla JS).
- 🎨 **Theming Potente**: Sistema de variables CSS completo con soporte nativo para modo oscuro.
- 🛡️ **Type-Safe**: Escritos en TypeScript con tipos exportados.
- ✅ **Zod Ready**: Estructura de datos estandarizada (`dataType`) lista para generar esquemas de validación dinámicos.
- 🔧 **Extensible**: Utilidades para registrar componentes con tus propios prefijos.

## Instalación

```bash
npm install melser-ui
```

## Uso Básico

Importa la librería completa o componentes individuales:

```javascript
// Importar todo (registra los componentes automáticamente)
import 'melser-ui';

// O importar utilidades específicas
import { registerComponent, MelserSwitch } from 'melser-ui';
```

Úsalos en tu HTML:

```html
<base-input
  name="username"
  label="Nombre de Usuario"
  placeholder="Escribe tu nombre..."
  required
></base-input>

<melser-switch
  name="notifications"
  label="Activar Notificaciones"
></melser-switch>
```

## Componentes Disponibles

| Componente | Etiqueta HTML | Descripción | Tipo de Dato (`dataType`) |
|------------|---------------|-------------|---------------------------|
| **Text Input** | `<base-input>` | Campo de texto simple (text, email, password, number). | `string` |
| **Textarea** | `<melser-textarea>` | Campo de texto multilínea redimensionable. | `string` |
| **Select** | `<melser-select>` | Lista desplegable nativa estilizada. | `string` |
| **Multi Select** | `<melser-multi-select>` | Selección múltiple nativa. | `array` (`string[]`) |
| **Checkbox** | `<melser-checkbox>` | Casilla de verificación con estilos personalizados. | `boolean` |
| **Radio Group** | `<melser-radio-group>` | Grupo de botones de radio. | `string` |
| **Switch** | `<melser-switch>` | Interruptor estilo toggle. | `boolean` |
| **Range** | `<melser-range>` | Deslizador de rango numérico. | `number` |
| **File Upload** | `<melser-file-upload>` | Zona de carga de archivos con Drag & Drop. | `object` (`File` o `null`) |
| **Tags Input** | `<melser-tags-input>` | Entrada de etiquetas (chips) con soporte para borrar. | `array` (`string[]`) |

### Propiedades Comunes

Todos los componentes heredan de `MelserBaseInput` y comparten estas propiedades:

- `name`: Identificador del campo.
- `label`: Etiqueta visible.
- `required`: Si el campo es obligatorio.
- `disabled`: Si el campo está deshabilitado.
- `errorMessage`: Mensaje de error para mostrar debajo del input.

### Obtención de Datos

Todos los componentes exponen un método `getData()` que devuelve una estructura estandarizada:

```typescript
const input = document.querySelector('base-input');
console.log(input.getData());

// Salida:
{
  name: "username",
  value: "mi_usuario",
  isValid: true,
  componentType: "base-input",
  dataType: "string" // Útil para validación dinámica
}
```

## Personalización (Theming)

Melser UI usa variables CSS. Puedes sobrescribirlas globalmente en `:root` o en un contenedor específico.

### Variables Principales

```css
:root {
  /* Color Primario (HSL) */
  --melser-primary-h: 262;
  --melser-primary-s: 80%;
  --melser-primary-l: 50%; /* Color principal */
  
  /* Estados */
  --melser-error: #d32f2f;
  --melser-success: #2e7d32;

  /* UI */
  --melser-radius: 8px; /* Bordes redondeados */
  --melser-font-family: 'Inter', sans-serif;
}
```

### Modo Oscuro

La librería detecta automáticamente `prefers-color-scheme: dark`. Para forzar el modo oscuro manualmente, añade el atributo `data-theme="dark"`:

```html
<html data-theme="dark">
  <!-- ... -->
</html>
```

## Registro Personalizado

Si necesitas usar nombres de etiqueta diferentes (por ejemplo, para evitar conflictos o usar tu propia marca), usa las utilidades exportadas:

```typescript
import { registerComponent, registerWithPrefix, MelserButton } from 'melser-ui';

// 1. Registrar un componente individual con otro nombre
registerComponent('mi-boton', MelserButton);

// 2. Registrar múltiples componentes con un prefijo
// Esto creará <app-text-input>, <app-select>, etc.
import * as Components from 'melser-ui';
registerWithPrefix('app', Components);
```

## Desarrollo

1.  **Instalar dependencias**: `npm install`
2.  **Servidor de desarrollo**: `npm run dev`
3.  **Verificar tipos**: `npm run type-check`
4.  **Construir librería**: `npm run build`
