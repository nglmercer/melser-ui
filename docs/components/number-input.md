---
title: MelserNumberInput
---

# MelserNumberInput

Un componente de entrada numérica con controles de incremento/decremento, validación de rangos y formateo.

## Ejemplo Básico

```html
<me-number-input label="Cantidad" placeholder="Ingresa un número">
</me-number-input>
```

## Demo Interactivo

<me-number-input 
  id="demo-basic" 
  label="Número básico" 
  placeholder="0"
  value="0">
</me-number-input>

<me-number-input 
  id="demo-range" 
  label="Con rango (1-100)" 
  placeholder="50"
  min="1"
  max="100"
  value="50">
</me-number-input>

<me-number-input 
  id="demo-steps" 
  label="Con pasos (0.5)" 
  placeholder="0"
  min="0"
  max="10"
  step="0.5"
  value="2.5">
</me-number-input>

<me-number-input 
  id="demo-decimals" 
  label="Decimal (máx 2)" 
  placeholder="0.00"
  step="0.01"
  min="0"
  max="2.00">
</me-number-input>

<me-number-input 
  id="demo-disabled" 
  label="Deshabilitado" 
  value="100"
  disabled>
</me-number-input>

<me-number-input 
  id="demo-negative" 
  label="Números negativos" 
  min="-50"
  max="50"
  step="5"
  value="-10">
</me-number-input>

## Propiedades

| Propiedad        | Tipo      | Valor por Defecto | Descripción                    |
| ---------------- | --------- | ----------------- | ------------------------------ |
| `min`            | `number`  | `undefined`       | Valor mínimo permitido         |
| `max`            | `number`  | `undefined`       | Valor máximo permitido         |
| `step`           | `number`  | `1`               | Incremento/decremento          |
| `precision`      | `number`  | `undefined`       | Decimales a mostrar            |
| `show-controls`  | `boolean` | `true`            | Muestra botones + y -          |
| `format-on-blur` | `boolean` | `false`           | Formatea al perder el foco     |
| `locale`         | `string`  | `'es-ES'`         | Localización para formateo     |
| `label`          | `string`  | `''`              | Etiqueta visible del campo     |
| `placeholder`    | `string`  | `''`              | Texto de marcador de posición  |
| `value`          | `number`  | `0`               | Valor numérico del campo       |
| `disabled`       | `boolean` | `false`           | Deshabilita la interacción     |
| `readonly`       | `boolean` | `false`           | Solo lectura                   |
| `required`       | `boolean` | `false`           | Campo requerido en formularios |

## Eventos

| Evento      | Descripción                       |
| ----------- | --------------------------------- |
| `input`     | Se dispara al cambiar el valor    |
| `change`    | Se dispara al confirmar el cambio |
| `step-up`   | Se dispara al incrementar         |
| `step-down` | Se dispara al decrementar         |
| `focus`     | Se dispara al obtener el foco     |
| `blur`      | Se dispara al perder el foco      |
| `invalid`   | Se dispara con valor inválido     |

## Ejemplos de Uso

### Input con Rango Específico

```html
<me-number-input
  label="Edad (años)"
  min="18"
  max="100"
  placeholder="25"
  hint="Solo personas mayores de 18 años"
>
</me-number-input>
```

### Input con Pasos Personalizados

```html
<me-number-input
  label="Porcentaje (%)"
  min="0"
  max="100"
  step="5"
  value="25"
  show-controls
  format-on-blur
>
</me-number-input>
```

### Input Decimal Preciso

```html
<me-number-input
  label="Precio (€)"
  min="0"
  step="0.01"
  precision="2"
  placeholder="0.00"
  locale="es-ES"
  hint="Precisión hasta 2 decimales"
>
</me-number-input>
```

### Input de Cantidad para Carrito

```html
<me-number-input
  label="Cantidad"
  min="1"
  max="99"
  step="1"
  value="1"
  show-controls
  class="cart-quantity"
>
</me-number-input>
```

## Integración con Formularios

### Formulario de Producto

```html
<form id="product-form">
  <me-number-input
    label="Precio (€) *"
    name="price"
    type="number"
    min="0"
    step="0.01"
    precision="2"
    required
    placeholder="0.00"
  >
  </me-number-input>

  <me-number-input
    label="Stock disponible *"
    name="stock"
    min="0"
    max="1000"
    required
    value="0"
  >
  </me-number-input>

  <me-number-input
    label="Descuento (%)"
    name="discount"
    min="0"
    max="50"
    step="5"
    value="0"
  >
  </me-number-input>

  <button type="submit" variant="primary">Guardar Producto</button>
</form>
```

```javascript
const form = document.getElementById("product-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const price = parseFloat(
      form.querySelector('[name="price"]')?.value || "0"
    );
    const stock = parseInt(form.querySelector('[name="stock"]')?.value || "0");
    const discount = parseFloat(
      form.querySelector('[name="discount"]')?.value || "0"
    );

    if (price <= 0) {
      alert("El precio debe ser mayor a 0");
      return;
    }

    if (stock < 0) {
      alert("El stock no puede ser negativo");
      return;
    }

    const finalPrice = price * (1 - discount / 100);
    console.log("Producto:", { price, stock, discount, finalPrice });
    alert("¡Producto guardado exitosamente!");
  });
}
```

## Demo del Formulario

<me-playground-form id="number-input-playground" schema-name="number-input" title="Cálculo de Productos" description="Calculadora de precios con validación en tiempo real.">
  <div style="margin-bottom: 1rem;">
    <me-number-input 
      label="Edad *"
      name="age"
      min="18"
      max="100"
      required
      placeholder="25">
    </me-number-input>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <me-number-input 
      label="Precio (€) *"
      name="price"
      min="0"
      step="0.01"
      precision="2"
      required
      placeholder="0.00">
    </me-number-input>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <me-number-input 
      label="Cantidad"
      name="quantity"
      min="1"
      max="50"
      value="1">
    </me-number-input>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <me-number-input 
      label="Descuento (%)"
      name="discount"
      min="0"
      max="50"
      step="5"
      value="0">
    </me-number-input>
  </div>
</me-playground-form>

## Personalización con CSS

### Variables CSS

```css
me-number-input {
  --me-number-input-width: 120px;
  --me-number-input-height: 40px;
  --me-number-input-padding: 8px 40px 8px 12px;
  --me-number-controls-width: 32px;
  --me-number-controls-bg: #f8f9fa;
  --me-number-controls-hover-bg: #e9ecef;
  --me-number-controls-border: #d1d5db;
  --me-number-controls-border-radius: 0 6px 6px 0;
}
```

### Ejemplos de Personalización

<style>
  .custom-number {
    --me-number-controls-bg: #dbeafe;
    --me-number-controls-hover-bg: #bfdbfe;
    --me-number-controls-border: #3b82f6;
  }
  
  .compact-number {
    --me-number-input-width: 80px;
    --me-number-input-height: 32px;
    --me-number-controls-width: 24px;
  }
  
  .dark-number {
    --me-number-controls-bg: #374151;
    --me-number-controls-hover-bg: #4b5563;
    --me-number-controls-border: #6b7280;
    --me-number-input-bg: #1f2937;
    --me-number-input-color: #f9fafb;
  }
</style>

<div class="custom-number" style="margin-bottom: 1rem;">
  <me-number-input 
    label="Input personalizado"
    value="50">
  </me-number-input>
</div>

<div class="compact-number" style="margin-bottom: 1rem;">
  <me-number-input 
    label="Input compacto"
    min="0"
    max="10"
    value="5">
  </me-number-input>
</div>

<div class="dark-number">
  <me-number-input 
    label="Tema oscuro"
    value="42">
  </me-number-input>
</div>

<h3>Colores</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-number-input label="Success" color="success" value="100"></me-number-input>
  <me-number-input label="Warning" color="warning" value="50"></me-number-input>
  <me-number-input label="Danger" color="danger" value="0"></me-number-input>
</div>

## Características Avanzadas

### Formateo Automático

```javascript
const numberInput = document.querySelector("me-number-input");
if (numberInput) {
  numberInput.formatOnBlur = true;
  numberInput.locale = "es-ES";

  numberInput.addEventListener("blur", (e) => {
    // Se formatea automáticamente al perder el foco
    console.log("Valor formateado:", e.target.value);
  });
}
```

### Validación Personalizada

```javascript
const numberInput = document.querySelector("me-number-input");
if (numberInput) {
  numberInput.addEventListener("invalid", (e) => {
    const value = parseFloat(e.target.value);
    const min = parseFloat(e.target.min);
    const max = parseFloat(e.target.max);

    if (isNaN(value)) {
      console.log("⚠️ Valor no es un número");
    } else if (value < min) {
      console.log(`⚠️ El valor debe ser mayor o igual a ${min}`);
    } else if (value > max) {
      console.log(`⚠️ El valor debe ser menor o igual a ${max}`);
    }
  });
}
```

### Controles de Teclado

```html
<me-number-input
  label="Navegación por teclado"
  placeholder="Usa flechas arriba/abajo"
  min="0"
  max="100"
  step="1"
></me-number-input>
```

**Controles disponibles:**

- ↑ (Arrow Up): Incrementa el valor
- ↓ (Arrow Down): Decrementa el valor
- Page Up: Incrementa por 10
- Page Down: Decrementa por 10
- Home: Va al mínimo
- End: Va al máximo

## Accesibilidad

El componente MelserNumberInput incluye:

- **Controles accesibles**: Botones + y - con aria-labels apropiados
- **Navegación por teclado**: Flechas y Page Up/Down funcionan
- **Validación semántica**: Errores anunciados por screen readers
- **Focus management**: Indicador visual claro
- **Values announced**: Cambios de valor anunciados automáticamente

## Mejores Prácticas

1. **Establece rangos apropiados** (min/max) para tu caso de uso
2. **Usa pasos lógicos** para la navegación (step)
3. **Incluye controles visuales** para mejor UX
4. **Formatea números** según la localización
5. **Valida en tiempo real** pero no intrusivo
6. **Proporciona feedback** para valores inválidos
7. **Considera la precisión** para cálculos

## Troubleshooting

### Controles no aparecen

```html
<!-- Verificar que show-controls esté habilitado -->
<me-number-input show-controls label="Con controles"></me-number-input>
```

### Valor no se actualiza

```javascript
// Verificar que el valor sea numérico
numberInput.value = 42; // Correcto
// numberInput.value = "42"; // También funciona
```

### Validación de rango no funciona

```html
<!-- Asegurar que los atributos estén configurados -->
<me-number-input min="0" max="100" step="1" required></me-number-input>
```

### Problemas de accesibilidad

```html
<!-- Agregar etiquetas descriptivas -->
<me-number-input
  aria-label="Cantidad de productos (mínimo 1, máximo 99)"
  min="1"
  max="99"
></me-number-input>
```

### Focus no visible

```css
/* Personalizar indicador de foco */
me-number-input:focus-within {
  box-shadow: 0 0 0 2px #3b82f6;
  border-color: #3b82f6;
}
```

### Problemas con números decimales

```javascript
// Configurar precisión apropiada
numberInput.step = 0.01;
numberInput.precision = 2;
numberInput.formatOnBlur = true;
```
