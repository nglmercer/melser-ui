---
title: MelserSwitch
---

# MelserSwitch

Un componente switch/toggle moderno y accesible para activar/desactivar opciones con animaciones fluidas y estados visuales claros.

## Ejemplo Básico

```html
<melser-switch 
  label="Activar notificaciones" 
  checked>
</melser-switch>
```

## Demo Interactivo

<melser-switch 
  id="demo-basic" 
  label="Switch básico">
</melser-switch>

<melser-switch 
  id="demo-checked" 
  label="Switch activado por defecto" 
  checked>
</melser-switch>

<melser-switch 
  id="demo-disabled" 
  label="Switch deshabilitado" 
  disabled
  checked>
</melser-switch>

<melser-switch 
  id="demo-sizes" 
  label="Tamaños diferentes">
</melser-switch>

<div style="margin: 1rem 0; display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
  <melser-switch size="sm" label="Pequeño"></melser-switch>
  <melser-switch size="md" label="Mediano"></melser-switch>
  <melser-switch size="lg" label="Grande"></melser-switch>
</div>

<melser-switch 
  id="demo-colors" 
  label="Diferentes colores">
</melser-switch>

<div style="margin: 1rem 0; display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
  <melser-switch color="primary" label="Primario" checked></melser-switch>
  <melser-switch color="success" label="Éxito" checked></melser-switch>
  <melser-switch color="warning" label="Advertencia" checked></melser-switch>
  <melser-switch color="danger" label="Peligro" checked></melser-switch>
</div>

<melser-switch 
  id="demo-text" 
  label="Con texto personalizado"
  checked-text="ON"
  unchecked-text="OFF">
</melser-switch>


## Propiedades

| Propiedad | Tipo | Valor por Defecto | Descripción |
|-----------|------|-------------------|-------------|
| `checked` | `boolean` | `false` | Estado activo/inactivo |
| `disabled` | `boolean` | `false` | Deshabilita la interacción |
| `size` | `string` | `'md'` | Tamaño del switch (sm, md, lg) |
| `color` | `string` | `'primary'` | Color del switch (primary, success, warning, danger) |
| `checked-text` | `string` | `''` | Texto cuando está activo |
| `unchecked-text` | `string` | `''` | Texto cuando está inactivo |
| `label` | `string` | `''` | Etiqueta visible del switch |
| `name` | `string` | `''` | Nombre para formularios |
| `value` | `string` | `'on'` | Valor cuando está activo |
| `required` | `boolean` | `false` | Campo requerido en formularios |
| `loading` | `boolean` | `false` | Estado de carga |

## Eventos

| Evento | Descripción |
|--------|-------------|
| `change` | Se dispara al cambiar el estado |
| `focus` | Se dispara al obtener el foco |
| `blur` | Se dispara al perder el foco |
| `input` | Se dispara durante la interacción |

## Ejemplos de Uso

### Switch Básico de Configuración

```html
<melser-switch 
  label="Activar modo oscuro"
  checked>
</melser-switch>
```

### Switch con Validación

```html
<melser-switch 
  label="Acepto los términos de servicio *"
  name="acceptTerms"
  required
  error="Debes aceptar los términos para continuar">
</melser-switch>
```

### Switch con Estados de Carga

```html
<melser-switch 
  label="Sincronizar con la nube"
  loading
  disabled>
</melser-switch>
```

### Switch con Textos Personalizados

```html
<melser-switch 
  label="Estado del servidor"
  checked-text="ACTIVO"
  unchecked-text="INACTIVO"
  color="success">
</melser-switch>
```

### Switch de Configuración de Notificaciones

```html
<div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px;">
  <h4>Configuración de Notificaciones</h4>
  
  <melser-switch 
    label="Notificaciones por email"
    name="emailNotifications"
    checked>
  </melser-switch>
  
  <melser-switch 
    label="Notificaciones push"
    name="pushNotifications">
  </melser-switch>
  
  <melser-switch 
    label="Notificaciones SMS"
    name="smsNotifications">
  </melser-switch>
  
  <melser-switch 
    label="Notificaciones de marketing"
    name="marketingNotifications">
  </melser-switch>
</div>
```

## Integración con Formularios

### Formulario de Configuración de Perfil

```html
<form id="settings-form">
  <div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <h4>🔔 Preferencias de Notificaciones</h4>
    
    <melser-switch 
      label="Notificaciones por email"
      name="emailNotifications"
      checked>
    </melser-switch>
    
    <melser-switch 
      label="Notificaciones push"
      name="pushNotifications"
      checked>
    </melser-switch>
    
    <melser-switch 
      label="Notificaciones de marketing"
      name="marketingNotifications">
    </melser-switch>
  </div>
  
  <div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <h4>🎨 Apariencia</h4>
    
    <melser-switch 
      label="Modo oscuro"
      name="darkMode">
    </melser-switch>
    
    <melser-switch 
      label="Animaciones"
      name="animations"
      checked>
    </melser-switch>
    
    <melser-switch 
      label="Alto contraste"
      name="highContrast">
    </melser-switch>
  </div>
  
  <div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <h4>🔒 Privacidad</h4>
    
    <melser-switch 
      label="Perfil público"
      name="publicProfile">
    </melser-switch>
    
    <melser-switch 
      label="Mostrar estado en línea"
      name="showOnlineStatus"
      checked>
    </melser-switch>
    
    <melser-switch 
      label="Permitir mensajes de desconocidos"
      name="allowMessages">
    </melser-switch>
  </div>
  
  <button  type="submit" variant="primary">
    Guardar Configuración
  </button >
</form>
```

```javascript
const form = document.getElementById('settings-form');
if (form) {
  // Manejar cambios de switches
  const switches = form.querySelectorAll('melser-switch');
  switches.forEach(switchEl => {
    switchEl.addEventListener('change', (e) => {
      console.log(`${switchEl.label}:`, e.target.checked);
      
      // Manejar casos especiales
      if (switchEl.name === 'darkMode' && e.target.checked) {
        console.log('🌙 Aplicando tema oscuro...');
        // Aquí aplicarías el tema oscuro
      } else if (switchEl.name === 'publicProfile' && !e.target.checked) {
        console.log('🔒 Ocultando perfil público...');
      }
    });
  });
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const settings = Object.fromEntries(formData);
    
    // Convertir valores a booleanos
    Object.keys(settings).forEach(key => {
      settings[key] = settings[key] === 'on';
    });
    
    console.log('Configuración guardada:', settings);
    alert('¡Configuración guardada exitosamente!');
  });
}
```

## Demo del Formulario

<form id="switch-form">
  <div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <h4>⚡ Configuración Rápida</h4>
    
    <melser-switch 
      label="Activar características premium"
      name="premium"
      id="form-premium">
    </melser-switch>
    
    <melser-switch 
      label="Modo desarrollo"
      name="dev"
      id="form-dev">
    </melser-switch>
    
    <melser-switch 
      label="Guardar automáticamente"
      name="autosave"
      checked
      id="form-autosave">
    </melser-switch>
  </div>
  
  <div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <h4>🎮 Opciones de Juego</h4>
    
    <melser-switch 
      label="Sonido activado"
      name="sound"
      checked
      color="success"
      id="form-sound">
    </melser-switch>
    
    <melser-switch 
      label="Música de fondo"
      name="music"
      checked
      color="primary"
      id="form-music">
    </melser-switch>
    
    <melser-switch 
      label="Vibración"
      name="vibration"
      color="warning"
      id="form-vibration">
    </melser-switch>
    
    <melser-switch 
      label="Notificaciones de juego"
      name="gameNotifications"
      checked
      color="primary"
      id="form-game-notifications">
    </melser-switch>
  </div>
  
  <button  type="submit" variant="primary" id="form-submit">
    Aplicar Configuración
  </button >
</form>

<div id="switch-result" style="margin-top: 1rem; padding: 1rem; background: #f3f4f6; border-radius: 6px; display: none;">
  <strong>Configuración Aplicada:</strong>
  <div id="switch-details"></div>
</div>


## Personalización con CSS

### Variables CSS

```css
melser-switch {
  --melser-switch-width: 44px;
  --melser-switch-height: 24px;
  --melser-switch-thumb-size: 20px;
  --melser-switch-bg-off: #e5e7eb;
  --melser-switch-bg-on: #3b82f6;
  --melser-switch-thumb-bg: #ffffff;
  --melser-switch-border-radius: 12px;
  --melser-switch-transition: all 0.2s ease;
  --melser-switch-focus-ring: 0 0 0 2px rgba(59, 130, 246, 0.5);
}
```

### Tamaños Personalizados

<style>
  .custom-switch-sizes {
    --melser-switch-width-sm: 32px;
    --melser-switch-height-sm: 18px;
    --melser-switch-thumb-size-sm: 14px;
    
    --melser-switch-width-lg: 60px;
    --melser-switch-height-lg: 32px;
    --melser-switch-thumb-size-lg: 28px;
  }
  
  .dark-theme-switch {
    --melser-switch-bg-off: #374151;
    --melser-switch-bg-on: #8b5cf6;
    --melser-switch-thumb-bg: #f9fafb;
  }
  
  .minimal-switch {
    --melser-switch-transition: all 0.1s ease;
    --melser-switch-border-radius: 2px;
  }
</style>

<div class="custom-switch-sizes" style="margin-bottom: 1rem;">
  <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
    <melser-switch size="sm" label="Pequeño personalizado"></melser-switch>
    <melser-switch size="md" label="Mediano normal"></melser-switch>
    <melser-switch size="lg" label="Grande personalizado"></melser-switch>
  </div>
</div>

<div class="dark-theme-switch" style="margin-bottom: 1rem;">
  <melser-switch 
    label="Switch tema oscuro" 
    checked
    color="primary">
  </melser-switch>
</div>

<div class="minimal-switch">
  <melser-switch 
    label="Switch minimalista" 
    checked>
  </melser-switch>
</div>

## Características Avanzadas

### Switches Interconectados

```javascript
const switches = document.querySelectorAll('melser-switch');
switches.forEach(switchEl => {
  switchEl.addEventListener('change', (e) => {
    // Manejar dependencias entre switches
    if (switchEl.name === 'premium' && e.target.checked) {
      // Si premium se activa, activar otras características
      enablePremiumFeatures();
    } else if (switchEl.name === 'premium' && !e.target.checked) {
      // Si premium se desactiva, desactivar características premium
      disablePremiumFeatures();
    }
  });
});
```

### Switch con Estados Asíncronos

```javascript
const asyncSwitch = document.querySelector('melser-switch[loading]');
if (asyncSwitch) {
  asyncSwitch.addEventListener('change', async (e) => {
    const isChecked = e.target.checked;
    
    try {
      // Mostrar estado de carga
      asyncSwitch.setAttribute('loading', '');
      asyncSwitch.disabled = true;
      
      // Simular llamada API
      const response = await fetch('/api/toggle-feature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: isChecked })
      });
      
      if (!response.ok) {
        throw new Error('Error en el servidor');
      }
      
      console.log('✅ Configuración guardada exitosamente');
      
    } catch (error) {
      console.error('❌ Error:', error);
      
      // Revertir el cambio en caso de error
      asyncSwitch.checked = !isChecked;
      alert('Error al guardar la configuración. Inténtalo de nuevo.');
      
    } finally {
      // Remover estado de carga
      asyncSwitch.removeAttribute('loading');
      asyncSwitch.disabled = false;
    }
  });
}
```

### Switch Condicional

```html
<melser-switch 
  id="parent-switch"
  label="Activar funciones avanzadas"
  name="advanced">
</melser-switch>

<melser-switch 
  id="child-switch"
  label="Función específica"
  name="specificFunction"
  disabled>
</melser-switch>
```

```javascript
const parentSwitch = document.getElementById('parent-switch');
const childSwitch = document.getElementById('child-switch');

if (parentSwitch && childSwitch) {
  parentSwitch.addEventListener('change', (e) => {
    childSwitch.disabled = !e.target.checked;
    
    if (!e.target.checked) {
      childSwitch.checked = false;
    }
  });
}
```

## Accesibilidad

El componente MelserSwitch incluye:

- **Navegación por teclado**: Tab, Space, Enter funcionan
- **Anuncios de screen readers**: Cambios de estado anunciados
- **ARIA attributes**: role="switch", aria-checked, aria-disabled
- **Focus management**: Indicador visual claro
- **Estados accesibles**: Disabled y loading correctamente anunciados

## Mejores Prácticas

1. **Usa labels descriptivos** para clarificar la función
2. **Incluye feedback visual** inmediato al cambiar
3. **Maneja estados de loading** para operaciones asíncronas
4. **Agrupa switches relacionados** en secciones lógicas
5. **Proporciona valores por defecto** sensatos
6. **Considera animaciones** para transiciones suaves
7. **Usa colores apropiados** para diferentes estados

## Troubleshooting

### Switch no responde a clicks

```javascript
// Verificar que no esté deshabilitado
console.log(switchEl.disabled); // Debe ser false

// Verificar que esté correctamente importado
import 'melser-ui/components/melser-switch.js';
```

### Animaciones no funcionan

```css
/* Verificar que las transiciones estén configuradas */
melser-switch {
  --melser-switch-transition: all 0.2s ease;
}
```

### Tamaño no cambia

```html
<!-- Verificar que size esté configurado correctamente -->
<melser-switch 
  size="lg"
  label="Switch grande">
```

### Color no cambia

```html
<!-- Verificar que color esté en la lista de colores válidos -->
<melser-switch 
  color="success"
  label="Switch verde">
```

### Estados de loading

```javascript
// Programar estados de carga
switchEl.setAttribute('loading', '');
switchEl.disabled = true;

// Cuando termine la operación
switchEl.removeAttribute('loading');
switchEl.disabled = false;
```

### Focus no visible

```css
/* Personalizar indicador de foco */
melser-switch:focus {
  box-shadow: var(--melser-switch-focus-ring);
}
```

### Problemas de accesibilidad

```html
<!-- Agregar aria-label para casos específicos -->
<melser-switch 
  aria-label="Activar notificaciones push"
  label="Notificaciones">
```

### Valores no se envían en formularios

```html
<!-- Asegurar que tenga name y value apropiados -->
<melser-switch 
  name="featureEnabled"
  value="true"
  label="Función activada">
