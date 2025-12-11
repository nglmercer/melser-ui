---
title: MelserTextInput
---

# MelserTextInput

Un componente de entrada de texto avanzado y personalizable con validación, iconos y soporte completo de formularios.

## Ejemplo Básico

```html
<base-input label="Nombre completo" placeholder="Escribe tu nombre">
</base-input>
```

## Propiedades

| Propiedad      | Tipo      | Valor por Defecto | Descripción                                           |
| -------------- | --------- | ----------------- | ----------------------------------------------------- |
| `type`         | `string`  | `'text'`          | Tipo de input (text, password, email, tel, url, etc.) |
| `label`        | `string`  | `''`              | Etiqueta visible del campo                            |
| `placeholder`  | `string`  | `''`              | Texto de marcador de posición                         |
| `value`        | `string`  | `''`              | Valor del campo                                       |
| `disabled`     | `boolean` | `false`           | Deshabilita la interacción                            |
| `readonly`     | `boolean` | `false`           | Solo lectura                                          |
| `required`     | `boolean` | `false`           | Campo requerido en formularios                        |
| `name`         | `string`  | `''`              | Nombre para formularios                               |
| `minlength`    | `number`  | `undefined`       | Longitud mínima permitida                             |
| `maxlength`    | `number`  | `undefined`       | Longitud máxima permitida                             |
| `pattern`      | `string`  | `''`              | Expresión regular para validación                     |
| `autocomplete` | `string`  | `'off'`           | Control de autocompletado                             |
| `autofocus`    | `boolean` | `false`           | Enfoque automático                                    |
| `error`        | `string`  | `''`              | Mensaje de error personalizado                        |
| `hint`         | `string`  | `''`              | Texto de ayuda                                        |
| `size`         | `string`  | `'md'`            | Tamaño del input (sm, md, lg)                         |

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

### Input con Validación de Email

```html
<base-input
  label="Correo electrónico"
  type="email"
  placeholder="tu@email.com"
  required
  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
  hint="Ingresa un email válido"
>
</base-input>
```

### Input con Contador de Caracteres

```html
<base-input
  label="Bio"
  placeholder="Cuéntanos sobre ti..."
  maxlength="200"
  hint="Máximo 200 caracteres"
>
</base-input>
```

### Input con Autocompletado

```html
<base-input
  label="País"
  placeholder="Selecciona un país"
  autocomplete="country"
  datalist="countries"
>
</base-input>

<datalist id="countries">
  <option value="España"></option>
  <option value="México"></option>
  <option value="Argentina"></option>
  <option value="Colombia"></option>
  <option value="Perú"></option>
</datalist>
```

### Input con Estados

```html
<base-input
  label="Usuario"
  placeholder="3-20 caracteres"
  minlength="3"
  maxlength="20"
  pattern="[a-zA-Z0-9_]+"
  error="Solo letras, números y guiones bajos"
>
</base-input>
```

## Integración con Formularios

### Formulario de Registro Completo

```html
<form id="registration-form">
  <base-input
    label="Nombre completo *"
    name="fullName"
    required
    minlength="2"
    placeholder="Juan Pérez"
  >
  </base-input>

  <base-input
    label="Correo electrónico *"
    type="email"
    name="email"
    required
    placeholder="juan@email.com"
  >
  </base-input>

  <base-input
    label="Teléfono"
    type="tel"
    name="phone"
    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
    placeholder="123-456-7890"
  >
  </base-input>

  <base-input
    label="Sitio web"
    type="url"
    name="website"
    placeholder="https://miweb.com"
  >
  </base-input>

  <button type="submit" variant="primary">Registrarse</button>
</form>
```

```javascript
const form = document.getElementById("registration-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    console.log("Datos del formulario:", data);

    // Validación manual adicional
    if (!data.fullName || !data.email) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    alert("¡Formulario enviado correctamente!");
  });
}
```

## Demo del Formulario

<me-playground-form id="text-input-playground" schema-name="text-input" title="Formulario de Ejemplo" description="Ejemplo interactivo con validación Zod automática.">
  <div style="margin-bottom: 1rem;">
    <base-input 
      label="Nombre completo *"
      name="fullName"
      required
      minlength="2"
      placeholder="Juan Pérez">
    </base-input>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <base-input 
      label="Correo electrónico *"
      type="email"
      name="email"
      required
      placeholder="juan@email.com">
    </base-input>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <base-input 
      label="Teléfono"
      type="tel"
      name="phone"
      placeholder="123-456-7890">
    </base-input>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <base-input 
      label="Sitio web"
      type="url"
      name="website"
      placeholder="https://miweb.com">
    </base-input>
  </div>
</me-playground-form>

## Personalización con CSS

### Variables CSS

Debido al nuevo sistema de Design Tokens, las variables ahora siguen un patrón consistente `base-input-*`.

```css
base-input {
  /* Variables Principales */
  --base-input-bg: #ffffff;
  --base-input-bg-hover: #f9fafb;
  --base-input-bg-focus: #ffffff;

  --base-input-text-color: #333333;
  --base-input-text-color-placeholder: #6b7280;

  --base-input-border-color: #cccccc;
  --base-input-border-color-hover: #999999;
  --base-input-border-color-focus: #3b82f6;

  --base-input-padding: 0.75rem;
  --base-input-radius: 4px;
  --base-input-font-size: 1rem;

  --base-input-focus-ring-color: #3b82f6;
  --base-input-focus-ring-width: 2px;
}
```

### Ejemplos de Personalización

<style>
  .custom-input base-input {
    --base-input-focus-ring-color: #10b981;
    --base-input-border-color-focus: #10b981;
    --base-input-radius: 12px;
    --base-input-bg: #ecfdf5;
  }
  
  .large-input base-input {
    --base-input-padding: 1rem 1.5rem;
    --base-input-font-size: 1.25rem;
  }
  
  .dark-theme-input base-input {
    --base-input-bg: #1f2937;
    --base-input-border-color: #374151;
    --base-input-text-color: #f3f4f6;
    --base-input-text-color-placeholder: #9ca3af;
    --base-input-focus-ring-color: #8b5cf6;
  }
</style>

<div class="custom-input" style="margin-bottom: 1rem;">
  <base-input 
    label="Input personalizado (verde)"
    placeholder="Estilos personalizados">
  </base-input>
</div>

<div class="large-input" style="margin-bottom: 1rem;">
  <base-input 
    label="Input grande"
    placeholder="Más cómodo de usar">
  </base-input>
</div>

<div class="dark-theme-input">
  <base-input 
    label="Tema oscuro (Manual)"
    placeholder="Override manual de estilos"
    value="Texto en tema oscuro">
  </base-input>
</div>

<h3>Colores</h3>
<div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1rem;">
  <base-input label="Success Input" color="success" placeholder="Correcto" value="Valor válido"></base-input>
  <base-input label="Warning Input" color="warning" placeholder="Advertencia" value="Valor sospechoso"></base-input>
  <base-input label="Danger Input" color="danger" placeholder="Error" value="Valor inválido"></base-input>
</div>

## Accesibilidad

El componente MelserTextInput incluye:

- **Labels asociados**: Relación semántica entre label e input
- **Aria-describedby**: Para hint y mensajes de error
- **Estados de focus**: Indicador visual claro
- **Navegación por teclado**: Tab, Enter, Escape
- **Validación accesible**: Mensajes de error anunciados por screen readers

## Mejores Prácticas

1. **Siempre usa labels** para describir el propósito del campo
2. **Incluye placeholders** para ejemplos o formato
3. **Valida en tiempo real** pero sin ser intrusivo
4. **Proporciona mensajes de ayuda** con `hint`
5. **Usa tipos apropiados** (email, tel, url) para mejor UX
6. **Maneja estados de error** claramente
7. **Considera autocompletado** para campos comunes

## Troubleshooting

### El input no responde a eventos

```javascript
// Verificar que el componente esté importado
import "melser-ui/components/base-input.js";

// Verificar que no esté deshabilitado
console.log(input.disabled); // Debe ser false
```

### Validación no funciona

```html
<!-- Asegúrate de usar los atributos correctos -->
<base-input
  required
  minlength="3"
  maxlength="50"
  pattern="[A-Za-z ]+"
  error="Solo letras y espacios"
>
</base-input>
```

### Problemas de accesibilidad

```html
<!-- Para campos complejos, usa aria-label -->
<base-input
  aria-label="Código de verificación de 6 dígitos"
  maxlength="6"
  pattern="[0-9]{6}"
>
</base-input>
```

### Estados de foco no visibles

```css
/* Personaliza el indicador de foco */
base-input:focus-within {
  box-shadow: 0 0 0 2px #3b82f6;
}
```
