---
title: MelserTimePicker
---

# MelserTimePicker

Un componente de selección de tiempo avanzado con formato 12h/24h, intervalos personalizables y validación de horarios.

## Ejemplo Básico

```html
<me-time-picker label="Selecciona una hora" placeholder="HH:MM">
</me-time-picker>
```

## Demo Interactivo

<me-time-picker 
  id="demo-basic" 
  label="Hora básica" 
  placeholder="Selecciona una hora">
</me-time-picker>

<me-time-picker 
  id="demo-12h" 
  label="Formato 12 horas" 
  format="12h"
  placeholder="12:00 PM">
</me-time-picker>

<me-time-picker 
  id="demo-24h" 
  label="Formato 24 horas" 
  format="24h"
  placeholder="14:30">
</me-time-picker>

<me-time-picker 
  id="demo-steps" 
  label="Intervalos de 15 min" 
  step="900"
  placeholder="Intervalos de 15 minutos">
</me-time-picker>

<me-time-picker 
  id="demo-min-max" 
  label="Horario laboral (9-17)" 
  min="09:00"
  max="17:00"
  placeholder="Entre 9:00 AM y 5:00 PM">
</me-time-picker>

<me-time-picker 
  id="demo-value" 
  label="Con hora inicial" 
  value="14:30"
  placeholder="Hora predefinida">
</me-time-picker>

<me-time-picker 
  id="demo-disabled" 
  label="Deshabilitado" 
  value="09:00"
  disabled>
</me-time-picker>

<me-time-picker 
  id="demo-seconds" 
  label="Con segundos" 
  show-seconds
  step="1"
  placeholder="HH:MM:SS">
</me-time-picker>

<h3>Colores</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-time-picker label="Success" color="success" value="09:00"></me-time-picker>
  <me-time-picker label="Warning" color="warning" value="12:00"></me-time-picker>
  <me-time-picker label="Danger" color="danger" value="15:00"></me-time-picker>
</div>

## Propiedades

| Propiedad      | Tipo                                              | Valor por Defecto | Descripción                                |
| :------------- | :------------------------------------------------ | :---------------- | :----------------------------------------- |
| `value`        | `string`                                          | `''`              | Hora seleccionada (HH:MM:SS)               |
| `min`          | `string`                                          | `''`              | Hora mínima permitida                      |
| `max`          | `string`                                          | `''`              | Hora máxima permitida                      |
| `format`       | `string`                                          | `'24h'`           | Formato de hora (12h, 24h)                 |
| `step`         | `number`                                          | `60`              | Intervalo en segundos (60=1min, 900=15min) |
| `show-seconds` | `boolean`                                         | `false`           | Muestra selector de segundos               |
| `disabled`     | `boolean`                                         | `false`           | Deshabilita la interacción                 |
| `readonly`     | `boolean`                                         | `false`           | Solo lectura                               |
| `required`     | `boolean`                                         | `false`           | Campo requerido en formularios             |
| `placeholder`  | `string`                                          | `''`              | Texto de marcador de posición              |
| `label`        | `string`                                          | `''`              | Etiqueta visible del campo                 |
| `color`        | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'`       | Esquema de color del estado.               |

## Eventos

| Evento             | Descripción                          |
| :----------------- | :----------------------------------- |
| `change`           | Se dispara al cambiar la hora        |
| `focus`            | Se dispara al obtener el foco        |
| `blur`             | Se dispara al perder el foco         |
| `validation-error` | Se dispara con errores de validación |

## Ejemplos de Uso

### Selector de Hora Simple

```html
<me-time-picker
  label="Hora de la cita"
  name="appointmentTime"
  required
  placeholder="Selecciona la hora"
>
</me-time-picker>
```

### Selector con Restricciones de Horario

```html
<me-time-picker
  label="Hora de entrega"
  name="deliveryTime"
  min="08:00"
  max="22:00"
  step="1800"
  placeholder="Entre 8:00 AM y 10:00 PM"
  hint="Entregas disponibles cada 30 minutos"
>
</me-time-picker>
```

### Selector de Horario de Trabajo

```html
<me-time-picker
  label="Hora de inicio *"
  name="workStart"
  required
  min="06:00"
  max="12:00"
  step="900"
  placeholder="Hora de inicio (6:00 AM - 12:00 PM)"
  format="12h"
>
</me-time-picker>
```

### Selector con Formato 12h

```html
<me-time-picker
  label="Hora de la reunión"
  name="meetingTime"
  format="12h"
  show-seconds
  step="300"
  placeholder="Ej: 2:30:45 PM"
>
</me-time-picker>
```

## Integración con Formularios

### Formulario de Programación de Citas

```html
<form id="appointment-form">
  <div
    style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;"
  >
    <h4>🗓️ Programación de Cita</h4>

    <me-time-picker
      label="Hora de la cita *"
      name="time"
      required
      min="09:00"
      max="17:00"
      step="1800"
      placeholder="Entre 9:00 AM y 5:00 PM"
      format="12h"
      id="form-time"
    >
    </me-time-picker>

    <me-time-picker
      label="Duración estimada"
      name="duration"
      value="01:00"
      step="900"
      placeholder="Duración de la cita"
      format="12h"
      id="form-duration"
    >
    </me-time-picker>
  </div>

  <button type="submit">Agendar Cita</button>
</form>
```

```javascript
document.getElementById("appointment-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  console.log("Time:", formData.get("time"));
});
```

## Demo del Formulario

<me-playground-form id="time-picker-playground" schema-name="time-picker" title="Configuración de Horarios" description="Definición de turnos y recordatorios.">
  <div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
  <h4>⏰ Configuración de Horarios</h4>
    
  <me-time-picker 
    label="Hora de inicio *"
    name="startTime"
    required
    placeholder="Hora de inicio"
    format="12h">
  </me-time-picker>
  
  <me-time-picker 
    label="Hora de fin *"
    name="endTime"
    required
    placeholder="Hora de fin"
    format="12h"
    min="09:00">
  </me-time-picker>
  
  <me-time-picker 
    label="Tiempo de descanso"
    name="breakTime"
    step="1800"
    placeholder="Duración del descanso"
    format="12h">
  </me-time-picker>
  
  <me-time-picker 
    label="Recordatorio automático"
    name="reminder"
    step="300"
    placeholder="Cuándo recordar"
    format="24h"
    show-seconds>
  </me-time-picker>
  </div>
</me-playground-form>

## Personalización con CSS

### Variables CSS

```css
me-time-picker {
  --me-time-picker-width: 100%;
  --me-time-picker-height: 40px;
  --me-time-picker-padding: 8px 12px;
  --me-time-picker-border: 1px solid #d1d5db;
  --me-time-picker-border-radius: 6px;
  --me-time-picker-focus-border: #3b82f6;
  --me-time-picker-calendar-bg: #ffffff;
  --me-time-picker-calendar-border: #e5e7eb;
  --me-time-picker-hour-hover-bg: #f3f4f6;
  --me-time-picker-hour-selected-bg: #3b82f6;
  --me-time-picker-hour-selected-color: #ffffff;
  --me-time-picker-disabled-color: #9ca3af;
}
```

### Ejemplos de Personalización

<style>
  .custom-time-picker {
    --me-time-picker-focus-border: #10b981;
    --me-time-picker-hour-selected-bg: #10b981;
  }
  
  .compact-time-picker {
    --me-time-picker-height: 32px;
    --me-time-picker-padding: 4px 8px;
    --me-time-picker-border-radius: 4px;
  }
  
  .dark-time-picker {
    --me-time-picker-border: 1px solid #374151;
    --me-time-picker-focus-border: #8b5cf6;
    --me-time-picker-calendar-bg: #1f2937;
    --me-time-picker-calendar-border: #374151;
    --me-time-picker-hour-hover-bg: #374151;
    --me-time-picker-hour-selected-bg: #8b5cf6;
    --me-time-picker-hour-selected-color: #f9fafb;
  }
</style>

<div class="custom-time-picker" style="margin-bottom: 1rem;">
  <me-time-picker 
    label="Time picker personalizado"
    value="14:30"
    placeholder="Verde personalizado">
  </me-time-picker>
</div>

<div class="compact-time-picker" style="margin-bottom: 1rem;">
  <me-time-picker 
    label="Time picker compacto"
    value="09:00"
    placeholder="Más pequeño">
  </me-time-picker>
</div>

<div class="dark-time-picker">
  <me-time-picker 
    label="Time picker tema oscuro"
    value="15:45"
    show-seconds
    placeholder="Para interfaces oscuras">
  </me-time-picker>
</div>

## Características Avanzadas

### Configuración de Formato Personalizado

```javascript
const picker = document.querySelector("me-time-picker");
if (picker) {
  // Configurar formato 12h con AM/PM
  picker.format = "12h";
  picker.showSeconds = true;
  picker.step = 1; // Mostrar cada segundo
}
```

## Accesibilidad

- **Navegación por teclado**: Flechas, Tab, Enter, Space
- **Anuncios de screen readers**: Horas y cambios anunciados
- **ARIA labels**: Completamente etiquetado para accesibilidad
- **Focus management**: Navegación lógica del selector
- **Estados de disabled**: Correctamente anunciados
