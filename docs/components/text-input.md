---
title: MelserTextInput
---

# MelserTextInput

Un componente de entrada de texto avanzado y personalizable con validación, iconos y soporte completo de formularios.

## Ejemplo Básico

```html
<melser-text-input 
  label="Nombre completo" 
  placeholder="Escribe tu nombre">
</melser-text-input>
```

## Demo Interactiva

<melser-text-input 
  id="demo-basic" 
  label="Campo de texto básico" 
  placeholder="Escribe algo...">
</melser-text-input>

<melser-text-input 
  id="demo-required" 
  label="Campo requerido *" 
  placeholder="Este campo es obligatorio"
  required>
</melser-text-input>

<melser-text-input 
  id="demo-disabled" 
  label="Campo deshabilitado" 
  placeholder="No puedes escribir aquí"
  disabled
  value="Valor predefinido">
</melser-text-input>

<melser-text-input 
  id="demo-password" 
  label="Contraseña" 
  type="password" 
  placeholder="Mínimo 8 caracteres"
  minlength="8">
</melser-text-input>

## Propiedades

| Propiedad | Tipo | Valor por Defecto | Descripción |
|-----------|------|-------------------|-------------|
| `type` | `string` | `'text'` | Tipo de input (text, password, email, tel, url, etc.) |
| `label` | `string` | `''` | Etiqueta visible del campo |
| `placeholder` | `string` | `''` | Texto de marcador de posición |
| `value` | `string` | `''` | Valor del campo |
| `disabled` | `boolean` | `false` | Deshabilita la interacción |
| `readonly` | `boolean` | `false` | Solo lectura |
| `required` | `boolean` | `false` | Campo requerido en formularios |
| `name` | `string` | `''` | Nombre para formularios |
| `minlength` | `number` | `undefined` | Longitud mínima permitida |
| `maxlength` | `number` | `undefined` | Longitud máxima permitida |
| `pattern` | `string` | `''` | Expresión regular para validación |
| `autocomplete` | `string` | `'off'` | Control de autocompletado |
| `autofocus` | `boolean` | `false` | Enfoque automático |
| `error` | `string` | `''` | Mensaje de error personalizado |
| `hint` | `string` | `''` | Texto de ayuda |
| `size` | `string` | `'md'` | Tamaño del input (sm, md, lg) |

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

### Input con Validación de Email

```html
<melser-text-input 
  label="Correo electrónico"
  type="email"
  placeholder="tu@email.com"
  required
  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
  hint="Ingresa un email válido">
</melser-text-input>
```

### Input con Contador de Caracteres

```html
<melser-text-input 
  label="Bio"
  placeholder="Cuéntanos sobre ti..."
  maxlength="200"
  hint="Máximo 200 caracteres">
</melser-text-input>
```

### Input con Autocompletado

```html
<melser-text-input 
  label="País"
  placeholder="Selecciona un país"
  autocomplete="country"
  datalist="countries">
</melser-text-input>

<datalist id="countries">
  <option value="España">
  <option value="México">
  <option value="Argentina">
  <option value="Colombia">
  <option value="Perú">
</datalist>
```

### Input con Estados

```html
<melser-text-input 
  label="Usuario"
  placeholder="3-20 caracteres"
  minlength="3"
  maxlength="20"
  pattern="[a-zA-Z0-9_]+"
  error="Solo letras, números y guiones bajos">
</melser-text-input>
```

## Integración con Formularios

### Formulario de Registro Completo

```html
<form id="registration-form">
  <melser-text-input 
    label="Nombre completo *"
    name="fullName"
    required
    minlength="2"
    placeholder="Juan Pérez">
  </melser-text-input>
  
  <melser-text-input 
    label="Correo electrónico *"
    type="email"
    name="email"
    required
    placeholder="juan@email.com">
  </melser-text-input>
  
  <melser-text-input 
    label="Teléfono"
    type="tel"
    name="phone"
    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
    placeholder="123-456-7890">
  </melser-text-input>
  
  <melser-text-input 
    label="Sitio web"
    type="url"
    name="website"
    placeholder="https://miweb.com">
  </melser-text-input>
  
  <melser-button type="submit" variant="primary">
    Registrarse
  </melser-button>
</form>
```

```javascript
const form = document.getElementById('registration-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    console.log('Datos del formulario:', data);
    
    // Validación manual adicional
    if (!data.fullName || !data.email) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }
    
    alert('¡Formulario enviado correctamente!');
  });
}
```

## Demo del Formulario

<form id="text-input-form">
  <div style="margin-bottom: 1rem;">
    <melser-text-input 
      label="Nombre completo *"
      name="fullName"
      required
      minlength="2"
      placeholder="Juan Pérez"
      id="form-name">
    </melser-text-input>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <melser-text-input 
      label="Correo electrónico *"
      type="email"
      name="email"
      required
      placeholder="juan@email.com"
      id="form-email">
    </melser-text-input>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <melser-text-input 
      label="Teléfono"
      type="tel"
      name="phone"
      placeholder="123-456-7890"
      id="form-phone">
    </melser-text-input>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <melser-text-input 
      label="Sitio web"
      type="url"
      name="website"
      placeholder="https://miweb.com"
      id="form-website">
    </melser-text-input>
  </div>
  
  <melser-button type="submit" variant="primary" id="form-submit">
    Enviar Formulario
  </melser-button>
</form>

## Personalización con CSS

### Variables CSS

```css
melser-text-input {
  --melser-input-width: 100%;
  --melser-input-height: 40px;
  --melser-input-padding: 8px 12px;
  --melser-input-border: 1px solid #d1d5db;
  --melser-input-border-radius: 6px;
  --melser-input-focus-border: #3b82f6;
  --melser-input-error-border: #ef4444;
  --melser-input-font-size: 14px;
  --melser-input-background: #ffffff;
  --melser-input-disabled-bg: #f9fafb;
}
```

### Ejemplos de Personalización

<style>
  .custom-input {
    --melser-input-focus-border: #10b981;
    --melser-input-error-border: #f59e0b;
    --melser-input-border-radius: 12px;
  }
  
  .large-input {
    --melser-input-height: 48px;
    --melser-input-font-size: 16px;
    --melser-input-padding: 12px 16px;
  }
  
  .dark-theme-input {
    --melser-input-border: 1px solid #374151;
    --melser-input-focus-border: #8b5cf6;
    --melser-input-background: #1f2937;
    --melser-input-color: #f9fafb;
  }
</style>

<div class="custom-input" style="margin-bottom: 1rem;">
  <melser-text-input 
    label="Input personalizado (verde)"
    placeholder="Estilos personalizados">
  </melser-text-input>
</div>

      console.log('Datos del formulario:', { name, email, phone, website });
      alert('✅ Formulario enviado correctamente!');
    });
  }
</script>

## Personalización con CSS

### Variables CSS

```css
melser-text-input {
  --melser-input-width: 100%;
  --melser-input-height: 40px;
  --melser-input-padding: 8px 12px;
  --melser-input-border: 1px solid #d1d5db;
  --melser-input-border-radius: 6px;
  --melser-input-focus-border: #3b82f6;
  --melser-input-error-border: #ef4444;
  --melser-input-font-size: 14px;
  --melser-input-background: #ffffff;
  --melser-input-disabled-bg: #f9fafb;
}
```

### Ejemplos de Personalización

<style>
  .custom-input {
    --melser-input-focus-border: #10b981;
    --melser-input-error-border: #f59e0b;
    --melser-input-border-radius: 12px;
  }
  
  .large-input {
    --melser-input-height: 48px;
    --melser-input-font-size: 16px;
    --melser-input-padding: 12px 16px;
  }
  
  .dark-theme-input {
    --melser-input-border: 1px solid #374151;
    --melser-input-focus-border: #8b5cf6;
    --melser-input-background: #1f2937;
    --melser-input-color: #f9fafb;
  }
</style>

<div class="custom-input" style="margin-bottom: 1rem;">
  <melser-text-input 
    label="Input personalizado (verde)"
    placeholder="Estilos personalizados">
  </melser-text-input>
</div>

<div class="large-input" style="margin-bottom: 1rem;">
  <melser-text-input 
    label="Input grande"
    placeholder="Más cómodo de usar">
  </melser-text-input>
</div>

<div class="dark-theme-input">
  <melser-text-input 
    label="Tema oscuro"
    placeholder="Para modo oscuro"
    value="Texto en tema oscuro">
  </melser-text-input>
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
import 'melser-ui/components/melser-text-input.js';

// Verificar que no esté deshabilitado
console.log(input.disabled); // Debe ser false
```

### Validación no funciona

```html
<!-- Asegúrate de usar los atributos correctos -->
<melser-text-input 
  required
  minlength="3"
  maxlength="50"
  pattern="[A-Za-z ]+"
  error="Solo letras y espacios">
</melser-text-input>
```

### Problemas de accesibilidad

```html
<!-- Para campos complejos, usa aria-label -->
<melser-text-input 
  aria-label="Código de verificación de 6 dígitos"
  maxlength="6"
  pattern="[0-9]{6}">
</melser-text-input>
```

### Estados de foco no visibles

```css
/* Personaliza el indicador de foco */
melser-text-input:focus-within {
  box-shadow: 0 0 0 2px #3b82f6;
}