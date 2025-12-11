---
title: MelserTagsInput
---

# MelserTagsInput

Un componente de entrada de etiquetas para agregar, editar y eliminar tags con autocompletado y validación personalizada.

## Ejemplo Básico

```html
<me-tags-input placeholder="Agrega etiquetas..." label="Etiquetas">
</me-tags-input>
```

## Demo Interactivo

<me-tags-input 
  id="demo-basic" 
  placeholder="Escribe y presiona Enter"
  label="Etiquetas básicas">
</me-tags-input>

<me-tags-input 
  id="demo-readonly" 
  value="JavaScript, React, Vue"
  readonly
  label="Etiquetas de solo lectura">
</me-tags-input>

<me-tags-input 
  id="demo-disabled" 
  value="HTML, CSS, JavaScript"
  disabled
  label="Etiquetas deshabilitadas">
</me-tags-input>

<h3>Colores</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-tags-input label="Success" color="success" value="tag1, tag2"></me-tags-input>
  <me-tags-input label="Warning" color="warning" value="tag3, tag4"></me-tags-input>
  <me-tags-input label="Danger" color="danger" value="tag5, tag6"></me-tags-input>
</div>

## Propiedades

| Propiedad           | Tipo                                              | Valor por Defecto      | Descripción                              |
| :------------------ | :------------------------------------------------ | :--------------------- | :--------------------------------------- |
| `value`             | `string`                                          | `''`                   | Etiquetas actuales (separadas por comas) |
| `placeholder`       | `string`                                          | `'Agrega etiqueta...'` | Texto del marcador                       |
| `disabled`          | `boolean`                                         | `false`                | Deshabilita la interacción               |
| `readonly`          | `boolean`                                         | `false`                | Solo lectura                             |
| `name`              | `string`                                          | `''`                   | Nombre para formularios                  |
| `label`             | `string`                                          | `''`                   | Etiqueta visible del componente          |
| `maxTags`           | `number`                                          | `undefined`            | Número máximo de etiquetas               |
| `minLength`         | `number`                                          | `1`                    | Longitud mínima de etiqueta              |
| `maxLength`         | `number`                                          | `50`                   | Longitud máxima de etiqueta              |
| `allowDuplicates`   | `boolean`                                         | `false`                | Permite etiquetas duplicadas             |
| `delimiter`         | `string`                                          | `','`                  | Delimitador para valores                 |
| `removeOnBackspace` | `boolean`                                         | `true`                 | Elimina última etiqueta con backspace    |
| `color`             | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'`            | Esquema de color del estado.             |

## Eventos

| Evento       | Descripción                         |
| :----------- | :---------------------------------- |
| `change`     | Se dispara al cambiar las etiquetas |
| `tag-add`    | Se dispara al agregar una etiqueta  |
| `tag-remove` | Se dispara al eliminar una etiqueta |
| `input`      | Se dispara al escribir en el input  |
| `focus`      | Se dispara al obtener el foco       |
| `blur`       | Se dispara al perder el foco        |

## Ejemplos de Uso

### Entrada de Habilidades

```html
<me-tags-input
  placeholder="Agrega tus habilidades..."
  label="Habilidades técnicas"
  max-tags="10"
  min-length="2"
>
</me-tags-input>
```

### Categorías de Producto

```html
<me-tags-input
  placeholder="Categorías del producto"
  label="Categorías"
  max-tags="5"
  allow-duplicates="false"
>
</me-tags-input>
```

### Etiquetas con Validación

```html
<me-tags-input
  placeholder="Etiquetas (mínimo 3 caracteres)"
  label="Etiquetas con validación"
  min-length="3"
  max-length="20"
>
</me-tags-input>
```

## Integración con Formularios

### Formulario de Artículo

```html
<form id="article-form">
  <h3>Publicar Artículo</h3>

  <me-tags-input
    name="tags"
    placeholder="Etiquetas del artículo..."
    label="Etiquetas"
    max-tags="8"
    min-length="2"
    required
  >
  </me-tags-input>

  <button type="submit">Publicar Artículo</button>
</form>
```

```javascript
document.getElementById("article-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  console.log("Tags:", formData.get("tags"));
});
```

## Demo del Formulario

<me-playground-form id="tags-playground" schema-name="tags-input" title="Publicar Artículo" description="Etiquetado y validación de contenido.">
  <div style="margin-bottom: 1.5rem;">
    <base-input 
      label="Título del artículo"
      name="title"
      required>
    </base-input>
  </div>
  
  <div style="margin-bottom: 1.5rem;">
    <me-tags-input 
      name="tags"
      placeholder="Etiquetas del artículo..."
      label="Etiquetas"
      max-tags="8"
      min-length="2">
    </me-tags-input>
  </div>
  
</me-playground-form>

## Personalización con CSS

### Variables CSS

```css
me-tags-input {
  --me-tags-input-bg: #ffffff;
  --me-tags-input-border: 1px solid #d1d5db;
  --me-tags-input-border-radius: 8px;
  --me-tags-input-padding: 8px 12px;
  --me-tags-input-font-size: 14px;
  --me-tag-bg: #3b82f6;
  --me-tag-color: #ffffff;
  --me-tag-border-radius: 16px;
  --me-tag-padding: 4px 8px;
  --me-tag-margin: 4px;
  --me-tag-remove-bg: #1e40af;
  --me-tag-remove-hover: #1e3a8a;
  --me-input-placeholder-color: #9ca3af;
  --me-input-focus-border: #3b82f6;
  --me-disabled-bg: #f9fafb;
  --me-disabled-color: #6b7280;
}
```

### Ejemplos de Personalización

<style>
  .custom-tags {
    --me-tag-bg: #10b981;
    --me-tag-color: #ffffff;
    --me-tag-remove-bg: #059669;
    --me-tag-remove-hover: #047857;
    --me-input-focus-border: #10b981;
  }
  
  .rounded-tags {
    --me-tags-input-border-radius: 20px;
    --me-tag-border-radius: 20px;
    --me-tag-padding: 6px 12px;
  }
  
  .dark-theme-tags {
    --me-tags-input-bg: #1f2937;
    --me-tags-input-border: #4b5563;
    --me-tag-bg: #8b5cf6;
    --me-tag-color: #ffffff;
    --me-input-placeholder-color: #9ca3af;
    --me-input-focus-border: #8b5cf6;
  }
</style>

<div class="custom-tags" style="margin-bottom: 1rem;">
  <me-tags-input 
    placeholder="Etiquetas personalizadas (verde)"
    label="Tags personalizados">
  </me-tags-input>
</div>

<div class="rounded-tags" style="margin-bottom: 1rem;">
  <me-tags-input 
    placeholder="Etiquetas redondeadas"
    label="Tags redondeados">
  </me-tags-input>
</div>

<div class="dark-theme-tags">
  <me-tags-input 
    placeholder="Etiquetas tema oscuro (púrpura)"
    label="Tags tema oscuro">
  </me-tags-input>
</div>

## Accesibilidad

El componente MelserTagsInput incluye:

- **Navegación por teclado**: Tab para navegar, Enter para agregar, Backspace para eliminar
- **Screen reader support**: Anuncia etiquetas y acciones
- **Focus visible**: Indicador claro de foco
- **High contrast**: Compatible con modo de alto contraste
- **ARIA attributes**: Roles y estados apropiados
