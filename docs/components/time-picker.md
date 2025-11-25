---
title: MelserTimePicker
---

# MelserTimePicker

Un componente de selección de tiempo avanzado con formato 12h/24h, intervalos personalizables y validación de horarios.

## Ejemplo Básico

```html
<melser-time-picker 
  label="Selecciona una hora" 
  placeholder="HH:MM">
</melser-time-picker>
```

## Demo Interactivo

<melser-time-picker 
  id="demo-basic" 
  label="Hora básica" 
  placeholder="Selecciona una hora">
</melser-time-picker>

<melser-time-picker 
  id="demo-12h" 
  label="Formato 12 horas" 
  format="12h"
  placeholder="12:00 PM">
</melser-time-picker>

<melser-time-picker 
  id="demo-24h" 
  label="Formato 24 horas" 
  format="24h"
  placeholder="14:30">
</melser-time-picker>

<melser-time-picker 
  id="demo-steps" 
  label="Intervalos de 15 min" 
  step="900"
  placeholder="Intervalos de 15 minutos">
</melser-time-picker>

<melser-time-picker 
  id="demo-min-max" 
  label="Horario laboral (9-17)" 
  min="09:00"
  max="17:00"
  placeholder="Entre 9:00 AM y 5:00 PM">
</melser-time-picker>

<melser-time-picker 
  id="demo-value" 
  label="Con hora inicial" 
  value="14:30"
  placeholder="Hora predefinida">
</melser-time-picker>

<melser-time-picker 
  id="demo-disabled" 
  label="Deshabilitado" 
  value="09:00"
  disabled>
</melser-time-picker>

<melser-time-picker 
  id="demo-seconds" 
  label="Con segundos" 
  show-seconds
  step="1"
  placeholder="HH:MM:SS">
</melser-time-picker>


## Propiedades

| Propiedad | Tipo | Valor por Defecto | Descripción |
|-----------|------|-------------------|-------------|
| `value` | `string` | `''` | Hora seleccionada (HH:MM:SS) |
| `min` | `string` | `''` | Hora mínima permitida |
| `max` | `string` | `''` | Hora máxima permitida |
| `format` | `string` | `'24h'` | Formato de hora (12h, 24h) |
| `step` | `number` | `60` | Intervalo en segundos (60=1min, 900=15min) |
| `show-seconds` | `boolean` | `false` | Muestra selector de segundos |
| `disabled` | `boolean` | `false` | Deshabilita la interacción |
| `readonly` | `boolean` | `false` | Solo lectura |
| `required` | `boolean` | `false` | Campo requerido en formularios |
| `placeholder` | `string` | `''` | Texto de marcador de posición |
| `label` | `string` | `''` | Etiqueta visible del campo |

## Eventos

| Evento | Descripción |
|--------|-------------|
| `change` | Se dispara al cambiar la hora |
| `focus` | Se dispara al obtener el foco |
| `blur` | Se dispara al perder el foco |
| `validation-error` | Se dispara con errores de validación |

## Ejemplos de Uso

### Selector de Hora Simple

```html
<melser-time-picker 
  label="Hora de la cita"
  name="appointmentTime"
  required
  placeholder="Selecciona la hora">
</melser-time-picker>
```

### Selector con Restricciones de Horario

```html
<melser-time-picker 
  label="Hora de entrega"
  name="deliveryTime"
  min="08:00"
  max="22:00"
  step="1800"
  placeholder="Entre 8:00 AM y 10:00 PM"
  hint="Entregas disponibles cada 30 minutos">
</melser-time-picker>
```

### Selector de Horario de Trabajo

```html
<melser-time-picker 
  label="Hora de inicio *"
  name="workStart"
  required
  min="06:00"
  max="12:00"
  step="900"
  placeholder="Hora de inicio (6:00 AM - 12:00 PM)"
  format="12h">
</melser-time-picker>
```

### Selector con Formato 12h

```html
<melser-time-picker 
  label="Hora de la reunión"
  name="meetingTime"
  format="12h"
  show-seconds
  step="300"
  placeholder="Ej: 2:30:45 PM">
</melser-time-picker>
```

## Integración con Formularios

### Formulario de Programación de Citas

```html
<form id="appointment-form">
  <div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <h4>🗓️ Programación de Cita</h4>
    
    <melser-date-picker 
      label="Fecha de la cita *"
      name="date"
      required
      min="today"
      placeholder="Selecciona la fecha"
      id="form-date">
    </melser-date-picker>
    
    <melser-time-picker 
      label="Hora de la cita *"
      name="time"
      required
      min="09:00"
      max="17:00"
      step="1800"
      placeholder="Entre 9:00 AM y 5:00 PM"
      format="12h"
      id="form-time">
    </melser-time-picker>
    
    <melser-time-picker 
      label="Duración estimada"
      name="duration"
      value="01:00"
      step="900"
      placeholder="Duración de la cita"
      format="12h"
      id="form-duration">
    </melser-time-picker>
  </div>
  
  <div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <h4>⏰ Recordatorios</h4>
    
    <melser-time-picker 
      label="Recordatorio 1"
      name="reminder1"
      placeholder="1 hora antes"
      format="12h"
      id="form-reminder1">
    </melser-time-picker>
    
    <melser-time-picker 
      label="Recordatorio 2"
      name="reminder2"
      placeholder="24 horas antes"
      format="12h"
      id="form-reminder2">
    </melser-time-picker>
  </div>
  
  <melser-button type="submit" variant="primary">
    Agendar Cita
  </melser-button>
</form>
```

```javascript
const form = document.getElementById('appointment-form');
if (form) {
  const datePicker = document.getElementById('form-date');
  const timePicker = document.getElementById('form-time');
  const durationPicker = document.getElementById('form-duration');
  
  // Validar horarios de oficina
  if (timePicker) {
    timePicker.addEventListener('change', (e) => {
      const selectedTime = e.target.value;
      if (selectedTime) {
        const time = new Date(`2000-01-01T${selectedTime}`);
        const minTime = new Date(`2000-01-01T09:00`);
        const maxTime = new Date(`2000-01-01T17:00`);
        
        if (time < minTime || time > maxTime) {
          alert('La hora debe estar entre 9:00 AM y 5:00 PM');
          e.target.value = '';
        }
      }
    });
  }
  
  // Calcular hora de fin basada en duración
  if (timePicker && durationPicker) {
    timePicker.addEventListener('change', calculateEndTime);
    durationPicker.addEventListener('change', calculateEndTime);
  }
  
  function calculateEndTime() {
    const startTime = timePicker.value;
    const duration = durationPicker.value;
    
    if (startTime && duration) {
      const start = new Date(`2000-01-01T${startTime}`);
      const durMinutes = duration.split(':').reduce((acc, time) => (60 * acc) + +time);
      const end = new Date(start.getTime() + (durMinutes * 60 * 1000));
      
      const endTime = end.toTimeString().slice(0, 5);
      console.log(`Cita: ${startTime} - ${endTime} (${duration})`);
    }
  }
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const date = datePicker?.value || '';
    const time = timePicker?.value || '';
    const duration = durationPicker?.value || '';
    const reminder1 = form.querySelector('[name="reminder1"]')?.value || '';
    const reminder2 = form.querySelector('[name="reminder2"]')?.value || '';
    
    if (!date || !time) {
      alert('Por favor completa la fecha y hora de la cita');
      return;
    }
    
    // Calcular hora de fin
    let endTime = '';
    if (time && duration) {
      const start = new Date(`2000-01-01T${time}`);
      const durMinutes = duration.split(':').reduce((acc, time) => (60 * acc) + +time);
      const end = new Date(start.getTime() + (durMinutes * 60 * 1000));
      endTime = end.toTimeString().slice(0, 5);
    }
    
    const appointmentData = {
      date,
      time,
      duration,
      endTime,
      reminders: [reminder1, reminder2].filter(Boolean)
    };
    
    console.log('Cita programada:', appointmentData);
    alert(`¡Cita agendada exitosamente!\n${date} a las ${time}${endTime ? ' - ' + endTime : ''}`);
  });
}
```

## Demo del Formulario

<form id="time-picker-form">
  <div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <h4>⏰ Configuración de Horarios</h4>
    
    <melser-time-picker 
      label="Hora de inicio *"
      name="startTime"
      required
      value="09:00"
      placeholder="Hora de inicio"
      format="12h"
      id="form-start">
    </melser-time-picker>
    
    <melser-time-picker 
      label="Hora de fin *"
      name="endTime"
      required
      value="17:00"
      placeholder="Hora de fin"
      format="12h"
      min="09:00"
      id="form-end">
    </melser-time-picker>
    
    <melser-time-picker 
      label="Tiempo de descanso"
      name="breakTime"
      value="01:00"
      step="1800"
      placeholder="Duración del descanso"
      format="12h"
      id="form-break">
    </melser-time-picker>
    
    <melser-time-picker 
      label="Recordatorio automático"
      name="reminder"
      value="15:00"
      step="300"
      placeholder="Cuándo recordar"
      format="24h"
      show-seconds
      id="form-reminder">
    </melser-time-picker>
  </div>
  
  <melser-button type="submit" variant="primary" id="form-submit">
    Configurar Horarios
  </melser-button>
</form>

<div id="time-result" style="margin-top: 1rem; padding: 1rem; background: #f3f4f6; border-radius: 6px; display: none;">
  <strong>Configuración de Horarios:</strong>
  <div id="time-details"></div>
</div>


## Personalización con CSS

### Variables CSS

```css
melser-time-picker {
  --melser-time-picker-width: 100%;
  --melser-time-picker-height: 40px;
  --melser-time-picker-padding: 8px 12px;
  --melser-time-picker-border: 1px solid #d1d5db;
  --melser-time-picker-border-radius: 6px;
  --melser-time-picker-focus-border: #3b82f6;
  --melser-time-picker-calendar-bg: #ffffff;
  --melser-time-picker-calendar-border: #e5e7eb;
  --melser-time-picker-hour-hover-bg: #f3f4f6;
  --melser-time-picker-hour-selected-bg: #3b82f6;
  --melser-time-picker-hour-selected-color: #ffffff;
  --melser-time-picker-disabled-color: #9ca3af;
}
```

### Ejemplos de Personalización

<style>
  .custom-time-picker {
    --melser-time-picker-focus-border: #10b981;
    --melser-time-picker-hour-selected-bg: #10b981;
  }
  
  .compact-time-picker {
    --melser-time-picker-height: 32px;
    --melser-time-picker-padding: 4px 8px;
    --melser-time-picker-border-radius: 4px;
  }
  
  .dark-time-picker {
    --melser-time-picker-border: 1px solid #374151;
    --melser-time-picker-focus-border: #8b5cf6;
    --melser-time-picker-calendar-bg: #1f2937;
    --melser-time-picker-calendar-border: #374151;
    --melser-time-picker-hour-hover-bg: #374151;
    --melser-time-picker-hour-selected-bg: #8b5cf6;
    --melser-time-picker-hour-selected-color: #f9fafb;
  }
</style>

<div class="custom-time-picker" style="margin-bottom: 1rem;">
  <melser-time-picker 
    label="Time picker personalizado"
    value="14:30"
    placeholder="Verde personalizado">
  </melser-time-picker>
</div>

<div class="compact-time-picker" style="margin-bottom: 1rem;">
  <melser-time-picker 
    label="Time picker compacto"
    value="09:00"
    placeholder="Más pequeño">
  </melser-time-picker>
</div>

<div class="dark-time-picker">
  <melser-time-picker 
    label="Time picker tema oscuro"
    value="15:45"
    show-seconds
    placeholder="Para interfaces oscuras">
  </melser-time-picker>
</div>

## Características Avanzadas

### Configuración de Formato Personalizado

```javascript
const picker = document.querySelector('melser-time-picker');
if (picker) {
  // Configurar formato 12h con AM/PM
  picker.format = '12h';
  picker.showSeconds = true;
  picker.step = 1; // Mostrar cada segundo
  
  // Escuchar cambios de formato
  picker.addEventListener('change', (e) => {
    const time = e.target.value;
    const date = new Date(`2000-01-01T${time}`);
    
    // Mostrar en diferentes formatos
    console.log('24h format:', time);
    console.log('12h format:', date.toLocaleTimeString('en-US', { 
      hour12: true, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    }));
  });
}
```

### Validación de Horarios de Negocio

```javascript
const picker = document.querySelector('melser-time-picker');
if (picker) {
  picker.addEventListener('change', (e) => {
    const selectedTime = e.target.value;
    const businessHours = {
      open: '09:00',
      close: '17:00',
      lunchStart: '12:00',
      lunchEnd: '13:00'
    };
    
    const time = new Date(`2000-01-01T${selectedTime}`);
    const open = new Date(`2000-01-01T${businessHours.open}`);
    const close = new Date(`2000-01-01T${businessHours.close}`);
    const lunchStart = new Date(`2000-01-01T${businessHours.lunchStart}`);
    const lunchEnd = new Date(`2000-01-01T${businessHours.lunchEnd}`);
    
    if (time < open || time > close) {
      picker.dispatchEvent(new CustomEvent('validation-error', {
        detail: { error: 'Fuera del horario de atención (9:00 AM - 5:00 PM)' }
      }));
    } else if (time >= lunchStart && time < lunchEnd) {
      picker.dispatchEvent(new CustomEvent('validation-error', {
        detail: { error: 'Durante el horario de almuerzo (12:00 PM - 1:00 PM)' }
      }));
    }
  });
}
```

### Intervalos Personalizados por Contexto

```javascript
function setupTimePickerContext(picker, context) {
  switch (context) {
    case 'medical':
      picker.step = 900; // 15 minutos para citas médicas
      picker.min = '08:00';
      picker.max = '18:00';
      break;
      
    case 'delivery':
      picker.step = 3600; // 1 hora para entregas
      picker.min = '09:00';
      picker.max = '21:00';
      break;
      
    case 'meeting':
      picker.step = 1800; // 30 minutos para reuniones
      picker.min = '08:00';
      picker.max = '19:00';
      picker.format = '12h';
      break;
  }
}

// Usar según el contexto
const medicalPicker = document.querySelector('#medical-time');
const deliveryPicker = document.querySelector('#delivery-time');

setupTimePickerContext(medicalPicker, 'medical');
setupTimePickerContext(deliveryPicker, 'delivery');
```

## Accesibilidad

El componente MelserTimePicker incluye:

- **Navegación por teclado**: Flechas, Tab, Enter, Space
- **Anuncios de screen readers**: Horas y cambios anunciados
- **ARIA labels**: Completamente etiquetado para accesibilidad
- **Focus management**: Navegación lógica del selector
- **Estados de disabled**: Correctamente anunciados

## Mejores Prácticas

1. **Establece intervalos lógicos** según el contexto (15min, 30min, 1h)
2. **Usa formato apropiado** (12h para usuarios generales, 24h para técnicos)
3. **Incluye límites de horario** razonables para el uso
4. **Proporciona placeholders** informativos
5. **Valida rangos de tiempo** lógicamente
6. **Considera zonas horarias** si es necesario
7. **Usa step apropiado** para evitar sobrecarga de opciones

## Troubleshooting

### Calendario no se abre

```javascript
// Verificar que el componente esté importado
import 'melser-ui/components/melser-time-picker.js';

// Verificar que no esté deshabilitado
console.log(picker.disabled); // Debe ser false
```

### Formato 12h no funciona

```html
<!-- Verificar que format="12h" esté configurado -->
<melser-time-picker 
  format="12h"
  label="Formato 12 horas">
```

### Intervalos no cambian

```html
<!-- Configurar step apropiadamente -->
<melser-time-picker 
  step="900"
  label="Intervalos de 15 minutos">
```

### Límites de hora no funcionan

```html
<!-- Verificar formato de min/max -->
<melser-time-picker 
  min="09:00"
  max="17:00"
  label="Horario laboral">
```

### Segundos no se muestran

```html
<!-- Verificar que show-seconds esté habilitado -->
<melser-time-picker 
  show-seconds
  step="1"
  label="Con segundos">
```

### Focus no visible

```css
/* Personalizar indicador de foco */
melser-time-picker:focus-within {
  box-shadow: 0 0 0 2px #3b82f6;
  border-color: #3b82f6;
}
```

### Problemas de accesibilidad

```html
<!-- Agregar descripción para casos específicos -->
<melser-time-picker 
  aria-label="Selecciona la hora de tu cita médica"
  step="900"
  placeholder="09:00">
```

### Validación de rango falla

```javascript
// Verificar formato de tiempo
function isValidTime(time) {
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
  return timeRegex.test(time);
}
```

### Performance con muchos intervalos

```javascript
// Reducir opciones limitando el rango
picker.minHour = 9;
picker.maxHour = 17;
