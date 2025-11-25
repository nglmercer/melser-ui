---
title: Visión General de Componentes
---

# Visión General de Componentes

Melser UI incluye una amplia gama de componentes web modernos y accesibles. Todos los componentes están construidos con Lit y siguen las mejores prácticas de desarrollo web.

## Lista de Componentes Disponibles

### Formularios y Entrada de Datos

#### Entrada de Texto
- **[MelserTextInput](./text-input)** - Campo de texto con validación y estados
- **[MelserTextarea](./textarea)** - Área de texto multi-línea
- **[MelserPasswordInput](./password-input)** - Campo de contraseña con toggle de visibilidad
- **[MelserNumberInput](./number-input)** - Campo numérico con controles de incremento

#### Selectores
- **[MelserSelect](./select)** - Selector desplegable simple
- **[MelserMultiSelect](./multi-select)** - Selector múltiple con búsqueda
- **[MelserCombobox](./combobox)** - Combo box con autocompletado
- **[MelserCheckbox](./checkbox)** - Casilla de verificación
- **[MelserRadioGroup](./radio-group)** - Grupo de botones radio

#### Entrada Especializada
- **[MelserFileUpload](./file-upload)** - Subida de archivos con drag & drop
- **[MelserDatePicker](./date-picker)** - Selector de fecha
- **[MelserTimePicker](./time-picker)** - Selector de hora
- **[MelserColorPicker](./color-picker)** - Selector de color
- **[MelserRating](./rating)** - Calificación con estrellas
- **[MelserOtpInput](./otp-input)** - Entrada de código OTP
- **[MelserTagsInput](./tags-input)** - Entrada de etiquetas

#### Controles de Rango
- **[MelserRange](./range)** - Slider para rangos numéricos
- **[MelserDualRange](./dual-range)** - Slider con dos valores (min-max)

#### Controles Especiales
- **[MelserSwitch](./switch)** - Interruptor toggle

## Ejemplo de Uso de Componentes

Todos los componentes siguen el mismo patrón de uso:

```html
<!-- Componente básico -->
<melser-checkbox label="Opción simple"></melser-checkbox>

<!-- Con propiedades -->
<melser-text-input 
  label="Nombre de usuario" 
  placeholder="Ingresa tu usuario"
  required
  minlength="3">
</melser-text-input>

<!-- Con eventos -->
<melser-button 
  id="submit-btn" 
  variant="primary" 
  disabled>
  Guardar
</melser-button>
```

```javascript
// Escuchar eventos
const button = document.getElementById('submit-btn');
button?.addEventListener('click', (event) => {
  console.log('Botón clickeado:', event);
});
```

## Características Comunes

### Propiedades Shared

Todos los componentes comparten estas propiedades:

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `disabled` | `boolean` | Deshabilita la interacción |
| `required` | `boolean` | Marca como campo requerido |
| `value` | `string` | Valor del componente |
| `name` | `string` | Nombre para formularios |

### Eventos Comunes

| Evento | Descripción |
|--------|-------------|
| `input` | Se dispara cuando cambia el valor |
| `change` | Se dispara al confirmar el cambio |
| `focus` | Se dispara al obtener el foco |
| `blur` | Se dispara al perder el foco |

### Estados Visuales

- **Normal** - Estado por defecto
- **Hover** - Al pasar el cursor
- **Focus** - Al obtener el foco (teclado)
- **Disabled** - Estado deshabilitado
- **Error** - Estado de error/validación fallida

## Compatibilidad de Navegadores

| Navegador | Versión Mínima |
|-----------|----------------|
| Chrome | 88+ |
| Firefox | 89+ |
| Safari | 14.1+ |
| Edge | 88+ |

## Ejemplo Interactivo

Aquí puedes probar algunos componentes en tiempo real:

### Ejemplo de Formulario

```html
<form id="demo-form">
  <melser-text-input 
    label="Email" 
    type="email" 
    placeholder="tu@email.com"
    id="email-input"
    required>
  </melser-text-input>
  
  <melser-password-input 
    label="Contraseña" 
    placeholder="Mínimo 8 caracteres"
    minlength="8"
    id="password-input"
    required>
  </melser-password-input>
  
  <melser-checkbox 
    label="Recordarme" 
    id="remember-checkbox">
  </melser-checkbox>
  
  <melser-button 
    variant="primary" 
    type="submit"
    id="submit-btn">
    Iniciar Sesión
  </melser-button>
</form>
```

### Demo de Componentes en Acción

<melser-text-input id="demo-name" label="Nombre" placeholder="Tu nombre aquí"></melser-text-input>

<melser-select id="demo-select" label="Selecciona una opción">
  <option value="opcion1">Opción 1</option>
  <option value="opcion2">Opción 2</option>
  <option value="opcion3">Opción 3</option>
</melser-select>

<melser-rating id="demo-rating" label="Califica este servicio" max="5"></melser-rating>

<melser-button id="demo-form-btn" variant="outline">Probar Formulario</melser-button>

<div id="demo-result" style="margin-top: 1rem; padding: 0.5rem; background: #f5f5f5; border-radius: 4px; display: none;">
  <strong>Valores del formulario:</strong>
  <div id="demo-values"></div>
</div>


## Accesibilidad

Todos los componentes de Melser UI están diseñados con accesibilidad en mente:

- **ARIA labels** apropiados
- **Navegación por teclado** completa
- **Focus management** correcto
- **Screen reader** compatibility
- **High contrast** support

## Personalización

Los componentes usan **CSS Custom Properties** para facilitar la personalización:

```css
melser-button {
  --melser-primary-color: #3b82f6;
  --melser-border-radius: 6px;
  --melser-padding: 8px 16px;
}
```

Consulta la [guía de personalización](../guide/theming) para más detalles.

## Próximos Pasos

- [Instalación detallada](./installation)
- [Personalizar el tema](../guide/theming)
- [Guías específicas de componentes](./checkbox)