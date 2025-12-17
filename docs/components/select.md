---
title: MelserSelect
---

# MelserSelect

Un componente de selector desplegable moderno y accesible con búsqueda, grupos y múltiples opciones de personalización.

## Ejemplo Básico

```html
<me-select label="Selecciona una opción" placeholder="Elige una opción">
  <option value="opcion1">Opción 1</option>
  <option value="opcion2">Opción 2</option>
  <option value="opcion3">Opción 3</option>
</me-select>
```

## Demo Interactivo

<me-select 
  id="demo-basic" 
  label="Selector básico" 
  placeholder="Elige una opción">

  <option value="">Selecciona una opción</option>
  <option value="es">España</option>
  <option value="mx">México</option>
  <option value="ar">Argentina</option>
  <option value="co">Colombia</option>
  <option value="pe">Perú</option>
</me-select>

<me-select 
  id="demo-groups" 
  label="Con grupos" 
  placeholder="Selecciona un país">

  <optgroup label="Europa">
    <option value="es">España</option>
    <option value="fr">Francia</option>
    <option value="de">Alemania</option>
  </optgroup>
  <optgroup label="América">
    <option value="mx">México</option>
    <option value="ar">Argentina</option>
    <option value="co">Colombia</option>
  </optgroup>
</me-select>

<me-select 
  id="demo-selected" 
  label="Con valor inicial" 
  value="mx"
  placeholder="País predefinido">

  <option value="">Selecciona un país</option>
  <option value="es">España</option>
  <option value="mx" selected>México</option>
  <option value="ar">Argentina</option>
</me-select>

<me-select 
  id="demo-disabled" 
  label="Deshabilitado" 
  value="co"
  disabled>

  <option value="">Selecciona una opción</option>
  <option value="es">España</option>
  <option value="mx">México</option>
  <option value="co" selected>Colombia</option>
</me-select>

<me-select 
  id="demo-search" 
  label="Con búsqueda" 
  searchable
  placeholder="Busca un país...">

  <option value="es">España</option>
  <option value="mx">México</option>
  <option value="ar">Argentina</option>
  <option value="co">Colombia</option>
  <option value="pe">Perú</option>
  <option value="cl">Chile</option>
  <option value="uy">Uruguay</option>
</me-select>

<h3>Colores</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-select label="Success" color="success" value="1" placeholder="Success">
    <option value="1">Opción 1</option>
  </me-select>
  <me-select label="Warning" color="warning" value="1" placeholder="Warning">
    <option value="1">Opción 1</option>
  </me-select>
  <me-select label="Danger" color="danger" value="1" placeholder="Danger">
    <option value="1">Opción 1</option>
  </me-select>
</div>

## Propiedades

| Propiedad     | Tipo             | Valor por Defecto | Descripción                             |
| ------------- | ---------------- | ----------------- | --------------------------------------- |
| `searchable`  | `boolean`        | `false`           | Habilita búsqueda en opciones           |
| `clearable`   | `boolean`        | `false`           | Permite limpiar la selección            |
| `disabled`    | `boolean`        | `false`           | Deshabilita la interacción              |
| `required`    | `boolean`        | `false`           | Campo requerido en formularios          |
| `multiple`    | `boolean`        | `false`           | Permite múltiples selecciones           |
| `placeholder` | `string`         | `''`              | Texto cuando no hay selección           |
| `label`       | `string`         | `''`              | Etiqueta visible del campo              |
| `name`        | `string`         | `''`              | Nombre para formularios                 |
| `value`       | `string`         | `''`              | Valor seleccionado                      |
| `options`     | `SelectOption[]` | `[]`              | Array de opciones (alternativa a slots) |

## Eventos

| Evento   | Descripción                                         |
| -------- | --------------------------------------------------- |
| `change` | Se dispara al cambiar la selección                  |
| `search` | Se dispara durante la búsqueda (solo searchable)    |
| `clear`  | Se dispara al limpiar la selección (solo clearable) |
| `focus`  | Se dispara al obtener el foco                       |
| `blur`   | Se dispara al perder el foco                        |
| `open`   | Se dispara al abrir el dropdown                     |
| `close`  | Se dispara al cerrar el dropdown                    |

## Ejemplos de Uso

### Select con Búsqueda

```html
<me-select
  label="País (con búsqueda)"
  searchable
  placeholder="Escribe para buscar..."
  clearable
>
  <option value="">Todos los países</option>
  <option value="es">España</option>
  <option value="mx">México</option>
  <option value="ar">Argentina</option>
  <option value="co">Colombia</option>
  <option value="pe">Perú</option>
  <option value="cl">Chile</option>
</me-select>
```

### Select con Validación

```html
<me-select
  label="Tipo de documento *"
  required
  placeholder="Selecciona un tipo"
  error="Debes seleccionar un tipo de documento"
>
  <option value="">Selecciona un tipo</option>
  <option value="dni">DNI</option>
  <option value="passport">Pasaporte</option>
  <option value="license">Licencia de conducir</option>
  <option value="other">Otro</option>
</me-select>
```

### Select Agrupado

```html
<me-select label="Ciudad" placeholder="Selecciona una ciudad">
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
</me-select>
```

### Select con Múltiples Selecciones

```html
<me-select
  label="Habilidades"
  multiple
  placeholder="Selecciona las habilidades relevantes"
>
  <option value="javascript">JavaScript</option>
  <option value="typescript">TypeScript</option>
  <option value="react">React</option>
  <option value="vue">Vue.js</option>
  <option value="angular">Angular</option>
  <option value="node">Node.js</option>
  <option value="python">Python</option>
</me-select>
```

## Integración con Formularios

### Formulario de Registro Completo

```html
<form id="registration-select-form">
  <me-select
    label="País de residencia *"
    name="country"
    required
    placeholder="Selecciona tu país"
  >
    <optgroup label="Europa">
      <option value="es">España</option>
      <option value="fr">Francia</option>
      <option value="de">Alemania</option>
    </optgroup>
    <optgroup label="América">
      <option value="mx">México</option>
      <option value="ar">Argentina</option>
      <option value="co">Colombia</option>
      <option value="pe">Perú</option>
    </optgroup>
  </me-select>

  <me-select label="Ciudad" name="city" placeholder="Selecciona una ciudad">
    <!-- Opciones dinámicas basadas en país -->
  </me-select>

  <me-select label="Tipo de cuenta" name="accountType" searchable clearable>
    <option value="">Selecciona un tipo</option>
    <option value="personal">Cuenta Personal</option>
    <option value="business">Cuenta Empresarial</option>
    <option value="student">Cuenta Estudiantil</option>
  </me-select>

  <button type="submit" variant="primary">Completar Registro</button>
</form>
```

```javascript
const form = document.getElementById("registration-select-form");
if (form) {
  const countrySelect = form.querySelector('[name="country"]');
  const citySelect = form.querySelector('[name="city"]');

  // Actualizar ciudades basado en el país
  if (countrySelect && citySelect) {
    countrySelect.addEventListener("change", (e) => {
      const country = e.target.value;
      updateCities(citySelect, country);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    if (!data.country) {
      alert("Por favor selecciona tu país");
      return;
    }

    console.log("Datos del formulario:", data);
    alert("¡Registro completado exitosamente!");
  });
}

function updateCities(citySelect, country) {
  const cities = {
    es: [
      { value: "madrid", label: "Madrid" },
      { value: "barcelona", label: "Barcelona" },
      { value: "valencia", label: "Valencia" },
    ],
    mx: [
      { value: "cdmx", label: "Ciudad de México" },
      { value: "guadalajara", label: "Guadalajara" },
      { value: "monterrey", label: "Monterrey" },
    ],
  };

  // Limpiar opciones actuales
  citySelect.innerHTML = '<option value="">Selecciona una ciudad</option>';

  // Agregar nuevas opciones
  if (cities[country]) {
    cities[country].forEach((city) => {
      const option = document.createElement("option");
      option.value = city.value;
      option.textContent = city.label;
      citySelect.appendChild(option);
    });
  }
}
```

## Demo del Formulario

<me-playground-form id="select-playground" schema-name="select" title="Formulario de Selección" description="Ejemplo interactivo con validación.">
  <div style="margin-bottom: 1rem;">
    <me-select 
      label="País *"
      name="country"
      required
      placeholder="Selecciona tu país">
      <optgroup label="Europa">
        <option value="es">España</option>
        <option value="fr">Francia</option>
        <option value="de">Alemania</option>
      </optgroup>
      <optgroup label="América">
        <option value="mx">México</option>
        <option value="ar">Argentina</option>
        <option value="co">Colombia</option>
        <option value="pe">Perú</option>
      </optgroup>
    </me-select>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <me-select 
      label="Ciudad"
      name="city"
      placeholder="Selecciona una ciudad">
      <option value="">Selecciona primero un país</option>
    </me-select>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <me-select 
      label="Género"
      name="gender"
      searchable
      clearable>
      <option value="">Prefiero no decir</option>
      <option value="male">Masculino</option>
      <option value="female">Femenino</option>
      <option value="other">Otro</option>
    </me-select>
  </div>
</me-playground-form>

## Personalización con CSS

### Variables CSS

```css
me-select {
  --me-select-width: 100%;
  --me-select-height: 40px;
  --me-select-padding: 8px 40px 8px 12px;
  --me-select-border: 1px solid #d1d5db;
  --me-select-border-radius: 6px;
  --me-select-focus-border: #3b82f6;
  --me-select-dropdown-bg: #ffffff;
  --me-select-dropdown-border: #d1d5db;
  --me-select-option-hover-bg: #f3f4f6;
  --me-select-option-selected-bg: #3b82f6;
  --me-select-option-selected-color: #ffffff;
}
```

### Ejemplos de Personalización

<style>
  .custom-select {
    --me-select-focus-border: #10b981;
    --me-select-option-selected-bg: #10b981;
    --me-select-border-radius: 12px;
  }
  
  .compact-select {
    --me-select-height: 32px;
    --me-select-padding: 4px 32px 4px 8px;
  }
  
  .dark-select {
    --me-select-border: 1px solid #374151;
    --me-select-bg: #1f2937;
    --me-select-color: #f9fafb;
    --me-select-focus-border: #8b5cf6;
    --me-select-dropdown-bg: #1f2937;
    --me-select-option-hover-bg: #374151;
  }
</style>

<div class="custom-select" style="margin-bottom: 1rem;">
  <me-select 
    label="Selector personalizado"
    value="opcion2">
    <option value="opcion1">Opción 1</option>
    <option value="opcion2">Opción 2</option>
    <option value="opcion3">Opción 3</option>
  </me-select>
</div>

<div class="compact-select" style="margin-bottom: 1rem;">
  <me-select 
    label="Selector compacto"
    value="es">
    <option value="es">España</option>
    <option value="mx">México</option>
    <option value="ar">Argentina</option>
  </me-select>
</div>

<div class="dark-select">
  <me-select 
    label="Tema oscuro"
    value="fr">
    <option value="fr">Francia</option>
    <option value="de">Alemania</option>
    <option value="it">Italia</option>
  </me-select>
</div>

## Características Avanzadas

### Búsqueda Personalizada

```javascript
const searchableSelect = document.querySelector("me-select[searchable]");
if (searchableSelect) {
  searchableSelect.addEventListener("search", (e) => {
    const searchTerm = e.detail.term;

    // Filtrar opciones basado en el término de búsqueda
    filterOptions(searchableSelect, searchTerm);
  });
}

function filterOptions(select, term) {
  const options = select.querySelectorAll("option");
  options.forEach((option) => {
    const matches = option.textContent
      .toLowerCase()
      .includes(term.toLowerCase());
    option.style.display = matches ? "block" : "none";
  });
}
```

### Carga Dinámica de Opciones

```javascript
const select = document.querySelector("me-select");
if (select) {
  // Simular carga de datos
  loadDynamicOptions(select);
}

async function loadDynamicOptions(select) {
  try {
    // Simular API call
    const response = await fetch("/api/countries");
    const countries = await response.json();

    // Limpiar opciones existentes
    select.innerHTML = '<option value="">Selecciona un país</option>';

    // Agregar nuevas opciones
    countries.forEach((country) => {
      const option = document.createElement("option");
      option.value = country.code;
      option.textContent = country.name;
      select.appendChild(option);
    });
  } catch (error) {
    console.error("Error cargando opciones:", error);
  }
}
```

## Accesibilidad

El componente MelserSelect incluye:

- **Navegación por teclado**: Flechas, Enter, Escape funcionan
- **Anuncios de screen readers**: Cambios de selección anunciados
- **Focus management**: Indicador visual claro
- **ARIA attributes**: aria-expanded, aria-controls, aria-activedescendant
- **Groups accesibles**: optgroup correctamente anunciado

## Mejores Prácticas

1. **Siempre incluye placeholder** para casos sin selección
2. **Usa grupos lógicos** para organizar opciones relacionadas
3. **Habilita búsqueda** cuando hay muchas opciones
4. **Incluye validación** para campos requeridos
5. **Proporciona feedback** inmediato al usuario
6. **Considera el orden** de opciones por relevancia
7. **Usa clearable** para casos donde pueda necesitarse limpieza

## Troubleshooting

### Búsqueda no funciona

```html
<!-- Asegurar que searchable esté habilitado -->
<me-select searchable label="Con búsqueda"></me-select>
```

### Opciones no se cargan dinámicamente

```javascript
// Verificar que las opciones estén correctamente estructuradas
select.innerHTML = `
  <option value="">Selecciona una opción</option>
  <option value="1">Opción 1</option>
  <option value="2">Opción 2</option>
`;

// Disparar evento para actualizar el componente
select.dispatchEvent(new Event("change"));
```

### Validación no funciona

```html
<!-- Usar required junto con placeholder vacío -->
<me-select required placeholder="Selecciona una opción">
  <option value="">Selecciona una opción</option>
  <option value="1">Opción 1</option>
</me-select>
```

### Problemas de accesibilidad

```html
<!-- Agregar labels descriptivos para casos complejos -->
<me-select aria-label="Selecciona tu país de nacimiento" searchable></me-select>
```

### Focus no visible

```css
/* Personalizar indicador de foco */
me-select:focus-within {
  box-shadow: 0 0 0 2px #3b82f6;
  border-color: #3b82f6;
}
```

### Dropdown no se cierra

```javascript
// Cerrar dropdown programáticamente
select.close();

// O escuchar eventos de click externo
document.addEventListener("click", (e) => {
  if (!select.contains(e.target)) {
    select.close();
  }
});
```
