---
title: MelserCombobox
---

# MelserCombobox

Un componente de combo box con autocompletado, búsqueda avanzada, opciones dinámicas y experiencia de usuario mejorada.

## Ejemplo Básico

```html
<me-combobox label="Selecciona un país" placeholder="Escribe para buscar...">
  <option value="es">España</option>
  <option value="mx">México</option>
  <option value="ar">Argentina</option>
  <option value="co">Colombia</option>
</me-combobox>
```

## Demo Interactivo

<me-combobox 
  id="demo-basic" 
  label="País básico" 
  placeholder="Escribe para buscar...">

  <option value="es">España</option>
  <option value="mx">México</option>
  <option value="ar">Argentina</option>
  <option value="co">Colombia</option>
  <option value="pe">Perú</option>
  <option value="cl">Chile</option>
  <option value="uy">Uruguay</option>
  <option value="ec">Ecuador</option>
</me-combobox>

<me-combobox 
  id="demo-async" 
  label="Con datos dinámicos" 
  placeholder="Busca una ciudad..."
  async-data
  min-length="2">

  <!-- Opciones se cargarán dinámicamente -->
</me-combobox>

<me-combobox 
  id="demo-highlight" 
  label="Con resaltado" 
  placeholder="Busca frameworks..."
  highlight-matches>

  <option value="react">React</option>
  <option value="vue">Vue.js</option>
  <option value="angular">Angular</option>
  <option value="svelte">Svelte</option>
</me-combobox>

<h3>Colores</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-combobox label="Success" color="success" value="es" placeholder="Success">
     <option value="es">España</option>
  </me-combobox>
  <me-combobox label="Warning" color="warning" value="mx" placeholder="Warning">
     <option value="mx">México</option>
  </me-combobox>
  <me-combobox label="Danger" color="danger" value="ar" placeholder="Danger">
     <option value="ar">Argentina</option>
  </me-combobox>
</div>

## Propiedades

| Propiedad           | Tipo                                              | Valor por Defecto | Descripción                      |
| :------------------ | :------------------------------------------------ | :---------------- | :------------------------------- |
| `min-length`        | `number`                                          | `0`               | Mínimo de caracteres para buscar |
| `max-results`       | `number`                                          | `10`              | Máximo número de resultados      |
| `async-data`        | `boolean`                                         | `false`           | Carga datos de forma asíncrona   |
| `highlight-matches` | `boolean`                                         | `false`           | Resalta coincidencias            |
| `allow-free-text`   | `boolean`                                         | `false`           | Permite seleccionar texto libre  |
| `debounce-time`     | `number`                                          | `300`             | Tiempo de espera en ms           |
| `placeholder`       | `string`                                          | `''`              | Texto de marcador de posición    |
| `label`             | `string`                                          | `''`              | Etiqueta visible del campo       |
| `name`              | `string`                                          | `''`              | Nombre para formularios          |
| `value`             | `string`                                          | `''`              | Valor seleccionado               |
| `options`           | `SelectOption[]`                                  | `[]`              | Array de opciones                |
| `color`             | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'`       | Variante de color                |
| `disabled`          | `boolean`                                         | `false`           | Deshabilita la interacción       |
| `required`          | `boolean`                                         | `false`           | Campo requerido en formularios   |

### Definición de Tipos

#### SelectOption

```typescript
interface SelectOption {
  label: string;
  value: string;
  group?: string;
  disabled?: boolean;
  [key: string]: unknown;
}
```

## Eventos

| Evento              | Descripción                                  |
| :------------------ | :------------------------------------------- |
| `input`             | Se dispara al escribir en el campo           |
| `change`            | Se dispara al seleccionar una opción         |
| `search`            | Se dispara al iniciar búsqueda               |
| `async-data-loaded` | Se dispara cuando datos asíncronos se cargan |

## Ejemplos de Uso

### Carga Asíncrona

```html
<me-combobox
  label="Buscar usuario"
  placeholder="Escribe el nombre..."
  async-data
  min-length="2"
>
</me-combobox>
```

```javascript
const combobox = document.querySelector("me-combobox[async-data]");
combobox.addEventListener("search", async (e) => {
  const term = e.detail.term;
  if (term.length < 2) return;

  const response = await fetch(`/api/users?q=${term}`);
  const users = await response.json();

  // Helper hipotético para actualizar opciones
  updateComboboxOptions(combobox, users);
});
```

### Texto Libre

Permite al usuario ingresar valores que no están en la lista.

```html
<me-combobox
  label="Categoría"
  allow-free-text
  placeholder="Selecciona o crea..."
>
  <option value="tech">Tecnología</option>
  <option value="science">Ciencia</option>
</me-combobox>
```

## Integración con Formularios

```html
<form id="message-form">
  <me-combobox
    label="Destinatario *"
    name="recipient"
    required
    placeholder="Busca un usuario..."
  >
    <option value="id1">Usuario 1</option>
    <option value="id2">Usuario 2</option>
  </me-combobox>

  <button type="submit">Enviar</button>
</form>
```

## Demo del Formulario

<me-playground-form id="combobox-playground" schema-name="combobox" title="Encuesta de Desarrollo" description="Ejemplo de autocompletado y validación.">
  <div style="margin-bottom: 1rem;">
    <me-combobox 
      label="Lenguaje de programación"
      name="language"
      placeholder="Busca un lenguaje..."
      highlight-matches
      min-length="2"
      max-results="20">
      <option value="javascript">JavaScript</option>
      <option value="typescript">TypeScript</option>
      <option value="python">Python</option>
      <option value="java">Java</option>
    </me-combobox>
  </div>
</me-playground-form>

## Personalización con CSS

### Variables CSS

```css
me-combobox {
  --me-combobox-dropdown-bg: #ffffff;
  --me-combobox-option-hover-bg: #f3f4f6;
  --me-combobox-option-selected-bg: #3b82f6;
  --me-combobox-option-selected-color: #ffffff;
  --me-combobox-highlight-bg: #fef3c7;
  --me-combobox-highlight-color: #92400e;
}
```

## Accesibilidad

- **Navegación por teclado**: Flechas, Enter, Escape, Tab.
- **ARIA**: Usa `role="combobox"`, `aria-expanded`, `aria-controls`.
- **Screen Readers**: Anuncia cambios de estado y opciones seleccionadas.
