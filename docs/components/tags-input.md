---
title: MelserTagsInput
---

# MelserTagsInput

Un componente de entrada de etiquetas para agregar, editar y eliminar tags con autocompletado y validación personalizada.

## Ejemplo Básico

```html
<melser-tags-input placeholder="Agrega etiquetas..." label="Etiquetas">
</melser-tags-input>
```

## Demo Interactivo

<melser-tags-input 
  id="demo-basic" 
  placeholder="Escribe y presiona Enter"
  label="Etiquetas básicas">
</melser-tags-input>

<melser-tags-input 
  id="demo-readonly" 
  value="JavaScript, React, Vue"
  readonly
  label="Etiquetas de solo lectura">
</melser-tags-input>

<melser-tags-input 
  id="demo-disabled" 
  value="HTML, CSS, JavaScript"
  disabled
  label="Etiquetas deshabilitadas">
</melser-tags-input>

## Propiedades

| Propiedad           | Tipo      | Valor por Defecto      | Descripción                              |
| ------------------- | --------- | ---------------------- | ---------------------------------------- |
| `value`             | `string`  | `''`                   | Etiquetas actuales (separadas por comas) |
| `placeholder`       | `string`  | `'Agrega etiqueta...'` | Texto del marcador                       |
| `disabled`          | `boolean` | `false`                | Deshabilita la interacción               |
| `readonly`          | `boolean` | `false`                | Solo lectura                             |
| `name`              | `string`  | `''`                   | Nombre para formularios                  |
| `label`             | `string`  | `''`                   | Etiqueta visible del componente          |
| `maxTags`           | `number`  | `undefined`            | Número máximo de etiquetas               |
| `minLength`         | `number`  | `1`                    | Longitud mínima de etiqueta              |
| `maxLength`         | `number`  | `50`                   | Longitud máxima de etiqueta              |
| `allowDuplicates`   | `boolean` | `false`                | Permite etiquetas duplicadas             |
| `delimiter`         | `string`  | `','`                  | Delimitador para valores                 |
| `removeOnBackspace` | `boolean` | `true`                 | Elimina última etiqueta con backspace    |

## Eventos

| Evento       | Descripción                         |
| ------------ | ----------------------------------- |
| `change`     | Se dispara al cambiar las etiquetas |
| `tag-add`    | Se dispara al agregar una etiqueta  |
| `tag-remove` | Se dispara al eliminar una etiqueta |
| `input`      | Se dispara al escribir en el input  |
| `focus`      | Se dispara al obtener el foco       |
| `blur`       | Se dispara al perder el foco        |

## Ejemplos de Uso

### Entrada de Habilidades

```html
<melser-tags-input
  placeholder="Agrega tus habilidades..."
  label="Habilidades técnicas"
  max-tags="10"
  min-length="2"
>
</melser-tags-input>
```

### Categorías de Producto

```html
<melser-tags-input
  placeholder="Categorías del producto"
  label="Categorías"
  max-tags="5"
  allow-duplicates="false"
>
</melser-tags-input>
```

###Etiquetas con Validación

```html
<melser-tags-input
  placeholder="Etiquetas (mínimo 3 caracteres)"
  label="Etiquetas con validación"
  min-length="3"
  max-length="20"
>
</melser-tags-input>
```

## Integración con Formularios

### Formulario de Artículo

```html
<form id="article-form">
  <h3>Publicar Artículo</h3>

  <base-input label="Título del artículo" name="title" required> </base-input>

  <melser-textarea
    label="Contenido del artículo"
    name="content"
    rows="6"
    required
  >
  </melser-textarea>

  <melser-tags-input
    name="tags"
    placeholder="Etiquetas del artículo..."
    label="Etiquetas"
    max-tags="8"
    min-length="2"
    required
  >
  </melser-tags-input>

  <melser-checkbox name="published" label="Publicar inmediatamente">
  </melser-checkbox>

  <button type="submit" variant="primary">Publicar Artículo</button>
</form>
```

```javascript
const form = document.getElementById("article-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    console.log("Artículo publicado:", data);
    alert("¡Artículo publicado correctamente!");
  });
}
```

## Demo del Formulario

<melser-playground-form id="tags-playground" title="Publicar Artículo" description="Etiquetado y validación de contenido.">
  <div style="margin-bottom: 1.5rem;">
    <base-input 
      label="Título del artículo"
      name="title"
      required>
    </base-input>
  </div>
  
  <div style="margin-bottom: 1.5rem;">
    <melser-tags-input 
      name="tags"
      placeholder="Etiquetas del artículo..."
      label="Etiquetas"
      max-tags="8"
      min-length="2">
    </melser-tags-input>
  </div>
  
  <div style="margin-bottom: 1.5rem;">
    <melser-checkbox 
      name="published"
      label="Publicar inmediatamente">
    </melser-checkbox>
  </div>
</melser-playground-form>

## Ejemplos Avanzados

### Autocompletado de Etiquetas

<div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
  <h4>Tags con Sugerencias</h4>
  
  <melser-tags-input 
    id="autocomplete-tags"
    placeholder="Tecnologías web..."
    label="Tecnologías">
  </melser-tags-input>
  
  <div id="suggestions" style="margin-top: 1rem; display: flex; flex-wrap: wrap; gap: 0.5rem;">
    <small>Sugerencias:</small>
    <span class="suggestion-tag" data-tag="JavaScript">JavaScript</span>
    <span class="suggestion-tag" data-tag="TypeScript">TypeScript</span>
    <span class="suggestion-tag" data-tag="React">React</span>
    <span class="suggestion-tag" data-tag="Vue">Vue</span>
    <span class="suggestion-tag" data-tag="Angular">Angular</span>
    <span class="suggestion-tag" data-tag="Node.js">Node.js</span>
  </div>
</div>

### Contador de Etiquetas

<div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
  <h4>Tags con Contador y Límite</h4>
  
  <melser-tags-input 
    id="counter-tags"
    placeholder="Habilidades (máximo 5)"
    label="Habilidades"
    max-tags="5"
    min-length="2">
  </melser-tags-input>
  
  <div id="tag-counter" style="margin-top: 1rem; padding: 0.5rem; border-radius: 4px; text-align: center;">
    Etiquetas: <span id="current-count">0</span> / 5
  </div>
  
  <div id="tag-list" style="margin-top: 1rem; padding: 0.5rem; border-radius: 4px;">
    <strong>Etiquetas actuales:</strong>
    <div id="current-tags">Ninguna</div>
  </div>
</div>

## Personalización con CSS

### Variables CSS

```css
melser-tags-input {
  --melser-tags-input-bg: #ffffff;
  --melser-tags-input-border: 1px solid #d1d5db;
  --melser-tags-input-border-radius: 8px;
  --melser-tags-input-padding: 8px 12px;
  --melser-tags-input-font-size: 14px;
  --melser-tag-bg: #3b82f6;
  --melser-tag-color: #ffffff;
  --melser-tag-border-radius: 16px;
  --melser-tag-padding: 4px 8px;
  --melser-tag-margin: 4px;
  --melser-tag-remove-bg: #1e40af;
  --melser-tag-remove-hover: #1e3a8a;
  --melser-input-placeholder-color: #9ca3af;
  --melser-input-focus-border: #3b82f6;
  --melser-disabled-bg: #f9fafb;
  --melser-disabled-color: #6b7280;
}
```

### Ejemplos de Personalización

<style>
  .custom-tags {
    --melser-tag-bg: #10b981;
    --melser-tag-color: #ffffff;
    --melser-tag-remove-bg: #059669;
    --melser-tag-remove-hover: #047857;
    --melser-input-focus-border: #10b981;
  }
  
  .rounded-tags {
    --melser-tags-input-border-radius: 20px;
    --melser-tag-border-radius: 20px;
    --melser-tag-padding: 6px 12px;
  }
  
  .dark-theme-tags {
    --melser-tags-input-bg: #1f2937;
    --melser-tags-input-border: #4b5563;
    --melser-tag-bg: #8b5cf6;
    --melser-tag-color: #ffffff;
    --melser-input-placeholder-color: #9ca3af;
    --melser-input-focus-border: #8b5cf6;
  }
</style>

<div class="custom-tags" style="margin-bottom: 1rem;">
  <melser-tags-input 
    placeholder="Etiquetas personalizadas (verde)"
    label="Tags personalizados">
  </melser-tags-input>
</div>

<div class="rounded-tags" style="margin-bottom: 1rem;">
  <melser-tags-input 
    placeholder="Etiquetas redondeadas"
    label="Tags redondeados">
  </melser-tags-input>
</div>

<div class="dark-theme-tags">
  <melser-tags-input 
    placeholder="Etiquetas tema oscuro (púrpura)"
    label="Tags tema oscuro">
  </melser-tags-input>
</div>

## Accesibilidad

El componente MelserTagsInput incluye:

- **Navegación por teclado**: Tab para navegar, Enter para agregar, Backspace para eliminar
- **Screen reader support**: Anuncia etiquetas y acciones
- **Focus visible**: Indicador claro de foco
- **High contrast**: Compatible con modo de alto contraste
- **ARIA attributes**: Roles y estados apropiados

## Mejores Prácticas

1. **Usa límites apropiados** para el número de etiquetas
2. **Valida longitud** de etiquetas para evitar abusos
3. **Proporciona sugerencias** cuando sea posible
4. **Permite eliminación fácil** de etiquetas
5. **Muestra contador** cuando hay límite máximo
6. **Considera autocompletado** para mejor UX
7. **Usa descriptores claros** para el propósito

## Troubleshooting

### Las etiquetas no se agregan

```javascript
// Verificar que el componente esté importado
import "melser-ui/components/melser-tags-input.js";

// Verificar que no esté deshabilitado o solo lectura
console.log(tagsInput.disabled); // Debe ser false
console.log(tagsInput.readonly); // Debe ser false
```

### Problemas con etiquetas duplicadas

```javascript
// Por defecto no permite duplicados, habilita si es necesario
<melser-tags-input
  allow-duplicates
  placeholder="Permitir duplicados"
></melser-tags-input>
```

### El valor no se envía en el formulario

```html
<!-- Asegúrate de incluir el atributo name -->
<melser-tags-input name="articleTags" placeholder="Etiquetas del artículo">
</melser-tags-input>

// Recuperar valor en formulario const formData = new FormData(form); const tags
= formData.get('articleTags'); // "tag1, tag2, tag3" // Convertir a array const
tagsArray = tags.split(',').map(tag => tag.trim());
```

### Problemas de accesibilidad

```html
<!-- Usa aria-label para casos complejos -->
<melser-tags-input
  aria-label="Etiquetas para categorizar el artículo, separadas por comas"
  placeholder="Etiquetas del artículo"
>
</melser-tags-input>
```

### Validación personalizada

```javascript
const tagsInput = document.getElementById("my-tags");

tagsInput.addEventListener("tag-add", (e) => {
  const tag = e.detail.tag;

  // Validación personalizada
  if (tag.includes("palabra-prohibida")) {
    e.preventDefault();
    alert("Esta etiqueta no está permitida");
  }
});
```
