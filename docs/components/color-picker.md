---
title: MelserColorPicker
---

# MelserColorPicker

Un selector de color avanzado con múltiples formatos (HEX, RGB, HSL), paleta de colores, transparencia y herramientas de selección.

## Ejemplo Básico

```html
<melser-color-picker 
  label="Selecciona un color" 
  value="#3b82f6">
</melser-color-picker>
```

## Demo Interactivo

<melser-color-picker 
  id="demo-basic" 
  label="Selector básico" 
  value="#3b82f6">
</melser-color-picker>

<melser-color-picker 
  id="demo-transparent" 
  label="Con transparencia" 
  value="#3b82f6"
  show-alpha>
</melser-color-picker>

<melser-color-picker 
  id="demo-palette" 
  label="Con paleta personalizada" 
  value="#10b981"
  palette="primary">
</melser-color-picker>

<melser-color-picker 
  id="demo-disabled" 
  label="Deshabilitado" 
  value="#ef4444"
  disabled>
</melser-color-picker>

<melser-color-picker 
  id="demo-formats" 
  label="Diferentes formatos" 
  value="#8b5cf6"
  format="hex">
</melser-color-picker>

<melser-color-picker 
  id="demo-theme" 
  label="Selector de tema" 
  value="#1f2937"
  theme="dark">
</melser-color-picker>

## Propiedades

| Propiedad | Tipo | Valor por Defecto | Descripción |
|-----------|------|-------------------|-------------|
| `value` | `string` | `'#000000'` | Color seleccionado |
| `format` | `string` | `'hex'` | Formato de salida (hex, rgb, hsl) |
| `show-alpha` | `boolean` | `false` | Muestra control de transparencia |
| `palette` | `string` | `''` | Paleta predefinida (primary, success, warning, danger) |
| `theme` | `string` | `'light'` | Tema del selector (light, dark) |
| `disabled` | `boolean` | `false` | Deshabilita la interacción |
| `required` | `boolean` | `false` | Campo requerido en formularios |
| `readonly` | `boolean` | `false` | Solo lectura |
| `label` | `string` | `''` | Etiqueta visible del campo |

## Eventos

| Evento | Descripción |
|--------|-------------|
| `change` | Se dispara al cambiar el color |
| `color-change` | Se dispara durante el cambio de color |
| `focus` | Se dispara al obtener el foco |
| `blur` | Se dispara al perder el foco |
| `format-change` | Se dispara al cambiar el formato |

## Ejemplos de Uso

### Selector Simple

```html
<melser-color-picker 
  label="Color favorito"
  name="favoriteColor"
  value="#3b82f6">
</melser-color-picker>
```

### Selector con Transparencia

```html
<melser-color-picker 
  label="Color con transparencia"
  name="overlayColor"
  value="#3b82f6"
  show-alpha
  format="rgba"
  placeholder="Selecciona un color con transparencia">
</melser-color-picker>
```

### Selector de Paleta de Marca

```html
<melser-color-picker 
  label="Color primario de marca"
  name="brandColor"
  value="#3b82f6"
  palette="primary"
  required>
</melser-color-picker>
```

### Selector para Personalización de Tema

```html
<melser-color-picker 
  label="Color de acento"
  name="accentColor"
  value="#8b5cf6"
  format="hex"
  theme="dark">
</melser-color-picker>
```

## Integración con Formularios

### Formulario de Personalización de Diseño

```html
<form id="design-form">
  <div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <h4>🎨 Colores de Marca</h4>
    
    <melser-color-picker 
      label="Color primario *"
      name="primaryColor"
      required
      value="#3b82f6"
      palette="primary"
      id="form-primary">
    </melser-color-picker>
    
    <melser-color-picker 
      label="Color secundario"
      name="secondaryColor"
      value="#6b7280"
      palette="neutral"
      id="form-secondary">
    </melser-color-picker>
    
    <melser-color-picker 
      label="Color de acento"
      name="accentColor"
      value="#10b981"
      palette="success"
      id="form-accent">
    </melser-color-picker>
  </div>
  
  <div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <h4>🌗 Tema de Interfaz</h4>
    
    <melser-color-picker 
      label="Color de fondo"
      name="backgroundColor"
      value="#ffffff"
      theme="light"
      id="form-background">
    </melser-color-picker>
    
    <melser-color-picker 
      label="Color de texto"
      name="textColor"
      value="#1f2937"
      theme="dark"
      id="form-text">
    </melser-color-picker>
    
    <melser-color-picker 
      label="Color de borde"
      name="borderColor"
      value="#e5e7eb"
      theme="light"
      id="form-border">
    </melser-color-picker>
  </div>
  
  <div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <h4>⚠️ Colores de Estado</h4>
    
    <melser-color-picker 
      label="Color de éxito"
      name="successColor"
      value="#10b981"
      palette="success"
      id="form-success">
    </melser-color-picker>
    
    <melser-color-picker 
      label="Color de advertencia"
      name="warningColor"
      value="#f59e0b"
      palette="warning"
      id="form-warning">
    </melser-color-picker>
    
    <melser-color-picker 
      label="Color de error"
      name="errorColor"
      value="#ef4444"
      palette="danger"
      id="form-error">
    </melser-color-picker>
  </div>
  
  <melser-button type="submit" variant="primary">
    Aplicar Diseño
  </melser-button>
</form>
```

```javascript
const form = document.getElementById('design-form');
if (form) {
  const colorPickers = form.querySelectorAll('melser-color-picker');
  
  // Manejar cambios de color en tiempo real
  colorPickers.forEach(picker => {
    picker.addEventListener('color-change', (e) => {
      const color = e.detail.color;
      const name = picker.name;
      
      console.log(`Color ${name}:`, color);
      
      // Aplicar cambios visualmente si es necesario
      if (name === 'primaryColor') {
        document.documentElement.style.setProperty('--primary-color', color.hex);
      }
    });
  });
  
  // Validar contrastes
  function checkContrast(foreground, background) {
    // Implementar cálculo de contraste WCAG
    const fg = parseInt(foreground.slice(1), 16);
    const bg = parseInt(background.slice(1), 16);
    
    const r1 = Math.max((fg >> 16) & 255, (bg >> 16) & 255);
    const g1 = Math.max((fg >> 8) & 255, (bg >> 8) & 255);
    const b1 = Math.max(fg & 255, bg & 255);
    
    const r2 = Math.min((fg >> 16) & 255, (bg >> 16) & 255);
    const g2 = Math.min((fg >> 8) & 255, (bg >> 8) & 255);
    const b2 = Math.min(fg & 255, bg & 255);
    
    const L1 = (0.2126 * r1 + 0.7152 * g1 + 0.0722 * b1) / 255;
    const L2 = (0.2126 * r2 + 0.7152 * g2 + 0.0722 * b2) / 255;
    
    const contrast = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    
    return {
      ratio: contrast,
      aa: contrast >= 4.5,
      aaa: contrast >= 7
    };
  }
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const design = Object.fromEntries(formData);
    
    // Validar contrastes importantes
    const textColor = design.textColor || '#1f2937';
    const bgColor = design.backgroundColor || '#ffffff';
    const borderColor = design.borderColor || '#e5e7eb';
    
    const textContrast = checkContrast(textColor, bgColor);
    const borderContrast = checkContrast(borderColor, bgColor);
    
    let warnings = [];
    
    if (!textContrast.aa) {
      warnings.push(`⚠️ El contraste texto/fondo (${textContrast.ratio.toFixed(2)}) no cumple WCAG AA`);
    }
    
    if (!borderContrast.aa) {
      warnings.push(`⚠️ El contraste borde/fondo (${borderContrast.ratio.toFixed(2)}) no cumple WCAG AA`);
    }
    
    if (warnings.length > 0) {
      alert('Advertencias de accesibilidad:\n\n' + warnings.join('\n'));
    }
    
    console.log('Diseño aplicado:', design);
    alert('¡Diseño aplicado exitosamente!\n\nColores de marca y tema configurados.');
  });
}
```

## Demo del Formulario

<form id="color-picker-form">
  <div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <h4>🎨 Selector de Colores</h4>
    
    <melser-color-picker 
      label="Color principal"
      name="mainColor"
      value="#3b82f6"
      palette="primary"
      id="form-main">
    </melser-color-picker>
    
    <melser-color-picker 
      label="Color secundario"
      name="secondaryColor"
      value="#10b981"
      palette="success"
      id="form-secondary">
    </melser-color-picker>
    
    <melser-color-picker 
      label="Color con transparencia"
      name="overlayColor"
      value="#8b5cf6"
      show-alpha
      format="rgba"
      id="form-overlay">
    </melser-color-picker>
    
    <melser-color-picker 
      label="Color de estado"
      name="statusColor"
      value="#f59e0b"
      palette="warning"
      id="form-status">
    </melser-color-picker>
  </div>
  
  <div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <h4>🎯 Vista Previa</h4>
    <div id="color-preview" style="padding: 1rem; border-radius: 6px; transition: all 0.3s ease;">
      <div style="margin-bottom: 0.5rem;">
        <strong>Color Principal:</strong> <span id="preview-main">#3b82f6</span>
      </div>
      <div style="margin-bottom: 0.5rem;">
        <strong>Color Secundario:</strong> <span id="preview-secondary">#10b981</span>
      </div>
      <div style="margin-bottom: 0.5rem;">
        <strong>Overlay:</strong> <span id="preview-overlay">#8b5cf6</span>
      </div>
      <div style="margin-bottom: 0.5rem;">
        <strong>Estado:</strong> <span id="preview-status">#f59e0b</span>
      </div>
    </div>
  </div>
  
  <melser-button type="submit" variant="primary" id="form-submit">
    Aplicar Colores
  </melser-button>
</form>

<div id="color-result" style="margin-top: 1rem; padding: 1rem; background: #f3f4f6; border-radius: 6px; display: none;">
  <strong>Colores Aplicados:</strong>
  <div id="color-details"></div>
</div>


## Personalización con CSS

### Variables CSS

```css
melser-color-picker {
  --melser-color-picker-width: 100%;
  --melser-color-picker-height: 40px;
  --melser-color-picker-border: 1px solid #d1d5db;
  --melser-color-picker-border-radius: 6px;
  --melser-color-picker-focus-border: #3b82f6;
  --melser-color-picker-swatch-size: 20px;
  --melser-color-picker-swatch-border: 1px solid #e5e7eb;
  --melser-color-picker-overlay: rgba(0, 0, 0, 0.5);
}
```

### Ejemplos de Personalización

<style>
  .custom-color-picker {
    --melser-color-picker-focus-border: #10b981;
    --melser-color-picker-swatch-size: 24px;
    --melser-color-picker-border-radius: 12px;
  }
  
  .minimal-color-picker {
    --melser-color-picker-border: 1px solid #e5e7eb;
    --melser-color-picker-swatch-size: 16px;
  }
  
  .dark-color-picker {
    --melser-color-picker-border: 1px solid #374151;
    --melser-color-picker-focus-border: #8b5cf6;
    --melser-color-picker-overlay: rgba(255, 255, 255, 0.2);
  }
</style>

<div class="custom-color-picker" style="margin-bottom: 1rem;">
  <melser-color-picker 
    label="Color picker personalizado"
    value="#10b981">
  </melser-color-picker>
</div>

<div class="minimal-color-picker" style="margin-bottom: 1rem;">
  <melser-color-picker 
    label="Color picker minimalista"
    value="#6b7280">
  </melser-color-picker>
</div>

<div class="dark-color-picker">
  <melser-color-picker 
    label="Color picker tema oscuro"
    value="#8b5cf6"
    theme="dark">
  </melser-color-picker>
</div>

## Características Avanzadas

### Validación de Paleta de Marca

```javascript
const brandPicker = document.querySelector('melser-color-picker[name="brandColor"]');
if (brandPicker) {
  brandPicker.addEventListener('change', (e) => {
    const color = e.target.value;
    const brandGuidelines = {
      primary: ['#3b82f6', '#1d4ed8', '#1e40af'],
      secondary: ['#6b7280', '#4b5563', '#374151'],
      accent: ['#10b981', '#059669', '#047857']
    };
    
    // Verificar si el color está en la paleta permitida
    const isBrandColor = Object.values(brandGuidelines).some(palette => 
      palette.includes(color.toLowerCase())
    );
    
    if (!isBrandColor) {
      console.warn('Color fuera de la paleta de marca');
    }
  });
}
```

### Sincronización con CSS Custom Properties

```javascript
function syncColorWithCSS(picker, cssProperty) {
  picker.addEventListener('change', (e) => {
    const color = e.target.value;
    document.documentElement.style.setProperty(cssProperty, color);
    console.log(`${cssProperty} actualizado a: ${color}`);
  });
}

// Sincronizar con variables CSS
syncColorWithCSS(document.querySelector('[name="primaryColor"]'), '--primary-color');
syncColorWithCSS(document.querySelector('[name="secondaryColor"]'), '--secondary-color');
```

### Paleta Dinámica

```javascript
const picker = document.querySelector('melser-color-picker');
if (picker) {
  // Generar paleta basada en color base
  function generatePalette(baseColor) {
    const hsl = hexToHsl(baseColor);
    return {
      50: hslToHex(hsl.h, hsl.s, 95),
      100: hslToHex(hsl.h, hsl.s, 90),
      500: hslToHex(hsl.h, hsl.s, 50),
      900: hslToHex(hsl.h, hsl.s, 10)
    };
  }
  
  picker.addEventListener('change', (e) => {
    const baseColor = e.target.value;
    const palette = generatePalette(baseColor);
    
    console.log('Paleta generada:', palette);
    
    // Aplicar paleta al documento
    Object.entries(palette).forEach(([shade, color]) => {
      document.documentElement.style.setProperty(`--color-${shade}`, color);
    });
  });
}

// Utilidades de conversión de color
function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  
  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  const toHex = x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
```

## Accesibilidad

El componente MelserColorPicker incluye:

- **Navegación por teclado**: Flechas, Tab, Enter, Space
- **Anuncios de screen readers**: Colores y cambios anunciados
- **ARIA labels**: Completamente etiquetado para accesibilidad
- **Focus management**: Navegación lógica del selector
- **Estados de disabled**: Correctamente anunciados

## Mejores Prácticas

1. **Usa paletas predefinidas** para mantener consistencia
2. **Incluye validación de contraste** para accesibilidad
3. **Proporciona múltiples formatos** (hex, rgb, hsl)
4. **Considera el tema** (claro/oscuro) del selector
5. **Permite transparencia** cuando sea necesario
6. **Sincroniza con CSS** custom properties
7. **Valida colores de marca** según guidelines

## Troubleshooting

### Selector no abre

```javascript
// Verificar que el componente esté importado
import 'melser-ui/components/melser-color-picker.js';

// Verificar que no esté deshabilitado
console.log(picker.disabled); // Debe ser false
```

### Paleta no funciona

```html
<!-- Verificar que palette esté configurada -->
<melser-color-picker 
  palette="primary"
  label="Con paleta primaria">
```

### Transparencia no se muestra

```html
<!-- Verificar que show-alpha esté habilitado -->
<melser-color-picker 
  show-alpha
  label="Con transparencia">
```

### Formato no cambia

```html
<!-- Verificar que format esté configurado -->
<melser-color-picker 
  format="rgb"
  label="Formato RGB">
```

### Focus no visible

```css
/* Personalizar indicador de foco */
melser-color-picker:focus-within {
  box-shadow: 0 0 0 2px #3b82f6;
  border-color: #3b82f6;
}
```

### Problemas de accesibilidad

```html
<!-- Agregar descripción para casos específicos -->
<melser-color-picker 
  aria-label="Selecciona el color primario de tu marca"
  palette="primary">
```

### Colores no se sincronizan

```javascript
// Verificar que los valores estén correctamente establecidos
picker.value = '#3b82f6';
picker.dispatchEvent(new Event('change'));
```

### Performance con muchas opciones

```javascript
// Limitar paleta mostrada
picker.maxPaletteColors = 12;