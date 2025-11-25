---
title: MelserNumberInput
---

# MelserNumberInput

Un componente de entrada numérica con controles de incremento/decremento, validación de rangos y formateo.

## Ejemplo Básico

```html
<melser-number-input 
  label="Cantidad" 
  placeholder="Ingresa un número">
</melser-number-input>
```

## Demo Interactivo

<melser-number-input 
  id="demo-basic" 
  label="Número básico" 
  placeholder="0"
  value="0">
</melser-number-input>

<melser-number-input 
  id="demo-range" 
  label="Con rango (1-100)" 
  placeholder="50"
  min="1"
  max="100"
  value="50">
</melser-number-input>

<melser-number-input 
  id="demo-steps" 
  label="Con pasos (0.5)" 
  placeholder="0"
  min="0"
  max="10"
  step="0.5"
  value="2.5">
</melser-number-input>

<melser-number-input 
  id="demo-decimals" 
  label="Decimal (máx 2)" 
  placeholder="0.00"
  step="0.01"
  min="0"
  max="999.99">
</melser-number-input>

<melser-number-input 
  id="demo-disabled" 
  label="Deshabilitado" 
  value="100"
  disabled>
</melser-number-input>

<melser-number-input 
  id="demo-negative" 
  label="Números negativos" 
  min="-50"
  max="50"
  step="5"
  value="-10">
</melser-number-input>

## Propiedades

| Propiedad | Tipo | Valor por Defecto | Descripción |
|-----------|------|-------------------|-------------|
| `min` | `number` | `undefined` | Valor mínimo permitido |
| `max` | `number` | `undefined` | Valor máximo permitido |
| `step` | `number` | `1` | Incremento/decremento |
| `precision` | `number` | `undefined` | Decimales a mostrar |
| `show-controls` | `boolean` | `true` | Muestra botones + y - |
| `format-on-blur` | `boolean` | `false` | Formatea al perder el foco |
| `locale` | `string` | `'es-ES'` | Localización para formateo |
| `label` | `string` | `''` | Etiqueta visible del campo |
| `placeholder` | `string` | `''` | Texto de marcador de posición |
| `value` | `number` | `0` | Valor numérico del campo |
| `disabled` | `boolean` | `false` | Deshabilita la interacción |
| `readonly` | `boolean` | `false` | Solo lectura |
| `required` | `boolean` | `false` | Campo requerido en formularios |

## Eventos

| Evento | Descripción |
|--------|-------------|
| `input` | Se dispara al cambiar el valor |
| `change` | Se dispara al confirmar el cambio |
| `step-up` | Se dispara al incrementar |
| `step-down` | Se dispara al decrementar |
| `focus` | Se dispara al obtener el foco |
| `blur` | Se dispara al perder el foco |
| `invalid` | Se dispara con valor inválido |

## Ejemplos de Uso

### Input con Rango Específico

```html
<melser-number-input 
  label="Edad (años)"
  min="18"
  max="100"
  placeholder="25"
  hint="Solo personas mayores de 18 años">
</melser-number-input>
```

### Input con Pasos Personalizados

```html
<melser-number-input 
  label="Porcentaje (%)"
  min="0"
  max="100"
  step="5"
  value="25"
  show-controls
  format-on-blur>
</melser-number-input>
```

### Input Decimal Preciso

```html
<melser-number-input 
  label="Precio (€)"
  min="0"
  step="0.01"
  precision="2"
  placeholder="0.00"
  locale="es-ES"
  hint="Precisión hasta 2 decimales">
</melser-number-input>
```

### Input de Cantidad para Carrito

```html
<melser-number-input 
  label="Cantidad"
  min="1"
  max="99"
  step="1"
  value="1"
  show-controls
  class="cart-quantity">
</melser-number-input>
```

## Integración con Formularios

### Formulario de Producto

```html
<form id="product-form">
  <melser-number-input 
    label="Precio (€) *"
    name="price"
    type="number"
    min="0"
    step="0.01"
    precision="2"
    required
    placeholder="0.00">
  </melser-number-input>
  
  <melser-number-input 
    label="Stock disponible *"
    name="stock"
    min="0"
    max="1000"
    required
    value="0">
  </melser-number-input>
  
  <melser-number-input 
    label="Descuento (%)"
    name="discount"
    min="0"
    max="50"
    step="5"
    value="0">
  </melser-number-input>
  
  <melser-button type="submit" variant="primary">
    Guardar Producto
  </melser-button>
</form>
```

```javascript
const form = document.getElementById('product-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const price = parseFloat(form.querySelector('[name="price"]')?.value || '0');
    const stock = parseInt(form.querySelector('[name="stock"]')?.value || '0');
    const discount = parseFloat(form.querySelector('[name="discount"]')?.value || '0');
    
    if (price <= 0) {
      alert('El precio debe ser mayor a 0');
      return;
    }
    
    if (stock < 0) {
      alert('El stock no puede ser negativo');
      return;
    }
    
    const finalPrice = price * (1 - discount / 100);
    console.log('Producto:', { price, stock, discount, finalPrice });
    alert('¡Producto guardado exitosamente!');
  });
}
```

## Demo del Formulario

<form id="number-form">
  <div style="margin-bottom: 1rem;">
    <melser-number-input 
      label="Edad *"
      name="age"
      min="18"
      max="100"
      required
      placeholder="25"
      id="form-age">
    </melser-number-input>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <melser-number-input 
      label="Precio (€) *"
      name="price"
      min="0"
      step="0.01"
      precision="2"
      required
      placeholder="0.00"
      id="form-price">
    </melser-number-input>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <melser-number-input 
      label="Cantidad"
      name="quantity"
      min="1"
      max="50"
      value="1"
      id="form-quantity">
    </melser-number-input>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <melser-number-input 
      label="Descuento (%)"
      name="discount"
      min="0"
      max="50"
      step="5"
      value="0"
      id="form-discount">
    </melser-number-input>
  </div>
  
  <melser-button type="submit" variant="primary" id="form-submit">
    Calcular Total
  </melser-button>
</form>

<div id="calculation-result" style="margin-top: 1rem; padding: 1rem; background: #f3f4f6; border-radius: 6px; display: none;">
  <strong>Resultado del Cálculo:</strong>
  <div id="calc-details"></div>
</div>


## Personalización con CSS

### Variables CSS

```css
melser-number-input {
  --melser-number-input-width: 120px;
  --melser-number-input-height: 40px;
  --melser-number-input-padding: 8px 40px 8px 12px;
  --melser-number-controls-width: 32px;
  --melser-number-controls-bg: #f8f9fa;
  --melser-number-controls-hover-bg: #e9ecef;
  --melser-number-controls-border: #d1d5db;
  --melser-number-controls-border-radius: 0 6px 6px 0;
}
```

### Ejemplos de Personalización

<style>
  .custom-number {
    --melser-number-controls-bg: #dbeafe;
    --melser-number-controls-hover-bg: #bfdbfe;
    --melser-number-controls-border: #3b82f6;
  }
  
  .compact-number {
    --melser-number-input-width: 80px;
    --melser-number-input-height: 32px;
    --melser-number-controls-width: 24px;
  }
  
  .dark-number {
    --melser-number-controls-bg: #374151;
    --melser-number-controls-hover-bg: #4b5563;
    --melser-number-controls-border: #6b7280;
    --melser-number-input-bg: #1f2937;
    --melser-number-input-color: #f9fafb;
  }
</style>

<div class="custom-number" style="margin-bottom: 1rem;">
  <melser-number-input 
    label="Input personalizado"
    value="50">
  </melser-number-input>
</div>

<div class="compact-number" style="margin-bottom: 1rem;">
  <melser-number-input 
    label="Input compacto"
    min="0"
    max="10"
    value="5">
  </melser-number-input>
</div>

<div class="dark-number">
  <melser-number-input 
    label="Tema oscuro"
    value="42">
  </melser-number-input>
</div>

## Características Avanzadas

### Formateo Automático

```javascript
const numberInput = document.querySelector('melser-number-input');
if (numberInput) {
  numberInput.formatOnBlur = true;
  numberInput.locale = 'es-ES';
  
  numberInput.addEventListener('blur', (e) => {
    // Se formatea automáticamente al perder el foco
    console.log('Valor formateado:', e.target.value);
  });
}
```

### Validación Personalizada

```javascript
const numberInput = document.querySelector('melser-number-input');
if (numberInput) {
  numberInput.addEventListener('invalid', (e) => {
    const value = parseFloat(e.target.value);
    const min = parseFloat(e.target.min);
    const max = parseFloat(e.target.max);
    
    if (isNaN(value)) {
      console.log('⚠️ Valor no es un número');
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
<melser-number-input 
  label="Navegación por teclado"
  placeholder="Usa flechas arriba/abajo"
  min="0"
  max="100"
  step="1">
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
<melser-number-input 
  show-controls
  label="Con controles">
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
<melser-number-input 
  min="0"
  max="100"
  step="1"
  required>
```

### Problemas de accesibilidad

```html
<!-- Agregar etiquetas descriptivas -->
<melser-number-input 
  aria-label="Cantidad de productos (mínimo 1, máximo 99)"
  min="1"
  max="99">
```

### Focus no visible

```css
/* Personalizar indicador de foco */
melser-number-input:focus-within {
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