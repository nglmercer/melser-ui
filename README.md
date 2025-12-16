# Melser UI 🎨

Una colección moderna de componentes web construidos con [Lit](https://lit.dev/), TypeScript y CSS moderno. Diseñados para ser rápidos, ligeros y totalmente personalizables.

## ✨ Características

- **⚡ Rápido y Ligero**: Construido con Lit para máximo rendimiento
- **🎨 Diseño Modular**: Tema CSS personalizable con variables CSS modernas
- **🔧 TypeScript**: Tipado completo para una mejor experiencia de desarrollo
- **📱 Responsive**: Diseñado para todos los dispositivos y tamaños de pantalla
- **♿ Accesible**: Cumple con estándares de accesibilidad WCAG
- **🎯 Sin Dependencias**: Componentes puros sin frameworks pesados

## 🚀 Instalación

```bash
npm install melser-ui
```

## 📦 Uso

### Opción 1: Registrar todos los componentes a la vez

```typescript
import { registerComponents } from 'melser-ui';

// Registrar todos los componentes con prefijo 'me-'
registerComponents();
```

### Opción 2: Registrar componentes individualmente

```typescript
import { registerComponent, MelserTextInput, MelserCheckbox, MelserSelect } from 'melser-ui';

// Registrar componentes específicos con nombres personalizados
registerComponent('me-text-input', MelserTextInput);
registerComponent('me-checkbox', MelserCheckbox);
registerComponent('me-select', MelserSelect);
```

### Opción 3: Importar componentes específicos

```typescript
// Importar solo los componentes que necesitas
import 'melser-ui/components/melser-checkbox';
import 'melser-ui/components/melser-text-input';
import 'melser-ui/components/melser-select';
```

### Uso en HTML

```html
<!-- Checkbox -->
<me-checkbox label="Acepto los términos" checked></me-checkbox>

<!-- Input de texto -->
<me-text-input label="Nombre" placeholder="Ingresa tu nombre"></me-text-input>

<!-- Radio group -->
<me-radio-group label="Opciones" options='["Opción 1", "Opción 2", "Opción 3"]'></me-radio-group>

<!-- Select -->
<me-select label="Ciudad" options='["Lima", "Arequipa", "Trujillo"]'></me-select>
```

## 🎨 Personalización

Los componentes utilizan variables CSS para facilitar la personalización:

```css
:root {
  --me-primary-color: #007bff;
  --me-secondary-color: #6c757d;
  --me-border-radius: 8px;
  --me-font-family: 'Arial', sans-serif;
}
```

## 📚 Documentación

Visita nuestra documentación completa en https://nglmercer.github.io/melser-ui/ o ejecuta localmente:

```bash
npm run dev:docs
```

## 🧪 Desarrollo

### Configuración del proyecto

```bash
# Clonar el repositorio
git clone https://github.com/nglmercer/melser-ui.git
cd melser-ui

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Ejecutar tests
npm run test

# Construir para producción
npm run build
```

### Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye los componentes para producción
- `npm run dev:docs` - Inicia el servidor de documentación
- `npm run build:docs` - Construye la documentación
- `npm run preview:docs` - Previsualiza la documentación construida

## 📋 Componentes Disponibles

### Form Controls
- ✅ [`<me-checkbox>`](src/components/melser-checkbox.ts) - Checkbox con etiqueta
- ✅ [`<me-text-input>`](src/components/base-input.ts) - Input de texto
- ✅ [`<me-number-input>`](src/components/melser-number-input.ts) - Input numérico
- ✅ [`<me-password-input>`](src/components/melser-password-input.ts) - Input de contraseña
- ✅ [`<me-textarea>`](src/components/melser-textarea.ts) - Área de texto
- ✅ [`<me-select>`](src/components/melser-select.ts) - Selector desplegable
- ✅ [`<me-multi-select>`](src/components/melser-multi-select.ts) - Selector múltiple
- ✅ [`<me-radio-group>`](src/components/melser-radio-group.ts) - Grupo de radio buttons
- ✅ [`<me-switch>`](src/components/melser-switch.ts) - Interruptor toggle
- ✅ [`<me-range>`](src/components/melser-range.ts) - Slider de rango
- ✅ [`<me-dual-range>`](src/components/melser-dual-range.ts) - Slider de rango dual

### Input Avanzados
- ✅ [`<me-combobox>`](src/components/melser-combobox.ts) - Combobox con autocompletado
- ✅ [`<me-tags-input>`](src/components/melser-tags-input.ts) - Input de etiquetas
- ✅ [`<me-otp-input>`](src/components/melser-otp-input.ts) - Input para códigos OTP
- ✅ [`<me-date-picker>`](src/components/melser-date-picker.ts) - Selector de fecha
- ✅ [`<me-time-picker>`](src/components/melser-time-picker.ts) - Selector de hora
- ✅ [`<me-color-picker>`](src/components/melser-color-picker.ts) - Selector de color
- ✅ [`<me-file-upload>`](src/components/melser-file-upload.ts) - Carga de archivos
- ✅ [`<me-rating>`](src/components/melser-rating.ts) - Sistema de calificación

### Formularios
- ✅ [`<me-example-form>`](src/components/melser-example-form.ts) - Formulario de ejemplo
- ✅ [`<me-playground-form>`](src/components/melser-playground-form.ts) - Playground interactivo
- ✅ [`<me-schema-form>`](src/components/melser-schema-form.ts) - Formulario basado en esquema

## 🔧 API

### Props comunes
Todos los componentes de formulario comparten estas propiedades:

```typescript
interface BaseProps {
  label?: string;           // Etiqueta del campo
  placeholder?: string;     // Texto placeholder
  required?: boolean;       // Si es requerido
  disabled?: boolean;       // Si está deshabilitado
  readonly?: boolean;       // Solo lectura
  value?: any;             // Valor del campo
  name?: string;           // Nombre del campo
  id?: string;             // ID del elemento
  class?: string;          // Clases CSS
  style?: string;          // Estilos inline
}
```

### Eventos comunes
```typescript
// Todos los componentes emiten estos eventos
@event('change') onChange: (event: CustomEvent) => void
@event('input') onInput: (event: CustomEvent) => void
@event('focus') onFocus: (event: CustomEvent) => void
@event('blur') onBlur: (event: CustomEvent) => void
```

## 🎯 Ejemplos

### Formulario completo

```html
<form id="miFormulario">
  <me-text-input 
    label="Nombre completo" 
    name="nombre" 
    required
    placeholder="Juan Pérez">
  </me-text-input>

  <base-input 
    label="Correo electrónico" 
    name="email" 
    required
    placeholder="juan@ejemplo.com">
  </base-input>

  <me-select 
    label="País" 
    name="pais" 
    options='["Perú", "Chile", "Argentina", "Colombia"]'>
  </me-select>

  <me-checkbox 
    label="Acepto términos y condiciones" 
    name="terminos" 
    required>
  </me-checkbox>

  <me-radio-group 
    label="Género" 
    name="genero" 
    options='["Masculino", "Femenino", "Otro"]'>
  </me-radio-group>

  <button type="submit">Enviar</button>
</form>
```

### Con TypeScript

```typescript
import { MelserCheckbox } from 'melser-ui/components/melser-checkbox';

const checkbox = document.querySelector('me-checkbox') as MelserCheckbox;
checkbox.addEventListener('change', (e) => {
  console.log('Checkbox cambiado:', e.detail.checked);
});
```

## 🌟 Temas

El sistema incluye un tema base que puede ser personalizado:

```css
/* Tema oscuro */
[data-theme="dark"] {
  --me-background: #1a1a1a;
  --me-surface: #2d2d2d;
  --me-text: #ffffff;
  --me-text-secondary: #b0b0b0;
}

/* Tema personalizado */
[data-theme="custom"] {
  --me-primary: #ff6b6b;
  --me-secondary: #4ecdc4;
  --me-border-radius: 12px;
}
```

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👥 Autor

- **nglmercer** - [GitHub](https://github.com/nglmercer)

## 🙏 Agradecimientos

- [Lit](https://lit.dev/) - Por el excelente framework de componentes web
- [Vite](https://vitejs.dev/) - Por el rápido bundler y servidor de desarrollo
- [TypeScript](https://www.typescriptlang.org/) - Por el tipado estático

---


**⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub!**
