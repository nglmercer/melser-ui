---
title: MelserTextarea
---

# MelserTextarea

Un componente de área de texto avanzado con redimensionamiento automático, contador de caracteres y validación.

## Ejemplo Básico

```html
<me-textarea label="Comentarios" placeholder="Escribe tus comentarios aquí...">
</me-textarea>
```

## Demo Interactivo

<me-textarea 
  id="demo-basic" 
  label="Comentarios" 
  placeholder="Escribe algo...">
</me-textarea>

<me-textarea 
  id="demo-resizable" 
  label="Área redimensionable" 
  placeholder="Puedes cambiar el tamaño..."
  resizable>
</me-textarea>

<me-textarea 
  id="demo-counter" 
  label="Con contador (500 máx)" 
  placeholder="Escribe tu mensaje..."
  maxlength="500"
  show-counter>
</me-textarea>

<me-textarea 
  id="demo-fixed" 
  label="Altura fija" 
  placeholder="Esta área no se puede redimensionar"
  rows="4"
  resize="none">
</me-textarea>

## Propiedades

| Propiedad      | Tipo      | Valor por Defecto | Descripción                                                        |
| -------------- | --------- | ----------------- | ------------------------------------------------------------------ |
| `rows`         | `number`  | `4`               | Número de filas visibles                                           |
| `cols`         | `number`  | `undefined`       | Número de columnas visibles                                        |
| `resize`       | `string`  | `'both'`          | Dirección de redimensionamiento (none, horizontal, vertical, both) |
| `resizable`    | `boolean` | `true`            | Permite redimensionamiento                                         |
| `maxlength`    | `number`  | `undefined`       | Longitud máxima permitida                                          |
| `minlength`    | `number`  | `undefined`       | Longitud mínima permitida                                          |
| `show-counter` | `boolean` | `false`           | Muestra contador de caracteres                                     |
| `auto-resize`  | `boolean` | `false`           | Redimensionamiento automático                                      |
| `label`        | `string`  | `''`              | Etiqueta visible del campo                                         |
| `placeholder`  | `string`  | `''`              | Texto de marcador de posición                                      |
| `value`        | `string`  | `''`              | Valor del campo                                                    |
| `disabled`     | `boolean` | `false`           | Deshabilita la interacción                                         |
| `readonly`     | `boolean` | `false`           | Solo lectura                                                       |
| `required`     | `boolean` | `false`           | Campo requerido en formularios                                     |
| `wrap`         | `string`  | `'soft'`          | Ajuste de línea (soft, hard)                                       |

## Eventos

| Evento    | Descripción                                     |
| --------- | ----------------------------------------------- |
| `input`   | Se dispara al cambiar el valor (en tiempo real) |
| `change`  | Se dispara al confirmar el cambio (blur)        |
| `focus`   | Se dispara al obtener el foco                   |
| `blur`    | Se dispara al perder el foco                    |
| `keydown` | Se dispara al presionar una tecla               |
| `keyup`   | Se dispara al soltar una tecla                  |

## Ejemplos de Uso

### Textarea con Redimensionamiento Automático

```html
<me-textarea
  label="Descripción detallada"
  placeholder="Describe tu producto o servicio..."
  auto-resize
  rows="3"
  maxlength="1000"
  show-counter
  hint="Se ajusta automáticamente al contenido"
>
</me-textarea>
```

### Textarea con Validación

```html
<me-textarea
  label="Reseña del producto *"
  placeholder="Comparte tu experiencia..."
  required
  minlength="50"
  maxlength="500"
  show-counter
  hint="Mínimo 50 caracteres, máximo 500"
>
</me-textarea>
```

### Textarea de Solo Lectura

```html
<me-textarea
  label="Términos y condiciones"
  value="Estos son los términos y condiciones..."
  readonly
  rows="6"
>
</me-textarea>
```

### Textarea con Estilos Personalizados

```html
<me-textarea
  label="Comentario privado"
  placeholder="Solo visible para administradores..."
  class="private-comment"
  maxlength="200"
>
</me-textarea>
```

## Integración con Formularios

### Formulario de Contacto

```html
<form id="contact-form">
  <me-textarea
    label="Mensaje *"
    name="message"
    required
    minlength="10"
    maxlength="1000"
    show-counter
    placeholder="Escribe tu mensaje aquí..."
    auto-resize
  >
  </me-textarea>

  <me-textarea
    label="Información adicional"
    name="additionalInfo"
    rows="4"
    placeholder="Cualquier información extra que consideres relevante"
  >
  </me-textarea>

  <button type="submit" variant="primary">Enviar Mensaje</button>
</form>
```

```javascript
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const message = form.querySelector('[name="message"]')?.value || "";
    const additionalInfo =
      form.querySelector('[name="additionalInfo"]')?.value || "";

    if (message.length < 10) {
      alert("El mensaje debe tener al menos 10 caracteres");
      return;
    }

    console.log("Datos del formulario:", { message, additionalInfo });
    alert("¡Mensaje enviado correctamente!");
  });
}
```

## Demo del Formulario

<me-playground-form id="textarea-playground" schema-name="textarea" title="Formulario de Contacto" description="Mensaje y comentarios adicionales.">
  <div style="margin-bottom: 1rem;">
    <me-textarea 
      label="Mensaje *"
      name="message"
      required
      minlength="10"
      maxlength="500"
      show-counter
      placeholder="Escribe tu mensaje aquí..."
      auto-resize>
    </me-textarea>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <me-textarea 
      label="Comentarios adicionales"
      name="additionalInfo"
      rows="4"
      placeholder="Información extra opcional...">
    </me-textarea>
  </div>
</me-playground-form>

## Personalización con CSS

### Variables CSS

```css
me-textarea {
  --me-textarea-min-height: 100px;
  --me-textarea-padding: 12px;
  --me-textarea-border: 1px solid #d1d5db;
  --me-textarea-border-radius: 6px;
  --me-textarea-focus-border: #3b82f6;
  --me-textarea-resize-handle-size: 8px;
  --me-textarea-counter-color: #6b7280;
  --me-textarea-counter-font-size: 12px;
}
```

### Ejemplos de Personalización

<style>
  .custom-textarea {
    --me-textarea-focus-border: #10b981;
    --me-textarea-border-radius: 12px;
  }
  
  .compact-textarea {
    --me-textarea-min-height: 80px;
    --me-textarea-padding: 8px;
  }
  
  .fancy-textarea {
    --me-textarea-border: 2px solid #8b5cf6;
    --me-textarea-focus-border: #7c3aed;
    --me-textarea-border-radius: 16px;
  }
</style>

<div class="custom-textarea" style="margin-bottom: 1rem;">
  <me-textarea 
    label="Textarea personalizado"
    placeholder="Estilos personalizados">
  </me-textarea>
</div>

<div class="compact-textarea" style="margin-bottom: 1rem;">
  <me-textarea 
    label="Textarea compacto"
    placeholder="Más pequeño"
    rows="3">
  </me-textarea>
</div>

<div class="fancy-textarea">
  <me-textarea 
    label="Textarea elegante"
    placeholder="Con bordes morados"
    value="¡Se ve increíble!">
  </me-textarea>
</div>

## Características Avanzadas

### Auto-resize Dinámico

```javascript
const textarea = document.querySelector("me-textarea[auto-resize]");
if (textarea) {
  textarea.addEventListener("input", (e) => {
    // El componente maneja el auto-resize automáticamente
    console.log("Altura ajustada:", textarea.style.height);
  });
}
```

### Redimensionamiento Personalizado

```html
<!-- Solo vertical -->
<me-textarea resize="vertical" label="Solo altura ajustable">
  <!-- Solo horizontal -->
  <me-textarea resize="horizontal" label="Solo ancho ajustable">
    <!-- Sin redimensionamiento -->
    <me-textarea resize="none" label="Tamaño fijo"></me-textarea></me-textarea
></me-textarea>
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
textarea.setAttribute("auto-resize", "");

// O establecer la propiedad
textarea.autoResize = true;
```

### Redimensionamiento no se restringe

```html
<!-- Para controlar la dirección del redimensionamiento -->
<me-textarea
  resize="vertical"
  style="max-height: 200px; min-height: 100px;"
></me-textarea>
```

### Contador no aparece

```html
<!-- Asegúrate de incluir ambos atributos -->
<me-textarea maxlength="200" show-counter></me-textarea>
```

### Problemas con focus

```css
/* Mejorar la visibilidad del focus */
me-textarea:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
```
