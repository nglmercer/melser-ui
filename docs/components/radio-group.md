---
title: MelserRadioGroup
---

# MelserRadioGroup

Un componente de grupo de radio buttons accesible y personalizable con orientación vertical/horizontal y validaciones.

## Ejemplo Básico

```html
<me-radio-group label="Selecciona una opción" name="opcion">
  <option value="opcion1" label="Opción 1"></option>
  <option value="opcion2" label="Opción 2"></option>
  <option value="opcion3" label="Opción 3"></option>
</me-radio-group>
```

## Demo Interactivo

<me-radio-group 
  id="demo-basic" 
  label="Radio básico" 
  name="demo-basic">

  <option value="opcion1" label="Primera opción"></option>
  <option value="opcion2" label="Segunda opción"></option>
  <option value="opcion3" label="Tercera opción"></option>
</me-radio-group>

<me-radio-group 
  id="demo-selected" 
  label="Con selección inicial" 
  name="demo-selected"
  value="opcion2">

  <option value="opcion1" label="Opción A"></option>
  <option value="opcion2" label="Opción B"></option>
  <option value="opcion3" label="Opción C"></option>
</me-radio-group>

<me-radio-group 
  id="demo-disabled" 
  label="Con opciones deshabilitadas" 
  name="demo-disabled"
  value="opcion1">

  <option value="opcion1" label="Opción disponible"></option>
  <option value="opcion2" label="Opción no disponible" disabled></option>
  <option value="opcion3" label="Otra opción disponible"></option>
</me-radio-group>

<me-radio-group 
  id="demo-horizontal" 
  label="Orientación horizontal" 
  name="demo-horizontal"
  orientation="horizontal">

  <option value="si" label="Sí"></option>
  <option value="no" label="No"></option>
  <option value="tal vez" label="Tal vez"></option>
</me-radio-group>

<div style="margin: 1rem 0; display: flex; flex-direction: column; gap: 1rem;">
  <h4>Colores</h4>
  <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
    <me-radio-group label="Success" color="success" name="color-success" value="1" orientation="horizontal">
      <option value="1" label="Opción 1"></option>
      <option value="2" label="Opción 2"></option>
    </me-radio-group>
    <me-radio-group label="Warning" color="warning" name="color-warning" value="1" orientation="horizontal">
      <option value="1" label="Opción 1"></option>
      <option value="2" label="Opción 2"></option>
    </me-radio-group>
    <me-radio-group label="Danger" color="danger" name="color-danger" value="1" orientation="horizontal">
      <option value="1" label="Opción 1"></option>
      <option value="2" label="Opción 2"></option>
    </me-radio-group>
  </div>
</div>

<me-radio-group 
  id="demo-required" 
  label="Campo requerido *" 
  name="demo-required"
  required>

  <option value="si" label="Acepto los términos"></option>
  <option value="no" label="No acepto los términos"></option>
</me-radio-group>

<me-radio-group 
  id="demo-groups" 
  label="Con grupos anidados" 
  name="demo-groups">

  <fieldset style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <legend style="padding: 0 0.5rem; font-weight: bold;">Tipo de usuario</legend>
    <option value="personal" label="Personal" name="user-type"></option>
    <option value="empresarial" label="Empresarial" name="user-type"></option>
  </fieldset>
  
  <fieldset style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px;">
    <legend style="padding: 0 0.5rem; font-weight: bold;">Nivel de experiencia</legend>
    <option value="principiante" label="Principiante" name="experience"></option>
    <option value="intermedio" label="Intermedio" name="experience"></option>
    <option value="avanzado" label="Avanzado" name="experience"></option>
  </fieldset>
</me-radio-group>

## Estructura HTML

El componente radio group puede usarse de dos formas:

### Forma 1: Con elementos hijos

```html
<me-radio-group label="Mi selección" name="mi-seleccion">
  <option value="opcion1" label="Primera opción"></option>
  <option value="opcion2" label="Segunda opción"></option>
  <option value="opcion3" label="Tercera opción"></option>
</me-radio-group>
```

### Forma 2: Con opciones tradicionales

```html
<me-radio-group label="Selección tradicional" name="tradicional">
  <option value="opcion1">Primera opción</option>
  <option value="opcion2">Segunda opción</option>
  <option value="opcion3">Tercera opción</option>
</me-radio-group>
```

## Propiedades del Grupo

| Propiedad     | Tipo      | Valor por Defecto | Descripción                        |
| ------------- | --------- | ----------------- | ---------------------------------- |
| `orientation` | `string`  | `'vertical'`      | Orientación (vertical, horizontal) |
| `name`        | `string`  | `''`              | Nombre para formularios            |
| `value`       | `string`  | `''`              | Valor seleccionado                 |
| `disabled`    | `boolean` | `false`           | Deshabilita todo el grupo          |
| `required`    | `boolean` | `false`           | Campo requerido en formularios     |
| `label`       | `string`  | `''`              | Etiqueta visible del grupo         |
| `name`        | `string`  | `''`              | Nombre del grupo para formularios  |

## Propiedades de Radio Individual

| Propiedad  | Tipo      | Valor por Defecto | Descripción                 |
| ---------- | --------- | ----------------- | --------------------------- |
| `value`    | `string`  | -                 | Valor de la opción          |
| `label`    | `string`  | `''`              | Texto de la etiqueta        |
| `checked`  | `boolean` | `false`           | Opción seleccionada         |
| `disabled` | `boolean` | `false`           | Opción deshabilitada        |
| `name`     | `string`  | `''`              | Nombre del grupo (opcional) |

## Eventos

| Evento    | Descripción                        |
| --------- | ---------------------------------- |
| `change`  | Se dispara al cambiar la selección |
| `focus`   | Se dispara al obtener el foco      |
| `blur`    | Se dispara al perder el foco       |
| `invalid` | Se dispara con validación fallida  |

## Ejemplos de Uso

### Radio Group Horizontal

```html
<me-radio-group
  label="¿Estás de acuerdo?"
  name="agreement"
  orientation="horizontal"
  required
>
  <option value="si" label="Sí"></option>
  <option value="no" label="No"></option>
  <option value="nsnc" label="No sé / No contesto"></option>
</me-radio-group>
```

### Radio Group con Validación

```html
<me-radio-group
  label="Método de pago *"
  name="paymentMethod"
  required
  error="Debes seleccionar un método de pago"
>
  <option value="credit" label="Tarjeta de crédito"></option>
  <option value="debit" label="Tarjeta de débito"></option>
  <option value="paypal" label="PayPal"></option>
  <option value="transfer" label="Transferencia bancaria"></option>
</me-radio-group>
```

### Radio Group con Grupos Anidados

```html
<me-radio-group label="Configuración de notificaciones" name="notifications">
  <fieldset
    style="border: 1px solid #d1d5db; padding: 1rem; border-radius: 6px;"
  >
    <legend>Email</legend>
    <option
      value="email-all"
      name="email"
      label="Todas las notificaciones"
    ></option>
    <option
      value="email-important"
      name="email"
      label="Solo importantes"
    ></option>
    <option value="email-none" name="email" label="Ninguna"></option>
  </fieldset>

  <fieldset
    style="border: 1px solid #d1d5db; padding: 1rem; border-radius: 6px; margin-top: 1rem;"
  >
    <legend>SMS</legend>
    <option
      value="sms-all"
      name="sms"
      label="Todas las notificaciones"
    ></option>
    <option value="sms-important" name="sms" label="Solo urgentes"></option>
    <option value="sms-none" name="sms" label="Ninguna"></option>
  </fieldset>
</me-radio-group>
```

### Radio Group con Opción "Otro"

```html
<me-radio-group
  label="¿Cómo conociste nuestro servicio?"
  name="referral"
  required
>
  <option value="google" label="Google / Buscador"></option>
  <option value="social" label="Redes sociales"></option>
  <option value="friend" label="Recomendación de amigo"></option>
  <option value="advertisement" label="Publicidad"></option>
  <option value="other" label="Otro"></option>
</me-radio-group>
```

## Integración con Formularios

### Formulario de Configuración de Perfil

```html
<form id="profile-form">
  <me-radio-group
    label="Plan de suscripción *"
    name="plan"
    required
    orientation="vertical"
  >
    <option value="basic" label="Plan Básico - Gratis"></option>
    <option value="pro" label="Plan Pro - €9.99/mes"></option>
    <option value="enterprise" label="Plan Enterprise - €29.99/mes"></option>
  </me-radio-group>

  <me-radio-group
    label="Frecuencia de notificaciones"
    name="frequency"
    orientation="horizontal"
  >
    <option value="immediate" label="Inmediatas"></option>
    <option value="daily" label="Diarias"></option>
    <option value="weekly" label="Semanales"></option>
    <option value="never" label="Nunca"></option>
  </me-radio-group>

  <me-radio-group label="Preferencias de tema" name="theme">
    <option value="light" label="Claro"></option>
    <option value="dark" label="Oscuro"></option>
    <option value="auto" label="Automático (según sistema)"></option>
  </me-radio-group>

  <button type="submit" variant="primary">Guardar Configuración</button>
</form>
```

```javascript
const form = document.getElementById("profile-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    if (!data.plan) {
      alert("Por favor selecciona un plan de suscripción");
      return;
    }

    console.log("Configuración del perfil:", data);

    let planDescription = "";
    switch (data.plan) {
      case "basic":
        planDescription = "Plan Básico (Gratis)";
        break;
      case "pro":
        planDescription = "Plan Pro (€9.99/mes)";
        break;
      case "enterprise":
        planDescription = "Plan Enterprise (€29.99/mes)";
        break;
    }

    alert(`¡Configuración guardada exitosamente!\nPlan: ${planDescription}`);
  });
}
```

## Demo del Formulario

<me-playground-form id="radio-playground" schema-name="radio" title="Encuesta de Satisfacción" description="Preguntas de selección simple con validación.">
  <div style="margin-bottom: 1.5rem;">
    <me-radio-group 
      label="¿Te gusta este componente? *"
      name="opinion"
      required
      orientation="horizontal">
      <option value="me_encanta" label="¡Me encanta!"></option>
      <option value="me_gusta" label="Me gusta"></option>
      <option value="es_aceptable" label="Es aceptable"></option>
      <option value="no_me_gusta" label="No me gusta"></option>
    </me-radio-group>
  </div>
  
  <div style="margin-bottom: 1.5rem;">
    <me-radio-group 
      label="Nivel de experiencia con componentes web"
      name="experience"
      orientation="vertical">
      <option value="principiante" label="🟢 Principiante - Es mi primera vez"></option>
      <option value="intermedio" label="🟡 Intermedio - Tengo algo de experiencia"></option>
      <option value="avanzado" label="🔴 Avanzado - Soy experto"></option>
    </me-radio-group>
  </div>
  
  <div style="margin-bottom: 1.5rem;">
    <me-radio-group 
      label="Preferencia de uso"
      name="preference"
      orientation="horizontal">
      <option value="codigo" label="💻 Prefiero código"></option>
      <option value="visual" label="🎨 Prefiero interfaces visuales"></option>
      <option value="ambos" label="⚖️ Ambos son útiles"></option>
    </me-radio-group>
  </div>
</me-playground-form>

<div id="radio-result" style="margin-top: 1rem; padding: 1rem; background: #f3f4f6; border-radius: 6px; display: none;">
  <strong>Resultados de la Encuesta:</strong>
  <div id="radio-details"></div>
</div>

## Personalización con CSS

### Variables CSS

```css
me-radio-group {
  --me-radio-size: 20px;
  --me-radio-color: #3b82f6;
  --me-radio-border-color: #d1d5db;
  --me-radio-focus-color: #2563eb;
  --me-radio-disabled-opacity: 0.5;
  --me-radio-label-color: #374151;
  --me-radio-label-font-size: 14px;
  --me-radio-spacing: 8px;
  --me-radio-group-gap: 12px;
}
```

### Ejemplos de Personalización

<style>
  .custom-radio-group {
    --me-radio-color: #10b981;
    --me-radio-focus-color: #059669;
    --me-radio-border-color: #10b981;
  }
  
  .minimal-radio-group {
    --me-radio-size: 16px;
    --me-radio-spacing: 6px;
    --me-radio-group-gap: 8px;
  }
  
  .dark-radio-group {
    --me-radio-color: #8b5cf6;
    --me-radio-focus-color: #7c3aed;
    --me-radio-border-color: #6b7280;
    --me-radio-label-color: #f9fafb;
    --me-radio-group-bg: #1f2937;
  }
</style>

<div class="custom-radio-group" style="margin-bottom: 1rem;">
  <me-radio-group 
    label="Radio personalizado"
    name="custom"
    value="opcion2">
    <option value="opcion1" label="Opción verde"></option>
    <option value="opcion2" label="Opción seleccionada"></option>
    <option value="opcion3" label="Otra opción"></option>
  </me-radio-group>
</div>

<div class="minimal-radio-group" style="margin-bottom: 1rem;">
  <me-radio-group 
    label="Radio minimalista"
    name="minimal"
    value="minimal2">
    <option value="minimal1" label="Pequeño"></option>
    <option value="minimal2" label="Compact"></option>
    <option value="minimal3" label="Discreto"></option>
  </me-radio-group>
</div>

<div class="dark-radio-group">
  <me-radio-group 
    label="Tema oscuro"
    name="dark"
    value="dark2">
    <option value="dark1" label="Dark Mode"></option>
    <option value="dark2" label="Night Theme"></option>
    <option value="dark3" label="Black Theme"></option>
  </me-radio-group>
</div>

## Características Avanzadas

### Radio Group Dinámico

```javascript
const radioGroup = document.querySelector("me-radio-group");
if (radioGroup) {
  // Agregar opciones dinámicamente
  function addOption(value, label) {
    const radio = document.createElement("me-radio");
    radio.value = value;
    radio.label = label;
    radioGroup.appendChild(radio);
  }

  // Remover opción
  function removeOption(value) {
    const radio = radioGroup.querySelector(`me-radio[value="${value}"]`);
    if (radio) {
      radio.remove();
    }
  }

  // Obtener todas las opciones
  function getOptions() {
    return Array.from(radioGroup.querySelectorAll("me-radio"));
  }
}
```

### Validación Personalizada

```javascript
const radioGroup = document.querySelector("me-radio-group[required]");
if (radioGroup) {
  radioGroup.addEventListener("invalid", (e) => {
    // Validación personalizada
    if (!radioGroup.value) {
      console.log("⚠️ Debe seleccionar una opción");
    }
  });

  // Validación de grupos relacionados
  radioGroup.addEventListener("change", (e) => {
    if (e.target.value === "special") {
      // Mostrar campos adicionales
      showAdditionalFields();
    }
  });
}
```

### Radio Group con Imágenes

```html
<me-radio-group label="Selecciona un icono" name="icon">
  <option value="home" label="🏠 Inicio"></option>
  <option value="user" label="👤 Usuario"></option>
  <option value="settings" label="⚙️ Configuración"></option>
  <option value="help" label="❓ Ayuda"></option>
</me-radio-group>
```

## Accesibilidad

El componente MelserRadioGroup incluye:

- **Navegación por teclado**: Flechas, Tab, Space, Enter
- **Anuncios de screen readers**: Selección y cambios anunciados
- **ARIA groups**: role="radiogroup" apropiado
- **Focus management**: Indicador visual claro
- **Estados de disabled**: Correctamente anunciados

## Mejores Prácticas

1. **Siempre incluye un label** para el grupo completo
2. **Usa orientación horizontal** para pocas opciones (2-3)
3. **Usa orientación vertical** para muchas opciones
4. **Agrupa opciones relacionadas** lógicamente
5. **Incluye validación** para campos requeridos
6. **Proporciona feedback** inmediato al usuario
7. **Considera orden de opciones** por relevancia/frecuencia

## Troubleshooting

### Radio button no responde

```javascript
// Verificar que el grupo tenga un nombre
radioGroup.name = "mi-grupo";

// Verificar que el radio individual tenga valor
radio.value = "mi-valor";
```

### Validación no funciona

```html
<!-- Asegurar que required esté en el grupo -->
<me-radio-group required label="Campo obligatorio">
  <option value="op1" label="Opción 1"></option>
  <option value="op2" label="Opción 2"></option>
</me-radio-group>
```

### Orientación no cambia

```html
<!-- Verificar que orientation esté configurado -->
<me-radio-group orientation="horizontal" label="Horizontal"></me-radio-group>
```

### Focus no visible

```css
/* Personalizar indicador de foco */
me-radio:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
```

### Opciones no se alinean

```css
/* Alinear radio buttons horizontalmente */
me-radio-group[orientation="horizontal"] {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

me-radio-group[orientation="horizontal"] option {
  display: flex;
  align-items: center;
}
```

### Problemas de accesibilidad

```html
<!-- Agregar aria-label para casos específicos -->
<option
  aria-label="Seleccionar plan premium"
  value="premium"
  label="Premium"
></option>
```

### Radio group dinámico

```javascript
// Actualizar después de modificar opciones
radioGroup.dispatchEvent(new Event("options-changed"));

// O re-renderizar si es necesario
radioGroup.updateOptions();
```
