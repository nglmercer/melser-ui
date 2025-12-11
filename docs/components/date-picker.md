---
title: MelserDatePicker
---

# MelserDatePicker

Un componente de selección de fechas avanzado con calendario, validación de rangos, localización y múltiples formatos.

## Ejemplo Básico

```html
<melser-date-picker 
  label="Selecciona una fecha" 
  placeholder="dd/mm/yyyy">
</melser-date-picker>
```

## Demo Interactivo

<melser-date-picker 
  id="demo-basic" 
  label="Fecha básica" 
  placeholder="Selecciona una fecha">
</melser-date-picker>

<melser-date-picker 
  id="demo-min-max" 
  label="Con rango (2020-2030)" 
  min="2020-01-01"
  max="2030-12-31"
  placeholder="Entre 2020 y 2030">
</melser-date-picker>

<melser-date-picker 
  id="demo-value" 
  label="Con fecha inicial" 
  value="2024-01-15"
  placeholder="Fecha predefinida">
</melser-date-picker>

<melser-date-picker 
  id="demo-disabled" 
  label="Deshabilitado" 
  value="2024-01-01"
  disabled>
</melser-date-picker>

<melser-date-picker 
  id="demo-range" 
  label="Selector de rango" 
  mode="range"
  placeholder="Selecciona un rango">
</melser-date-picker>

<melser-date-picker 
  id="demo-locale" 
  label="Fecha en español" 
  locale="es"
  placeholder="Selecciona una fecha">
</melser-date-picker>

<melser-date-picker 
  id="demo-years" 
  label="Solo años" 
  view="year"
  placeholder="Selecciona un año">
</melser-date-picker>


## Propiedades

| Propiedad | Tipo | Valor por Defecto | Descripción |
|-----------|------|-------------------|-------------|
| `value` | `string` | `''` | Fecha seleccionada (YYYY-MM-DD) |
| `min` | `string` | `''` | Fecha mínima permitida |
| `max` | `string` | `''` | Fecha máxima permitida |
| `disabled` | `boolean` | `false` | Deshabilita la interacción |
| `required` | `boolean` | `false` | Campo requerido en formularios |
| `readonly` | `boolean` | `false` | Solo lectura |
| `placeholder` | `string` | `''` | Texto de marcador de posición |
| `format` | `string` | `'YYYY-MM-DD'` | Formato de fecha |
| `locale` | `string` | `'en'` | Localización del calendario |
| `mode` | `string` | `'single'` | Modo de selección (single, range, multiple) |
| `view` | `string` | `'day'` | Vista inicial (day, month, year) |
| `first-day-of-week` | `number` | `0` | Primer día de la semana (0=Domingo, 1=Lunes) |
| `show-today` | `boolean` | `true` | Muestra botón "Hoy" |
| `show-clear` | `boolean` | `true` | Muestra botón "Limpiar" |
| `label` | `string` | `''` | Etiqueta visible del campo |

## Eventos

| Evento | Descripción |
|--------|-------------|
| `change` | Se dispara al cambiar la fecha |
| `focus` | Se dispara al obtener el foco |
| `blur` | Se dispara al perder el foco |
| `range-change` | Se dispara al cambiar el rango (modo range) |
| `multiple-change` | Se dispara al cambiar múltiples fechas |
| `view-change` | Se dispara al cambiar la vista |

## Ejemplos de Uso

### Selector de Fecha Simple

```html
<melser-date-picker 
  label="Fecha de nacimiento"
  name="birthDate"
  required
  max="today"
  placeholder="Selecciona tu fecha de nacimiento">
</melser-date-picker>
```

### Selector de Rango de Fechas

```html
<melser-date-picker 
  label="Período de viaje"
  name="travelPeriod"
  mode="range"
  placeholder="Desde - Hasta"
  show-clear
  hint="Selecciona las fechas de inicio y fin de tu viaje">
</melser-date-picker>
```

### Selector con Restricciones

```html
<melser-date-picker 
  label="Fecha de cita médica"
  name="appointmentDate"
  required
  min="today"
  max="2024-12-31"
  locale="es"
  first-day-of-week="1"
  placeholder="Selecciona una fecha futura">
</melser-date-picker>
```

### Selector de Múltiples Fechas

```html
<melser-date-picker 
  label="Fechas de disponibilidad"
  name="availableDates"
  mode="multiple"
  show-today
  placeholder="Selecciona múltiples fechas">
</melser-date-picker>
```

### Selector de Solo Años

```html
<melser-date-picker 
  label="Año de graduación"
  name="graduationYear"
  view="year"
  min="2000"
  max="2030"
  placeholder="Selecciona un año">
</melser-date-picker>
```

## Integración con Formularios

### Formulario de Reserva de Hotel

```html
<form id="hotel-booking-form">
  <div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <h4>🗓️ Fechas de Reserva</h4>
    
    <melser-date-picker 
      label="Fecha de check-in *"
      name="checkIn"
      required
      min="today"
      placeholder="Fecha de llegada"
      id="form-checkin">
    </melser-date-picker>
    
    <melser-date-picker 
      label="Fecha de check-out *"
      name="checkOut"
      required
      placeholder="Fecha de salida"
      id="form-checkout">
    </melser-date-picker>
    
    <melser-date-picker 
      label="Fechas de preferencia (opcional)"
      name="preferences"
      mode="multiple"
      placeholder="Fechas que prefieres"
      show-clear
      id="form-preferences">
    </melser-date-picker>
  </div>
  
  <div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <h4>👤 Información Personal</h4>
    
    <melser-date-picker 
      label="Fecha de nacimiento"
      name="birthDate"
      max="today"
      placeholder="Para verificar mayoría de edad"
      id="form-birthdate">
    </melser-date-picker>
  </div>
  
  <button  type="submit" variant="primary">
    Buscar Disponibilidad
  </button >
</form>
```

```javascript
const form = document.getElementById('hotel-booking-form');
if (form) {
  const checkInPicker = document.getElementById('form-checkin');
  const checkOutPicker = document.getElementById('form-checkout');
  
  // Validar que check-out sea posterior a check-in
  if (checkInPicker && checkOutPicker) {
    checkInPicker.addEventListener('change', (e) => {
      const checkInDate = new Date(e.target.value);
      if (checkInDate) {
        // Establecer fecha mínima de check-out
        const nextDay = new Date(checkInDate);
        nextDay.setDate(nextDay.getDate() + 1);
        checkOutPicker.min = nextDay.toISOString().split('T')[0];
      }
    });
    
    checkOutPicker.addEventListener('change', (e) => {
      const checkInDate = new Date(checkInPicker.value);
      const checkOutDate = new Date(e.target.value);
      
      if (checkInDate && checkOutDate && checkOutDate <= checkInDate) {
        alert('La fecha de check-out debe ser posterior a la fecha de check-in');
        e.target.value = '';
      }
    });
  }
  
  // Validar fecha de nacimiento
  const birthDatePicker = document.getElementById('form-birthdate');
  if (birthDatePicker) {
    birthDatePicker.addEventListener('change', (e) => {
      const birthDate = new Date(e.target.value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (age < 18) {
        alert('Debes ser mayor de 18 años para hacer una reserva');
        e.target.value = '';
      }
    });
  }
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const checkIn = checkInPicker?.value || '';
    const checkOut = checkOutPicker?.value || '';
    const birthDate = birthDatePicker?.value || '';
    const preferences = form.querySelector('[name="preferences"]')?.value || '';
    
    if (!checkIn || !checkOut) {
      alert('Por favor completa las fechas de check-in y check-out');
      return;
    }
    
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    
    const bookingData = {
      checkIn,
      checkOut,
      nights,
      birthDate,
      preferences: preferences ? preferences.split(',') : []
    };
    
    console.log('Datos de reserva:', bookingData);
    alert(`¡Búsqueda realizada!\nEstancia: ${nights} noches\nDesde ${checkIn} hasta ${checkOut}`);
  });
}
```

## Demo del Formulario

<melser-playground-form id="date-picker-playground" title="Planificación de Evento" description="Gestión de fechas con rangos y validación.">
  <div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <h4>📅 Planificación de Evento</h4>
    
    <melser-date-picker 
      label="Fecha del evento *"
      name="eventDate"
      required
      min="today"
      placeholder="Selecciona la fecha"
      locale="es">
    </melser-date-picker>
    
    <melser-date-picker 
      label="Rango de inscripción"
      name="enrollmentRange"
      mode="range"
      placeholder="Desde - Hasta"
      show-clear>
    </melser-date-picker>
    
    <melser-date-picker 
      label="Fechas de descanso"
      name="breakDates"
      mode="multiple"
      placeholder="Selecciona fechas"
      show-clear>
    </melser-date-picker>
    
    <melser-date-picker 
      label="Año de creación"
      name="creationYear"
      view="year"
      min="2020"
      max="2030"
      placeholder="Selecciona un año">
    </melser-date-picker>
  </div>
</melser-playground-form>

<script type="module">
  import { z } from 'zod';
  
  const schema = z.object({
    eventDate: z.string().min(1, "La fecha del evento es obligatoria"),
    enrollmentRange: z.string().optional(),
    breakDates: z.string().optional(),
    creationYear: z.string().optional()
  });
  
  if (typeof document !== 'undefined') {
    const form = document.getElementById('date-picker-playground');
    if (form) form.schema = schema;
  }
</script>


## Personalización con CSS

### Variables CSS

```css
melser-date-picker {
  --melser-date-picker-width: 100%;
  --melser-date-picker-height: 40px;
  --melser-date-picker-padding: 8px 12px;
  --melser-date-picker-border: 1px solid #d1d5db;
  --melser-date-picker-border-radius: 6px;
  --melser-date-picker-focus-border: #3b82f6;
  --melser-date-picker-calendar-bg: #ffffff;
  --melser-date-picker-calendar-border: #e5e7eb;
  --melser-date-picker-day-hover-bg: #f3f4f6;
  --melser-date-picker-day-selected-bg: #3b82f6;
  --melser-date-picker-day-selected-color: #ffffff;
  --melser-date-picker-today-border: #3b82f6;
  --melser-date-picker-disabled-color: #9ca3af;
}
```

### Ejemplos de Personalización

<style>
  .custom-date-picker {
    --melser-date-picker-focus-border: #10b981;
    --melser-date-picker-day-selected-bg: #10b981;
    --melser-date-picker-today-border: #10b981;
  }
  
  .compact-date-picker {
    --melser-date-picker-height: 32px;
    --melser-date-picker-padding: 4px 8px;
    --melser-date-picker-border-radius: 4px;
  }
  
  .dark-date-picker {
    --melser-date-picker-border: 1px solid #374151;
    --melser-date-picker-focus-border: #8b5cf6;
    --melser-date-picker-calendar-bg: #1f2937;
    --melser-date-picker-calendar-border: #374151;
    --melser-date-picker-day-hover-bg: #374151;
    --melser-date-picker-day-selected-bg: #8b5cf6;
    --melser-date-picker-day-selected-color: #f9fafb;
  }
</style>

<div class="custom-date-picker" style="margin-bottom: 1rem;">
  <melser-date-picker 
    label="Date picker personalizado"
    value="2024-01-15"
    placeholder="Verde personalizado">
  </melser-date-picker>
</div>

<div class="compact-date-picker" style="margin-bottom: 1rem;">
  <melser-date-picker 
    label="Date picker compacto"
    value="2024-01-01"
    placeholder="Más pequeño">
  </melser-date-picker>
</div>

<div class="dark-date-picker">
  <melser-date-picker 
    label="Date picker tema oscuro"
    value="2024-01-01"
    placeholder="Para interfaces oscuras">
  </melser-date-picker>
</div>

## Características Avanzadas

### Configuración de Localización

```javascript
const picker = document.querySelector('melser-date-picker');
if (picker) {
  // Configurar localización en español
  picker.locale = 'es';
  picker.firstDayOfWeek = 1; // Lunes como primer día
  
  // Formato personalizado
  picker.format = 'DD/MM/YYYY';
  
  // Escuchar cambios de vista
  picker.addEventListener('view-change', (e) => {
    console.log('Vista cambiada a:', e.detail.view);
  });
}
```

### Validación Personalizada de Fechas

```javascript
const picker = document.querySelector('melser-date-picker');
if (picker) {
  picker.addEventListener('change', (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    const maxDate = new Date('2024-12-31');
    
    // Validación personalizada
    if (selectedDate > maxDate) {
      alert('La fecha no puede ser posterior al 31 de diciembre de 2024');
      e.target.value = '';
      return;
    }
    
    if (selectedDate < today) {
      console.log('Fecha en el pasado:', selectedDate.toLocaleDateString());
    }
  });
}
```

### Fechas Deshabilitadas Dinámicamente

```javascript
const picker = document.querySelector('melser-date-picker');
if (picker) {
  // Función para verificar si una fecha está deshabilitada
  function isDateDisabled(date) {
    // Deshabilitar fines de semana
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return true;
    }
    
    // Deshabilitar fechas específicas
    const disabledDates = [
      '2024-01-01', // Año nuevo
      '2024-12-25'  // Navidad
    ];
    
    const dateString = date.toISOString().split('T')[0];
    return disabledDates.includes(dateString);
  }
  
  picker.isDateDisabled = isDateDisabled;
}
```

## Accesibilidad

El componente MelserDatePicker incluye:

- **Navegación por teclado**: Flechas, Tab, Enter, Escape
- **Anuncios de screen readers**: Fechas y cambios anunciados
- **ARIA labels**: Completamente etiquetado para accesibilidad
- **Focus management**: Navegación lógica del calendario
- **Estados de disabled**: Correctamente anunciados

## Mejores Prácticas

1. **Establece límites apropiados** (min/max) según el contexto
2. **Usa localización correcta** para mejor experiencia
3. **Proporciona placeholders** informativos
4. **Incluye validación** de fechas lógica
5. **Maneja rangos de fechas** apropiadamente
6. **Considera el primer día de la semana** según la región
7. **Usa formatos de fecha** consistentes

## Troubleshooting

### Calendario no se abre

```javascript
// Verificar que el componente esté importado
import 'melser-ui/components/melser-date-picker.js';

// Verificar que no esté deshabilitado
console.log(picker.disabled); // Debe ser false
```

### Fechas no se validan

```html
<!-- Configurar límites apropiados -->
<melser-date-picker 
  min="2024-01-01"
  max="2024-12-31"
  required>
```

### Localización no funciona

```javascript
// Verificar que la localización esté configurada
picker.locale = 'es';
picker.firstDayOfWeek = 1;
```

### Formato de fecha incorrecto

```javascript
// Configurar formato personalizado
picker.format = 'DD/MM/YYYY'; // o 'MM/DD/YYYY', etc.
```

### Rango de fechas no funciona

```html
<!-- Verificar que mode="range" esté configurado -->
<melser-date-picker 
  mode="range"
  label="Selector de rango">
```

### Focus no visible

```css
/* Personalizar indicador de foco */
melser-date-picker:focus-within {
  box-shadow: 0 0 0 2px #3b82f6;
  border-color: #3b82f6;
}
```

### Problemas de accesibilidad

```html
<!-- Agregar descripción para casos específicos -->
<melser-date-picker 
  aria-label="Selecciona tu fecha de nacimiento"
  placeholder="DD/MM/AAAA">
```

### Fechas deshabilitadas no se muestran

```javascript
// Verificar función de deshabilitado
picker.isDateDisabled = (date) => {
  return date.getDay() === 0 || date.getDay() === 6; // Fines de semana
};
```

### Problemas de rendimiento con rangos grandes

```javascript
// Limitar rango de años mostrados
picker.yearRange = 10; // Solo mostrar 5 años antes y después