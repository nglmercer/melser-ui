---
title: MelserTextarea
---

# MelserTextarea

Un componente de área de texto avanzado con redimensionamiento automático, contador de caracteres y validación.

## Ejemplo Básico

```html
<melser-textarea 
  label="Comentarios" 
  placeholder="Escribe tus comentarios aquí...">
</melser-textarea>
```

## Demo Interactivo

<melser-textarea 
  id="demo-basic" 
  label="Comentarios" 
  placeholder="Escribe algo...">
</melser-textarea>

<melser-textarea 
  id="demo-resizable" 
  label="Área redimensionable" 
  placeholder="Puedes cambiar el tamaño..."
  resizable>
</melser-textarea>

<melser-textarea 
  id="demo-counter" 
  label="Con contador (500 máx)" 
  placeholder="Escribe tu mensaje..."
  maxlength="500"
  show-counter>
</melser-textarea>

<melser-textarea 
  id="demo-fixed" 
  label="Altura fija" 
  placeholder="Esta área no se puede redimensionar"
  rows="4"
  resize="none">
</melser-textarea>

## Propiedades

| Propiedad | Tipo | Valor por Defecto | Descripción |
|-----------|------|-------------------|-------------|
| `rows` | `number` | `4` | Número de filas visibles |
| `cols` | `number` | `undefined` | Número de columnas visibles |
| `resize` | `string` | `'both'` | Dirección de redimensionamiento (none, horizontal, vertical, both) |
| `resizable` | `boolean` | `true` | Permite redimensionamiento |
| `maxlength` | `number` | `undefined` | Longitud máxima permitida |
| `minlength` | `number` | `undefined` | Longitud mínima permitida |
| `show-counter` | `boolean` | `false` | Muestra contador de caracteres |
| `auto-resize` | `boolean` | `false` | Redimensionamiento automático |
| `label` | `string` | `''` | Etiqueta visible del campo |
| `placeholder` | `string` | `''` | Texto de marcador de posición |
| `value` | `string` | `''` | Valor del campo |
| `disabled` | `boolean` | `false` | Deshabilita la interacción |
| `readonly` | `boolean` | `false` | Solo lectura |
| `required` | `boolean` | `false` | Campo requerido en formularios |
| `wrap` | `string` | `'soft'` | Ajuste de línea (soft, hard) |

## Eventos

| Evento | Descripción |
|--------|-------------|
| `input` | Se dispara al cambiar el valor (en tiempo real) |
| `change` | Se dispara al confirmar el cambio (blur) |
| `focus` | Se dispara al obtener el foco |
| `blur` | Se dispara al perder el foco |
| `keydown` | Se dispara al presionar una tecla |
| `keyup` | Se dispara al soltar una tecla |

## Ejemplos de Uso

### Textarea con Redimensionamiento Automático

```html
<melser-textarea 
  label="Descripción detallada"
  placeholder="Describe tu producto o servicio..."
  auto-resize
  rows="3"
  maxlength="1000"
  show-counter
  hint="Se ajusta automáticamente al contenido">
</melser-textarea>
```

### Textarea con Validación

```html
<melser-textarea 
  label="Reseña del producto *"
  placeholder="Comparte tu experiencia..."
  required
  minlength="50"
  maxlength="500"
  show-counter
  hint="Mínimo 50 caracteres, máximo 500">
</melser-textarea>
```

### Textarea de Solo Lectura

```html
<melser-textarea 
  label="Términos y condiciones"
  value="Estos son los términos y condiciones..."
  readonly
  rows="6">
</melser-textarea>
```

### Textarea con Estilos Personalizados

```html
<melser-textarea 
  label="Comentario privado"
  placeholder="Solo visible para administradores..."
  class="private-comment"
  maxlength="200">
</melser-textarea>
```

## Integración con Formularios

### Formulario de Contacto

```html
<form id="contact-form">
  <melser-textarea 
    label="Mensaje *"
    name="message"
    required
    minlength="10"
    maxlength="1000"
    show-counter
    placeholder="Escribe tu mensaje aquí..."
    auto-resize>
  </melser-textarea>
  
  <melser-textarea 
    label="Información adicional"
    name="additionalInfo"
    rows="4"
    placeholder="Cualquier información extra que consideres relevante">
  </melser-textarea>
  
  <button  type="submit" variant="primary">
    Enviar Mensaje
  </button >
</form>
```

```javascript
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const message = form.querySelector('[name="message"]')?.value || '';
    const additionalInfo = form.querySelector('[name="additionalInfo"]')?.value || '';
    
    if (message.length < 10) {
      alert('El mensaje debe tener al menos 10 caracteres');
      return;
    }
    
    console.log('Datos del formulario:', { message, additionalInfo });
    alert('¡Mensaje enviado correctamente!');
  });
}
```

## Demo del Formulario

<melser-playground-form id="textarea-playground" schema-name="textarea" title="Formulario de Contacto" description="Mensaje y comentarios adicionales.">
  <div style="margin-bottom: 1rem;">
    <melser-textarea 
      label="Mensaje *"
      name="message"
      required
      minlength="10"
      maxlength="500"
      show-counter
      placeholder="Escribe tu mensaje aquí..."
      auto-resize>
    </melser-textarea>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <melser-textarea 
      label="Comentarios adicionales"
      name="additionalInfo"
      rows="4"
      placeholder="Información extra opcional...">
    </melser-textarea>
  </div>
</melser-playground-form>



## Personalización con CSS

### Variables CSS

```css
melser-textarea {
  --melser-textarea-min-height: 100px;
  --melser-textarea-padding: 12px;
  --melser-textarea-border: 1px solid #d1d5db;
  --melser-textarea-border-radius: 6px;
  --melser-textarea-focus-border: #3b82f6;
  --melser-textarea-resize-handle-size: 8px;
  --melser-textarea-counter-color: #6b7280;
  --melser-textarea-counter-font-size: 12px;
}
```

### Ejemplos de Personalización

<style>
  .custom-textarea {
    --melser-textarea-focus-border: #10b981;
    --melser-textarea-border-radius: 12px;
  }
  
  .compact-textarea {
    --melser-textarea-min-height: 80px;
    --melser-textarea-padding: 8px;
  }
  
  .fancy-textarea {
    --melser-textarea-border: 2px solid #8b5cf6;
    --melser-textarea-focus-border: #7c3aed;
    --melser-textarea-border-radius: 16px;
  }
</style>

<div class="custom-textarea" style="margin-bottom: 1rem;">
  <melser-textarea 
    label="Textarea personalizado"
    placeholder="Estilos personalizados">
  </melser-textarea>
</div>

<div class="compact-textarea" style="margin-bottom: 1rem;">
  <melser-textarea 
    label="Textarea compacto"
    placeholder="Más pequeño"
    rows="3">
  </melser-textarea>
</div>

<div class="fancy-textarea">
  <melser-textarea 
    label="Textarea elegante"
    placeholder="Con bordes morados"
    value="¡Se ve increíble!">
  </melser-textarea>
</div>

## Características Avanzadas

### Auto-resize Dinámico

```javascript
const textarea = document.querySelector('melser-textarea[auto-resize]');
if (textarea) {
  textarea.addEventListener('input', (e) => {
    // El componente maneja el auto-resize automáticamente
    console.log('Altura ajustada:', textarea.style.height);
  });
}
```

### Redimensionamiento Personalizado

```html
<!-- Solo vertical -->
<melser-textarea 
  resize="vertical"
  label="Solo altura ajustable">

<!-- Solo horizontal -->
<melser-textarea 
  resize="horizontal"
  label="Solo ancho ajustable">

<!-- Sin redimensionamiento -->
<melser-textarea 
  resize="none"
  label="Tamaño fijo">
```

## Accesibilidad

El componente MelserTextarea incluye:

- **Label asociado**: Relación semántica entre label y textarea
- **Counter accesible**: Información de caracteres para screen readers
- **Navegación por teclado**: Tab, Enter (nueva línea), Shift+Enter
- **Estados de focus**: Indicador visual claro
- **Redimensionamiento accesible**: Manejo con teclado

## Mejores Prácticas

1. **Usa auto-resize** para contenido dinámico
2. **Incluye contador** cuando hay límites de caracteres
3. **Establece filas mínimas** apropiadas para el contenido
4. **Proporciona placeholders** útiles
5. **Valida longitud mínima y máxima**
6. **Considera la experiencia móvil** para áreas grandes
7. **Usa resize="none"** para layouts fijos

## Troubleshooting

### Auto-resize no funciona

```javascript
// Asegúrate de usar el atributo correcto
textarea.setAttribute('auto-resize', '');

// O establecer la propiedad
textarea.autoResize = true;
```

### Redimensionamiento no se restringe

```html
<!-- Para controlar la dirección del redimensionamiento -->
<melser-textarea 
  resize="vertical"
  style="max-height: 200px; min-height: 100px;">
```

### Contador no aparece

```html
<!-- Asegúrate de incluir ambos atributos -->
<melser-textarea 
  maxlength="200"
  show-counter>
```

### Problemas con focus

```css
/* Mejorar la visibilidad del focus */
melser-textarea:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
```

