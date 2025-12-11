---
title: MelserDatePicker
---

# MelserDatePicker

Un componente de selección de fechas avanzado con calendario, validación de rangos, localización y múltiples formatos.

## Ejemplo Básico

```html
<me-date-picker label="Selecciona una fecha" placeholder="dd/mm/yyyy">
</me-date-picker>
```

## Demo Interactivo

<me-date-picker 
  id="demo-basic" 
  label="Fecha básica" 
  placeholder="Selecciona una fecha">
</me-date-picker>

<me-date-picker 
  id="demo-min-max" 
  label="Con rango (2020-2030)" 
  min="2020-01-01"
  max="2030-12-31"
  placeholder="Entre 2020 y 2030">
</me-date-picker>

<me-date-picker 
  id="demo-range" 
  label="Selector de rango" 
  mode="range"
  placeholder="Selecciona un rango">
</me-date-picker>

<me-date-picker 
  id="demo-locale" 
  label="Fecha en español" 
  locale="es"
  placeholder="Selecciona una fecha">
</me-date-picker>

<h3>Colores</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-date-picker label="Success" color="success" placeholder="Success" value="2024-01-01"></me-date-picker>
  <me-date-picker label="Warning" color="warning" placeholder="Warning" value="2024-01-01"></me-date-picker>
  <me-date-picker label="Danger" color="danger" placeholder="Danger" value="2024-01-01"></me-date-picker>
</div>

## Propiedades

| Propiedad           | Tipo                                              | Valor por Defecto | Descripción                                  |
| :------------------ | :------------------------------------------------ | :---------------- | :------------------------------------------- |
| `value`             | `string`                                          | `''`              | Fecha seleccionada (YYYY-MM-DD)              |
| `min`               | `string`                                          | `''`              | Fecha mínima permitida                       |
| `max`               | `string`                                          | `''`              | Fecha máxima permitida                       |
| `disabled`          | `boolean`                                         | `false`           | Deshabilita la interacción                   |
| `required`          | `boolean`                                         | `false`           | Campo requerido en formularios               |
| `readonly`          | `boolean`                                         | `false`           | Solo lectura                                 |
| `placeholder`       | `string`                                          | `''`              | Texto de marcador de posición                |
| `format`            | `string`                                          | `'YYYY-MM-DD'`    | Formato de fecha                             |
| `locale`            | `string`                                          | `'en'`            | Localización del calendario                  |
| `mode`              | `'single' \| 'range' \| 'multiple'`               | `'single'`        | Modo de selección                            |
| `view`              | `'day' \| 'month' \| 'year'`                      | `'day'`           | Vista inicial                                |
| `color`             | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'`       | Esquema de color del estado.                 |
| `first-day-of-week` | `number`                                          | `0`               | Primer día de la semana (0=Domingo, 1=Lunes) |
| `show-today`        | `boolean`                                         | `true`            | Muestra botón "Hoy"                          |
| `show-clear`        | `boolean`                                         | `true`            | Muestra botón "Limpiar"                      |
| `label`             | `string`                                          | `''`              | Etiqueta visible del campo                   |

## Eventos

| Evento            | Descripción                                 |
| :---------------- | :------------------------------------------ |
| `change`          | Se dispara al cambiar la fecha              |
| `focus`           | Se dispara al obtener el foco               |
| `blur`            | Se dispara al perder el foco                |
| `range-change`    | Se dispara al cambiar el rango (modo range) |
| `multiple-change` | Se dispara al cambiar múltiples fechas      |
| `view-change`     | Se dispara al cambiar la vista              |

## Ejemplos de Uso

### Selector de Rango de Fechas

```html
<me-date-picker
  label="Período de viaje"
  name="travelPeriod"
  mode="range"
  placeholder="Desde - Hasta"
  show-clear
  hint="Selecciona inicio y fin"
>
</me-date-picker>
```

### Selector con Restricciones

```html
<me-date-picker
  label="Fecha de cita"
  name="appointmentDate"
  required
  min="today"
  max="2024-12-31"
  locale="es"
  first-day-of-week="1"
>
</me-date-picker>
```

### Configuración Avanzada de Localización

```javascript
const picker = document.querySelector("me-date-picker");
picker.locale = "es";
picker.firstDayOfWeek = 1;
picker.format = "DD/MM/YYYY";
picker.addEventListener("view-change", (e) => {
  console.log("Vista cambiada a:", e.detail.view);
});
```

## Integración con Formularios

```html
<form id="booking-form">
  <me-date-picker
    label="Check-in *"
    name="checkIn"
    required
    min="today"
  ></me-date-picker>

  <me-date-picker label="Check-out *" name="checkOut" required></me-date-picker>

  <button type="submit">Reservar</button>
</form>
```

## Demo del Formulario

<me-playground-form id="date-picker-playground" schema-name="date-picker" title="Planificación de Evento" description="Gestión de fechas con rangos y validación.">
  <div style="margin-bottom: 1rem;">
    <me-date-picker 
      label="Fecha del evento *"
      name="eventDate"
      required
      min="today"
      placeholder="Selecciona la fecha"
      locale="es">
    </me-date-picker>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <me-date-picker 
      label="Rango de inscripción"
      name="enrollmentRange"
      mode="range"
      placeholder="Desde - Hasta"
      show-clear>
    </me-date-picker>
  </div>
</me-playground-form>

## Personalización con CSS

### Variables CSS

```css
me-date-picker {
  --me-date-picker-width: 100%;
  --me-date-picker-height: 40px;
  --me-date-picker-padding: 8px 12px;
  --me-date-picker-border: 1px solid #d1d5db;
  --me-date-picker-border-radius: 6px;
  --me-date-picker-focus-border: #3b82f6;
  --me-date-picker-calendar-bg: #ffffff;
  --me-date-picker-calendar-border: #e5e7eb;
  --me-date-picker-day-hover-bg: #f3f4f6;
  --me-date-picker-day-selected-bg: #3b82f6;
  --me-date-picker-day-selected-color: #ffffff;
  --me-date-picker-today-border: #3b82f6;
  --me-date-picker-disabled-color: #9ca3af;
}
```

## Accesibilidad

- **Navegación por teclado**: Flechas, Tab, Enter, Escape.
- **Anuncios de screen readers**: Fechas y cambios correctamente etiquetados.
- **ARIA**: Completamente etiquetado.
- **Contrast**: Colores optimizados para legibilidad.
