---
title: MelserRange
---

# MelserRange

Un componente de rango (slider) personalizable para selección de valores numéricos con controles visuales y soporte completo de formularios.

## Ejemplo Básico

```html
<me-range min="0" max="100" value="50"> </me-range>
```

## Demo Interactivo

<me-range 
  id="demo-basic" 
  min="0" 
  max="100" 
  value="50"
  label="Rango básico">
</me-range>

<me-range 
  id="demo-steps" 
  min="0" 
  max="10" 
  value="3"
  step="1"
  label="Rango con pasos">
</me-range>

<me-range 
  id="demo-disabled" 
  min="0" 
  max="100" 
  value="75"
  disabled
  label="Rango deshabilitado">
</me-range>

## Propiedades

| Propiedad   | Tipo      | Valor por Defecto | Descripción                     |
| ----------- | --------- | ----------------- | ------------------------------- |
| `min`       | `number`  | `0`               | Valor mínimo del rango          |
| `max`       | `number`  | `100`             | Valor máximo del rango          |
| `value`     | `number`  | `50`              | Valor actual del rango          |
| `step`      | `number`  | `1`               | Incremento/decremento del valor |
| `disabled`  | `boolean` | `false`           | Deshabilita la interacción      |
| `name`      | `string`  | `''`              | Nombre para formularios         |
| `label`     | `string`  | `''`              | Etiqueta visible del rango      |
| `showValue` | `boolean` | `true`            | Muestra el valor actual         |

## Eventos

| Evento   | Descripción                                     |
| -------- | ----------------------------------------------- |
| `input`  | Se dispara al cambiar el valor (en tiempo real) |
| `change` | Se dispara al confirmar el cambio               |
| `focus`  | Se dispara al obtener el foco                   |
| `blur`   | Se dispara al perder el foco                    |

## Ejemplos de Uso

### Rango con Etiqueta

```html
<me-range min="0" max="200" value="75" label="Presupuesto mensual ($)">
</me-range>
```

### Rango con Pasos

```html
<me-range min="0" max="10" value="7" step="1" label="Calificación del 1 al 10">
</me-range>
```

### Rango de Precios

```html
<me-range
  min="100"
  max="1000"
  value="500"
  step="50"
  show-value
  label="Rango de precios"
>
</me-range>
```

## Integración con Formularios

### Formulario de Configuración

```html
<form id="settings-form">
  <h3>Configuración de Usuario</h3>

  <me-range
    name="brightness"
    min="0"
    max="100"
    value="70"
    label="Brillo de pantalla"
  >
  </me-range>

  <me-range name="volume" min="0" max="100" value="50" label="Volumen">
  </me-range>

  <button type="submit" variant="primary">Guardar Configuración</button>
</form>
```

```javascript
const form = document.getElementById("settings-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    console.log("Configuración guardada:", data);
    alert("¡Configuración guardada correctamente!");
  });
}
```

## Demo del Formulario

<me-playground-form id="range-playground" schema-name="range" title="Configuración de Audio/Video" description="Ajustes de brillo y volumen.">
  <div style="margin-bottom: 1.5rem;">
    <me-range 
      name="brightness"
      min="0" 
      max="100" 
      value="70"
      label="Brillo de pantalla">
    </me-range>
  </div>
  
  <div style="margin-bottom: 1.5rem;">
    <me-range 
      name="volume"
      min="0" 
      max="100" 
      value="50"
      label="Volumen">
    </me-range>
  </div>
</me-playground-form>

## Personalización con CSS

### Variables CSS

```css
me-range {
  --me-range-height: 6px;
  --me-range-bg: #e5e7eb;
  --me-range-fill: #3b82f6;
  --me-range-thumb: #ffffff;
  --me-range-thumb-border: #3b82f6;
  --me-range-thumb-size: 20px;
  --me-range-focus-color: #2563eb;
  --me-range-disabled-bg: #f3f4f6;
  --me-range-disabled-thumb: #d1d5db;
}
```

### Ejemplo Personalizado

<style>
  .custom-range {
    --me-range-fill: #10b981;
    --me-range-thumb-border: #10b981;
    --me-range-focus-color: #059669;
  }
  
  .large-range {
    --me-range-height: 8px;
    --me-range-thumb-size: 24px;
  }
</style>

<div class="custom-range" style="margin-bottom: 1rem;">
  <me-range 
    min="0" 
    max="100" 
    value="65"
    label="Rango personalizado (verde)">
  </me-range>
</div>

<div class="large-range">
  <me-range 
    min="0" 
    max="100" 
    value="40"
    label="Rango grande">
  </me-range>
</div>

<h3>Colores</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-range label="Success" color="success" min="0" max="100" value="70"></me-range>
  <me-range label="Warning" color="warning" min="0" max="100" value="50"></me-range>
  <me-range label="Danger" color="danger" min="0" max="100" value="30"></me-range>
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
import "melser-ui/components/me-range.js";

// Verificar que no esté deshabilitado
console.log(range.disabled); // Debe ser false
```

### El valor no se envía en el formulario

```html
<!-- Asegúrate de incluir el atributo name -->
<me-range name="volume" min="0" max="100" value="50"> </me-range>
```

### Problemas de accesibilidad

```html
<!-- Para rangos complejos, usa aria-label -->
<me-range
  aria-label="Temperatura en grados Celsius"
  min="-20"
  max="50"
  value="22"
>
</me-range>
```
