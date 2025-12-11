---
title: MelserMultiSelect
---

# MelserMultiSelect

Un componente de selección múltiple avanzado con chips, búsqueda, selección masiva y opciones de filtrado.

## Ejemplo Básico

```html
<me-multi-select
  label="Selecciona múltiples opciones"
  placeholder="Elige las opciones que necesites"
>
  <option value="javascript">JavaScript</option>
  <option value="typescript">TypeScript</option>
  <option value="react">React</option>
  <option value="vue">Vue.js</option>
  <option value="angular">Angular</option>
</me-multi-select>
```

## Demo Interactivo

<me-multi-select 
  id="demo-basic" 
  label="Tecnologías básicas" 
  placeholder="Selecciona tecnologías">

  <option value="javascript">JavaScript</option>
  <option value="typescript">TypeScript</option>
  <option value="react">React</option>
  <option value="vue">Vue.js</option>
  <option value="angular">Angular</option>
  <option value="node">Node.js</option>
  <option value="python">Python</option>
</me-multi-select>

<me-multi-select 
  id="demo-selected" 
  label="Con valores iniciales" 
  placeholder="Selecciona frameworks"
  value="react,node">

  <option value="javascript">JavaScript</option>
  <option value="typescript">TypeScript</option>
  <option value="react">React</option>
  <option value="vue">Vue.js</option>
  <option value="angular">Angular</option>
</me-multi-select>

<me-multi-select 
  id="demo-search" 
  label="Con búsqueda" 
  placeholder="Busca una tecnología..."
  searchable
  max-selections="5">

  <option value="javascript">JavaScript</option>
  <option value="typescript">TypeScript</option>
  <option value="react">React</option>
  <option value="vue">Vue.js</option>
  <option value="angular">Angular</option>
  <option value="node">Node.js</option>
  <option value="python">Python</option>
  <option value="java">Java</option>
  <option value="csharp">C#</option>
  <option value="php">PHP</option>
  <option value="ruby">Ruby</option>
</me-multi-select>

<me-multi-select 
  id="demo-limits" 
  label="Con límites" 
  placeholder="Máximo 3 elementos"
  max-selections="3"
  show-counter>

  <option value="frontend">Frontend</option>
  <option value="backend">Backend</option>
  <option value="fullstack">Fullstack</option>
  <option value="mobile">Mobile</option>
  <option value="devops">DevOps</option>
  <option value="uiux">UI/UX</option>
</me-multi-select>

<h3>Colores</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-multi-select label="Success" color="success" placeholder="Success" value="opt1">
    <option value="opt1">Opción 1</option>
  </me-multi-select>
  <me-multi-select label="Warning" color="warning" placeholder="Warning" value="opt2">
    <option value="opt2">Opción 2</option>
  </me-multi-select>
  <me-multi-select label="Danger" color="danger" placeholder="Danger" value="opt3">
    <option value="opt3">Opción 3</option>
  </me-multi-select>
</div>

## Propiedades

| Propiedad        | Tipo                                              | Valor por Defecto | Descripción                                |
| :--------------- | :------------------------------------------------ | :---------------- | :----------------------------------------- |
| `searchable`     | `boolean`                                         | `false`           | Habilita búsqueda en opciones              |
| `clearable`      | `boolean`                                         | `false`           | Permite limpiar todas las selecciones      |
| `disabled`       | `boolean`                                         | `false`           | Deshabilita la interacción                 |
| `required`       | `boolean`                                         | `false`           | Campo requerido en formularios             |
| `max-selections` | `number`                                          | `undefined`       | Máximo número de selecciones               |
| `min-selections` | `number`                                          | `undefined`       | Mínimo número de selecciones               |
| `show-counter`   | `boolean`                                         | `false`           | Muestra contador de selecciones            |
| `select-all`     | `boolean`                                         | `false`           | Muestra opción "Seleccionar todo"          |
| `placeholder`    | `string`                                          | `''`              | Texto cuando no hay selecciones            |
| `label`          | `string`                                          | `''`              | Etiqueta visible del campo                 |
| `name`           | `string`                                          | `''`              | Nombre para formularios                    |
| `value`          | `string`                                          | `''`              | Valores seleccionados (separados por coma) |
| `color`          | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'`       | Esquema de color del estado.               |

## Eventos

| Evento         | Descripción                                  |
| :------------- | :------------------------------------------- |
| `change`       | Se dispara al cambiar las selecciones        |
| `search`       | Se dispara durante la búsqueda               |
| `select-all`   | Se dispara al seleccionar todas las opciones |
| `clear-all`    | Se dispara al limpiar todas las selecciones  |
| `max-reached`  | Se dispara al alcanzar el límite máximo      |
| `min-reached`  | Se dispara al alcanzar el límite mínimo      |
| `item-added`   | Se dispara al agregar un elemento            |
| `item-removed` | Se dispara al remover un elemento            |

## Ejemplos de Uso

### MultiSelect con Búsqueda y Límites

```html
<me-multi-select
  label="Habilidades técnicas *"
  name="skills"
  required
  searchable
  show-counter
  max-selections="5"
  placeholder="Selecciona hasta 5 habilidades"
>
  <option value="javascript">JavaScript</option>
  <option value="typescript">TypeScript</option>
  <option value="react">React</option>
  <option value="vue">Vue.js</option>
  <option value="angular">Angular</option>
</me-multi-select>
```

### MultiSelect con Validación

```html
<me-multi-select
  label="Intereses (mínimo 2, máximo 5)"
  name="interests"
  min-selections="2"
  max-selections="5"
  show-counter
  select-all
  required
  error="Selecciona al menos 2 intereses"
>
  <option value="sports">Deportes</option>
  <option value="music">Música</option>
  <option value="reading">Lectura</option>
  <option value="travel">Viajes</option>
</me-multi-select>
```

### MultiSelect Agrupado

```html
<me-multi-select
  label="Tecnologías por categoría"
  searchable
  placeholder="Selecciona tecnologías"
>
  <optgroup label="Frontend">
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="javascript">JavaScript</option>
  </optgroup>
  <optgroup label="Backend">
    <option value="node">Node.js</option>
    <option value="python">Python</option>
    <option value="java">Java</option>
  </optgroup>
</me-multi-select>
```

## Integración con Formularios

```html
<form id="profile-form">
  <me-multi-select
    label="Tecnologías que manejas *"
    name="technologies"
    required
    searchable
    show-counter
    max-selections="10"
    placeholder="Selecciona las tecnologías"
  >
    <optgroup label="Lenguajes">
      <option value="javascript">JavaScript</option>
      <option value="typescript">TypeScript</option>
    </optgroup>
    <optgroup label="Frameworks">
      <option value="react">React</option>
      <option value="vue">Vue.js</option>
    </optgroup>
  </me-multi-select>

  <me-multi-select label="Idiomas que hablas" name="languages" show-counter>
    <option value="spanish">Español (Nativo)</option>
    <option value="english">Inglés</option>
    <option value="french">Francés</option>
  </me-multi-select>

  <button type="submit">Guardar Perfil</button>
</form>
```

## Demo del Formulario

<me-playground-form id="multi-select-playground" schema-name="multi-select" title="Selección de Habilidades" description="Selecciona tus tecnologías favoritas.">
  <div style="margin-bottom: 1rem;">
    <me-multi-select 
      label="Hobbies (mín 2, máx 4) *"
      name="hobbies"
      required
      min-selections="2"
      max-selections="4"
      show-counter
      select-all
      placeholder="Selecciona tus hobbies">
      <option value="sports">🏃‍♂️ Deportes</option>
      <option value="music">🎵 Música</option>
      <option value="reading">📚 Lectura</option>
      <option value="travel">✈️ Viajes</option>
      <option value="cooking">🍳 Cocina</option>
      <option value="gaming">🎮 Juegos</option>
      <option value="art">🎨 Arte</option>
      <option value="photography">📸 Fotografía</option>
    </me-multi-select>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <me-multi-select 
      label="Materias favoritas"
      name="subjects"
      searchable
      placeholder="Busca materias..."
      show-counter
      max-selections="6">
      <optgroup label="Ciencias">
        <option value="math">📐 Matemáticas</option>
        <option value="physics">⚛️ Física</option>
        <option value="chemistry">🧪 Química</option>
        <option value="biology">🧬 Biología</option>
      </optgroup>
      <optgroup label="Humanidades">
        <option value="history">📜 Historia</option>
        <option value="literature">📖 Literatura</option>
        <option value="philosophy">🤔 Filosofía</option>
        <option value="languages">🗣️ Idiomas</option>
      </optgroup>
    </me-multi-select>
  </div>
</me-playground-form>

## Personalización con CSS

### Variables CSS

```css
me-multi-select {
  --me-multi-select-chip-bg: #e5e7eb;
  --me-multi-select-chip-color: #374151;
  --me-multi-select-chip-hover-bg: #d1d5db;
  --me-multi-select-chip-remove-color: #6b7280;
  --me-multi-select-dropdown-bg: #ffffff;
  --me-multi-select-counter-color: #6b7280;
  --me-multi-select-counter-font-size: 12px;
  --me-multi-select-max-indicator-color: #f59e0b;
}
```

### Ejemplos de Personalización

<style>
  .custom-multi-select {
    --me-multi-select-chip-bg: #dbeafe;
    --me-multi-select-chip-color: #1e40af;
    --me-multi-select-chip-hover-bg: #bfdbfe;
  }
  
  .minimal-multi-select {
    --me-multi-select-chip-bg: transparent;
    --me-multi-select-chip-color: #6b7280;
    --me-multi-select-chip-hover-bg: #f3f4f6;
    --me-multi-select-chip-border: 1px solid #d1d5db;
  }
  
  .dark-multi-select {
    --me-multi-select-chip-bg: #374151;
    --me-multi-select-chip-color: #f9fafb;
    --me-multi-select-chip-hover-bg: #4b5563;
    --me-multi-select-dropdown-bg: #1f2937;
  }
</style>

<div class="custom-multi-select" style="margin-bottom: 1rem;">
  <me-multi-select 
    label="Multi-select personalizado"
    value="react,vue"
    placeholder="Con chips azules">
    <option value="react">React</option>
    <option value="vue">Vue.js</option>
    <option value="angular">Angular</option>
  </me-multi-select>
</div>

<div class="minimal-multi-select" style="margin-bottom: 1rem;">
  <me-multi-select 
    label="Estilo minimalista"
    value="js,ts"
    placeholder="Chips con borde">
    <option value="js">JavaScript</option>
    <option value="ts">TypeScript</option>
    <option value="python">Python</option>
  </me-multi-select>
</div>

<div class="dark-multi-select">
  <me-multi-select 
    label="Tema oscuro"
    value="dark,night"
    placeholder="Para interfaces oscuras">
    <option value="dark">Dark Mode</option>
    <option value="night">Night Theme</option>
    <option value="black">Black Theme</option>
  </me-multi-select>
</div>

## Accesibilidad

- **Navegación por teclado**: Flechas, Enter, Space, Escape
- **Anuncios de screen readers**: Cambios de selección anunciados
- **ARIA**: Completamente etiquetado
- **Chips accesibles**: Controles de eliminación claros
