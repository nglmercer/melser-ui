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
| :--------------- | :-------- | :---------------- | :--------------------------------------------------- |
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
| :------- | :-------------------------------- |
| `change` | Se dispara al cambiar el estado   |
| `focus`  | Se dispara al obtener el foco     |
| `blur`   | Se dispara al perder el foco      |
| `input`  | Se dispara durante la interacción |

## Ejemplos de Uso

### Switch Básico de Configuración

```html
<me-switch label="Activar modo oscuro" checked> </me-switch>
```

### Switch con Validació

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

  <button type="submit">Guardar Configuración</button>
</form>
```

```javascript
document.getElementById("settings-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  // Procesar configuración
});
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
      enablePremiumFeatures();
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
    asyncSwitch.setAttribute("loading", "");
    // Simular API
    setTimeout(() => asyncSwitch.removeAttribute("loading"), 1000);
  });
}
```

## Accesibilidad

- **Navegación por teclado**: Tab, Space, Enter funcionan
- **Anuncios de screen readers**: Cambios de estado anunciados
- **ARIA attributes**: role="switch", aria-checked, aria-disabled
- **Focus management**: Indicador visual claro
- **Estados accesibles**: Disabled y loading correctamente anunciados
