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

#### Display de Datos

- **[DataTable](./data-table)** - Tabla de datos avanzada con paginación y ordenamiento

## Ejemplo de Uso de Componentes

Todos los componentes siguen el mismo patrón de uso:

```html
<!-- Componente básico -->
<me-checkbox label="Opción simple"></me-checkbox>

<!-- Con propiedades -->
<base-input
  label="Nombre de usuario"
  placeholder="Ingresa tu usuario"
  required
  minlength="3"
>
</base-input>

<!-- Con eventos -->
<button id="submit-btn" variant="primary" disabled>Guardar</button>
```

```javascript
// Escuchar eventos
const button = document.getElementById("submit-btn");
button?.addEventListener("click", (event) => {
  console.log("Botón clickeado:", event);
});
```

## Características Comunes

### Propiedades Shared

Todos los componentes comparten estas propiedades:

| Propiedad  | Tipo      | Descripción                |
| ---------- | --------- | -------------------------- |
| `disabled` | `boolean` | Deshabilita la interacción |
| `required` | `boolean` | Marca como campo requerido |
| `value`    | `string`  | Valor del componente       |
| `name`     | `string`  | Nombre para formularios    |

### Eventos Comunes

| Evento   | Descripción                       |
| -------- | --------------------------------- |
| `input`  | Se dispara cuando cambia el valor |
| `change` | Se dispara al confirmar el cambio |
| `focus`  | Se dispara al obtener el foco     |
| `blur`   | Se dispara al perder el foco      |

### Estados Visuales

- **Normal** - Estado por defecto
- **Hover** - Al pasar el cursor
- **Focus** - Al obtener el foco (teclado)
- **Disabled** - Estado deshabilitado
- **Error** - Estado de error/validación fallida

## Compatibilidad de Navegadores

| Navegador | Versión Mínima |
| --------- | -------------- |
| Chrome    | 88+            |
| Firefox   | 89+            |
| Safari    | 14.1+          |
| Edge      | 88+            |

## Ejemplo Interactivo

Aquí puedes probar algunos componentes en tiempo real:

### Ejemplo de Formulario

```html
<form id="demo-form">
  <base-input
    label="Email"
    type="email"
    placeholder="tu@email.com"
    id="email-input"
    required
  >
  </base-input>

  <me-password-input
    label="Contraseña"
    placeholder="Mínimo 8 caracteres"
    minlength="8"
    id="password-input"
    required
  >
  </me-password-input>

  <me-checkbox label="Recordarme" id="remember-checkbox"> </me-checkbox>

  <button variant="primary" type="submit" id="submit-btn">
    Iniciar Sesión
  </button>
</form>
```

### Demo de Componentes en Acción

<base-input id="demo-name" label="Nombre" placeholder="Tu nombre aquí"></base-input>

<me-select id="demo-select" label="Selecciona una opción">
  <option value="opcion1">Opción 1</option>
  <option value="opcion2">Opción 2</option>
  <option value="opcion3">Opción 3</option>
</me-select>

<me-rating id="demo-rating" label="Califica este servicio" max="5"></me-rating>

<button  id="demo-form-btn" variant="outline" type="submit">Probar Formulario</button >

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
button {
  --me-primary-color: #3b82f6;
  --me-border-radius: 6px;
  --me-padding: 8px 16px;
}
```

Consulta la [guía de aliases](../guide/aliases) para más detalles sobre configuración.

## Próximos Pasos

- [Instalación detallada](../guide/installation)
- [Personalizar el tema](../guide/aliases)
- [Guías específicas de componentes](./checkbox)
