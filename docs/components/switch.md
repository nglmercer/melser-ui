---
title: MelserSwitch
---

# MelserSwitch

Un componente switch/toggle moderno y accesible para activar/desactivar opciones con animaciones fluidas y estados visuales claros.

## Ejemplo Básico

```html
<me-switch label="Activar notificaciones" checked> </me-switch>
```

## Demo Interactivo

<me-switch
  id="demo-basic"
  label="Switch básico">
</me-switch>

<me-switch
  id="demo-checked"
  label="Switch activado por defecto"
  checked>
</me-switch>

<me-switch
  id="demo-disabled"
  label="Switch deshabilitado"
  disabled
  checked>
</me-switch>

<me-switch
  id="demo-sizes"
  label="Tamaños diferentes">
</me-switch>

<div style="margin: 1rem 0; display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
  <me-switch size="sm" label="Pequeño"></me-switch>
  <me-switch size="md" label="Mediano"></me-switch>
  <me-switch size="lg" label="Grande"></me-switch>
</div>

<me-switch
  id="demo-colors"
  label="Diferentes colores">
</me-switch>

<div style="margin: 1rem 0; display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
  <me-switch color="primary" label="Primario" checked></me-switch>
  <me-switch color="success" label="Éxito" checked></me-switch>
  <me-switch color="warning" label="Advertencia" checked></me-switch>
  <me-switch color="danger" label="Peligro" checked></me-switch>
</div>

<me-switch
  id="demo-text"
  label="Con texto personalizado"
  checked-text="ON"
  unchecked-text="OFF">
</me-switch>

## Propiedades

| Propiedad        | Tipo      | Valor por Defecto | Descripción                                          |
| ---------------- | --------- | ----------------- | ---------------------------------------------------- |
| `checked`        | `boolean` | `false`           | Estado activo/inactivo                               |
| `disabled`       | `boolean` | `false`           | Deshabilita la interacción                           |
| `size`           | `string`  | `'md'`            | Tamaño del switch (sm, md, lg)                       |
| `color`          | `string`  | `'primary'`       | Color del switch (primary, success, warning, danger) |
| `checked-text`   | `string`  | `''`              | Texto cuando está activo                             |
| `unchecked-text` | `string`  | `''`              | Texto cuando está inactivo                           |
| `label`          | `string`  | `''`              | Etiqueta visible del switch                          |
| `name`           | `string`  | `''`              | Nombre para formularios                              |
| `value`          | `string`  | `'on'`            | Valor cuando está activo                             |
| `required`       | `boolean` | `false`           | Campo requerido en formularios                       |
| `loading`        | `boolean` | `false`           | Estado de carga                                      |

## Eventos

| Evento   | Descripción                       |
| -------- | --------------------------------- |
| `change` | Se dispara al cambiar el estado   |
| `focus`  | Se dispara al obtener el foco     |
| `blur`   | Se dispara al perder el foco      |
| `input`  | Se dispara durante la interacción |

## Ejemplos de Uso

### Switch Básico de Configuración

```html
<me-switch label="Activar modo oscuro" checked> </me-switch>
```

### Switch con Validación

```html
<me-switch
  label="Acepto los términos de servicio *"
  name="acceptTerms"
  required
  error="Debes aceptar los términos para continuar"
>
</me-switch>
```

### Switch con Estados de Carga

```html
<me-switch label="Sincronizar con la nube" loading disabled> </me-switch>
```

### Switch con Textos Personalizados

```html
<me-switch
  label="Estado del servidor"
  checked-text="ACTIVO"
  unchecked-text="INACTIVO"
  color="success"
>
</me-switch>
```

### Switch de Configuración de Notificaciones

```html
<div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px;">
  <h4>Configuración de Notificaciones</h4>

  <me-switch label="Notificaciones por email" name="emailNotifications" checked>
  </me-switch>

  <me-switch label="Notificaciones push" name="pushNotifications"> </me-switch>

  <me-switch label="Notificaciones SMS" name="smsNotifications"> </me-switch>

  <me-switch label="Notificaciones de marketing" name="marketingNotifications">
  </me-switch>
</div>
```

## Integración con Formularios

### Formulario de Configuración de Perfil

```html
<form id="settings-form">
  <div
    style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;"
  >
    <h4>🔔 Preferencias de Notificaciones</h4>

    <me-switch
      label="Notificaciones por email"
      name="emailNotifications"
      checked
    >
    </me-switch>

    <me-switch label="Notificaciones push" name="pushNotifications" checked>
    </me-switch>

    <me-switch
      label="Notificaciones de marketing"
      name="marketingNotifications"
    >
    </me-switch>
  </div>

  <div
    style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;"
  >
    <h4>🎨 Apariencia</h4>

    <me-switch label="Modo oscuro" name="darkMode"> </me-switch>

    <me-switch label="Animaciones" name="animations" checked> </me-switch>

    <me-switch label="Alto contraste" name="highContrast"> </me-switch>
  </div>

  <div
    style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;"
  >
    <h4>🔒 Privacidad</h4>

    <me-switch label="Perfil público" name="publicProfile"> </me-switch>

    <me-switch label="Mostrar estado en línea" name="showOnlineStatus" checked>
    </me-switch>

    <me-switch label="Permitir mensajes de desconocidos" name="allowMessages">
    </me-switch>
  </div>

  <button type="submit" variant="primary">Guardar Configuración</button>
</form>
```

```javascript
const form = document.getElementById("settings-form");
if (form) {
  // Manejar cambios de switches
  const switches = form.querySelectorAll("me-switch");
  switches.forEach((switchEl) => {
    switchEl.addEventListener("change", (e) => {
      console.log(`${switchEl.label}:`, e.target.checked);

      // Manejar casos especiales
      if (switchEl.name === "darkMode" && e.target.checked) {
        console.log("🌙 Aplicando tema oscuro...");
        // Aquí aplicarías el tema oscuro
      } else if (switchEl.name === "publicProfile" && !e.target.checked) {
        console.log("🔒 Ocultando perfil público...");
      }
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const settings = Object.fromEntries(formData);

    // Convertir valores a booleanos
    Object.keys(settings).forEach((key) => {
      settings[key] = settings[key] === "on";
    });

    console.log("Configuración guardada:", settings);
    alert("¡Configuración guardada exitosamente!");
  });
}
```

## Demo del Formulario

<me-playground-form id="switch-playground" schema-name="switch" title="Configuración" description="Ejemplo de configuración con switches y validación Zod.">
  <div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <h4>⚡ Configuración Rápida</h4>

<me-switch
    label="Activar características premium"
    name="premium">
</me-switch>

<me-switch
    label="Modo desarrollo"
    name="dev">
</me-switch>

<me-switch
    label="Guardar automáticamente"
    name="autosave"
    checked>
</me-switch>

  </div>
  
  <div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <h4>🎮 Opciones de Juego</h4>

<me-switch
    label="Sonido activado"
    name="sound"
    checked
    color="success">
</me-switch>

<me-switch
    label="Música de fondo"
    name="music"
    checked
    color="primary">
</me-switch>

<me-switch
    label="Vibración"
    name="vibration"
    color="warning">
</me-switch>

<me-switch
    label="Notificaciones de juego"
    name="gameNotifications"
    checked
    color="primary">
</me-switch>

  </div>
</me-playground-form>

## Personalización con CSS

### Variables CSS

```css
me-switch {
  --me-switch-width: 44px;
  --me-switch-height: 24px;
  --me-switch-thumb-size: 20px;
  --me-switch-bg-off: #e5e7eb;
  --me-switch-bg-on: #3b82f6;
  --me-switch-thumb-bg: #ffffff;
  --me-switch-border-radius: 12px;
  --me-switch-transition: all 0.2s ease;
  --me-switch-focus-ring: 0 0 0 2px rgba(59, 130, 246, 0.5);
}
```

### Tamaños Personalizados

<style>
  .custom-switch-sizes {
    --me-switch-width-sm: 32px;
    --me-switch-height-sm: 18px;
    --me-switch-thumb-size-sm: 14px;

    --me-switch-width-lg: 60px;
    --me-switch-height-lg: 32px;
    --me-switch-thumb-size-lg: 28px;
  }
  
  .dark-theme-switch {
    --me-switch-bg-off: #374151;
    --me-switch-bg-on: #8b5cf6;
    --me-switch-thumb-bg: #f9fafb;
  }
  
  .minimal-switch {
    --me-switch-transition: all 0.1s ease;
    --me-switch-border-radius: 2px;
  }
</style>

<div class="custom-switch-sizes" style="margin-bottom: 1rem;">
  <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
    <me-switch size="sm" label="Pequeño personalizado"></me-switch>
    <me-switch size="md" label="Mediano normal"></me-switch>
    <me-switch size="lg" label="Grande personalizado"></me-switch>
  </div>
</div>

<div class="dark-theme-switch" style="margin-bottom: 1rem;">
  <me-switch
    label="Switch tema oscuro"
    checked
    color="primary">
  </me-switch>
</div>

<div class="minimal-switch">
  <me-switch
    label="Switch minimalista"
    checked>
  </me-switch>
</div>

## Características Avanzadas

### Switches Interconectados

```javascript
const switches = document.querySelectorAll("me-switch");
switches.forEach((switchEl) => {
  switchEl.addEventListener("change", (e) => {
    // Manejar dependencias entre switches
    if (switchEl.name === "premium" && e.target.checked) {
      // Si premium se activa, activar otras características
      enablePremiumFeatures();
    } else if (switchEl.name === "premium" && !e.target.checked) {
      // Si premium se desactiva, desactivar características premium
      disablePremiumFeatures();
    }
  });
});
```

### Switch con Estados Asíncronos

```javascript
const asyncSwitch = document.querySelector("me-switch[loading]");
if (asyncSwitch) {
  asyncSwitch.addEventListener("change", async (e) => {
    const isChecked = e.target.checked;

    try {
      // Mostrar estado de carga
      asyncSwitch.setAttribute("loading", "");
      asyncSwitch.disabled = true;

      // Simular llamada API
      const response = await fetch("/api/toggle-feature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: isChecked }),
      });

      if (!response.ok) {
        throw new Error("Error en el servidor");
      }

      console.log("✅ Configuración guardada exitosamente");
    } catch (error) {
      console.error("❌ Error:", error);

      // Revertir el cambio en caso de error
      asyncSwitch.checked = !isChecked;
      alert("Error al guardar la configuración. Inténtalo de nuevo.");
    } finally {
      // Remover estado de carga
      asyncSwitch.removeAttribute("loading");
      asyncSwitch.disabled = false;
    }
  });
}
```

### Switch Condicional

```html
<me-switch
  id="parent-switch"
  label="Activar funciones avanzadas"
  name="advanced"
>
</me-switch>

<me-switch
  id="child-switch"
  label="Función específica"
  name="specificFunction"
  disabled
>
</me-switch>
```

```javascript
const parentSwitch = document.getElementById("parent-switch");
const childSwitch = document.getElementById("child-switch");

if (parentSwitch && childSwitch) {
  parentSwitch.addEventListener("change", (e) => {
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
import "me-ui/components/me-switch.js";
```

### Animaciones no funcionan

```css
/* Verificar que las transiciones estén configuradas */
me-switch {
  --me-switch-transition: all 0.2s ease;
}
```

### Tamaño no cambia

```html
<!-- Verificar que size esté configurado correctamente -->
<me-switch size="lg" label="Switch grande"></me-switch>
```

### Color no cambia

```html
<!-- Verificar que color esté en la lista de colores válidos -->
<me-switch color="success" label="Switch verde"></me-switch>
```

### Estados de loading

```javascript
// Programar estados de carga
switchEl.setAttribute("loading", "");
switchEl.disabled = true;

// Cuando termine la operación
switchEl.removeAttribute("loading");
switchEl.disabled = false;
```

### Focus no visible

```css
/* Personalizar indicador de foco */
me-switch:focus {
  box-shadow: var(--me-switch-focus-ring);
}
```

### Problemas de accesibilidad

```html
<!-- Agregar aria-label para casos específicos -->
<me-switch
  aria-label="Activar notificaciones push"
  label="Notificaciones"
></me-switch>
```

### Valores no se envían en formularios

```html
<!-- Asegurar que tenga name y value apropiados -->
<me-switch
  name="featureEnabled"
  value="true"
  label="Función activada"
></me-switch>
```
