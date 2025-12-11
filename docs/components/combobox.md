---
title: MelserCombobox
---

# MelserCombobox

Un componente de combo box con autocompletado, búsqueda avanzada, opciones dinámicas y experiencia de usuario mejorada.

## Ejemplo Básico

```html
<melser-combobox 
  label="Selecciona un país" 
  placeholder="Escribe para buscar...">
  <option value="es">España</option>
  <option value="mx">México</option>
  <option value="ar">Argentina</option>
  <option value="co">Colombia</option>
</melser-combobox>
```

## Demo Interactivo

<melser-combobox 
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
</melser-combobox>

<melser-combobox 
  id="demo-async" 
  label="Con datos dinámicos" 
  placeholder="Busca una ciudad..."
  async-data
  min-length="2">
  <!-- Opciones se cargarán dinámicamente -->
</melser-combobox>

<melser-combobox 
  id="demo-groups" 
  label="Con grupos" 
  placeholder="Selecciona una ciudad">
  <optgroup label="España">
    <option value="madrid">Madrid</option>
    <option value="barcelona">Barcelona</option>
    <option value="valencia">Valencia</option>
  </optgroup>
  <optgroup label="México">
    <option value="cdmx">Ciudad de México</option>
    <option value="guadalajara">Guadalajara</option>
    <option value="monterrey">Monterrey</option>
  </optgroup>
  <optgroup label="Argentina">
    <option value="buenosaires">Buenos Aires</option>
    <option value="cordoba">Córdoba</option>
    <option value="rosario">Rosario</option>
  </optgroup>
</melser-combobox>

<melser-combobox 
  id="demo-highlight" 
  label="Con resaltado" 
  placeholder="Busca frameworks..."
  highlight-matches>
  <option value="react">React</option>
  <option value="react-native">React Native</option>
  <option value="vue">Vue.js</option>
  <option value="nuxt">Nuxt.js</option>
  <option value="angular">Angular</option>
  <option value="nguniversal">Angular Universal</option>
  <option value="svelte">Svelte</option>
  <option value="sveltekit">SvelteKit</option>
</melser-combobox>

<melser-combobox 
  id="demo-free-text" 
  label="Permite texto libre" 
  placeholder="Escribe o selecciona..."
  allow-free-text>
  <option value="frontend">Frontend Developer</option>
  <option value="backend">Backend Developer</option>
  <option value="fullstack">Fullstack Developer</option>
  <option value="mobile">Mobile Developer</option>
</melser-combobox>

## Propiedades

| Propiedad | Tipo | Valor por Defecto | Descripción |
|-----------|------|-------------------|-------------|
| `min-length` | `number` | `0` | Mínimo de caracteres para buscar |
| `max-results` | `number` | `10` | Máximo número de resultados |
| `async-data` | `boolean` | `false` | Carga datos de forma asíncrona |
| `highlight-matches` | `boolean` | `false` | Resalta coincidencias |
| `allow-free-text` | `boolean` | `false` | Permite seleccionar texto libre |
| `debounce-time` | `number` | `300` | Tiempo de espera en ms |
| `placeholder` | `string` | `''` | Texto de marcador de posición |
| `label` | `string` | `''` | Etiqueta visible del campo |
| `name` | `string` | `''` | Nombre para formularios |
| `value` | `string` | `''` | Valor seleccionado |
| `disabled` | `boolean` | `false` | Deshabilita la interacción |
| `required` | `boolean` | `false` | Campo requerido en formularios |

## Eventos

| Evento | Descripción |
|--------|-------------|
| `input` | Se dispara al escribir en el campo |
| `change` | Se dispara al seleccionar una opción |
| `search` | Se dispara al iniciar búsqueda |
| `search-complete` | Se dispara cuando la búsqueda termina |
| `match-found` | Se disparan coincidencias encontradas |
| `no-matches` | Se dispara cuando no hay coincidencias |
| `free-text-selected` | Se dispara al seleccionar texto libre |
| `async-data-loaded` | Se dispara cuando datos asíncronos se cargan |
| `focus` | Se dispara al obtener el foco |
| `blur` | Se dispara al perder el foco |

## Ejemplos de Uso

### Combobox con Carga Asíncrona

```html
<melser-combobox 
  label="Buscar usuario"
  placeholder="Escribe el nombre..."
  async-data
  min-length="2"
  max-results="20">
  <!-- Las opciones se cargan dinámicamente -->
</melser-combobox>
```

```javascript
const combobox = document.querySelector('melser-combobox[async-data]');
if (combobox) {
  combobox.addEventListener('search', async (e) => {
    const term = e.detail.term;
    
    if (term.length < 2) return;
    
    try {
      const response = await fetch(`/api/users/search?q=${encodeURIComponent(term)}`);
      const users = await response.json();
      
      // Actualizar opciones
      updateComboboxOptions(combobox, users.map(user => ({
        value: user.id,
        label: `${user.name} (${user.email})`
      })));
      
      combobox.dispatchEvent(new CustomEvent('async-data-loaded', {
        detail: { users }
      }));
    } catch (error) {
      console.error('Error cargando usuarios:', error);
    }
  });
}
```

### Combobox con Resaltado de Coincidencias

```html
<melser-combobox 
  label="Buscar producto"
  placeholder="Nombre del producto..."
  highlight-matches
  min-length="3"
  max-results="50">
  <option value="laptop-gaming">Laptop Gaming Pro</option>
  <option value="laptop-office">Laptop Office</option>
  <option value="mouse-gaming">Mouse Gaming RGB</option>
  <option value="mouse-wireless">Mouse Wireless</option>
  <option value="keyboard-mechanical">Teclado Mecánico</option>
  <option value="monitor-4k">Monitor 4K HDR</option>
</melser-combobox>
```

### Combobox con Validación

```html
<melser-combobox 
  label="Email de contacto"
  placeholder="Buscar contacto..."
  async-data
  min-length="3"
  required
  error="Selecciona un contacto válido"
  hint="Escribe para buscar un contacto existente">
  <!-- Opciones dinámicas -->
</melser-combobox>
```

### Combobox con Texto Libre

```html
<melser-combobox 
  label="Categoría personalizada"
  placeholder="Selecciona o crea una categoría..."
  allow-free-text
  highlight-matches>
  <option value="tecnologia">Tecnología</option>
  <option value="salud">Salud</option>
  <option value="educacion">Educación</option>
  <option value="deportes">Deportes</option>
</melser-combobox>
```

## Integración con Formularios

### Formulario de Mensaje

```html
<form id="message-form">
  <melser-combobox 
    label="Destinatario *"
    name="recipient"
    required
    async-data
    min-length="2"
    placeholder="Busca un usuario..."
    error="Selecciona un destinatario válido">
    <!-- Se cargará dinámicamente -->
  </melser-combobox>
  
  <melser-combobox 
    label="Asunto"
    name="subject"
    allow-free-text
    placeholder="Selecciona o escribe un asunto..."
    highlight-matches>
    <option value="soporte">Solicitud de Soporte</option>
    <option value="feedback">Feedback</option>
    <option value="consulta">Consulta General</option>
    <option value="bug">Reporte de Error</option>
  </melser-combobox>
  
  <button  type="submit" variant="primary">
    Enviar Mensaje
  </button >
</form>
```

```javascript
const form = document.getElementById('message-form');
if (form) {
  const recipientSelect = form.querySelector('[name="recipient"]');
  const subjectSelect = form.querySelector('[name="subject"]');
  
  // Manejar carga asíncrona de destinatarios
  if (recipientSelect) {
    recipientSelect.addEventListener('search', debounce(async (e) => {
      const term = e.detail.term;
      
      if (term.length < 2) return;
      
      try {
        const response = await fetch(`/api/users/search?q=${encodeURIComponent(term)}`);
        const users = await response.json();
        
        updateComboboxOptions(recipientSelect, users.map(user => ({
          value: user.id,
          label: `${user.name} <${user.email}>`
        })));
      } catch (error) {
        console.error('Error buscando usuarios:', error);
      }
    }, 300));
  }
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const recipient = form.querySelector('[name="recipient"]')?.value || '';
    const subject = form.querySelector('[name="subject"]')?.value || '';
    
    if (!recipient) {
      alert('Por favor selecciona un destinatario');
      return;
    }
    
    console.log('Mensaje:', { recipient, subject });
    alert('¡Mensaje enviado correctamente!');
  });
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
```

## Demo del Formulario

<melser-playground-form id="combobox-playground" title="Encuesta de Desarrollo" description="Ejemplo de autocompletado y validación.">
  <div style="margin-bottom: 1rem;">
    <melser-combobox 
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
      <option value="csharp">C#</option>
      <option value="cpp">C++</option>
      <option value="go">Go</option>
      <option value="rust">Rust</option>
      <option value="php">PHP</option>
      <option value="ruby">Ruby</option>
      <option value="swift">Swift</option>
      <option value="kotlin">Kotlin</option>
    </melser-combobox>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <melser-combobox 
      label="Proyecto (permite texto libre)"
      name="project"
      allow-free-text
      placeholder="Selecciona o crea un proyecto..."
      highlight-matches>
      <option value="web-app">Aplicación Web</option>
      <option value="mobile-app">App Móvil</option>
      <option value="desktop-app">Aplicación Desktop</option>
      <option value="api">API/REST</option>
      <option value="cli">Herramienta CLI</option>
      <option value="library">Librería</option>
    </melser-combobox>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <melser-combobox 
      label="Framework favorito"
      name="framework"
      placeholder="Busca tu framework..."
      highlight-matches
      max-results="15">
      <optgroup label="Frontend">
        <option value="react">React</option>
        <option value="vue">Vue.js</option>
        <option value="angular">Angular</option>
        <option value="svelte">Svelte</option>
        <option value="solid">Solid.js</option>
      </optgroup>
      <optgroup label="Backend">
        <option value="express">Express.js</option>
        <option value="fastapi">FastAPI</option>
        <option value="spring">Spring Boot</option>
        <option value="django">Django</option>
        <option value="laravel">Laravel</option>
      </optgroup>
      <optgroup label="Fullstack">
        <option value="nextjs">Next.js</option>
        <option value="nuxt">Nuxt.js</option>
        <option value="sveltekit">SvelteKit</option>
        <option value="remix">Remix</option>
      </optgroup>
    </melser-combobox>
  </div>
</melser-playground-form>

<script type="module">
  import { z } from 'zod';
  
  const schema = z.object({
    language: z.string().min(1, "Selecciona un lenguaje"),
    project: z.string().min(1, "El proyecto es requerido"),
    framework: z.string().optional()
  });
  
  const form = document.getElementById('combobox-playground');
  form.schema = schema;
</script>


## Personalización con CSS

### Variables CSS

```css
melser-combobox {
  --melser-combobox-dropdown-bg: #ffffff;
  --melser-combobox-dropdown-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --melser-combobox-option-hover-bg: #f3f4f6;
  --melser-combobox-option-selected-bg: #3b82f6;
  --melser-combobox-option-selected-color: #ffffff;
  --melser-combobox-highlight-bg: #fef3c7;
  --melser-combobox-highlight-color: #92400e;
  --melser-combobox-loading-color: #6b7280;
  --melser-combobox-no-results-color: #9ca3af;
}
```

### Ejemplos de Personalización

<style>
  .custom-combobox {
    --melser-combobox-option-selected-bg: #10b981;
    --melser-combobox-highlight-bg: #d1fae5;
    --melser-combobox-highlight-color: #065f46;
  }
  
  .minimal-combobox {
    --melser-combobox-option-hover-bg: #f9fafb;
    --melser-combobox-dropdown-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .dark-combobox {
    --melser-combobox-dropdown-bg: #1f2937;
    --melser-combobox-option-hover-bg: #374151;
    --melser-combobox-option-selected-bg: #8b5cf6;
    --melser-combobox-highlight-bg: #7c3aed;
    --melser-combobox-highlight-color: #f3e8ff;
  }
</style>

<div class="custom-combobox" style="margin-bottom: 1rem;">
  <melser-combobox 
    label="Combobox personalizado"
    placeholder="Verde personalizado"
    highlight-matches
    value="react">
    <option value="react">React</option>
    <option value="vue">Vue.js</option>
    <option value="angular">Angular</option>
  </melser-combobox>
</div>

<div class="minimal-combobox" style="margin-bottom: 1rem;">
  <melser-combobox 
    label="Estilo minimalista"
    placeholder="Sombras sutiles"
    value="minimal">
    <option value="minimal">Diseño Minimal</option>
    <option value="clean">Clean Design</option>
    <option value="simple">Simple UI</option>
  </melser-combobox>
</div>

<div class="dark-combobox">
  <melser-combobox 
    label="Tema oscuro"
    placeholder="Para interfaces oscuras"
    value="dark"
    highlight-matches>
    <option value="dark">Dark Mode</option>
    <option value="night">Night Theme</option>
    <option value="black">Black Theme</option>
  </melser-combobox>
</div>

## Características Avanzadas

### Configuración de Búsqueda Personalizada

```javascript
const combobox = document.querySelector('melser-combobox');
if (combobox) {
  // Configurar búsqueda personalizada
  combobox.searchOptions = {
    fuzzy: true,        // Búsqueda aproximada
    weight: {           // Peso de campos
      label: 1.0,
      value: 0.8
    },
    threshold: 0.3      // Umbral de similitud
  };
}
```

### Manejo de Datos Asíncronos

```javascript
const combobox = document.querySelector('melser-combobox[async-data]');
if (combobox) {
  combobox.addEventListener('search', async (e) => {
    const { term } = e.detail;
    
    try {
      // Mostrar indicador de carga
      combobox.setAttribute('loading', '');
      
      const response = await fetch(`/api/search?q=${encodeURIComponent(term)}`);
      const results = await response.json();
      
      // Actualizar opciones
      updateComboboxOptions(combobox, results);
      
      // Disparar evento de datos cargados
      combobox.dispatchEvent(new CustomEvent('async-data-loaded', {
        detail: { results }
      }));
      
    } catch (error) {
      console.error('Error cargando datos:', error);
      combobox.dispatchEvent(new CustomEvent('async-error', {
        detail: { error }
      }));
    } finally {
      combobox.removeAttribute('loading');
    }
  });
}
```

### Integración con APIs Externas

```javascript
// Ejemplo con API de países
const countryCombobox = document.querySelector('#country-combobox');
if (countryCombobox) {
  countryCombobox.addEventListener('search', debounce(async (e) => {
    const term = e.detail.term;
    
    if (term.length < 2) return;
    
    const response = await fetch(`https://restcountries.com/v3.1/name/${term}`);
    const countries = await response.json();
    
    const options = countries.map(country => ({
      value: country.cca2,
      label: `${country.name.common} (${country.cca2})`
    }));
    
    updateComboboxOptions(countryCombobox, options);
  }, 400));
}
```

## Accesibilidad

El componente MelserCombobox incluye:

- **Navegación por teclado**: Flechas, Enter, Escape, Tab
- **Anuncios de screen readers**: Estados y cambios anunciados
- **ARIA attributes**: role="combobox", aria-expanded, aria-controls
- **Focus management**: Indicador visual claro y navegación lógica
- **Loading states**: Estados de carga anunciados

## Mejores Prácticas

1. **Usa min-length apropiado** (2-3 caracteres) para evitar búsquedas prematuras
2. **Implementa debounce** para búsquedas asíncronas
3. **Proporciona feedback visual** durante la carga
4. **Maneja casos sin resultados** de forma elegante
5. **Considera resaltar coincidencias** para mejor UX
6. **Usa loaders apropiados** durante búsquedas lentas
7. **Incluye validación** para campos requeridos

## Troubleshooting

### Búsqueda no funciona

```javascript
// Verificar configuración de búsqueda
combobox.minLength = 2;
combobox.debounceTime = 300;
```

### Datos asíncronos no se cargan

```javascript
// Verificar que async-data esté habilitado
combobox.asyncData = true;

// Y manejar errores apropiadamente
combobox.addEventListener('async-error', (e) => {
  console.error('Error de API:', e.detail.error);
});
```

### Resaltado no aparece

```html
<!-- Asegurar que highlight-matches esté habilitado -->
<melser-combobox 
  highlight-matches
  label="Con resaltado">
```

### Texto libre no funciona

```html
<!-- Verificar que allow-free-text esté habilitado -->
<melser-combobox 
  allow-free-text
  label="Con texto libre">
```

### Problemas de rendimiento

```javascript
// Limitar resultados
combobox.maxResults = 20;

// Usar búsqueda aproximada con umbral
combobox.searchOptions = {
  fuzzy: true,
  threshold: 0.4
};
```

### Focus no visible

```css
/* Personalizar indicador de foco */
melser-combobox:focus-within {
  box-shadow: 0 0 0 2px #3b82f6;
  border-color: #3b82f6;
}
```

### Dropdown no se cierra correctamente

```javascript
// Cerrar manualmente si es necesario
combobox.closeDropdown();

// O escuchar eventos externos
document.addEventListener('click', (e) => {
  if (!combobox.contains(e.target)) {
    combobox.closeDropdown();
  }
});