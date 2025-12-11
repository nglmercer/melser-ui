---
title: MelserDualRange
---

# MelserDualRange

Un componente de rango doble (dual slider) para selección de rangos de valores con dos controles deslizantes para mínimo y máximo.

## Ejemplo Básico

```html
<melser-dual-range min="0" max="100" value="30,70"> </melser-dual-range>
```

## Demo Interactivo

<melser-dual-range 
  id="demo-basic" 
  min="0" 
  max="100" 
  value="30,70"
  label="Rango doble básico">
</melser-dual-range>

<melser-dual-range 
  id="demo-steps" 
  min="0" 
  max="50" 
  value="10,40"
  step="5"
  label="Rango doble con pasos">
</melser-dual-range>

<melser-dual-range 
  id="demo-disabled" 
  min="0" 
  max="100" 
  value="25,75"
  disabled
  label="Rango doble deshabilitado">
</melser-dual-range>

## Propiedades

| Propiedad    | Tipo      | Valor por Defecto | Descripción                          |
| ------------ | --------- | ----------------- | ------------------------------------ |
| `min`        | `number`  | `0`               | Valor mínimo del rango               |
| `max`        | `number`  | `100`             | Valor máximo del rango               |
| `value`      | `string`  | `'30,70'`         | Valores actuales (min,max)           |
| `step`       | `number`  | `1`               | Incremento/decremento de los valores |
| `disabled`   | `boolean` | `false`           | Deshabilita la interacción           |
| `name`       | `string`  | `''`              | Nombre para formularios              |
| `label`      | `string`  | `''`              | Etiqueta visible del rango           |
| `showValues` | `boolean` | `true`            | Muestra los valores actuales         |
| `separator`  | `string`  | `' - '`           | Separador entre valores              |

## Eventos

| Evento   | Descripción                                        |
| -------- | -------------------------------------------------- |
| `input`  | Se dispara al cambiar los valores (en tiempo real) |
| `change` | Se dispara al confirmar los cambios                |
| `focus`  | Se dispara al obtener el foco                      |
| `blur`   | Se dispara al perder el foco                       |

## Ejemplos de Uso

### Rango de Precio

```html
<melser-dual-range
  min="100"
  max="1000"
  value="250,750"
  step="50"
  label="Rango de precios ($)"
>
</melser-dual-range>
```

### Rango de Edad

```html
<melser-dual-range min="18" max="65" value="25,45" label="Rango de edad">
</melser-dual-range>
```

### Rango de Horario

```html
<melser-dual-range
  min="0"
  max="24"
  value="9,17"
  step="0.5"
  label="Horario laboral"
>
</melser-dual-range>
```

## Integración con Formularios

### Formulario de Filtros

```html
<form id="filters-form">
  <h3>Filtros de Búsqueda</h3>

  <melser-dual-range
    name="priceRange"
    min="0"
    max="5000"
    value="500,2500"
    step="100"
    label="Rango de precios ($)"
  >
  </melser-dual-range>

  <melser-dual-range
    name="sizeRange"
    min="10"
    max="500"
    value="50,200"
    label="Tamaño (m²)"
  >
  </melser-dual-range>

  <melser-dual-range
    name="distanceRange"
    min="0"
    max="100"
    value="0,25"
    step="5"
    label="Distancia (km)"
  >
  </melser-dual-range>

  <button type="submit" variant="primary">Aplicar Filtros</button>
</form>
```

```javascript
const form = document.getElementById("filters-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    console.log("Filtros aplicados:", data);
    alert("¡Filtros aplicados correctamente!");
  });
}
```

## Demo del Formulario

<melser-playground-form id="dual-range-playground" title="Filtros de Búsqueda" description="Rangos de precio y tamaño.">
  <div style="margin-bottom: 1.5rem;">
    <melser-dual-range 
      name="priceRange"
      min="0" 
      max="5000" 
      value="500,2500"
      step="100"
      label="Rango de precios ($)">
    </melser-dual-range>
  </div>
  
  <div style="margin-bottom: 1.5rem;">
    <melser-dual-range 
      name="sizeRange"
      min="10" 
      max="500" 
      value="50,200"
      label="Tamaño (m²)">
    </melser-dual-range>
  </div>
  
  <div style="margin-bottom: 1.5rem;">
    <melser-dual-range 
      name="distanceRange"
      min="0" 
      max="100" 
      value="0,25"
      step="5"
      label="Distancia (km)">
    </melser-dual-range>
  </div>
</melser-playground-form>

## Personalización con CSS

### Variables CSS

```css
melser-dual-range {
  --melser-dual-range-height: 6px;
  --melser-dual-range-bg: #e5e7eb;
  --melser-dual-range-fill: #3b82f6;
  --melser-dual-range-thumb: #ffffff;
  --melser-dual-range-thumb-border: #3b82f6;
  --melser-dual-range-thumb-size: 20px;
  --melser-dual-range-focus-color: #2563eb;
  --melser-dual-range-disabled-bg: #f3f4f6;
  --melser-dual-range-disabled-thumb: #d1d5db;
}
```

### Ejemplos de Personalización

<style>
  .custom-dual-range {
    --melser-dual-range-fill: #10b981;
    --melser-dual-range-thumb-border: #10b981;
    --melser-dual-range-focus-color: #059669;
  }
  
  .large-dual-range {
    --melser-dual-range-height: 8px;
    --melser-dual-range-thumb-size: 24px;
  }
  
  .dark-theme-dual-range {
    --melser-dual-range-bg: #374151;
    --melser-dual-range-fill: #8b5cf6;
    --melser-dual-range-thumb-border: #8b5cf6;
    --melser-dual-range-focus-color: #7c3aed;
  }
</style>

<div class="custom-dual-range" style="margin-bottom: 1rem;">
  <melser-dual-range 
    min="0" 
    max="100" 
    value="25,75"
    label="Rango doble personalizado (verde)">
  </melser-dual-range>
</div>

<div class="large-dual-range" style="margin-bottom: 1rem;">
  <melser-dual-range 
    min="0" 
    max="100" 
    value="40,60"
    label="Rango doble grande">
  </melser-dual-range>
</div>

<div class="dark-theme-dual-range">
  <melser-dual-range 
    min="0" 
    max="100" 
    value="20,80"
    label="Rango doble tema oscuro (púrpura)">
  </melser-dual-range>
</div>

## Accesibilidad

El componente MelserDualRange incluye:

- **Navegación por teclado**: Flechas para ajustar valores
- **Screen reader support**: Anuncia valores y rangos
- **Focus visible**: Indicador claro de foco
- **High contrast**: Compatible con modo de alto contraste

## Mejores Prácticas

1. **Siempre incluye un label** para describir el propósito
2. **Usa pasos apropiados** para el tipo de dato
3. **Muestra los valores actuales** para mejor UX
4. **Valida que el mínimo no sea mayor que el máximo**
5. **Usa rangos lógicos** para la aplicación
6. **Considera el contexto** del rango seleccionado

## Troubleshooting

### El rango doble no responde a eventos

```javascript
// Verificar que el componente esté importado
import "melser-ui/components/melser-dual-range.js";

// Verificar que no esté deshabilitado
console.log(dualRange.disabled); // Debe ser false
```

### Los valores se cruzan

```javascript
// El componente debería prevenir que los valores se crucen
// Si ocurre, verifica el formato del valor
dualRange.value = "30,70"; // Formato correcto: "min,max"

// Evita valores como:
dualRange.value = "70,30"; // Incorrecto: max > min
```

### El valor no se envía en el formulario

```html
<!-- Asegúrate de incluir el atributo name -->
<melser-dual-range name="priceRange" min="0" max="1000" value="250,750">
</melser-dual-range>

// Recuperar valor en formulario const formData = new FormData(form); const
priceRange = formData.get('priceRange'); // "250,750" // Procesar los valores
const [minPrice, maxPrice] = priceRange.split(',').map(Number);
```

### Problemas de accesibilidad

```html
<!-- Para rangos complejos, usa aria-label -->
<melser-dual-range
  aria-label="Rango de precios mínimo y máximo"
  min="0"
  max="5000"
  value="1000,3000"
>
</melser-dual-range>
```
