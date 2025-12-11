---
title: MelserOtpInput
---

# MelserOtpInput

Un componente de entrada de código OTP (One-Time Password) para verificación de dos factores con autocompletado y validación automática.

## Ejemplo Básico

```html
<melser-otp-input 
  length="6"
  label="Código de verificación">
</melser-otp-input>
```

## Demo Interactivo

<melser-otp-input 
  id="demo-basic" 
  length="6"
  label="Código de 6 dígitos">
</melser-otp-input>

<melser-otp-input 
  id="demo-numeric" 
  length="4"
  numeric-only
  label="Código numérico de 4 dígitos">
</melser-otp-input>

<melser-otp-input 
  id="demo-disabled" 
  length="6"
  disabled
  label="OTP deshabilitado"
  value="123456">
</melser-otp-input>

## Propiedades

| Propiedad | Tipo | Valor por Defecto | Descripción |
|-----------|------|-------------------|-------------|
| `length` | `number` | `6` | Número de dígitos del código |
| `value` | `string` | `''` | Valor actual del OTP |
| `disabled` | `boolean` | `false` | Deshabilita la interacción |
| `readonly` | `boolean` | `false` | Solo lectura |
| `name` | `string` | `''` | Nombre para formularios |
| `label` | `string` | `''` | Etiqueta visible del componente |
| `placeholder` | `string` | `'•'` | Carácter de marcador |
| `numericOnly` | `boolean` | `false` | Solo permite números |
| `autoFocus` | `boolean` | `true` | Enfoque automático al cargar |
| `caseSensitive` | `boolean` | `false` | Distingue mayúsculas/minúsculas |
| `allowedChars` | `string` | `''` | Caracteres permitidos (regex) |

## Eventos

| Evento | Descripción |
|--------|-------------|
| `input` | Se dispara al cambiar el valor |
| `complete` | Se dispara cuando se completa el código |
| `paste` | Se dispara al pegar contenido |
| `focus` | Se dispara al obtener el foco |
| `blur` | Se dispara al perder el foco |

## Ejemplos de Uso

### Código de Verificación SMS

```html
<melser-otp-input 
  length="6"
  numeric-only
  label="Código SMS"
  hint="Ingresa el código de 6 dígitos enviado a tu teléfono">
</melser-otp-input>
```

### Código de Aplicación Authenticator

```html
<melser-otp-input 
  length="6"
  numeric-only
  label="Código de authenticator"
  hint="Usa tu aplicación de autenticación">
</melser-otp-input>
```

### Código Alfanumérico

```html
<melser-otp-input 
  length="8"
  label="Código de recuperación"
  hint="Código alfanumérico de 8 caracteres">
</melser-otp-input>
```

## Integración con Formularios

### Formulario de Verificación

```html
<form id="verification-form">
  <h3>Verificación de Dos Factores</h3>
  
  <base-input 
    label="Correo electrónico"
    type="email"
    value="usuario@ejemplo.com"
    disabled>
  </base-input>
  
  <melser-otp-input 
    name="otpCode"
    length="6"
    numeric-only
    label="Código de verificación"
    hint="Hemos enviado un código a tu correo">
  </melser-otp-input>
  
  <melser-checkbox 
    name="rememberDevice"
    label="Recordar dispositivo por 30 días">
  </melser-checkbox>
  
  <button  type="submit" variant="primary">
    Verificar
  </button >
  
  <button  type="button" variant="secondary">
    Reenviar código
  </button >
</form>
```

```javascript
const form = document.getElementById('verification-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    console.log('Datos de verificación:', data);
    alert('¡Verificación completada!');
  });
}
```

## Demo del Formulario

<melser-playground-form id="otp-playground" title="Verificación 2FA" description="Verificación de código y seguridad.">
  <div style="margin-bottom: 1.5rem;">
    <base-input 
      label="Correo electrónico"
      type="email"
      value="usuario@ejemplo.com"
      disabled>
    </base-input>
  </div>
  
  <div style="margin-bottom: 1.5rem;">
    <melser-otp-input 
      name="otpCode"
      length="6"
      numeric-only
      label="Código de verificación"
      hint="Hemos enviado un código a tu correo">
    </melser-otp-input>
  </div>
  
  <div style="margin-bottom: 1.5rem;">
    <melser-checkbox 
      name="rememberDevice"
      label="Recordar dispositivo por 30 días">
    </melser-checkbox>
  </div>
</melser-playground-form>

<script type="module">
  import { z } from 'zod';
  
  const schema = z.object({
    otpCode: z.string().length(6, "El código debe tener 6 dígitos"),
    rememberDevice: z.boolean().default(false)
  });
  
  const form = document.getElementById('otp-playground');
  form.schema = schema;
</script>

    
## Ejemplos Avanzados

### Verificación con Temporizador

<div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
  <h4>Verificación con Expiración</h4>
  
  <melser-otp-input 
    id="timer-otp"
    length="6"
    numeric-only
    label="Código temporal">
  </melser-otp-input>
  
  <div id="timer-display" style="margin-top: 1rem; padding: 0.5rem; border-radius: 4px; text-align: center;">
    Tiempo restante: <span id="countdown">2:00</span>
  </div>
  
  <div id="expired-message" style="margin-top: 1rem; padding: 0.5rem; border-radius: 4px; color: #dc2626; display: none;">
    ⏰ El código ha expirado. Por favor solicita uno nuevo.
  </div>
</div>

### Validación con Patrón Personalizado

<div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
  <h4>Código con Patrón Personalizado</h4>
  
  <melser-otp-input 
    id="pattern-otp"
    length="4"
    label="Código de seguridad"
    allowed-chars="[A-F0-9]"
    hint="Solo letras A-F y números 0-9">
  </melser-otp-input>
</div>

## Personalización con CSS

### Variables CSS

```css
melser-otp-input {
  --melser-otp-input-width: 50px;
  --melser-otp-input-height: 50px;
  --melser-otp-input-gap: 8px;
  --melser-otp-input-font-size: 18px;
  --melser-otp-input-border: 2px solid #d1d5db;
  --melser-otp-input-border-radius: 8px;
  --melser-otp-input-focus-border: #3b82f6;
  --melser-otp-input-bg: #ffffff;
  --melser-otp-input-disabled-bg: #f9fafb;
  --melser-otp-input-disabled-border: #e5e7eb;
}
```

### Ejemplos de Personalización

<style>
  .custom-otp {
    --melser-otp-input-width: 60px;
    --melser-otp-input-height: 60px;
    --melser-otp-input-font-size: 24px;
    --melser-otp-input-border-radius: 12px;
    --melser-otp-input-focus-border: #10b981;
    --melser-otp-input-border: 2px solid #10b981;
  }
  
  .compact-otp {
    --melser-otp-input-width: 40px;
    --melser-otp-input-height: 40px;
    --melser-otp-input-gap: 4px;
    --melser-otp-input-font-size: 16px;
  }
  
  .dark-theme-otp {
    --melser-otp-input-bg: #1f2937;
    --melser-otp-input-border: #4b5563;
    --melser-otp-input-focus-border: #8b5cf6;
    --melser-otp-input-font-size: 20px;
    color: #f9fafb;
  }
</style>

<div class="custom-otp" style="margin-bottom: 1rem;">
  <melser-otp-input 
    length="6"
    label="OTP personalizado (grande, verde)">
  </melser-otp-input>
</div>

<div class="compact-otp" style="margin-bottom: 1rem;">
  <melser-otp-input 
    length="6"
    label="OTP compacto">
  </melser-otp-input>
</div>

<div class="dark-theme-otp">
  <melser-otp-input 
    length="6"
    label="OTP tema oscuro (púrpura)">
  </melser-otp-input>
</div>

## Accesibilidad

El componente MelserOtpInput incluye:

- **Navegación por teclado**: Tab entre campos, flechas, backspace
- **Screen reader support**: Anuncia posición y valor
- **Focus visible**: Indicador claro de foco
- **Auto-enfoque**: Salta al siguiente campo automáticamente
- **High contrast**: Compatible con modo de alto contraste

## Mejores Prácticas

1. **Usa longitud apropiada** para el tipo de código (4-8 dígitos)
2. **Proporciona instrucciones claras** sobre el código esperado
3. **Implementa reenvío de código** con temporizador
4. **Valida en tiempo real** pero sin ser intrusivo
5. **Maneja la expiración** de códigos temporales
6. **Usa `numeric-only`** para códigos numéricos
7. **Considera el auto-enfoque** para mejor UX

## Troubleshooting

### El OTP no responde a eventos

```javascript
// Verificar que el componente esté importado
import 'melser-ui/components/melser-otp-input.js';

// Verificar que no esté deshabilitado
console.log(otpInput.disabled); // Debe ser false
```

### No salta automáticamente al siguiente campo

```javascript
// Asegúrate que auto-focus esté habilitado
<melser-otp-input 
  length="6"
  auto-focus
  label="Código">
</melser-otp-input>

// El componente manejará el enfoque automáticamente
```

### Problemas con caracteres especiales

```javascript
// Usa allowed-chars para personalizar caracteres permitidos
<melser-otp-input 
  length="4"
  allowed-chars="[A-F0-9]"
  label="Código hexadecimal">
</melser-otp-input>
```

### El valor no se envía en el formulario

```html
<!-- Asegúrate de incluir el atributo name -->
<melser-otp-input 
  name="verificationCode"
  length="6"
  label="Código de verificación">
</melser-otp-input>

// Recuperar valor en formulario
const formData = new FormData(form);
const code = formData.get('verificationCode');
```

### Problemas de accesibilidad

```html
<!-- Usa aria-label para casos complejos -->
<melser-otp-input 
  aria-label="Código de verificación de 6 dígitos para autenticación de dos factores"
  length="6"
  label="Código de verificación">
</melser-otp-input>
```

