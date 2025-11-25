---
title: MelserRating
---

# MelserRating

Un componente de calificación con estrellas interactivo, soporte para medios puntos, personalización de iconos y validación.

## Ejemplo Básico

```html
<melser-rating 
  label="Califica este servicio" 
  max="5">
</melser-rating>
```

## Demo Interactivo

<melser-rating 
  id="demo-basic" 
  label="Calificación básica" 
  max="5">
</melser-rating>

<melser-rating 
  id="demo-half" 
  label="Con medios puntos" 
  max="5"
  allow-half>
</melser-rating>

<melser-rating 
  id="demo-initial" 
  label="Con valor inicial" 
  max="5"
  value="4"
  show-value>
</melser-rating>

<melser-rating 
  id="demo-disabled" 
  label="Deshabilitado" 
  max="5"
  value="3"
  disabled
  show-value>
</melser-rating>

<melser-rating 
  id="demo-icons" 
  label="Con iconos personalizados" 
  max="5"
  icon="heart"
  value="3.5"
  allow-half>
</melser-rating>

<melser-rating 
  id="demo-colors" 
  label="Con colores personalizados" 
  max="5"
  value="4.5"
  allow-half
  color="#10b981"
  hover-color="#059669">
</melser-rating>

<melser-rating 
  id="demo-sizes" 
  label="Diferentes tamaños">
</melser-rating>

<div style="margin: 1rem 0; display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
  <melser-rating size="sm" label="Pequeño"></melser-rating>
  <melser-rating size="md" label="Mediano"></melser-rating>
  <melser-rating size="lg" label="Grande"></melser-rating>
</div>


## Propiedades

| Propiedad | Tipo | Valor por Defecto | Descripción |
|-----------|------|-------------------|-------------|
| `value` | `number` | `0` | Valor de calificación actual |
| `max` | `number` | `5` | Máximo número de elementos |
| `allow-half` | `boolean` | `false` | Permite calificaciones de medio punto |
| `size` | `string` | `'md'` | Tamaño de los iconos (sm, md, lg) |
| `icon` | `string` | `'star'` | Tipo de icono (star, heart, thumb, etc.) |
| `color` | `string` | `'#fbbf24'` | Color de los elementos activos |
| `hover-color` | `string` | `''` | Color al hacer hover |
| `disabled` | `boolean` | `false` | Deshabilita la interacción |
| `readonly` | `boolean` | `false` | Solo lectura |
| `show-value` | `boolean` | `false` | Muestra el valor numérico |
| `required` | `boolean` | `false` | Campo requerido en formularios |
| `label` | `string` | `''` | Etiqueta visible del componente |

## Eventos

| Evento | Descripción |
|--------|-------------|
| `change` | Se dispara al cambiar la calificación |
| `hover` | Se dispara al hacer hover sobre elementos |
| `focus` | Se dispara al obtener el foco |
| `blur` | Se dispara al perder el foco |

## Ejemplos de Uso

### Calificación Básica

```html
<melser-rating 
  label="Califica este producto"
  name="rating"
  required
  max="5"
  show-value>
</melser-rating>
```

### Calificación con Medios Puntos

```html
<melser-rating 
  label="Calidad del servicio"
  name="serviceQuality"
  max="5"
  allow-half
  show-value
  color="#10b981">
</melser-rating>
```

### Calificación con Iconos Personalizados

```html
<melser-rating 
  label="¿Te gustó?"
  name="liked"
  max="5"
  icon="thumb"
  allow-half
  color="#3b82f6"
  show-value>
</melser-rating>
```

### Calificación de Producto

```html
<melser-rating 
  label="Calificación del producto"
  name="productRating"
  max="5"
  allow-half
  value="4.5"
  show-value
  color="#f59e0b"
  hover-color="#d97706"
  required>
</melser-rating>
```

## Integración con Formularios

### Formulario de Reseña de Producto

```html
<form id="review-form">
  <div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <h4>⭐ Calificaciones</h4>
    
    <melser-rating 
      label="Calificación general *"
      name="overallRating"
      required
      max="5"
      allow-half
      show-value
      color="#f59e0b"
      id="form-overall">
    </melser-rating>
    
    <melser-rating 
      label="Calidad del producto"
      name="quality"
      max="5"
      allow-half
      show-value
      color="#10b981"
      id="form-quality">
    </melser-rating>
    
    <melser-rating 
      label="Rapidez de entrega"
      name="deliverySpeed"
      max="5"
      allow-half
      show-value
      color="#3b82f6"
      id="form-delivery">
    </melser-rating>
    
    <melser-rating 
      label="Atención al cliente"
      name="customerService"
      max="5"
      allow-half
      show-value
      color="#8b5cf6"
      id="form-service">
    </melser-rating>
  </div>
  
  <div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <h4>💬 Comentarios</h4>
    
    <melser-textarea 
      label="Comparte tu experiencia"
      name="comment"
      placeholder="Cuéntanos qué te gustó o qué se puede mejorar..."
      rows="4"
      id="form-comment">
    </melser-textarea>
  </div>
  
  <melser-button type="submit" variant="primary">
    Enviar Reseña
  </melser-button>
</form>
```

```javascript
const form = document.getElementById('review-form');
if (form) {
  const ratings = form.querySelectorAll('melser-rating');
  
  // Manejar hover para feedback visual
  ratings.forEach(rating => {
    rating.addEventListener('hover', (e) => {
      console.log(`Hover sobre ${rating.label}:`, e.detail.value);
    });
    
    rating.addEventListener('change', (e) => {
      console.log(`Calificación ${rating.label}:`, e.target.value);
    });
  });
  
  // Calcular puntuación promedio
  function calculateAverage() {
    const values = Array.from(ratings).map(r => parseFloat(r.value)).filter(v => v > 0);
    if (values.length === 0) return 0;
    
    const sum = values.reduce((acc, val) => acc + val, 0);
    return (sum / values.length).toFixed(1);
  }
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const overallRating = form.querySelector('[name="overallRating"]')?.value || '0';
    const quality = form.querySelector('[name="quality"]')?.value || '0';
    const deliverySpeed = form.querySelector('[name="deliverySpeed"]')?.value || '0';
    const customerService = form.querySelector('[name="customerService"]')?.value || '0';
    const comment = form.querySelector('[name="comment"]')?.value || '';
    
    if (overallRating === '0') {
      alert('Por favor proporciona una calificación general');
      return;
    }
    
    const ratings = { overallRating, quality, deliverySpeed, customerService };
    const average = calculateAverage();
    
    const reviewData = {
      ratings,
      averageRating: average,
      comment,
      timestamp: new Date().toISOString()
    };
    
    console.log('Reseña enviada:', reviewData);
    alert(`¡Reseña enviada exitosamente!\n\nCalificación promedio: ${average}/5`);
  });
}
```

## Demo del Formulario

<form id="rating-form">
  <div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <h4>🌟 Califica tu Experiencia</h4>
    
    <melser-rating 
      label="Experiencia general *"
      name="generalExp"
      required
      max="5"
      allow-half
      show-value
      color="#f59e0b"
      id="form-general">
    </melser-rating>
    
    <melser-rating 
      label="Facilidad de uso"
      name="easeOfUse"
      max="5"
      allow-half
      show-value
      color="#10b981"
      id="form-ease">
    </melser-rating>
    
    <melser-rating 
      label="Diseño visual"
      name="design"
      max="5"
      allow-half
      show-value
      color="#3b82f6"
      id="form-design">
    </melser-rating>
    
    <melser-rating 
      label="Funcionalidad"
      name="functionality"
      max="5"
      allow-half
      show-value
      color="#8b5cf6"
      id="form-functionality">
    </melser-rating>
    
    <melser-rating 
      label="Soporte técnico"
      name="support"
      max="5"
      allow-half
      show-value
      color="#ef4444"
      id="form-support">
    </melser-rating>
  </div>
  
  <div id="rating-summary" style="margin-bottom: 1rem; padding: 1rem; background: #f3f4f6; border-radius: 6px; display: none;">
    <strong>📊 Resumen de Calificaciones:</strong>
    <div id="rating-details"></div>
  </div>
  
  <melser-button type="submit" variant="primary" id="form-submit">
    Enviar Calificación
  </melser-button>
</form>

<div id="rating-result" style="margin-top: 1rem; padding: 1rem; background: #f3f4f6; border-radius: 6px; display: none;">
  <strong>Resultado Final:</strong>
  <div id="rating-final"></div>
</div>


## Personalización con CSS

### Variables CSS

```css
melser-rating {
  --melser-rating-size: 24px;
  --melser-rating-gap: 4px;
  --melser-rating-color: #fbbf24;
  --melser-rating-hover-color: #f59e0b;
  --melser-rating-disabled-color: #d1d5db;
  --melser-rating-transition: all 0.2s ease;
}
```

### Ejemplos de Personalización

<style>
  .custom-rating {
    --melser-rating-size: 32px;
    --melser-rating-gap: 8px;
    --melser-rating-color: #10b981;
    --melser-rating-hover-color: #059669;
  }
  
  .minimal-rating {
    --melser-rating-size: 20px;
    --melser-rating-gap: 2px;
    --melser-rating-color: #6b7280;
    --melser-rating-hover-color: #4b5563;
  }
  
  .dark-rating {
    --melser-rating-color: #8b5cf6;
    --melser-rating-hover-color: #7c3aed;
    --melser-rating-disabled-color: #374151;
  }
</style>

<div class="custom-rating" style="margin-bottom: 1rem;">
  <melser-rating 
    label="Rating personalizado"
    value="4"
    max="5"
    show-value>
  </melser-rating>
</div>

<div class="minimal-rating" style="margin-bottom: 1rem;">
  <melser-rating 
    label="Rating minimalista"
    value="3.5"
    allow-half
    show-value>
  </melser-rating>
</div>

<div class="dark-rating">
  <melser-rating 
    label="Rating tema oscuro"
    value="4.5"
    allow-half
    show-value>
  </melser-rating>
</div>

## Características Avanzadas

### Validación de Calificación

```javascript
const rating = document.querySelector('melser-rating[required]');
if (rating) {
  rating.addEventListener('change', (e) => {
    const value = parseFloat(e.target.value);
    
    // Validación personalizada
    if (value === 0) {
      alert('Por favor proporciona una calificación');
      return;
    }
    
    // Feedback según la calificación
    if (value <= 2) {
      console.log('⚠️ Calificación baja, considera pedir feedback adicional');
    } else if (value >= 4.5) {
      console.log('✅ Excelente calificación!');
    }
  });
}
```

### Calificación con Límites

```javascript
const rating = document.querySelector('melser-rating');
if (rating) {
  // Establecer límites dinámicos
  rating.minRating = 1;
  rating.maxRating = 5;
  
  // Deshabilitar después de calificar
  rating.addEventListener('change', (e) => {
    if (e.target.value > 0) {
      // Simular que ya fue calificada
      setTimeout(() => {
        rating.disabled = true;
        console.log('Calificación guardada y bloqueada');
      }, 1000);
    }
  });
}
```

### Múltiples Calificaciones Interconectadas

```javascript
const ratings = document.querySelectorAll('melser-rating');
ratings.forEach(rating => {
  rating.addEventListener('change', (e) => {
    const value = parseFloat(e.target.value);
    
    // Auto-calcular calificación general basada en otras
    if (rating.name !== 'overall') {
      const others = Array.from(ratings).filter(r => r !== rating && r.name !== 'overall');
      const othersValues = others.map(r => parseFloat(r.value)).filter(v => v > 0);
      
      if (othersValues.length > 0) {
        const average = (othersValues.reduce((sum, val) => sum + val, 0) / othersValues.length).toFixed(1);
        
        // Actualizar calificación general si no ha sido manualmente establecida
        const overallRating = document.querySelector('melser-rating[name="overall"]');
        if (overallRating && overallRating.value === '0') {
          overallRating.value = average;
          overallRating.dispatchEvent(new Event('change'));
        }
      }
    }
  });
});
```

## Accesibilidad

El componente MelserRating incluye:

- **Navegación por teclado**: Flechas, Tab, Enter, Space
- **Anuncios de screen readers**: Calificaciones y cambios anunciados
- **ARIA labels**: Completamente etiquetado para accesibilidad
- **Focus management**: Navegación lógica entre elementos
- **Estados de disabled**: Correctamente anunciados

## Mejores Prácticas

1. **Usa max apropiado** según el contexto (5 para productos, 10 para servicios)
2. **Permite medios puntos** para mayor precisión
3. **Incluye show-value** para feedback numérico
4. **Proporciona colores significativos** (verde=bueno, rojo=malo)
5. **Maneja estados hover** para mejor UX
6. **Considera iconos específicos** según el contexto
7. **Valida calificaciones mínimas** cuando sea necesario

## Troubleshooting

### Rating no responde a clicks

```javascript
// Verificar que el componente esté importado
import 'melser-ui/components/melser-rating.js';

// Verificar que no esté deshabilitado
console.log(rating.disabled); // Debe ser false
```

### Medios puntos no funcionan

```html
<!-- Verificar que allow-half esté habilitado -->
<melser-rating 
  allow-half
  label="Con medios puntos">
```

### Valor inicial no se muestra

```html
<!-- Verificar que value esté configurado -->
<melser-rating 
  value="4.5"
  show-value
  label="Con valor inicial">
```

### Iconos no cambian

```html
<!-- Verificar que icon esté en la lista de iconos válidos -->
<melser-rating 
  icon="heart"
  label="Con iconos de corazón">
```

### Focus no visible

```css
/* Personalizar indicador de foco */
melser-rating:focus-within {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
```

### Problemas de accesibilidad

```html
<!-- Agregar descripción para casos específicos -->
<melser-rating 
  aria-label="Califica del 1 al 5 estrellas la calidad del producto"
  allow-half
  show-value>
```

### Performance con muchos ratings

```javascript
// Limitar elementos renderizados
rating.maxVisibleItems = 10;
```

### Colores no se aplican

```html
<!-- Verificar que los colores estén en formato correcto -->
<melser-rating 
  color="#10b981"
  hover-color="#059669"
  label="Con colores personalizados">
```

### Hover no funciona

```javascript
// Verificar eventos de hover
rating.addEventListener('hover', (e) => {
  console.log('Hover value:', e.detail.value);
});
