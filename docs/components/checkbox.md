---
title: MelserCheckbox
---

# MelserCheckbox

Un componente checkbox accesible y personalizable construido con Lit.

## Ejemplo Básico

```html
<melser-checkbox label="Acepto los términos y condiciones"></melser-checkbox>
```

## Demo Interactivo

<melser-checkbox id="demo-basic" label="Checkbox básico"></melser-checkbox>

<melser-checkbox id="demo-checked" label="Checkbox marcado por defecto" checked></melser-checkbox>

<melser-checkbox id="demo-disabled" label="Checkbox deshabilitado" disabled></melser-checkbox>

<melser-checkbox id="demo-indeterminate" label="Estado intermedio" checked="indeterminate"></melser-checkbox>

## Propiedades

| Propiedad | Tipo | Valor por Defecto | Descripción |
|-----------|------|-------------------|-------------|
| `checked` | `boolean \\| 'indeterminate'` | `false` | Estado del checkbox |
| `disabled` | `boolean` | `false` | Deshabilita la interacción |
| `indeterminate` | `boolean` | `false` | Estado intermedio (indeterminado) |
| `label` | `string` | `''` | Texto de la etiqueta |
| `name` | `string` | `''` | Nombre para formularios |
| `value` | `string` | `'on'` | Valor cuando está marcado |
| `required` | `boolean` | `false` | Campo requerido en formularios |
| `aria-label` | `string` | `''` | Label para accesibilidad |

## Eventos

| Evento | Descripción |
|--------|-------------|
| `input` | Se dispara al cambiar el estado (durante la interacción) |
| `change` | Se dispara al confirmar el cambio |
| `focus` | Se dispara al obtener el foco |
| `blur` | Se dispara al perder el foco |

## Ejemplos de Uso

### Checkbox Simple

```html
<melser-checkbox 
  label="Suscribirse al newsletter"
  name="newsletter"
  value="yes">
</melser-checkbox>
```

### Checkbox con Estado Inicial

```html
<melser-checkbox 
  label="Recordar credenciales"
  checked
  name="remember">
</melser-checkbox>
```

### Checkbox Requerido

```html
<melser-checkbox 
  label="Acepto los términos *"
  required
  name="terms"
  id="terms-checkbox">
</melser-checkbox>
```

### Checkbox Deshabilitado

```html
<melser-checkbox 
  label="Opción no disponible"
  disabled
  checked>
</melser-checkbox>
```

## Integración con Formularios

### Formulario Completo

```html
<form id="demo-form">
  <h3>Registro de Usuario</h3>
  
  <melser-checkbox 
    label="Acepto los términos y condiciones"
    name="terms"
    required
    id="terms">
  </melser-checkbox>
  
  <melser-checkbox 
    label="Quiero recibir ofertas por email"
    name="marketing"
    id="marketing">
  </melser-checkbox>
  
  <melser-checkbox 
    label="Acepto la política de privacidad"
    name="privacy"
    required
    id="privacy">
  </melser-checkbox>
  
  <button  type="submit" variant="primary">
    Crear Cuenta
  </button >
</form>
```

```javascript
const form = document.getElementById('demo-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const terms = document.getElementById('terms')?.checked;
    const marketing = document.getElementById('marketing')?.checked;
    const privacy = document.getElementById('privacy')?.checked;
    
    if (!terms || !privacy) {
      alert('Debes aceptar los términos obligatorios');
      return;
    }
    
    console.log('Formulario enviado:', { terms, marketing, privacy });
    alert('Formulario enviado correctamente');
  });
}
```

### Demo del Formulario

<form id="checkbox-form">
  <div style="margin-bottom: 1rem;">
    <melser-checkbox 
      label="Acepto los términos y condiciones *"
      name="terms"
      required
      id="form-terms">
    </melser-checkbox>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <melser-checkbox 
      label="Quiero recibir ofertas por email"
      name="marketing"
      id="form-marketing">
    </melser-checkbox>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <melser-checkbox 
      label="Acepto la política de privacidad *"
      name="privacy"
      required
      id="form-privacy">
    </melser-checkbox>
  </div>
  
  <button  type="submit" variant="primary" id="form-submit">
    Crear Cuenta
  </button >
</form>


## Personalización con CSS

### Variables CSS

```css
melser-checkbox {
  --melser-checkbox-size: 20px;
  --melser-checkbox-color: #3b82f6;
  --melser-checkbox-border-color: #d1d5db;
  --melser-checkbox-border-radius: 4px;
  --melser-checkbox-focus-color: #2563eb;
  --melser-checkbox-disabled-opacity: 0.5;
}
```

### Ejemplo Personalizado

<style>
  .custom-checkbox {
    --melser-checkbox-size: 24px;
    --melser-checkbox-color: #10b981;
    --melser-checkbox-border-color: #10b981;
    --melser-checkbox-border-radius: 8px;
    --melser-checkbox-focus-color: #059669;
  }
  
  .dark-theme {
    --melser-checkbox-color: #8b5cf6;
    --melser-checkbox-border-color: #8b5cf6;
    --melser-checkbox-focus-color: #7c3aed;
  }
</style>

<div class="custom-checkbox" style="margin-bottom: 1rem;">
  <melser-checkbox 
    label="Checkbox personalizado (verde)"
    checked>
  </melser-checkbox>
</div>

<div class="dark-theme">
  <melser-checkbox 
    label="Checkbox tema oscuro (púrpura)"
    checked>
  </melser-checkbox>
</div>

## Accesibilidad

El componente MelserCheckbox incluye:

- **Navegación por teclado**: Tab para navegar, Space para activar
- **Screen reader support**: ARIA labels apropiados
- **Focus visible**: Indicador claro de foco
- **High contrast**: Compatible con modo de alto contraste

## Mejores Prácticas

1. **Siempre incluye un label** para describir el propósito
2. **Usa `required` para campos obligatorios** en formularios
3. **Maneja los eventos `change`** para responder a cambios de estado
4. **Considera el uso de `aria-label`** para casos complejos
5. **No dependas solo del color** para transmitir información

## Troubleshooting

### El checkbox no responde a clicks

```javascript
// Verificar que el componente esté importado
import 'melser-ui/components/melser-checkbox.js';

// Verificar que no esté deshabilitado
console.log(checkbox.disabled); // Debe ser false
```

### El valor no se envía en el formulario

```html
<!-- Asegúrate de incluir el atributo name -->
<melser-checkbox 
  name="accept"
  value="yes"
  label="Acepto">
</melser-checkbox>
```

### Problemas de accesibilidad

```html
<!-- Usar aria-label para casos complejos -->
<melser-checkbox 
  aria-label="Acepto los términos de servicio versión 2.3"
  label="Acepto">
</melser-checkbox>