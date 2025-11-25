---
title: MelserRadioGroup
---

# MelserRadioGroup

Un componente de grupo de radio buttons accesible y personalizable con orientación vertical/horizontal y validaciones.

## Ejemplo Básico

```html
<melser-radio-group 
  label="Selecciona una opción" 
  name="opcion">
  <melser-radio value="opcion1" label="Opción 1"></melser-radio>
  <melser-radio value="opcion2" label="Opción 2"></melser-radio>
  <melser-radio value="opcion3" label="Opción 3"></melser-radio>
</melser-radio-group>
```

## Demo Interactivo

<melser-radio-group 
  id="demo-basic" 
  label="Radio básico" 
  name="demo-basic">
  <melser-radio value="opcion1" label="Primera opción"></melser-radio>
  <melser-radio value="opcion2" label="Segunda opción"></melser-radio>
  <melser-radio value="opcion3" label="Tercera opción"></melser-radio>
</melser-radio-group>

<melser-radio-group 
  id="demo-selected" 
  label="Con selección inicial" 
  name="demo-selected"
  value="opcion2">
  <melser-radio value="opcion1" label="Opción A"></melser-radio>
  <melser-radio value="opcion2" label="Opción B"></melser-radio>
  <melser-radio value="opcion3" label="Opción C"></melser-radio>
</melser-radio-group>

<melser-radio-group 
  id="demo-disabled" 
  label="Con opciones deshabilitadas" 
  name="demo-disabled"
  value="opcion1">
  <melser-radio value="opcion1" label="Opción disponible"></melser-radio>
  <melser-radio value="opcion2" label="Opción no disponible" disabled></melser-radio>
  <melser-radio value="opcion3" label="Otra opción disponible"></melser-radio>
</melser-radio-group>

<melser-radio-group 
  id="demo-horizontal" 
  label="Orientación horizontal" 
  name="demo-horizontal"
  orientation="horizontal">
  <melser-radio value="si" label="Sí"></melser-radio>
  <melser-radio value="no" label="No"></melser-radio>
  <melser-radio value="tal vez" label="Tal vez"></melser-radio>
</melser-radio-group>

<melser-radio-group 
  id="demo-required" 
  label="Campo requerido *" 
  name="demo-required"
  required>
  <melser-radio value="si" label="Acepto los términos"></melser-radio>
  <melser-radio value="no" label="No acepto los términos"></melser-radio>
</melser-radio-group>

<melser-radio-group 
  id="demo-groups" 
  label="Con grupos anidados" 
  name="demo-groups">
  <fieldset style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <legend style="padding: 0 0.5rem; font-weight: bold;">Tipo de usuario</legend>
    <melser-radio value="personal" label="Personal" name="user-type"></melser-radio>
    <melser-radio value="empresarial" label="Empresarial" name="user-type"></melser-radio>
  </fieldset>
  
  <fieldset style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px;">
    <legend style="padding: 0 0.5rem; font-weight: bold;">Nivel de experiencia</legend>
    <melser-radio value="principiante" label="Principiante" name="experience"></melser-radio>
    <melser-radio value="intermedio" label="Intermedio" name="experience"></melser-radio>
    <melser-radio value="avanzado" label="Avanzado" name="experience"></melser-radio>
  </fieldset>
</melser-radio-group>


## Estructura HTML

El componente radio group puede usarse de dos formas:

### Forma 1: Con elementos hijos

```html
<melser-radio-group label="Mi selección" name="mi-seleccion">
  <melser-radio value="opcion1" label="Primera opción"></melser-radio>
  <melser-radio value="opcion2" label="Segunda opción"></melser-radio>
  <melser-radio value="opcion3" label="Tercera opción"></melser-radio>
</melser-radio-group>
```

### Forma 2: Con opciones tradicionales

```html
<melser-radio-group 
  label="Selección tradicional"
  name="tradicional">
  <option value="opcion1">Primera opción</option>
  <option value="opcion2">Segunda opción</option>
  <option value="opcion3">Tercera opción</option>
</melser-radio-group>
```

## Propiedades del Grupo

| Propiedad | Tipo | Valor por Defecto | Descripción |
|-----------|------|-------------------|-------------|
| `orientation` | `string` | `'vertical'` | Orientación (vertical, horizontal) |
| `name` | `string` | `''` | Nombre para formularios |
| `value` | `string` | `''` | Valor seleccionado |
| `disabled` | `boolean` | `false` | Deshabilita todo el grupo |
| `required` | `boolean` | `false` | Campo requerido en formularios |
| `label` | `string` | `''` | Etiqueta visible del grupo |
| `name` | `string` | `''` | Nombre del grupo para formularios |

## Propiedades de Radio Individual

| Propiedad | Tipo | Valor por Defecto | Descripción |
|-----------|------|-------------------|-------------|
| `value` | `string` | - | Valor de la opción |
| `label` | `string` | `''` | Texto de la etiqueta |
| `checked` | `boolean` | `false` | Opción seleccionada |
| `disabled` | `boolean` | `false` | Opción deshabilitada |
| `name` | `string` | `''` | Nombre del grupo (opcional) |

## Eventos

| Evento | Descripción |
|--------|-------------|
| `change` | Se dispara al cambiar la selección |
| `focus` | Se dispara al obtener el foco |
| `blur` | Se dispara al perder el foco |
| `invalid` | Se dispara con validación fallida |

## Ejemplos de Uso

### Radio Group Horizontal

```html
<melser-radio-group 
  label="¿Estás de acuerdo?"
  name="agreement"
  orientation="horizontal"
  required>
  <melser-radio value="si" label="Sí"></melser-radio>
  <melser-radio value="no" label="No"></melser-radio>
  <melser-radio value="nsnc" label="No sé / No contesto"></melser-radio>
</melser-radio-group>
```

### Radio Group con Validación

```html
<melser-radio-group 
  label="Método de pago *"
  name="paymentMethod"
  required
  error="Debes seleccionar un método de pago">
  <melser-radio value="credit" label="Tarjeta de crédito"></melser-radio>
  <melser-radio value="debit" label="Tarjeta de débito"></melser-radio>
  <melser-radio value="paypal" label="PayPal"></melser-radio>
  <melser-radio value="transfer" label="Transferencia bancaria"></melser-radio>
</melser-radio-group>
```

### Radio Group con Grupos Anidados

```html
<melser-radio-group 
  label="Configuración de notificaciones"
  name="notifications">
  
  <fieldset style="border: 1px solid #d1d5db; padding: 1rem; border-radius: 6px;">
    <legend>Email</legend>
    <melser-radio value="email-all" name="email" label="Todas las notificaciones"></melser-radio>
    <melser-radio value="email-important" name="email" label="Solo importantes"></melser-radio>
    <melser-radio value="email-none" name="email" label="Ninguna"></melser-radio>
  </fieldset>
  
  <fieldset style="border: 1px solid #d1d5db; padding: 1rem; border-radius: 6px; margin-top: 1rem;">
    <legend>SMS</legend>
    <melser-radio value="sms-all" name="sms" label="Todas las notificaciones"></melser-radio>
    <melser-radio value="sms-important" name="sms" label="Solo urgentes"></melser-radio>
    <melser-radio value="sms-none" name="sms" label="Ninguna"></melser-radio>
  </fieldset>
</melser-radio-group>
```

### Radio Group con Opción "Otro"

```html
<melser-radio-group 
  label="¿Cómo conociste nuestro servicio?"
  name="referral"
  required>
  <melser-radio value="google" label="Google / Buscador"></melser-radio>
  <melser-radio value="social" label="Redes sociales"></melser-radio>
  <melser-radio value="friend" label="Recomendación de amigo"></melser-radio>
  <melser-radio value="advertisement" label="Publicidad"></melser-radio>
  <melser-radio value="other" label="Otro"></melser-radio>
</melser-radio-group>
```

## Integración con Formularios

### Formulario de Configuración de Perfil

```html
<form id="profile-form">
  <melser-radio-group 
    label="Plan de suscripción *"
    name="plan"
    required
    orientation="vertical">
    <melser-radio value="basic" label="Plan Básico - Gratis"></melser-radio>
    <melser-radio value="pro" label="Plan Pro - €9.99/mes"></melser-radio>
    <melser-radio value="enterprise" label="Plan Enterprise - €29.99/mes"></melser-radio>
  </melser-radio-group>
  
  <melser-radio-group 
    label="Frecuencia de notificaciones"
    name="frequency"
    orientation="horizontal">
    <melser-radio value="immediate" label="Inmediatas"></melser-radio>
    <melser-radio value="daily" label="Diarias"></melser-radio>
    <melser-radio value="weekly" label="Semanales"></melser-radio>
    <melser-radio value="never" label="Nunca"></melser-radio>
  </melser-radio-group>
  
  <melser-radio-group 
    label="Preferencias de tema"
    name="theme">
    <melser-radio value="light" label="Claro"></melser-radio>
    <melser-radio value="dark" label="Oscuro"></melser-radio>
    <melser-radio value="auto" label="Automático (según sistema)"></melser-radio>
  </melser-radio-group>
  
  <melser-button type="submit" variant="primary">
    Guardar Configuración
  </melser-button>
</form>
```

```javascript
const form = document.getElementById('profile-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    if (!data.plan) {
      alert('Por favor selecciona un plan de suscripción');
      return;
    }
    
    console.log('Configuración del perfil:', data);
    
    let planDescription = '';
    switch (data.plan) {
      case 'basic':
        planDescription = 'Plan Básico (Gratis)';
        break;
      case 'pro':
        planDescription = 'Plan Pro (€9.99/mes)';
        break;
      case 'enterprise':
        planDescription = 'Plan Enterprise (€29.99/mes)';
        break;
    }
    
    alert(`¡Configuración guardada exitosamente!\nPlan: ${planDescription}`);
  });
}
```

## Demo del Formulario

<form id="radio-form">
  <div style="margin-bottom: 1.5rem;">
    <melser-radio-group 
      label="¿Te gusta este componente? *"
      name="opinion"
      required
      orientation="horizontal"
      id="form-opinion">
      <melser-radio value="me_encanta" label="¡Me encanta!"></melser-radio>
      <melser-radio value="me_gusta" label="Me gusta"></melser-radio>
      <melser-radio value="es_aceptable" label="Es aceptable"></melser-radio>
      <melser-radio value="no_me_gusta" label="No me gusta"></melser-radio>
    </melser-radio-group>
  </div>
  
  <div style="margin-bottom: 1.5rem;">
    <melser-radio-group 
      label="Nivel de experiencia con componentes web"
      name="experience"
      orientation="vertical"
      id="form-experience">
      <melser-radio value="principiante" label="🟢 Principiante - Es mi primera vez"></melser-radio>
      <melser-radio value="intermedio" label="🟡 Intermedio - Tengo algo de experiencia"></melser-radio>
      <melser-radio value="avanzado" label="🔴 Avanzado - Soy experto"></melser-radio>
    </melser-radio-group>
  </div>
  
  <div style="margin-bottom: 1.5rem;">
    <melser-radio-group 
      label="Preferencia de uso"
      name="preference"
      orientation="horizontal"
      id="form-preference">
      <melser-radio value="codigo" label="💻 Prefiero código"></melser-radio>
      <melser-radio value="visual" label="🎨 Prefiero interfaces visuales"></melser-radio>
      <melser-radio value="ambos" label="⚖️ Ambos son útiles"></melser-radio>
    </melser-radio-group>
  </div>
  
  <melser-button type="submit" variant="primary" id="form-submit">
    Enviar Respuestas
  </melser-button>
</form>

<div id="radio-result" style="margin-top: 1rem; padding: 1rem; background: #f3f4f6; border-radius: 6px; display: none;">
  <strong>Resultados de la Encuesta:</strong>
  <div id="radio-details"></div>
</div>


## Personalización con CSS

### Variables CSS

```css
melser-radio-group {
  --melser-radio-size: 20px;
  --melser-radio-color: #3b82f6;
  --melser-radio-border-color: #d1d5db;
  --melser-radio-focus-color: #2563eb;
  --melser-radio-disabled-opacity: 0.5;
  --melser-radio-label-color: #374151;
  --melser-radio-label-font-size: 14px;
  --melser-radio-spacing: 8px;
  --melser-radio-group-gap: 12px;
}
```

### Ejemplos de Personalización

<style>
  .custom-radio-group {
    --melser-radio-color: #10b981;
    --melser-radio-focus-color: #059669;
    --melser-radio-border-color: #10b981;
  }
  
  .minimal-radio-group {
    --melser-radio-size: 16px;
    --melser-radio-spacing: 6px;
    --melser-radio-group-gap: 8px;
  }
  
  .dark-radio-group {
    --melser-radio-color: #8b5cf6;
    --melser-radio-focus-color: #7c3aed;
    --melser-radio-border-color: #6b7280;
    --melser-radio-label-color: #f9fafb;
    --melser-radio-group-bg: #1f2937;
  }
</style>

<div class="custom-radio-group" style="margin-bottom: 1rem;">
  <melser-radio-group 
    label="Radio personalizado"
    name="custom"
    value="opcion2">
    <melser-radio value="opcion1" label="Opción verde"></melser-radio>
    <melser-radio value="opcion2" label="Opción seleccionada"></melser-radio>
    <melser-radio value="opcion3" label="Otra opción"></melser-radio>
  </melser-radio-group>
</div>

<div class="minimal-radio-group" style="margin-bottom: 1rem;">
  <melser-radio-group 
    label="Radio minimalista"
    name="minimal"
    value="minimal2">
    <melser-radio value="minimal1" label="Pequeño"></melser-radio>
    <melser-radio value="minimal2" label="Compact"></melser-radio>
    <melser-radio value="minimal3" label="Discreto"></melser-radio>
  </melser-radio-group>
</div>

<div class="dark-radio-group">
  <melser-radio-group 
    label="Tema oscuro"
    name="dark"
    value="dark2">
    <melser-radio value="dark1" label="Dark Mode"></melser-radio>
    <melser-radio value="dark2" label="Night Theme"></melser-radio>
    <melser-radio value="dark3" label="Black Theme"></melser-radio>
  </melser-radio-group>
</div>

## Características Avanzadas

### Radio Group Dinámico

```javascript
const radioGroup = document.querySelector('melser-radio-group');
if (radioGroup) {
  // Agregar opciones dinámicamente
  function addOption(value, label) {
    const radio = document.createElement('melser-radio');
    radio.value = value;
    radio.label = label;
    radioGroup.appendChild(radio);
  }
  
  // Remover opción
  function removeOption(value) {
    const radio = radioGroup.querySelector(`melser-radio[value="${value}"]`);
    if (radio) {
      radio.remove();
    }
  }
  
  // Obtener todas las opciones
  function getOptions() {
    return Array.from(radioGroup.querySelectorAll('melser-radio'));
  }
}
```

### Validación Personalizada

```javascript
const radioGroup = document.querySelector('melser-radio-group[required]');
if (radioGroup) {
  radioGroup.addEventListener('invalid', (e) => {
    // Validación personalizada
    if (!radioGroup.value) {
      console.log('⚠️ Debe seleccionar una opción');
    }
  });
  
  // Validación de grupos relacionados
  radioGroup.addEventListener('change', (e) => {
    if (e.target.value === 'special') {
      // Mostrar campos adicionales
      showAdditionalFields();
    }
  });
}
```

### Radio Group con Imágenes

```html
<melser-radio-group label="Selecciona un icono" name="icon">
  <melser-radio value="home" label="🏠 Inicio"></melser-radio>
  <melser-radio value="user" label="👤 Usuario"></melser-radio>
  <melser-radio value="settings" label="⚙️ Configuración"></melser-radio>
  <melser-radio value="help" label="❓ Ayuda"></melser-radio>
</melser-radio-group>
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
radioGroup.name = 'mi-grupo';

// Verificar que el radio individual tenga valor
radio.value = 'mi-valor';
```

### Validación no funciona

```html
<!-- Asegurar que required esté en el grupo -->
<melser-radio-group 
  required
  label="Campo obligatorio">
  <melser-radio value="op1" label="Opción 1"></melser-radio>
  <melser-radio value="op2" label="Opción 2"></melser-radio>
</melser-radio-group>
```

### Orientación no cambia

```html
<!-- Verificar que orientation esté configurado -->
<melser-radio-group 
  orientation="horizontal"
  label="Horizontal">
```

### Focus no visible

```css
/* Personalizar indicador de foco */
melser-radio:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
```

### Opciones no se alinean

```css
/* Alinear radio buttons horizontalmente */
melser-radio-group[orientation="horizontal"] {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

melser-radio-group[orientation="horizontal"] melser-radio {
  display: flex;
  align-items: center;
}
```

### Problemas de accesibilidad

```html
<!-- Agregar aria-label para casos específicos -->
<melser-radio 
  aria-label="Seleccionar plan premium"
  value="premium"
  label="Premium">
```

### Radio group dinámico

```javascript
// Actualizar después de modificar opciones
radioGroup.dispatchEvent(new Event('options-changed'));

// O re-renderizar si es necesario
radioGroup.updateOptions();
