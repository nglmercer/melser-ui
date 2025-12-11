---
title: MelserRange
---

# MelserRange

Un componente de rango (slider) personalizable para selección de valores numéricos con controles visuales y soporte completo de formularios.

## Ejemplo Básico

```html
<melser-range 
  min="0" 
  max="100" 
  value="50">
</melser-range>
```

## Demo Interactivo

<melser-range 
  id="demo-basic" 
  min="0" 
  max="100" 
  value="50"
  label="Rango básico">
</melser-range>

<melser-range 
  id="demo-steps" 
  min="0" 
  max="10" 
  value="3"
  step="1"
  label="Rango con pasos">
</melser-range>

<melser-range 
  id="demo-disabled" 
  min="0" 
  max="100" 
  value="75"
  disabled
  label="Rango deshabilitado">
</melser-range>


## Propiedades

| Propiedad | Tipo | Valor por Defecto | Descripción |
|-----------|------|-------------------|-------------|
| `min` | `number` | `0` | Valor mínimo del rango |
| `max` | `number` | `100` | Valor máximo del rango |
| `value` | `number` | `50` | Valor actual del rango |
| `step` | `number` | `1` | Incremento/decremento del valor |
| `disabled` | `boolean` | `false` | Deshabilita la interacción |
| `name` | `string` | `''` | Nombre para formularios |
| `label` | `string` | `''` | Etiqueta visible del rango |
| `showValue` | `boolean` | `true` | Muestra el valor actual |

## Eventos

| Evento | Descripción |
|--------|-------------|
| `input` | Se dispara al cambiar el valor (en tiempo real) |
| `change` | Se dispara al confirmar el cambio |
| `focus` | Se dispara al obtener el foco |
| `blur` | Se dispara al perder el foco |

## Ejemplos de Uso

### Rango con Etiqueta

```html
<melser-range 
  min="0" 
  max="200" 
  value="75"
  label="Presupuesto mensual ($)">
</melser-range>
```

### Rango con Pasos

```html
<melser-range 
  min="0" 
  max="10" 
  value="7"
  step="1"
  label="Calificación del 1 al 10">
</melser-range>
```

### Rango de Precios

```html
<melser-range 
  min="100" 
  max="1000" 
  value="500"
  step="50"
  show-value
  label="Rango de precios">
</melser-range>
```

## Integración con Formularios

### Formulario de Configuración

```html
<form id="settings-form">
  <h3>Configuración de Usuario</h3>
  
  <melser-range 
    name="brightness"
    min="0" 
    max="100" 
    value="70"
    label="Brillo de pantalla">
  </melser-range>
  
  <melser-range 
    name="volume"
    min="0" 
    max="100" 
    value="50"
    label="Volumen">
  </melser-range>
  
  <button  type="submit" variant="primary">
    Guardar Configuración
  </button >
</form>
```

```javascript
const form = document.getElementById('settings-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    console.log('Configuración guardada:', data);
    alert('¡Configuración guardada correctamente!');
  });
}
```

## Demo del Formulario

<melser-playground-form id="range-playground" title="Configuración de Audio/Video" description="Ajustes de brillo y volumen.">
  <div style="margin-bottom: 1.5rem;">
    <melser-range 
      name="brightness"
      min="0" 
      max="100" 
      value="70"
      label="Brillo de pantalla">
    </melser-range>
  </div>
  
  <div style="margin-bottom: 1.5rem;">
    <melser-range 
      name="volume"
      min="0" 
      max="100" 
      value="50"
      label="Volumen">
    </melser-range>
  </div>
</melser-playground-form>

<script type="module">
  import { z } from 'zod';
  
  const schema = z.object({
    brightness: z.coerce.number().min(0).max(100),
    volume: z.coerce.number().min(0).max(100)
  });
  
  const form = document.getElementById('range-playground');
  form.schema = schema;
</script>


## Personalización con CSS

### Variables CSS

```css
melser-range {
  --melser-range-height: 6px;
  --melser-range-bg: #e5e7eb;
  --melser-range-fill: #3b82f6;
  --melser-range-thumb: #ffffff;
  --melser-range-thumb-border: #3b82f6;
  --melser-range-thumb-size: 20px;
  --melser-range-focus-color: #2563eb;
  --melser-range-disabled-bg: #f3f4f6;
  --melser-range-disabled-thumb: #d1d5db;
}
```

### Ejemplo Personalizado

<style>
  .custom-range {
    --melser-range-fill: #10b981;
    --melser-range-thumb-border: #10b981;
    --melser-range-focus-color: #059669;
  }
  
  .large-range {
    --melser-range-height: 8px;
    --melser-range-thumb-size: 24px;
  }
</style>

<div class="custom-range" style="margin-bottom: 1rem;">
  <melser-range 
    min="0" 
    max="100" 
    value="65"
    label="Rango personalizado (verde)">
  </melser-range>
</div>

<div class="large-range">
  <melser-range 
    min="0" 
    max="100" 
    value="40"
    label="Rango grande">
  </melser-range>
</div>

## Accesibilidad

El componente MelserRange incluye:

- **Navegación por teclado**: Flechas para ajustar valores
- **Screen reader support**: Anuncia valores y límites
- **Focus visible**: Indicador claro de foco
- **High contrast**: Compatible con modo de alto contraste

## Mejores Prácticas

1. **Siempre incluye un label** para describir el propósito
2. **Usa pasos apropiados** para el tipo de dato
3. **Muestra el valor actual** cuando sea útil
4. **Usa rangos apropiados** para la aplicación
5. **Valida valores** antes de enviar formularios

## Troubleshooting

### El rango no responde a eventos

```javascript
// Verificar que el componente esté importado
import 'melser-ui/components/melser-range.js';

// Verificar que no esté deshabilitado
console.log(range.disabled); // Debe ser false
```

### El valor no se envía en el formulario

```html
<!-- Asegúrate de incluir el atributo name -->
<melser-range 
  name="volume"
  min="0" 
  max="100" 
  value="50">
</melser-range>
```

### Problemas de accesibilidad

```html
<!-- Para rangos complejos, usa aria-label -->
<melser-range 
  aria-label="Temperatura en grados Celsius"
  min="-20" 
  max="50" 
  value="22">
</melser-range>
