---
title: MelserMultiSelect
---

# MelserMultiSelect

Un componente de selección múltiple avanzado con chips, búsqueda, selección masiva y opciones de filtrado.

## Ejemplo Básico

```html
<melser-multi-select 
  label="Selecciona múltiples opciones" 
  placeholder="Elige las opciones que necesites">
  <option value="javascript">JavaScript</option>
  <option value="typescript">TypeScript</option>
  <option value="react">React</option>
  <option value="vue">Vue.js</option>
  <option value="angular">Angular</option>
</melser-multi-select>
```

## Demo Interactivo

<melser-multi-select 
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
</melser-multi-select>

<melser-multi-select 
  id="demo-selected" 
  label="Con valores iniciales" 
  placeholder="Selecciona frameworks"
  value="react,node">
  <option value="javascript">JavaScript</option>
  <option value="typescript">TypeScript</option>
  <option value="react">React</option>
  <option value="vue">Vue.js</option>
  <option value="angular">Angular</option>
</melser-multi-select>

<melser-multi-select 
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
</melser-multi-select>

<melser-multi-select 
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
</melser-multi-select>

<melser-multi-select 
  id="demo-disabled" 
  label="Deshabilitado" 
  value="react,vue"
  disabled>
  <option value="javascript">JavaScript</option>
  <option value="typescript">TypeScript</option>
  <option value="react">React</option>
  <option value="vue">Vue.js</option>
</melser-multi-select>


## Propiedades

| Propiedad | Tipo | Valor por Defecto | Descripción |
|-----------|------|-------------------|-------------|
| `searchable` | `boolean` | `false` | Habilita búsqueda en opciones |
| `clearable` | `boolean` | `false` | Permite limpiar todas las selecciones |
| `disabled` | `boolean` | `false` | Deshabilita la interacción |
| `required` | `boolean` | `false` | Campo requerido en formularios |
| `max-selections` | `number` | `undefined` | Máximo número de selecciones |
| `min-selections` | `number` | `undefined` | Mínimo número de selecciones |
| `show-counter` | `boolean` | `false` | Muestra contador de selecciones |
| `select-all` | `boolean` | `false` | Muestra opción "Seleccionar todo" |
| `placeholder` | `string` | `''` | Texto cuando no hay selecciones |
| `label` | `string` | `''` | Etiqueta visible del campo |
| `name` | `string` | `''` | Nombre para formularios |
| `value` | `string` | `''` | Valores seleccionados (separados por coma) |

## Eventos

| Evento | Descripción |
|--------|-------------|
| `change` | Se dispara al cambiar las selecciones |
| `search` | Se dispara durante la búsqueda |
| `select-all` | Se dispara al seleccionar todas las opciones |
| `clear-all` | Se dispara al limpiar todas las selecciones |
| `max-reached` | Se dispara al alcanzar el límite máximo |
| `min-reached` | Se dispara al alcanzar el límite mínimo |
| `item-added` | Se dispara al agregar un elemento |
| `item-removed` | Se dispara al remover un elemento |

## Ejemplos de Uso

### MultiSelect con Búsqueda y Límites

```html
<melser-multi-select 
  label="Habilidades técnicas *"
  name="skills"
  required
  searchable
  show-counter
  max-selections="5"
  placeholder="Selecciona hasta 5 habilidades">
  <option value="javascript">JavaScript</option>
  <option value="typescript">TypeScript</option>
  <option value="react">React</option>
  <option value="vue">Vue.js</option>
  <option value="angular">Angular</option>
  <option value="node">Node.js</option>
  <option value="python">Python</option>
  <option value="java">Java</option>
  <option value="csharp">C#</option>
</melser-multi-select>
```

### MultiSelect con Validación

```html
<melser-multi-select 
  label="Intereses (mínimo 2, máximo 5)"
  name="interests"
  min-selections="2"
  max-selections="5"
  show-counter
  select-all
  required
  error="Selecciona al menos 2 intereses">
  <option value="sports">Deportes</option>
  <option value="music">Música</option>
  <option value="reading">Lectura</option>
  <option value="travel">Viajes</option>
  <option value="cooking">Cocina</option>
  <option value="gaming">Juegos</option>
  <option value="art">Arte</option>
</melser-multi-select>
```

### MultiSelect Agrupado

```html
<melser-multi-select 
  label="Tecnologías por categoría"
  searchable
  placeholder="Selecciona tecnologías">
  <optgroup label="Frontend">
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="javascript">JavaScript</option>
    <option value="react">React</option>
    <option value="vue">Vue.js</option>
  </optgroup>
  <optgroup label="Backend">
    <option value="node">Node.js</option>
    <option value="python">Python</option>
    <option value="java">Java</option>
    <option value="csharp">C#</option>
  </optgroup>
  <optgroup label="Database">
    <option value="mysql">MySQL</option>
    <option value="postgresql">PostgreSQL</option>
    <option value="mongodb">MongoDB</option>
  </optgroup>
</melser-multi-select>
```

## Integración con Formularios

### Formulario de Perfil Profesional

```html
<form id="profile-form">
  <melser-multi-select 
    label="Tecnologías que manejas *"
    name="technologies"
    required
    searchable
    show-counter
    max-selections="10"
    placeholder="Selecciona las tecnologías">
    <optgroup label="Lenguajes">
      <option value="javascript">JavaScript</option>
      <option value="typescript">TypeScript</option>
      <option value="python">Python</option>
      <option value="java">Java</option>
      <option value="csharp">C#</option>
    </optgroup>
    <optgroup label="Frameworks">
      <option value="react">React</option>
      <option value="vue">Vue.js</option>
      <option value="angular">Angular</option>
      <option value="node">Node.js</option>
    </optgroup>
  </melser-multi-select>
  
  <melser-multi-select 
    label="Idiomas que hablas"
    name="languages"
    show-counter>
    <option value="spanish">Español (Nativo)</option>
    <option value="english">Inglés</option>
    <option value="french">Francés</option>
    <option value="german">Alemán</option>
    <option value="italian">Italiano</option>
    <option value="portuguese">Portugués</option>
  </melser-multi-select>
  
  <button  type="submit" variant="primary">
    Guardar Perfil
  </button >
</form>
```

```javascript
const form = document.getElementById('profile-form');
if (form) {
  const techSelect = form.querySelector('[name="technologies"]');
  
  // Manejar límites de selecciones
  if (techSelect) {
    techSelect.addEventListener('max-reached', (e) => {
      alert(`Has alcanzado el límite máximo de ${e.detail.limit} tecnologías`);
    });
    
    techSelect.addEventListener('item-added', (e) => {
      console.log('Tecnología agregada:', e.detail.value);
    });
    
    techSelect.addEventListener('item-removed', (e) => {
      console.log('Tecnología removida:', e.detail.value);
    });
  }
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const technologies = form.querySelector('[name="technologies"]')?.value?.split(',') || [];
    const languages = form.querySelector('[name="languages"]')?.value?.split(',') || [];
    
    if (technologies.length === 0) {
      alert('Por favor selecciona al menos una tecnología');
      return;
    }
    
    const profileData = {
      technologies: technologies,
      languages: languages
    };
    
    console.log('Datos del perfil:', profileData);
    alert('¡Perfil guardado exitosamente!');
  });
}
```

## Demo del Formulario

<melser-playground-form id="multi-select-playground" title="Intereses Académicos" description="Selección múltiple con límites y validación.">
  <div style="margin-bottom: 1rem;">
    <melser-multi-select 
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
    </melser-multi-select>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <melser-multi-select 
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
    </melser-multi-select>
  </div>
</melser-playground-form>

<script type="module">
  import { z } from 'zod';
  
  const schema = z.object({
    hobbies: z.string().refine(val => {
       const count = val ? val.split(',').length : 0;
       return count >= 2 && count <= 4;
    }, "Selecciona entre 2 y 4 hobbies"),
    subjects: z.string().optional()
  });
  
  const form = document.getElementById('multi-select-playground');
  form.schema = schema;
</script>


## Personalización con CSS

### Variables CSS

```css
melser-multi-select {
  --melser-multi-select-chip-bg: #e5e7eb;
  --melser-multi-select-chip-color: #374151;
  --melser-multi-select-chip-hover-bg: #d1d5db;
  --melser-multi-select-chip-remove-color: #6b7280;
  --melser-multi-select-dropdown-bg: #ffffff;
  --melser-multi-select-counter-color: #6b7280;
  --melser-multi-select-counter-font-size: 12px;
  --melser-multi-select-max-indicator-color: #f59e0b;
}
```

### Ejemplos de Personalización

<style>
  .custom-multi-select {
    --melser-multi-select-chip-bg: #dbeafe;
    --melser-multi-select-chip-color: #1e40af;
    --melser-multi-select-chip-hover-bg: #bfdbfe;
  }
  
  .minimal-multi-select {
    --melser-multi-select-chip-bg: transparent;
    --melser-multi-select-chip-color: #6b7280;
    --melser-multi-select-chip-hover-bg: #f3f4f6;
    --melser-multi-select-chip-border: 1px solid #d1d5db;
  }
  
  .dark-multi-select {
    --melser-multi-select-chip-bg: #374151;
    --melser-multi-select-chip-color: #f9fafb;
    --melser-multi-select-chip-hover-bg: #4b5563;
    --melser-multi-select-dropdown-bg: #1f2937;
  }
</style>

<div class="custom-multi-select" style="margin-bottom: 1rem;">
  <melser-multi-select 
    label="Multi-select personalizado"
    value="react,vue"
    placeholder="Con chips azules">
    <option value="react">React</option>
    <option value="vue">Vue.js</option>
    <option value="angular">Angular</option>
  </melser-multi-select>
</div>

<div class="minimal-multi-select" style="margin-bottom: 1rem;">
  <melser-multi-select 
    label="Estilo minimalista"
    value="js,ts"
    placeholder="Chips con borde">
    <option value="js">JavaScript</option>
    <option value="ts">TypeScript</option>
    <option value="python">Python</option>
  </melser-multi-select>
</div>

<div class="dark-multi-select">
  <melser-multi-select 
    label="Tema oscuro"
    value="dark,night"
    placeholder="Para interfaces oscuras">
    <option value="dark">Dark Mode</option>
    <option value="night">Night Theme</option>
    <option value="black">Black Theme</option>
  </melser-multi-select>
</div>

## Características Avanzadas

### Operaciones Masivas

```javascript
const multiSelect = document.querySelector('melser-multi-select');
if (multiSelect) {
  // Seleccionar todas las opciones
  multiSelect.selectAll();
  
  // Limpiar todas las selecciones
  multiSelect.clearAll();
  
  // Obtener opciones seleccionadas
  const selectedValues = multiSelect.value.split(',');
  const selectedOptions = selectedValues.map(v => 
    multiSelect.querySelector(`option[value="${v}"]`)
  );
}
```

### Filtrado Programático

```javascript
const multiSelect = document.querySelector('melser-multi-select');
if (multiSelect) {
  // Filtrar opciones programáticamente
  multiSelect.filterOptions((option) => {
    return option.textContent.includes('JavaScript');
  });
  
  // Resetear filtro
  multiSelect.resetFilter();
}
```

### Validación Personalizada

```javascript
const multiSelect = document.querySelector('melser-multi-select');
if (multiSelect) {
  multiSelect.addEventListener('change', (e) => {
    const selectedValues = e.target.value.split(',');
    
    // Validación personalizada
    if (selectedValues.includes('react') && selectedValues.includes('vue')) {
      console.log('Has seleccionado both React y Vue, ¡interesante!');
    }
    
    if (selectedValues.length > 5) {
      console.log('Has seleccionado muchas opciones');
    }
  });
}
```

## Accesibilidad

El componente MelserMultiSelect incluye:

- **Navegación por teclado**: Flechas, Enter, Space, Escape
- **Anuncios de screen readers**: Cambios de selección anunciados
- **ARIA labels**: Completamente etiquetado para accesibilidad
- **Focus management**: Indicador visual claro y navegación lógica
- **Chips accesibles**: Cada chip tiene controles de eliminación

## Mejores Prácticas

1. **Establece límites razonables** (min/max) para guiar al usuario
2. **Usa búsqueda** cuando hay muchas opciones disponibles
3. **Incluye contadores** para mostrar límites claros
4. **Proporciona feedback** inmediato al agregar/remover elementos
5. **Considera grupos lógicos** para organizar opciones relacionadas
6. **Maneja validaciones** de manera clara y no intrusiva
7. **Incluye "Seleccionar todo"** para casos donde sea útil

## Troubleshooting

### Chips no aparecen

```javascript
// Verificar que las opciones estén correctamente seleccionadas
multiSelect.value = 'react,vue,angular';
multiSelect.dispatchEvent(new Event('change'));
```

### Búsqueda no funciona

```html
<!-- Asegurar que searchable esté habilitado -->
<melser-multi-select 
  searchable
  label="Con búsqueda">
```

### Límites no se respetan

```html
<!-- Configurar límites apropiados -->
<melser-multi-select 
  max-selections="5"
  min-selections="2"
  show-counter>
```

### Validación no funciona

```html
<!-- Usar required junto con min-selections -->
<melser-multi-select 
  required
  min-selections="1"
  placeholder="Selecciona al menos una opción">
```

### Problemas de accesibilidad

```html
<!-- Agregar descripción para casos complejos -->
<melser-multi-select 
  aria-describedby="skills-help"
  searchable
  max-selections="5">
<div id="skills-help">Puedes seleccionar hasta 5 habilidades técnicas</div>
```

### Focus no visible

```css
/* Personalizar indicador de foco */
melser-multi-select:focus-within {
  box-shadow: 0 0 0 2px #3b82f6;
  border-color: #3b82f6;
}
```

### Remover chip por programación

```javascript
// Remover chip específico
multiSelect.removeItem('react');

// O deseleccionar opción
const option = multiSelect.querySelector('option[value="react"]');
option.selected = false;
multiSelect.dispatchEvent(new Event('change'));
